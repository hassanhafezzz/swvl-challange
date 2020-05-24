import React from 'react';
import {
  Polyline,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import bus from '../../../img/minibus.png';
import oval from '../../../img/oval.png';
import coloredOval from '../../../img/light-oval.png';
import routes from '../../../data/routes';

const Map = (props) => {
  const centerPoint = routes[Math.ceil(routes.length / 2) - 1];

  const renderIcon = (i) => {
    if (i === 0 || i === routes.length - 1) {
      return coloredOval;
    }
    return oval;
  };

  const renderIconSize = (i) => {
    if (i === 0 || i === routes.length - 1) {
      return new window.google.maps.Size(15, 15);
    }
    return new window.google.maps.Size(8, 8);
  };

  const renderMarker = ({ id, lat, lng }, i) => {
    // TODO change this to read from the state
    const nextStation = routes[5];
    return (
      <Marker
        position={{ lat, lng }}
        key={id}
        icon={{
          url: renderIcon(i),
          scaledSize: renderIconSize(i),
        }}
      >
        {nextStation.lat === lat ? (
          <InfoBox
            options={{
              closeBoxURL: '',
              enableEventPropagation: true,
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '5px 10px',
                left: i % 2 === 0 ? '0' : '10px',
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
                12:12 PM
              </div>
            </div>
          </InfoBox>
        ) : null}
      </Marker>
    );
  };

  // TODO: change it to read from state
  const currentLocation = routes[0];

  return (
    <>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: centerPoint.lat - 0.002,
          lng: centerPoint.lng + 0.02,
        }}
      >
        {routes.map(renderMarker)}
        <Marker
          position={currentLocation}
          icon={{
            url: bus,
            scaledSize: new window.google.maps.Size(50, 30),
          }}
        />
        <Polyline
          path={routes}
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
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDa-_J8FZe22-_HF_mJCQ30sly2OGL1ozo"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
};

export default withDefaults(withScriptjs(withGoogleMap(Map)));
