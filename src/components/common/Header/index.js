import React from 'react';
import classNames from 'classnames/bind';
import logo from '../../../img/logo.png';
import styles from './styles.module.css';

const cx = classNames.bind(styles);
export default function Header() {
  return (
    <header className={cx('header')}>
      <h1 className={cx('brand')}>
        <a href="/">
          <span className={cx('visually-hidden')}>swvl</span>
          <img src={logo} className={cx('logo')} alt="swvl logo" />
        </a>
      </h1>
    </header>
  );
}
