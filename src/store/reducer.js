import shuffle from 'lodash.shuffle';
import {
  FILL_ALL_BOOKINGS,
  ADD_BOOKING,
  UPDATE_BOOKER_STATUS,
  RESET_TRIP,
  START_TRIP,
  END_TRIP,
  TRIP_NOT_STARTED,
  TRIP_IN_PROGRESS,
  TRIP_COMPLETED,
  SET_DIRECTION,
  SET_STATIONS,
  UPDATE_STATIONS_DISTANCE_AND_ETA,
  UPDATE_STATION_ARRIVAL_STATUS,
  UPDATE_CURRENT_DISTANCE,
  BOOKING_STATUS,
  PAYMENT_METHODS,
  LATENCY,
} from '../constants';

import users from '../data/users';
import { getRandomArbitrary, getEta } from '../utils';

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
      const { stations } = state;
      const bookings = users.map(({ trips_count: tripsCount, ...user }) => {
        const pickupStationIndex = getRandomArbitrary(0, stations.length - 2);
        const dropOffStationIndex = getRandomArbitrary(
          pickupStationIndex + 1,
          stations.length - 1,
        );

        const pickupStation = stations[pickupStationIndex].name;
        const dropOffStation = stations[dropOffStationIndex].name;
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
        bookings: shuffle(bookings),
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
        ...state,
        trip: {
          ...state.trip,
          startedAt: '',
          duration: 0,
          status: TRIP_NOT_STARTED,
        },
        currentDistance: 0,
        bookings: [],
      };

    case SET_STATIONS: {
      return {
        ...state,
        stations: action.payload,
      };
    }

    case SET_DIRECTION: {
      return {
        ...state,
        isMapReady: true,
        directions: action.payload,
      };
    }

    case UPDATE_STATIONS_DISTANCE_AND_ETA: {
      const directions = action.payload;
      const { legs } = directions.routes[0];
      const { startedAt } = state.trip;

      const newStations = state.stations.map((station, i) => {
        if (i === 0) {
          return { ...station, distance: 0, eta: '' };
        }
        const distance = legs
          .slice(0, i)
          .reduce((acc, leg) => acc + leg.distance.value, 0);

        const duration = legs
          .slice(0, i)
          .reduce((acc, leg) => acc + leg.duration.value * 1000, 0);

        const eta = getEta(startedAt, duration);

        return { ...station, distance, eta };
      });

      return {
        ...state,
        stations: newStations,
      };
    }

    case UPDATE_CURRENT_DISTANCE: {
      return {
        ...state,
        currentDistance: action.payload,
      };
    }

    case UPDATE_STATION_ARRIVAL_STATUS: {
      const { EARLY, ON_TIME, LATE } = LATENCY;
      const { stations } = state;
      const lastVisitedStation = action.payload;
      const updatedStations = stations.map((station) => {
        if (station.id === lastVisitedStation.id) {
          const status = [EARLY, ON_TIME, LATE][Math.floor(Math.random() * 3)];
          return { ...station, status };
        }
        return station;
      });

      return {
        ...state,
        stations: updatedStations,
      };
    }

    default:
      return state;
  }
};

export default reducer;
