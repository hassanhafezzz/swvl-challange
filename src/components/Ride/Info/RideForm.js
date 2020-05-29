import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import {
  LATENCY_EARLY,
  LATENCY_ON_TIME,
  LATENCY_LATE,
} from '../../../constants';

import { startTrip } from '../../../store/actions';
import { Context } from '../../../store';
import InputField from '../../common/Form/InputField';
import SelectField from '../../common/Form/SelectField';
import Button, { BUTTON_VARIANT } from '../../common/Button';

const cx = classNames.bind(styles);

const RideForm = ({ closeModalForm }) => {
  const initialValues = {
    duration: 3,
    latency: LATENCY_ON_TIME,
  };

  const [_, dispatch] = useContext(Context);

  const onSubmit = (values) => {
    let { duration } = values;
    const { latency } = values;

    switch (latency) {
      case LATENCY_EARLY:
        duration -= 0.5;
        break;
      case LATENCY_LATE:
        duration += 0.5;
        break;
      default:
        break;
    }
    dispatch(startTrip(duration));
    closeModalForm();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.duration) {
      errors.duration = 'What is the expected time for the trip?';
    }

    if (!values.latency) {
      errors.latency = 'Is the driver running late?';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form>
          <InputField
            type="number"
            name="duration"
            id="duration"
            label="Trip duration in minutes"
          />
          <SelectField name="latency" id="latency" label="Expected latency">
            <option disabled selected label="Is the driver running late?" />
            <option label="arriving early" value={LATENCY_EARLY} />
            <option label="arriving on time" value={LATENCY_ON_TIME} />
            <option label="arriving late" value={LATENCY_LATE} />
          </SelectField>

          <Button
            className={cx('start-button')}
            variant={BUTTON_VARIANT.SECONDARY}
            disabled={!isValid}
            type="submit"
          >
            Yalla
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RideForm;
