import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Avatar from '../../common/Avatar';
import Button from '../../common/Button';
import driver from '../../../img/driver.jpg';

const cx = classNames.bind(styles);

export default function Booking() {
  return (
    <>
      <div className={cx('heading')}>
        <h3 className={cx('title')}>
          Bookings{' '}
          <span role="img" aria-label="bus">
            🔖
          </span>
        </h3>
        <Button onClick={console.log('TODO')}>New Book</Button>
      </div>
      <div className={cx('wrapper')}>
        <Avatar img={driver} name="hi" tripsNumber={12} />
      </div>
    </>
  );
}
