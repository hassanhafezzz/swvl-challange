import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.css';
import { Context } from '../../../store';
import { fillBookings } from '../../../store/actions';
import Avatar from '../../common/Avatar';
import Button, { BUTTON_VARIANT } from '../../common/Button';
import Modal from '../../common/Modal';
import UserForm from './UserForm';

const cx = classNames.bind(styles);

const Booking = () => {
  const [state, dispatch] = useContext(Context);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const renderBooking = ({
    id,
    name,
    status,
    image,
    tripsCount,
    pickupStation,
    dropOffStation,
  }) => (
    <Avatar
      key={id}
      img={image}
      name={name}
      status={status}
      tripsCount={tripsCount}
      pickupStation={pickupStation}
      dropOffStation={dropOffStation}
    />
  );

  const { bookings } = state;
  const shouldDisableAddButton = bookings.length >= 12;

  return (
    <>
      <Modal
        title="Add a new booking 👨🏻‍💻"
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <UserForm closeModalForm={closeModal} />
      </Modal>
      <section className={cx('container')} data-testid="booking">
        <div className={cx('heading')}>
          <h3 className={cx('title')}>
            Bookings{' '}
            <span role="img" aria-label="bus">
              🔖
            </span>
          </h3>
          <Button
            disabled={shouldDisableAddButton}
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={openModal}
          >
            New Book
          </Button>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className={cx('wrapper')}>{bookings.map(renderBooking)}</div>
        ) : (
          <div className={cx('fill-bookings-container')}>
            <p>
              <span role="img" aria-label="sparks">
                ✨
              </span>
              Or just fill all 12 spots at once{' '}
              <span role="img" aria-label="sparks">
                ✨
              </span>
            </p>
            <Button
              variant={BUTTON_VARIANT.PRIMARY}
              onClick={() => dispatch(fillBookings())}
            >
              fill all
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default Booking;
