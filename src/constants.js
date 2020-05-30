// booking
export const FILL_ALL_BOOKINGS = 'FILL_ALL_BOOKINGS';
export const ADD_BOOKING = 'ADD_BOOKING';
export const UPDATE_BOOKER_STATUS = 'UPDATE_BOOKER_STATUS';

// trip
export const RESET_TRIP = 'RESET_TRIP';
export const START_TRIP = 'START_TRIP';
export const END_TRIP = 'END_TRIP';

// location
export const SET_STATIONS = 'SET_STATIONS';
export const SET_DIRECTION = 'SET_DIRECTION';
export const UPDATE_CURRENT_DISTANCE = 'UPDATE_CURRENT_DISTANCE';
export const UPDATE_STATIONS_DISTANCE_AND_ETA =
  'UPDATE_STATIONS_DISTANCE_AND_ETA';
export const UPDATE_STATION_ARRIVAL_STATUS = 'UPDATE_STATION_ARRIVAL_STATUS';

// status
export const TRIP_NOT_STARTED = 'TRIP_NOT_STARTED';
export const TRIP_IN_PROGRESS = 'TRIP_IN_PROGRESS';
export const TRIP_COMPLETED = 'TRIP_COMPLETED';

export const LATENCY = {
  EARLY: 'early',
  ON_TIME: 'on time',
  LATE: 'late',
};

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CREDIT: 'credit',
};

export const BOOKING_STATUS = {
  BOOKED: 'booked',
  COMPLETED: 'completed',
  MISSED: 'missed',
  CANCELLED: 'cancelled',
};
