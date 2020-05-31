import React from 'react';
import { render } from '@testing-library/react';
import { BOOKING_STATUS } from '../../../constants';
import Avatar from './index';

const userMock = {
  id: 'e5da1a8f9b844d56a4a32cbaa590254e',
  name: 'Ahmed Ossama',
  tripsCount: 210,
  image:
    'https://scontent.fcai19-1.fna.fbcdn.net/v/t31.0-8/20424255_10159017225385401_82881391294765437_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=2KLOtnblWN0AX_7STbA&_nc_ht=scontent.fcai19-1.fna&oh=6b0200cf4b3f857ef5d363a4f119b073&oe=5EF3C80B',
  pickupStation: 'almaza',
  dropOffStation: 'city stars',
  paymentMethod: 'cash',
  status: BOOKING_STATUS.BOOKED,
};

test('it should display user avatar', () => {
  const { getByTestId, getByAltText } = render(<Avatar {...userMock} />);

  const user = getByTestId('user');
  expect(user).toHaveTextContent('Ahmed Ossama');
  expect(user).toHaveTextContent(BOOKING_STATUS.BOOKED);
  expect(user).toHaveTextContent(210);
  expect(user).toHaveTextContent('almaza');
  expect(user).toHaveTextContent('city stars');
  expect(getByAltText('Ahmed Ossama')).toBeTruthy();
});

test('add snapshot for user avatar', () => {
  const { container, asFragment } = render(<Avatar {...userMock} />);
  expect(asFragment(container)).toMatchSnapshot();
});
