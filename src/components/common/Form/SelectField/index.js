import React from 'react';
import { useField } from 'formik';

import classNames from 'classnames/bind';
import styles from './styles.module.css';

const cx = classNames.bind(styles);

const SelectField = ({ id, name, label, children }) => {
  const [field, meta] = useField(name);

  return (
    <>
      <label
        htmlFor={id}
        className={cx('label', meta.error && meta.touched ? 'label-error' : '')}
      >
        {label}
      </label>

      <select
        {...field}
        id={id}
        name={name}
        className={cx(
          'select',
          meta.error && meta.touched ? 'error-field' : null,
        )}
      >
        {children}
      </select>

      {meta.error && meta.touched ? (
        <p className={cx('error')}>{meta.error}</p>
      ) : null}
    </>
  );
};

export default SelectField;
