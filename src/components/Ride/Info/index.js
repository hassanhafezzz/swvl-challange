import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import Modal from '../../common/Modal';
import RideForm from './RideForm';
import { Context } from '../../../store';
import { TRIP_IN_PROGRESS, TRIP_COMPLETED } from '../../../constants';
import { resetTrip } from '../../../store/actions';
import { ReactComponent as Star } from '../../../img/star.svg';
import { ReactComponent as Dollar } from '../../../img/dollar.svg';
import { ReactComponent as Pin } from '../../../img/pin.svg';

import { getFormattedDate, getFormattedTime } from '../../../utils';

import styles from './styles.module.css';

const cx = classNames.bind(styles);

const Info = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [state, dispatch] = useContext(Context);
  const { bookings, trip } = state;

  const shouldDisableStartButton =
    bookings.length <= 0 || trip.status === TRIP_IN_PROGRESS;

  return (
    <>
      <Modal title="Start ride ⚡" isOpen={isModalOpen} closeModal={closeModal}>
        <RideForm closeModalForm={closeModal} />
      </Modal>

      <section className={cx('container')} data-testid="info">
        <div className={cx('heading')}>
          <div>
            <h3 className={cx('title')}>
              Trip Information{' '}
              <span role="img" aria-label="bus">
                🚐
              </span>
            </h3>
            {trip.startedAt ? (
              <p className={cx('time')}>
                <span>{getFormattedDate(trip.startedAt)}, </span>
                <span>{getFormattedTime(trip.startedAt)}</span>
              </p>
            ) : null}
          </div>
          {trip.status === TRIP_COMPLETED ? (
            <Button
              variant={BUTTON_VARIANT.SECONDARY}
              onClick={() => {
                dispatch(resetTrip());
              }}
            >
              Reset
            </Button>
          ) : (
            <Button
              disabled={shouldDisableStartButton}
              variant={BUTTON_VARIANT.SECONDARY}
              onClick={openModal}
            >
              Start Ride
            </Button>
          )}
        </div>
        <div className={cx('widgets')}>
          <div className={cx('driver')}>
            <div className={cx('media')}>
              <img
                className={cx('driver-image')}
                src={trip.driver.image}
                alt={trip.driver.name}
              />
              <img
                className={cx('bus-image')}
                src={trip.driver.bus.image}
                alt="ford minibus"
              />
            </div>
            <div className={cx('body')}>
              <p className={cx('driver-name')}>
                {trip.driver.name}
                <span className={cx('rating-icon')}>
                  <Star title="star" /> {trip.driver.rating}
                </span>
              </p>
              <p className={cx('bus-type')}>
                {trip.driver.bus.model} - {trip.driver.bus.plate}
              </p>
            </div>
          </div>
          <div className={cx('route')}>
            <div className={cx('route-desc')}>
              <p>{trip.start}</p>
              <p>{trip.end}</p>
            </div>
          </div>
          <div className={cx('extra-info')}>
            <p>
              <Pin />
              Trip Distance: {trip.distance / 1000} KM
            </p>
            <p>
              <Dollar />
              Trip Base Fare: {trip.fare} EGP
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
