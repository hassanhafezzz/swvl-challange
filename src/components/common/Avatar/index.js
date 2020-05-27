import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export default function Header({
  img,
  name,
  tripsCount,
  pickupStation,
  dropOffStation,
}) {
  return (
    <div className={cx('media')}>
      <img className={cx('image')} src={img} alt={name} />
      <div className={cx('body')}>
        <p className={cx('title')}>{name}</p>
        <p>
          <b>trips</b> {tripsCount}
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
