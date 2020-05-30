import trip from '../data/trip';
import stations from '../data/stations';

const initialState = {
  trip,
  stations,
  directions: {},
  isMapReady: false,
  currentDistance: 0,
  bookings: [],
};

export default initialState;
