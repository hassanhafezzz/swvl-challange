import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import { PAYMENT_METHODS } from '../../constants';
import { Context } from '../../store';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const BookingStatusChart = () => {
  const [state] = useContext(Context);
  const { bookings } = state;

  const labels = [PAYMENT_METHODS.CASH, PAYMENT_METHODS.CREDIT];
  const values = [0, 0];

  bookings.forEach((booking) => {
    const { paymentMethod } = booking;
    if (paymentMethod === PAYMENT_METHODS.CASH) {
      values[0] += 1;
    } else {
      values[1] += 1;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Payment methods',
        data: values,
        backgroundColor: ['#8300d5', '#ff006e'],
        borderColor: ['#8300d5', '#ff006e'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className={cx('section')}>
      <h4 className={cx('section-header')}>
        Break down for customers&apos; payment methods
      </h4>
      <Pie data={data} />
    </section>
  );
};

export default BookingStatusChart;
