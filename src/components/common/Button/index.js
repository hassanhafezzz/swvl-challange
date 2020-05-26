import React from 'react';
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
  onClick,
  loading,
  disabled,
  className,
  variant,
  ...rest
}) {
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
