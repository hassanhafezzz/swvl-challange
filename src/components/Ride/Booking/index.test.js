import React from 'react';
import { render } from '@testing-library/react';
import StoreProvider from '../../../store';
import Booking from './index';

const ele = (
  <StoreProvider>
    <Booking />
  </StoreProvider>
);

describe('Booking component test', () => {
  test('renders booking section', () => {
    const { getByTestId } = render(ele);
    const booking = getByTestId('booking');
    expect(booking).toBeTruthy();
  });

  test('add new button exists', () => {
    const { getByText } = render(ele);
    expect(getByText(/new book/i)).toBeTruthy();
  });

  test('make sure booking buttons are shown', () => {
    const { container } = render(ele);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toEqual(2);
  });

  test('add snapshot for booking', () => {
    const { container, asFragment } = render(ele);
    expect(asFragment(container)).toMatchSnapshot();
  });
});
