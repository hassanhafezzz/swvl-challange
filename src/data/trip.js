import { TRIP_NOT_STARTED } from '../constants';
import stations from './stations';
import driver from '../img/driver.jpg';
import bus from '../img/ford-bus.png';

const trip = {
  duration: 0,
  fare: 55,
  distance: 13798,
  startedAt: 0,
  start: stations[0].name,
  end: stations[stations.length - 1].name,
  driver: {
    image: driver,
    name: 'Herbert Patton',
    rating: 5,
    bus: {
      image: bus,
      model: 'Ford Transit',
      plate: 'GA 213',
    },
  },
  status: TRIP_NOT_STARTED,
};

export default trip;
