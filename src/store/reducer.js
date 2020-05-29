import {
  FILL_ALL_BOOKINGS,
  ADD_BOOKING,
  UPDATE_BOOKER_STATUS,
  RESET_TRIP,
  START_TRIP,
  END_TRIP,
  TRIP_IN_PROGRESS,
  TRIP_COMPLETED,
  UPDATE_ROUTE,
  UPDATE_STATION_INFO,
  UPDATE_CURRENT_DISTANCE,
  BOOKING_STATUS,
  PAYMENT_METHODS,
} from '../constants';

import initialState from './initialState';
import users from '../data/users';
import route from '../data/route';
import { getRandomArbitrary } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        bookings: [
          ...state.bookings,
          { ...action.payload, status: BOOKING_STATUS.BOOKED },
        ],
      };

    case UPDATE_BOOKER_STATUS: {
      const lastVisitedStation = action.payload;
      const computedBooking = state.bookings.map((booking) => {
        if (booking.pickupStation === lastVisitedStation.name) {
          const status = [
            BOOKING_STATUS.COMPLETED,
            BOOKING_STATUS.CANCELLED,
            BOOKING_STATUS.MISSED,
          ][Math.floor(Math.random() * 3)];
          return { ...booking, status };
        }
        return booking;
      });
      return {
        ...state,
        bookings: computedBooking,
      };
    }

    case FILL_ALL_BOOKINGS: {
      const bookings = users.map(({ trips_count: tripsCount, ...user }) => {
        const pickupStationIndex = getRandomArbitrary(0, route.length - 2);
        const dropOffStationIndex = getRandomArbitrary(
          pickupStationIndex + 1,
          route.length - 1,
        );

        const pickupStation = route[pickupStationIndex].name;
        const dropOffStation = route[dropOffStationIndex].name;
        const paymentMethod = [PAYMENT_METHODS.CASH, PAYMENT_METHODS.CREDIT][
          Math.floor(Math.random() * 2)
        ];

        return {
          ...user,
          status: BOOKING_STATUS.BOOKED,
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

    case START_TRIP: {
      const now = new Date();
      return {
        ...state,
        trip: {
          ...state.trip,
          startedAt: now,
          duration: action.payload,
          status: TRIP_IN_PROGRESS,
        },
      };
    }

    case END_TRIP:
      return {
        ...state,
        trip: {
          ...state.trip,
          status: TRIP_COMPLETED,
        },
      };

    case RESET_TRIP:
      return {
        ...initialState,
      };

    case UPDATE_ROUTE:
      return {
        ...state,
        route: action.payload,
      };

    case UPDATE_CURRENT_DISTANCE: {
      return {
        ...state,
        currentDistance: action.payload,
      };
    }

    case UPDATE_STATION_INFO: {
      const lastVisitedStation = action.payload;
      const computedRoute = state.route.map((station) => {
        if (station.id === lastVisitedStation.id) {
          const status = ['early', 'on time', 'late'][
            Math.floor(Math.random() * 3)
          ];
          return { ...station, status };
        }
        return station;
      });

      return {
        ...state,
        route: computedRoute,
      };
    }

    default:
      return state;
  }
};

export default reducer;
