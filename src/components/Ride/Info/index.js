import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import Modal from '../../common/Modal';
import { Context } from '../../../store';
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

  const [state] = useContext(Context);
  const { trip } = state;

  const now = new Date();
  return (
    <>
      <Modal title="Start ride ⚡" isOpen={isModalOpen} closeModal={closeModal}>
        placeholder for form
      </Modal>

      <div className={cx('container')}>
        <div className={cx('heading')}>
          <div>
            <h3 className={cx('title')}>
              Trip Information{' '}
              <span role="img" aria-label="bus">
                🚐
              </span>
            </h3>
            <p className={cx('time')}>
              <span>{getFormattedDate(now)}, </span>
              <span>{getFormattedTime(now)}</span>
            </p>
          </div>

          <Button variant={BUTTON_VARIANT.SECONDARY} onClick={openModal}>
            Start Ride
          </Button>
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
              Trip Distance: {trip.distance}
            </p>
            <p>
              <Dollar />
              Trip Base Fare: {trip.fare}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
