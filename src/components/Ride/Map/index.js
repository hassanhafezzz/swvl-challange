import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';
import classNames from 'classnames/bind';

import styles from './styles.module.css';
import Modal from '../../common/Modal';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import { Context } from '../../../store';
import { TRIP_IN_PROGRESS, TRIP_NOT_STARTED } from '../../../constants';
import {
  setDirections,
  updateStationsDistanceAndEta,
  updateStationArrivalStatus,
  updateCurrentDistance,
  updateBookerStatus,
  resetTrip,
  endTrip,
} from '../../../store/actions';

import {
  busIconPath,
  getVisitedStations,
  calcFullDistance,
} from '../../../utils';

import Markers from './Markers';
import mapStyles from './mapStyles.json';

const cx = classNames.bind(styles);

let movementPath = null;

const Map = () => {
  const mapNode = useRef(null);
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [state, dispatch] = useContext(Context);

  const { directions, isMapReady, stations, trip, currentDistance } = state;

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

  const drawMovementPathOnMap = (result) => {
    const mapInstance = mapNode.current.context[MAP];

    const lineSymbol = {
      path: busIconPath,
      fillColor: '#ee4149',
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 0.4,
      rotation: 180,
      anchor: new window.google.maps.Point(30, 50),
    };

    const overviewPath = result.routes[0].overview_path;
    return new window.google.maps.Polyline({
      path: overviewPath,
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
  };

  const moveBus = () => {
    // In real world app I would properly add another function to check if the difference between the current position and the new position returning from the backend and if it's too big then skip animation and position the bus into the new position, and wouldn't use setInterval [used for the fixed time]
    if (!movementPath) {
      movementPath = drawMovementPathOnMap(directions);
    }

    const fullDistance = calcFullDistance(directions);
    let distance = currentDistance;
    const speedPerSecond = fullDistance / (trip.duration * 60);
    const speed = speedPerSecond / 10;

    let visitedStationsCount = 0;
    const move = () => {
      distance += speed;
      let currentOffset = (distance / fullDistance) * 100;

      const visitedStations = getVisitedStations(stations, distance);

      // update station arrival status and customer status upon arrival
      if (visitedStations.length > visitedStationsCount) {
        visitedStationsCount = visitedStations.length;
        const lastVisitedStation = visitedStations[visitedStations.length - 1];
        dispatch(updateStationArrivalStatus(lastVisitedStation));
        dispatch(updateBookerStatus(lastVisitedStation));
      }

      // make sure offset doesn't go over 100%
      if (currentOffset > 100) {
        currentOffset = 100;
      }

      const animate = () => {
        const icons = movementPath.get('icons');
        icons[0].offset = `${currentOffset}%`;
        movementPath.set('icons', icons);
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

  const resetBusPosition = () => {
    if (movementPath) {
      const icons = movementPath.get('icons');
      icons[0].offset = '0%';
      movementPath.set('icons', icons);
    }
  };

  const getDirectionsAndMovementPath = () => {
    const DirectionsService = new window.google.maps.DirectionsService();
    const firstStation = stations[0];
    const middleStations = stations.slice(1, stations.length - 1);
    const lastStation = stations[stations.length - 1];

    const wayPoints = middleStations.map((station) => {
      return {
        location: new window.google.maps.LatLng(station.lat, station.lng),
        stopover: true,
      };
    });

    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          firstStation.lat,
          firstStation.lng,
        ),
        destination: new window.google.maps.LatLng(
          lastStation.lat,
          lastStation.lng,
        ),
        waypoints: wayPoints,
        travelMode: 'DRIVING',
      },
      async (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          await dispatch(setDirections(result));
          await dispatch(updateStationsDistanceAndEta(result));
          if (!movementPath) {
            movementPath = drawMovementPathOnMap(result);
          }
        } else {
          console.error(`error fetching directions ${result.status}`);
        }
      },
    );
  };

  useEffect(() => {
    // get direction and construct movement path on mount
    getDirectionsAndMovementPath();
  }, []);

  useEffect(() => {
    /*= == run whenever the trip status changed === */
    if (trip.status === TRIP_IN_PROGRESS) {
      moveBus();
    } else if (trip.status === TRIP_NOT_STARTED) {
      resetBusPosition();
    }
    return () => clearAnimationIntervals();
  }, [trip.status]);
  const centerPoint = stations[Math.ceil(stations.length / 2) - 1];

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
      {isMapReady ? (
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
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#ee4149',
                strokeWeight: 2,
              },
              markerOptions: {
                visible: false,
              },
            }}
          />
          <Markers />
        </GoogleMap>
      ) : null}
    </>
  );
};

const withDefaults = (WrappedComponent) => {
  return (props) => (
    <WrappedComponent
      googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_API}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
};

export default withDefaults(withScriptjs(withGoogleMap(Map)));
