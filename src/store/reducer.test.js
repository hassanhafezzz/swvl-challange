import { cleanup } from '@testing-library/react';
import reducer from './reducer';
import initialState from './initialState';

import {
  addBooking,
  fillBookings,
  updateBookerStatus,
  setDirections,
  setStations,
  updateCurrentDistance,
  updateStationArrivalStatus,
  startTrip,
  endTrip,
  resetTrip,
} from './actions';
import {
  TRIP_IN_PROGRESS,
  TRIP_NOT_STARTED,
  TRIP_COMPLETED,
  LATENCY,
} from '../constants';

afterEach(cleanup);

const userMock = {
  id: 'e5da1a8f9b844d56a4a32cbaa590254e',
  name: 'Ahmed Ossama',
  trips_count: 210,
  image:
    'https://scontent.fcai19-1.fna.fbcdn.net/v/t31.0-8/20424255_10159017225385401_82881391294765437_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=2KLOtnblWN0AX_7STbA&_nc_ht=scontent.fcai19-1.fna&oh=6b0200cf4b3f857ef5d363a4f119b073&oe=5EF3C80B',
  pickupStation: 'almaza',
  dropOffStation: 'city stars',
  paymentMethod: 'cash',
};

const stationsMock = [
  {
    id: 1,
    name: 'almaza',
    lat: 29.99509712,
    lng: 31.4459768,
  },
  {
    name: 'city stars',
    id: 2,
    lat: 30.01288023,
    lng: 31.43102269,
  },
  {
    name: 'hadekt el tafl',
    id: 3,
    lat: 30.01642345,
    lng: 31.43356512,
  },
  {
    name: 'mostafa el nahas',
    id: 4,
    lat: 30.01637555,
    lng: 31.39839364,
  },
];

const directionsMock = {
  routes: [
    {
      legs: [
        {
          distance: {
            text: '3.5 km',
            value: 3480,
          },
          duration: {
            text: '6 mins',
            value: 338,
          },
        },
        {
          distance: {
            text: '0.6 km',
            value: 550,
          },
          duration: {
            text: '2 mins',
            value: 104,
          },
        },
        {
          distance: {
            text: '0.6 km',
            value: 550,
          },
          duration: {
            text: '2 mins',
            value: 104,
          },
        },
      ],
    },
  ],
};

describe('Bookings', () => {
  it('should start trip status', () => {
    const newState = reducer(initialState, addBooking(userMock));
    expect(newState.bookings.length).toBe(1);
    expect(newState.bookings[0].status).toEqual('booked');
    expect(newState.bookings[0].name).toEqual(userMock.name);
  });

  it('should add all bookings', () => {
    const newState = reducer(initialState, fillBookings());
    expect(newState.bookings.length).toBe(12);
  });

  it('should change status of the booking when arrive in to station', () => {
    const bookingState = reducer(initialState, addBooking(userMock));
    const newState = reducer(bookingState, updateBookerStatus(stationsMock[0]));
    expect(newState.bookings.length).toBe(1);
    expect(newState.bookings[0].status).not.toBe('booked');
  });
});

describe('Stations, location and movement', () => {
  it('should set stations ', () => {
    const stationsState = reducer(initialState, setStations(stationsMock));
    expect(stationsState.stations.length).toBe(4);
  });
  it('should update the distance bus has moved', () => {
    const distance = 177.89;
    const newState = reducer(initialState, updateCurrentDistance(distance));
    expect(newState.currentDistance).toBe(distance);
  });

  it('should set directions', () => {
    expect(reducer(initialState, setDirections(directionsMock))).toMatchObject({
      ...initialState,
      isMapReady: true,
      directions: directionsMock,
    });
  });

  it('should update station arrival status', () => {
    const { EARLY, ON_TIME, LATE } = LATENCY;
    const newState = reducer(
      initialState,
      updateStationArrivalStatus(stationsMock[0]),
    );
    expect([EARLY, ON_TIME, LATE]).toContain(newState.stations[0].status);
  });
});

describe('Trip', () => {
  it('should initialize trip status with not started', () => {
    const newState = reducer(initialState, {});
    expect(newState.trip.status).toBe(TRIP_NOT_STARTED);
  });

  it('should start tip with duration', () => {
    const duration = 2;
    const newState = reducer(initialState, startTrip(duration));
    expect(newState.trip.status).toBe(TRIP_IN_PROGRESS);
    expect(newState.trip.duration).toBe(duration);
  });

  it('should start and end trip', () => {
    const duration = 2;
    const startedTripState = reducer(initialState, startTrip(duration));
    const endTripState = reducer(startedTripState, endTrip());
    expect(endTripState.trip.status).toBe(TRIP_COMPLETED);
  });

  it('should start and end and reset the trip', () => {
    const duration = 2;
    const startedTripState = reducer(initialState, startTrip(duration));
    const endTripState = reducer(startedTripState, endTrip());
    expect(endTripState.trip.status).toBe(TRIP_COMPLETED);
    const resetTripState = reducer(endTripState, resetTrip());
    expect(resetTripState.trip.status).toBe(TRIP_NOT_STARTED);
    expect(resetTripState.trip.duration).toBe(0);
    expect(resetTripState.trip.startedAt).toBeFalsy();
  });
});
