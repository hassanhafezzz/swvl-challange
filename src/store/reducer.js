import { INITIALIZE_APP, FILL_ALL_BOOKINGS, ADD_BOOKING } from './constants';
import initialState from './initialState';
import users from '../data/users';
import routes from '../data/routes';
import { getRandomArbitrary } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return {
        ...initialState,
      };

    case ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case FILL_ALL_BOOKINGS: {
      const bookings = users.map(({ trips_count: tripsCount, ...user }) => {
        const pickupStationIndex = getRandomArbitrary(0, routes.length - 2);
        const dropOffStationIndex = getRandomArbitrary(
          pickupStationIndex + 1,
          routes.length - 1,
        );

        const pickupStation = routes[pickupStationIndex].stationName;
        const dropOffStation = routes[dropOffStationIndex].stationName;
        const paymentMethod = ['cash', 'credit'][Math.floor(Math.random() * 2)];

        return {
          ...user,
          pickupStation,
          tripsCount,
          dropOffStation,
          paymentMethod,
        };
      });

      return {
        ...state,
        bookings,
      };
    }

    default:
      return state;
  }
};

export default reducer;
