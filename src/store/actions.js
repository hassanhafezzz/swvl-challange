import {
  ADD_BOOKING,
  FILL_ALL_BOOKINGS,
  START_TRIP,
  END_TRIP,
  RESET_TRIP,
  SET_STATIONS,
  SET_DIRECTION,
  UPDATE_STATIONS_DISTANCES,
  UPDATE_STATIONS_ETAS,
  UPDATE_STATION_ARRIVAL_STATUS,
  UPDATE_BOOKER_STATUS,
  UPDATE_CURRENT_DISTANCE,
} from '../constants';

// Booking
export const fillBookings = () => {
  return {
    type: FILL_ALL_BOOKINGS,
  };
};

export const addBooking = (payload) => {
  return {
    type: ADD_BOOKING,
    payload,
  };
};

export const updateBookerStatus = (payload) => {
  return {
    type: UPDATE_BOOKER_STATUS,
    payload,
  };
};

// Location and Movement
export const setStations = (payload) => {
  return {
    type: SET_STATIONS,
    payload,
  };
};

export const setDirections = (payload) => {
  return {
    type: SET_DIRECTION,
    payload,
  };
};

export const updateStationsDistances = (payload) => {
  return {
    type: UPDATE_STATIONS_DISTANCES,
    payload,
  };
};

export const updateStationsEtas = (payload) => {
  return {
    type: UPDATE_STATIONS_ETAS,
    payload,
  };
};

export const updateCurrentDistance = (payload) => {
  return {
    type: UPDATE_CURRENT_DISTANCE,
    payload,
  };
};

export const updateStationArrivalStatus = (payload) => {
  return {
    type: UPDATE_STATION_ARRIVAL_STATUS,
    payload,
  };
};

// Trip
export const startTrip = (payload) => {
  return {
    type: START_TRIP,
    payload,
  };
};

export const endTrip = () => {
  return {
    type: END_TRIP,
  };
};

export const resetTrip = () => {
  return {
    type: RESET_TRIP,
  };
};
