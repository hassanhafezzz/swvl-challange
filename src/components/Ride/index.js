import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Map from './Map';
import Info from './Info';
import Booking from './Booking';

const cx = classNames.bind(styles);

export default function Ride() {
  return (
    <>
      <Map />
      <div className={cx('container')}>
        <Info />
        <hr className={cx('divider')} />
        <Booking />
      </div>
    </>
  );
}
