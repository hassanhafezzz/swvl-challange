import { INITIALIZE_APP, ADD_BOOKING, FILL_ALL_BOOKINGS } from './constants';

export const initializeApp = () => {
  return { type: INITIALIZE_APP };
};

export const fillBookings = () => {
  return {
    type: FILL_ALL_BOOKINGS,
  };
};

export const AddBooking = (payload) => {
  return {
    type: ADD_BOOKING,
    payload,
  };
};
