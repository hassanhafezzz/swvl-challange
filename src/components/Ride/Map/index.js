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

import bus from './busIconPath';
import mapStyles from './mapStyles.json';
import {
  computeRouteDistancesAndETAs,
  computeDistanceBetween,
  formatETA,
} from '../../../utils';

const cx = classNames.bind(styles);

let path = null;

const Map = () => {
  const mapNode = useRef(null);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [state, dispatch] = useContext(Context);

  const { route, trip, currentDistance } = state;
  let interval = null;
  let animationId = null;

  const clearAnimationIntervals = () => {
    window.cancelAnimationFrame(animationId);
    window.clearInterval(interval);
  };

  const tripCompleted = () => {
    dispatch(endTrip());
    openModal();
  };

  const getVisitedStations = (distance) => {
    return route.filter((coord) => coord.distance < distance);
  };

  const resetBusPosition = () => {
    if (path) {
      const icons = path.get('icons');
      icons[0].offset = '0%';
      path.set('icons', icons);
    }
  };

  const moveBus = (fullDistance) => {
    let visitedStationsCount = 0;
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
        const icons = path.get('icons');
        icons[0].offset = `${currentOffset}%`;
        path.set('icons', icons);
        animationId = window.requestAnimationFrame(animate);
        if (currentOffset >= 100) {
          clearAnimationIntervals();
          tripCompleted();
        }
      };
      animationId = window.requestAnimationFrame(animate);
    };

    interval = setInterval(() => {
      move();
      dispatch(updateCurrentDistance(distance));
    }, 100);
  };

  /*= == rendering UI components === */
  const makePath = () => {
    const mapInstance = mapNode.current.context[MAP];
    const lineSymbol = {
      path: bus,
      fillColor: '#ee4149',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 0.4,
      rotation: 180,
      anchor: new window.google.maps.Point(30, 50),
    };

    const path = new window.google.maps.Polyline({
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

    return path;
  };

  const renderIcon = (i) => {
    if (i === 0 || i === route.length - 1) {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#000',
        fillOpacity: 1,
        strokeWeight: 0,
      };
    }
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 4,
      fillColor: '#ee4149',
      fillOpacity: 1,
      strokeWeight: 0,
    };
  };

  const renderMarker = ({ id, lat, lng, eta, distance }, i) => {
    return (
      <Marker position={{ lat, lng }} key={id} icon={renderIcon(i)}>
        {trip.status === TRIP_IN_PROGRESS && distance > currentDistance ? (
          <InfoBox
            options={{
              pixelOffset: new window.google.maps.Size(-55, 0),
              closeBoxURL: '',
              enableEventPropagation: true,
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '5px 10px',
                borderRadius: '10px 0px 10px 10px',
              }}
            >
              <div
                style={{
                  marginBottom: '1px',
                  fontSize: '5px',
                  fontColor: '#7e7e7e',
                }}
              >
                ETA
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  fontColor: '#222222',
                }}
              >
                {formatETA(eta)}
              </div>
            </div>
          </InfoBox>
        ) : null}
      </Marker>
    );
  };

  /*= == make path on mount === */
  useEffect(() => {
    path = makePath();
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
    return () => clearAnimationIntervals();
  }, [trip.status]);

  const centerPoint = route[Math.ceil(route.length / 2) - 1];
  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h4 className={cx('congrats')}>
          <span role="img" aria-label="congrats">
            🎉
          </span>{' '}
          Congratulations
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
      <GoogleMap
        ref={mapNode}
        defaultZoom={12}
        defaultCenter={{
          lat: centerPoint.lat - 0.002,
          lng: centerPoint.lng + 0.02,
        }}
        defaultOptions={{
          styles: mapStyles,
        }}
      >
        {route.map(renderMarker)}

        <Polyline
          path={route}
          geodesic
          options={{
            strokeColor: '#ee4149',
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
