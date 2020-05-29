import {
  ADD_BOOKING,
  FILL_ALL_BOOKINGS,
  UPDATE_STATION_INFO,
  START_TRIP,
  END_TRIP,
  RESET_TRIP,
  UPDATE_ROUTE,
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
export const updateRoute = (payload) => {
  return {
    type: UPDATE_ROUTE,
    payload,
  };
};

export const updateCurrentDistance = (payload) => {
  return {
    type: UPDATE_CURRENT_DISTANCE,
    payload,
  };
};

export const updateStationInfo = (payload) => {
  return {
    type: UPDATE_STATION_INFO,
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
