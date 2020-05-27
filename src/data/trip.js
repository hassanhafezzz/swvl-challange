import routes from './routes';
import driver from '../img/driver.jpg';
import bus from '../img/ford-bus.png';

const trip = {
  fare: '55 EGP',
  distance: '23 KM',
  start: routes[0].stationName,
  end: routes[routes.length - 1].stationName,
  driver: {
    image: driver,
    name: 'Herbert Patton',
    rating: '5.0',
    bus: {
      image: bus,
      model: 'Ford Transit',
      plate: 'GA 213',
    },
  },
};

export default trip;
