import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Loader from '../Loader';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

export const BUTTON_VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  ICON: 'icon',
};

export default function Button({
  children,
  to,
  onClick,
  loading,
  disabled,
  className,
  variant,
  ...rest
}) {
  if (to) {
    return (
      <Link
        to={to}
        className={cx('button', variant, className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={cx('button', variant, className)}
      disabled={disabled}
      type="button"
      {...rest}
    >
      {children}
      {loading ? <Loader /> : null}
    </button>
  );
}
