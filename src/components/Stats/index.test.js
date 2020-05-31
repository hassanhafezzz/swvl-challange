import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import StoreProvider from '../../store';
import Stats from './index';

const ele = (
  <StoreProvider>
    <Router>
      <Stats />
    </Router>
  </StoreProvider>
);

describe('stats component test', () => {
  test('renders stats', () => {
    const { getByTestId } = render(ele);
    const stats = getByTestId('stats');
    expect(stats).toBeTruthy();
  });

  test('renders three charts', () => {
    const { getByTestId } = render(ele);
    const bookingPerStationChart = getByTestId('booking-per-station-chart');
    const bookingStatusChart = getByTestId('booking-status-chart');
    const paymentChart = getByTestId('payment-chart');

    expect(bookingPerStationChart).toBeTruthy();
    expect(bookingStatusChart).toBeTruthy();
    expect(paymentChart).toBeTruthy();
  });

  test('add snapshot for stats', () => {
    const { container, asFragment } = render(ele);
    expect(asFragment(container)).toMatchSnapshot();
  });
});
