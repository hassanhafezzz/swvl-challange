import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export default function Header({ img, name, tripsNumber }) {
  return (
    <div className={cx('media')}>
      <img className={cx('image')} src={img} alt={name} />
      <div className={cx('body')}>
        <p className={cx('title')}>{name}</p>
        <p>{tripsNumber} Checked In</p>
      </div>
    </div>
  );
}
