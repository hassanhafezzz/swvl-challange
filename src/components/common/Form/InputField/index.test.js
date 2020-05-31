import React from 'react';
import { Formik } from 'formik';
import { render } from '@testing-library/react';

import InputField from './index';

const component = (
  <Formik>
    <InputField type="text" name="name" id="name" label="name" />
  </Formik>
);

test('input should have label', () => {
  const { getByLabelText } = render(component);
  const input = getByLabelText('name');
  expect(input).toBeTruthy();
});

test('input snapshot', () => {
  const { container, asFragment } = render(component);
  expect(asFragment(container)).toMatchSnapshot();
});
