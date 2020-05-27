import React from 'react';
import { Formik, Form } from 'formik';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import InputField from '../../common/Form/InputField';
import SelectField from '../../common/Form/SelectField';
import RadioField from '../../common/Form/RadioField';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import usersMock from '../../../data/users';
import routes from '../../../data/routes';

const cx = classNames.bind(styles);

const UserForm = ({ closeModalForm }) => {
  const user = usersMock[Math.floor(Math.random() * usersMock.length)];
  const stations = routes.map((route) => route.stationName);

  const initialValues = {
    name: user.name,
    image: user.image,
    station: '',
    paymentMethod: 'cash',
  };

  const onSubmit = (values) => {
    console.log(values);
    closeModalForm();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Who is booking the ticket?';
    }

    if (!values.station) {
      errors.station = 'Where should we pick him?';
    }

    if (!values.image) {
      errors.image = 'If you could provide an image that would be great';
    } else if (
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(
        values.image,
      )
    ) {
      errors.image = "That's not a valid link";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, values }) => (
        <Form>
          <InputField type="text" name="name" id="name" label="name" />

          <InputField type="url" name="image" id="image" label="image" />

          <SelectField name="station" id="station" label="station">
            <option disabled selected label="Please select a station" />
            {stations.map((station) => (
              <option key={station} value={station} label={station} />
            ))}
          </SelectField>

          <p className={cx('form-label')}>payment method</p>
          <RadioField
            label="cash"
            name="paymentMethod"
            id="cash"
            checked={values.paymentMethod === 'cash'}
            value="cash"
          />
          <RadioField
            label="credit"
            name="paymentMethod"
            id="credit"
            checked={values.paymentMethod === 'credit'}
            value="credit"
          />
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            disabled={!isValid}
            type="submit"
          >
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
