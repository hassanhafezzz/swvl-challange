import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

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
      className={cx('media', {
        booked: status === 'booked',
        missed: status === 'missed',
        cancelled: status === 'cancelled',
        completed: status === 'completed',
      })}
    >
      <img className={cx('image')} src={img} alt={name} />
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
