import React from 'react';
import { Formik } from 'formik';
import { render } from '@testing-library/react';

import SelectField from './index';

const component = (
  <Formik>
    <SelectField name="station" id="station" label="station">
      <option disabled defaultValue label="Please select a pick up station" />
      <option value="ahmed oraby" label="ahmed oraby" />
      <option value="almaza" label="almaza" />
    </SelectField>
  </Formik>
);

test('input should have label', () => {
  const { getByLabelText } = render(component);
  const input = getByLabelText('station');
  expect(input).toBeTruthy();
});

test('input snapshot', () => {
  const { container, asFragment } = render(component);
  expect(asFragment(container)).toMatchSnapshot();
});
