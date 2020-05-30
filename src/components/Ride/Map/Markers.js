import React, { useContext } from 'react';
import { Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { TRIP_IN_PROGRESS } from '../../../constants';
import { Context } from '../../../store';

const Markers = () => {
  const [state] = useContext(Context);
  const { stations, trip, currentDistance } = state;

  const renderIcon = (i) => {
    if (i === 0 || i === stations.length - 1) {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#222',
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

  const renderMarker = ({ lng, lat, eta, distance }, i) => {
    return (
      <Marker position={{ lat, lng }} key={distance} icon={renderIcon(i)}>
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
                {eta}
              </div>
            </div>
          </InfoBox>
        ) : null}
      </Marker>
    );
  };

  return <>{stations.map(renderMarker)}</>;
};

export default Markers;
