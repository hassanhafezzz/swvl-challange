import React from 'react';
import classNames from 'classnames/bind';
import BookingPerStationChart from './BookingPerStationChart';
import BookingStatusChart from './BookingStatusChart';
import PaymentMethodChart from './PaymentMethodChart';
import Button, { BUTTON_VARIANT } from '../common/Button';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export default function Stats() {
  return (
    <div className={cx('container')} data-testid="stats">
      <div className={cx('heading')}>
        <div>
          <h3 className={cx('title')}>
            Trip Statistics{' '}
            <span role="img" aria-label="stats">
              📊
            </span>
          </h3>
        </div>
        <Button variant={BUTTON_VARIANT.SECONDARY} to="/">
          go back
        </Button>
      </div>

      <hr className={cx('divider')} />
      <div className={cx('wrapper')}>
        <BookingPerStationChart />
        <hr className={cx('divider', 'large')} />
        <BookingStatusChart />
        <hr className={cx('divider', 'large')} />
        <PaymentMethodChart />
      </div>
    </div>
  );
}
