import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import { Context } from '../../store';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const BookingPerStationChart = () => {
  const [state] = useContext(Context);
  const { bookings, stations } = state;

  const stationsName = stations.map((station) => station.name);
  const counts = [];

  stationsName.forEach((station) => {
    let count = 0;
    bookings.forEach((booking) => {
      if (booking.pickupStation === station) {
        count += 1;
      }
    });
    counts.push(count);
  });

  const data = {
    labels: stationsName,
    datasets: [
      {
        label: 'bookings per station',
        data: counts,
        barThickness: 12,
        barPercentage: 0.5,
        backgroundColor: '#ff006e',
        borderColor: '#ff006e',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#222',
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontStyle: 'bold',
            precision: 0,
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
    },
  };

  return (
    <section className={cx('section')} data-testid="booking-per-station-chart">
      <h4 className={cx('section-header')}>
        Break down for customers&apos; booking per station
      </h4>
      <Bar data={data} options={options} />
    </section>
  );
};

export default BookingPerStationChart;
