import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import Button from './index';

test('button should have a text', () => {
  const text = 'click me';
  const { container } = render(<Button>{text}</Button>);
  expect(container).toHaveTextContent(text);
});

test('button is a link', () => {
  const text = 'click me';
  const { getByText } = render(
    <Router>
      <Button to="/">{text}</Button>
    </Router>,
  );
  const link = getByText(text);
  expect(link).toHaveAttribute('href', '/');
});

test('button is disabled', () => {
  const text = 'click me';
  const { getByText } = render(<Button disabled>{text}</Button>);
  expect(getByText(text)).toBeDisabled();
});

test('button action is fired', () => {
  const text = 'click me';
  const action = jest.fn();
  const { getByText } = render(<Button onClick={action}>{text}</Button>);
  const button = getByText(text);
  fireEvent.click(button);
  expect(action).toHaveBeenCalledTimes(1);
});

test('button snapshot', () => {
  const text = 'click me';
  const { container, asFragment } = render(<Button>{text}</Button>);
  expect(asFragment(container)).toMatchSnapshot();
});
