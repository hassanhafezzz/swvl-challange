import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import Avatar from '../../common/Avatar';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import Modal from '../../common/Modal';
import UserForm from './UserForm';
import driver from '../../../img/driver.jpg';

const cx = classNames.bind(styles);

const Booking = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Modal
        title="Add a new booking 👨🏻‍💻"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <UserForm closeModalForm={closeModal} />
      </Modal>
      <div className={cx('heading')}>
        <h3 className={cx('title')}>
          Bookings{' '}
          <span role="img" aria-label="bus">
            🔖
          </span>
        </h3>
        <Button variant={BUTTON_VARIANT.PRIMARY} onClick={openModal}>
          New Book
        </Button>
      </div>
      <div className={cx('wrapper')}>
        <Avatar img={driver} name="hi" tripsNumber={12} />
      </div>
    </>
  );
};

export default Booking;
