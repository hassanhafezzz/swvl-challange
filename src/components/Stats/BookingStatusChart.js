import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import { BOOKING_STATUS } from '../../constants';
import { Context } from '../../store';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const BookingStatusChart = () => {
  const [state] = useContext(Context);
  const { bookings } = state;

  const { COMPLETED, MISSED, CANCELLED } = BOOKING_STATUS;
  const bookingData = { [COMPLETED]: 0, [MISSED]: 0, [CANCELLED]: 0 };

  bookings.forEach((booking) => {
    const { status } = booking;
    bookingData[status] += 1;
  });

  const labels = Object.keys(bookingData);
  const values = Object.values(bookingData);

  const data = {
    labels,
    datasets: [
      {
        label: 'Booking Status',
        data: values,
        backgroundColor: ['#00c785', '#ffbe0b', '#ff006e'],
        borderColor: ['#00c785', '#ffbe0b', '#ff006e'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className={cx('section')} data-testid="booking-status-chart">
      <h4 className={cx('section-header')}>
        Break down for customers&apos; status for the trip
      </h4>
      <Doughnut data={data} />
    </section>
  );
};

export default BookingStatusChart;
