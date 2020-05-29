import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import classNames from 'classnames/bind';
import { addBooking } from '../../../store/actions';
import { Context } from '../../../store';
import styles from './styles.module.css';
import InputField from '../../common/Form/InputField';
import SelectField from '../../common/Form/SelectField';
import RadioField from '../../common/Form/RadioField';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import usersMock from '../../../data/users';
import { isLink } from '../../../utils';
import route from '../../../data/route';

const cx = classNames.bind(styles);

const stations = route.map((point) => point.name);

const UserForm = ({ closeModalForm }) => {
  const user = usersMock[Math.floor(Math.random() * usersMock.length)];

  const initialValues = {
    id: user.id,
    name: user.name,
    image: user.image,
    tripsCount: user.trips_count,
    pickupStation: '',
    dropOffStation: '',
    paymentMethod: 'cash',
  };

  const [_, dispatch] = useContext(Context);

  const onSubmit = (values) => {
    dispatch(addBooking(values));
    closeModalForm();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Who is booking the ticket?';
    }

    if (!values.pickupStation) {
      errors.pickupStation = 'Where should we pick him?';
    }

    if (!values.dropOffStation) {
      errors.dropOffStation = 'Where should we drop him to?';
    }

    if (!values.image) {
      errors.image = 'If you could provide an image that would be great';
    } else if (!isLink(values.image)) {
      errors.image = "That's not a valid link";
    }

    return errors;
  };

  const pickupStations = stations.filter((s, i) => i !== stations.length - 1);

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
    >
      {({ isValid, values, setFieldValue }) => {
        const dropOffStations = stations.slice(
          stations.indexOf(values.pickupStation) + 1,
        );

        return (
          <Form>
            <InputField type="text" name="name" id="name" label="name" />
            <InputField type="url" name="image" id="image" label="image" />

            <SelectField
              name="pickupStation"
              id="pickupStation"
              label="pick up station"
              onChange={(e) => {
                setFieldValue('pickupStation', e.target.value);
                setFieldValue('dropOffStation', '');
              }}
            >
              <option
                disabled
                selected
                label="Please select a pick up station"
              />
              {pickupStations.map((station) => (
                <option key={station} value={station} label={station} />
              ))}
            </SelectField>

            <SelectField
              name="dropOffStation"
              id="dropOffStation"
              label="drop off station"
            >
              <option disabled selected label="Please select a drop off" />
              {dropOffStations.map((station) => (
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
        );
      }}
    </Formik>
  );
};

export default UserForm;
