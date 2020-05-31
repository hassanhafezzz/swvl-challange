import React from 'react';
import { Formik } from 'formik';
import { render } from '@testing-library/react';

import RadioField from './index';

const component = (
  <Formik>
    <RadioField label="cash" name="paymentMethod" id="cash" value="cash" />
  </Formik>
);

test('input should have label', () => {
  const { getByLabelText } = render(component);
  const input = getByLabelText('cash');
  expect(input).toBeTruthy();
});

test('input snapshot', () => {
  const { container, asFragment } = render(component);
  expect(asFragment(container)).toMatchSnapshot();
});
