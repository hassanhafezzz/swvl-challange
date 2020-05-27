import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import Modal from '../../common/Modal';
import { ReactComponent as Star } from '../../../img/star.svg';
import { ReactComponent as Dollar } from '../../../img/dollar.svg';
import { ReactComponent as Pin } from '../../../img/pin.svg';
import driver from '../../../img/driver.jpg';
import bus from '../../../img/ford-bus.png';

import { getFormattedDate, getFormattedTime } from '../../../utils';

import styles from './styles.module.css';

const cx = classNames.bind(styles);

const Info = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

          <Button variant={BUTTON_VARIANT.PRIMARY} onClick={openModal}>
            Start Ride
          </Button>
        </div>
        <div className={cx('widgets')}>
          <div className={cx('driver')}>
            <div className={cx('media')}>
              <img
                className={cx('driver-image')}
                src={driver}
                alt="driver saaid"
              />
              <img className={cx('bus-image')} src={bus} alt="ford minibus" />
            </div>
            <div className={cx('body')}>
              <p className={cx('driver-name')}>
                Herbert Patton
                <span className={cx('rating-icon')}>
                  <Star title="star" /> 5.0
                </span>
              </p>
              <p className={cx('bus-type')}>Ford Transit - GA 213</p>
            </div>
          </div>
          <div className={cx('route')}>
            <div className={cx('route-desc')}>
              <p>Almaza</p>
              <p>Talat harb axis</p>
            </div>
          </div>
          <div className={cx('extra-info')}>
            <p>
              <Pin />
              Trip Distance: 23 KM
            </p>
            <p>
              <Dollar />
              Trip Base Fare: 45 EGP
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
