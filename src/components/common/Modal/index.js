import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Button, { BUTTON_VARIANT } from '../Button';

const cx = classNames.bind(styles);
const modalRoot = document.getElementById('modal');

const Modal = ({ isOpen, title, closeModal, action, actionText, children }) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const handleClick = () => {
    action();
    closeModal();
  };

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
          <hr className={cx('divider')} />
          <div className={cx('actions')}>
            <Button
              variant={BUTTON_VARIANT.NEUTRAL}
              onClick={closeModal}
              type="button"
            >
              close
            </Button>
            <Button
              variant={BUTTON_VARIANT.PRIMARY}
              onClick={handleClick}
              type="button"
            >
              {actionText}
            </Button>
          </div>
        </div>
      </div>,
      el,
    )
  );
};

export default Modal;
