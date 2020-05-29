import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Polyline,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import classNames from 'classnames/bind';

import styles from './styles.module.css';
import Modal from '../../common/Modal';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import { Context } from '../../../store';
import { TRIP_IN_PROGRESS, TRIP_NOT_STARTED } from '../../../store/constants';
import {
  endTrip,
  updateRoute,
  updateCurrentDistance,
  resetTrip,
  updateStationInfo,
  updateBookerStatus,
} from '../../../store/actions';

import bus from './BusIconPath';
import oval from '../../../img/oval.png';
import coloredOval from '../../../img/light-oval.png';
import {
  computeRouteDistancesAndETAs,
  computeDistanceBetween,
  formatETA,
} from '../../../utils';

const cx = classNames.bind(styles);

const Map = () => {
  const mapNode = useRef(null);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [state, dispatch] = useContext(Context);
  const [line, setLine] = useState(null);

  const { route, trip, currentDistance } = state;

  const tripCompleted = () => {
    dispatch(endTrip());
    openModal();
  };

  const getNextStation = () => {
    let nextStation = route.find((coord) => coord.distance > currentDistance);
    if (!nextStation) {
      nextStation = route[0];
    }
    return nextStation;
  };

  const getVisitedStations = (distance) => {
    return route.filter((coord) => coord.distance < distance);
  };

  const resetBusPosition = () => {
    if (line) {
      const icons = line.get('icons');
      icons[0].offset = '0%';
      line.set('icons', icons);
      icons[0].offset = '0%';
      line.set('icons', icons);
    }
  };

  const moveBus = (fullDistance) => {
    let visitedStationsCount = 0;
    let interval = null;
    let animationId = null;
    // In real world app I would properly add another function to check if the difference between the current position and the new position returning from the backend and if it's too big then skip animation and position the bus into the new position, and wouldn't use setInterval [used for the fixed time]

    let distance = currentDistance;
    const speedPerSecond = fullDistance / (trip.duration * 60);
    const speed = speedPerSecond / 10;
    const move = () => {
      distance += speed;
      let currentOffset = (distance / fullDistance) * 100;

      // update bookings status and station arrival status
      const visitedStations = getVisitedStations(distance);
      if (visitedStations.length > visitedStationsCount) {
        visitedStationsCount = visitedStations.length;
        const lastVisitedStation = visitedStations[visitedStations.length - 1];
        dispatch(updateStationInfo(lastVisitedStation));
        dispatch(updateBookerStatus(lastVisitedStation));
      }

      if (currentOffset > 100) {
        currentOffset = 100;
      }

      const animate = () => {
        const icons = line.get('icons');
        icons[0].offset = `${currentOffset}%`;
        line.set('icons', icons);
        animationId = window.requestAnimationFrame(animate);
      };
      animationId = window.requestAnimationFrame(animate);

      if (currentOffset >= 100) {
        tripCompleted();
        window.cancelAnimationFrame(animationId);
        window.clearInterval(interval);
      }
    };

    interval = setInterval(() => {
      move();
      dispatch(updateCurrentDistance(distance));
    }, 100);
  };

  /*= == initial calculation for the route === */
  useEffect(() => {
    const mapInstance = mapNode.current.context[MAP];
    const lineSymbol = {
      path: bus,
      fillColor: '#ee4149',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 0.35,
      rotation: 180,
      anchor: new window.google.maps.Point(30, 50),
    };

    const l = new window.google.maps.Polyline({
      path: route,
      geodesic: true,
      icons: [
        {
          icon: lineSymbol,
          offset: '0%',
        },
      ],
      strokeOpacity: 5,
      strokeWeight: 0,
      map: mapInstance,
    });
    setLine(l);
  }, []);

  /*= == run whenever the trip status changed === */
  useEffect(() => {
    if (trip.status === TRIP_IN_PROGRESS) {
      const from = {
        lat: route[0].lat,
        lng: route[0].lng,
      };
      const to = {
        lat: route[route.length - 1].lat,
        lng: route[route.length - 1].lng,
      };
      const fullDistance = computeDistanceBetween(from, to);
      const calculatedRoute = computeRouteDistancesAndETAs(
        route,
        fullDistance,
        trip.duration,
      );

      dispatch(updateRoute(calculatedRoute));
      moveBus(fullDistance);
    } else if (trip.status === TRIP_NOT_STARTED) {
      resetBusPosition();
    }
  }, [trip.status]);

  /*= == rendering UI components === */
  const renderIcon = (i) => {
    if (i === 0 || i === route.length - 1) {
      return coloredOval;
    }
    return oval;
  };

  const renderIconSize = (i) => {
    if (i === 0 || i === route.length - 1) {
      return new window.google.maps.Size(15, 15);
    }
    return new window.google.maps.Size(8, 8);
  };

  const renderMarker = ({ id, lat, lng }, i) => {
    const nextStation = getNextStation();

    return (
      <Marker
        position={{ lat, lng }}
        key={id}
        icon={{
          url: renderIcon(i),
          scaledSize: renderIconSize(i),
        }}
      >
        {trip.status === TRIP_IN_PROGRESS &&
        nextStation.lat === lat &&
        nextStation.lng === lng ? (
          <InfoBox
            pixelOffset={new window.google.maps.Size(-95, 100)}
            options={{
              closeBoxURL: '',
              enableEventPropagation: true,
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '5px 10px',
                  borderRadius: '5px 10px 10px 10px',
                }}
              >
                <div
                  style={{
                    marginBottom: '2px',
                    fontSize: '10px',
                    fontColor: '#7e7e7e',
                  }}
                >
                  ETA
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontColor: '#222222',
                  }}
                >
                  {formatETA(nextStation.eta)}
                </div>
              </div>
            </div>
          </InfoBox>
        ) : null}
      </Marker>
    );
  };

  const centerPoint = route[Math.ceil(route.length / 2) - 1];
  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h4 className={cx('congrats')}>
          <span role="img" aria-label="congrats">
            🎉
          </span>{' '}
          Congrats
        </h4>
        <p className={cx('subtext')}>The trip has been completed</p>

        <div className={cx('buttons-container')}>
          <Button
            variant={BUTTON_VARIANT.PRIMARY}
            onClick={() => {
              closeModal();
              history.push('/stats');
            }}
          >
            Show stats
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => {
              closeModal();
              dispatch(resetTrip());
            }}
          >
            Reset
          </Button>
        </div>
      </Modal>
      ;
      <GoogleMap
        ref={mapNode}
        defaultZoom={12}
        defaultCenter={{
          lat: centerPoint.lat - 0.002,
          lng: centerPoint.lng + 0.02,
        }}
      >
        {route.map(renderMarker)}

        <Polyline
          path={route}
          geodesic
          options={{
            strokeColor: '#8300D5',
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </>
  );
};

const withDefaults = (WrappedComponent) => {
  return (props) => (
    <WrappedComponent
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDa-_J8FZe22-_HF_mJCQ30sly2OGL1ozo&libraries=geometry"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
};

export default withDefaults(withScriptjs(withGoogleMap(Map)));
