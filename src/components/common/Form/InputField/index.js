import React from 'react';
import { useField } from 'formik';

import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const InputField = ({ id, name, type, label }) => {
  const [field, meta] = useField(name);
  return (
    <>
      <label
        htmlFor={id}
        className={cx('label', meta.error && meta.touched ? 'label-error' : '')}
      >
        {label}
      </label>

      <input
        {...field}
        id={id}
        name={name}
        type={type}
        className={cx(
          'input',
          meta.error && meta.touched ? 'error-field' : null,
        )}
      />

      {meta.error && meta.touched ? (
        <p className={cx('error')}>{meta.error}</p>
      ) : null}
    </>
  );
};

export default InputField;
