import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';

test('header has logo', () => {
  const { getByAltText } = render(<Header />);
  const logo = getByAltText('swvl logo');
  expect(logo).toBeTruthy();
});

test('add snapshot for header ', () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});
