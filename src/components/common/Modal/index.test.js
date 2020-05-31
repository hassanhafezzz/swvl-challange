import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal from './index';

describe('Modal tests', () => {
  test('modal shows the children and have a title', () => {
    const { getByText } = render(
      <Modal title="title" isOpen>
        <div>testing</div>
      </Modal>,
    );
    const title = getByText('title');
    expect(getByText('testing')).toBeTruthy();
    expect(title).toBeInTheDocument();
  });

  test('modal has a close button', () => {
    const handleClose = jest.fn();
    const { getByLabelText } = render(
      <Modal title="title" isOpen closeModal={handleClose}>
        <div>testing</div>
      </Modal>,
    );

    fireEvent.click(getByLabelText(/close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
