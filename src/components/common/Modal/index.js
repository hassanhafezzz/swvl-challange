import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Button, { BUTTON_VARIANT } from '../Button';

const cx = classNames.bind(styles);
const modalRoot = document.getElementById('modal');

const Modal = ({ isOpen, title, closeModal, children }) => {
  const el = document.createElement('div');

  const esc = (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  useEffect(() => {
    document.addEventListener('keydown', esc, false);

    return () => {
      document.removeEventListener('keydown', esc, false);
    };
  }, []);

  return (
    isOpen &&
    createPortal(
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <div className={cx('header')}>
            <p className={cx('title')}>{title}</p>
            <Button
              onClick={closeModal}
              className={cx('close-icon')}
              variant={BUTTON_VARIANT.ICON}
              type="button"
              aria-label="close modal"
            />
          </div>
          {children}
        </div>
      </div>,
      el,
    )
  );
};

export default Modal;
