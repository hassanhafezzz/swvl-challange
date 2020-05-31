import React, { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Button, { BUTTON_VARIANT } from '../Button';

const cx = classNames.bind(styles);
const modalRoot = document.getElementById('modal');

const Modal = memo(({ isOpen, title, closeModal, children }) => {
  const el = document.createElement('div');
  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const esc = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', esc, false);

    return () => {
      document.removeEventListener('keydown', esc, false);
    };
  }, [esc]);

  return (
    isOpen &&
    createPortal(
      <div data-testId="modal" className={cx('wrapper')}>
        <div className={cx('content')}>
          <div className={cx('header')}>
            {title ? <p className={cx('title')}>{title}</p> : null}
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
});

export default Modal;
