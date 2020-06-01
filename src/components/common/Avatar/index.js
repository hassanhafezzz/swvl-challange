import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { BOOKING_STATUS } from '../../../constants';

const cx = classNames.bind(styles);

export default function Avatar({
  img,
  name,
  status,
  tripsCount,
  pickupStation,
  dropOffStation,
}) {
  return (
    <div
      data-testid="user"
      className={cx('media', {
        booked: status === BOOKING_STATUS.BOOKED,
        missed: status === BOOKING_STATUS.MISSED,
        cancelled: status === BOOKING_STATUS.CANCELLED,
        completed: status === BOOKING_STATUS.COMPLETED,
      })}
    >
      <img className={cx('image')} src={img} alt={name} loading="lazy" />
      <div className={cx('body')}>
        <p className={cx('title')}>{name}</p>
        <p>
          <b>Status</b> {status}
        </p>
        <p>
          <b>Trips</b> {tripsCount}
        </p>
        <p>
          <b>From</b> {pickupStation}
        </p>
        <p>
          <b>To</b> {dropOffStation}
        </p>
      </div>
    </div>
  );
}
