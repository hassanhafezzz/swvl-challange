import React from 'react';
import classNames from 'classnames/bind';
import Loader from '../Loader';
import styles from './styles.module.css';

const cx = classNames.bind(styles);
export default function Button({
  children,
  onClick,
  loading,
  disabled,
  type,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={cx('button')}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
      {loading ? <Loader /> : null}
    </button>
  );
}
