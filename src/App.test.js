import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders header, info and booking section', () => {
  const { getByTestId, getByAltText } = render(<App />);
  const logo = getByAltText('swvl logo');
  const info = getByTestId('info');
  const booking = getByTestId('booking');

  expect(logo).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  expect(booking).toBeInTheDocument();
});
