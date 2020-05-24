import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);
export default function Loader() {
  return (
    <div className={cx('loader')}>
      <i className={cx('wheel')} />
    </div>
  );
}
