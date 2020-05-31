import React from 'react';
import { render } from '@testing-library/react';
import StoreProvider from '../../../store';
import Info from './index';

const ele = (
  <StoreProvider>
    <Info />
  </StoreProvider>
);

describe('info component test', () => {
  test('renders Info section', () => {
    const { getByTestId } = render(ele);
    const info = getByTestId('info');
    expect(info).toBeTruthy();
  });

  test('start ride button exist', () => {
    const { container, getByText } = render(ele);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toEqual(1);
    expect(getByText(/start ride/i)).toBeTruthy();
  });

  test('add snapshot for info', () => {
    const { container, asFragment } = render(ele);
    expect(asFragment(container)).toMatchSnapshot();
  });
});
