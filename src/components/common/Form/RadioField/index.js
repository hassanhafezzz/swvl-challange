import React from 'react';
import { useField } from 'formik';

import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const RadioField = ({ id, name, label, value, checked }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <div className={cx('wrapper')}>
      <input
        type="radio"
        id={id}
        name={name}
        onClick={() => {
          setValue(value);
        }}
        className={cx('radio')}
        checked={checked}
      />
      <label htmlFor={id} className={cx('label')}>
        {label}
      </label>
    </div>
  );
};

export default RadioField;
