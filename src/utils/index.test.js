import {
  isValidDate,
  getFormattedDate,
  getFormattedTime,
  getEta,
  getRandomArbitrary,
  isLink,
  calcFullDistance,
  getVisitedStations,
} from './index';

const dateMock = new Date('2020-05-31T03:11:10.045Z');
const invalidDateMock = new Date('2020-15-31T03:11:10.045Z');
const stationsMock = [
  {
    id: 1,
    name: 'almaza',
    lat: 29.99509712,
    lng: 31.4459768,
    distance: 0,
  },
  {
    name: 'city stars',
    id: 2,
    lat: 30.01288023,
    lng: 31.43102269,
    distance: 1500,
  },
  {
    name: 'hadekt el tafl',
    id: 3,
    lat: 30.01642345,
    lng: 31.43356512,
    distance: 3300,
  },
  {
    name: 'mostafa el nahas',
    id: 4,
    lat: 30.01637555,
    lng: 31.39839364,
    distance: 10000,
  },
];
const directionsMock = {
  routes: [
    {
      legs: [
        {
          distance: {
            text: '3.5 km',
            value: 3480,
          },
          duration: {
            text: '6 mins',
            value: 338,
          },
        },
        {
          distance: {
            text: '0.6 km',
            value: 550,
          },
          duration: {
            text: '2 mins',
            value: 104,
          },
        },
        {
          distance: {
            text: '0.6 km',
            value: 550,
          },
          duration: {
            text: '2 mins',
            value: 104,
          },
        },
      ],
    },
  ],
};
describe('utils tests', () => {
  it('should check if date is valid', () => {
    expect(isValidDate(dateMock)).toEqual(true);
    expect(isValidDate(invalidDateMock)).toEqual(false);
  });

  it('should form date and return days month and year', () => {
    expect(getFormattedDate()).toBeFalsy();
    expect(getFormattedDate('')).toBeFalsy();
    expect(getFormattedDate(invalidDateMock)).toBeFalsy();
    expect(getFormattedDate(dateMock)).toEqual('5/31/2020');
  });

  it('should form date to hours: minutes', () => {
    expect(getFormattedTime()).toBeFalsy();
    expect(getFormattedTime('')).toBeFalsy();
    expect(getFormattedTime(invalidDateMock)).toBeFalsy();
    expect(getFormattedTime(dateMock)).toEqual('5:11 PM');
  });

  it('should get etas formated right based on date and accumulator in MS', () => {
    // 10 mins in Ms
    const eta = 6e5;
    expect(getFormattedTime(dateMock)).toEqual('5:11 PM');

    expect(getEta()).toBeFalsy();
    expect(getEta('')).toBeFalsy();
    expect(getEta(invalidDateMock)).toBeFalsy();
    expect(getEta(dateMock)).toEqual('5:11 PM');
    expect(getEta(dateMock, 0)).toEqual('5:11 PM');
    // add 10 mins
    expect(getEta(dateMock, eta)).toEqual('5:21 PM');
  });

  it('should return random number between two number', () => {
    const firstNumber = 5;
    const secondNumber = 10;
    expect(getRandomArbitrary()).toBeFalsy();
    expect(getRandomArbitrary('')).toBeFalsy();
    expect(
      getRandomArbitrary(firstNumber, secondNumber),
    ).toBeGreaterThanOrEqual(firstNumber);
    expect(getRandomArbitrary(firstNumber, secondNumber)).toBeLessThanOrEqual(
      secondNumber,
    );
  });

  it('should validate a link', () => {
    expect(isLink()).toBeFalsy();
    expect(isLink('https://www.google.com')).toEqual(true);
    expect(isLink('http://www.google.com')).toEqual(true);
    expect(isLink('www.google.com')).toEqual(true);
    expect(isLink('google.com')).toEqual(true);
    expect(isLink('sdsadasdasdsd')).toBeFalsy();
    expect(isLink(123)).toBeFalsy();
  });

  it('should calculate full distance between 2 points from direction object', () => {
    // sum of directions distances
    const expectedDistance = 4580;
    expect(calcFullDistance()).toBeFalsy();
    expect(calcFullDistance(directionsMock)).toEqual(expectedDistance);
  });

  it('should return all visited stations based on the current distance', () => {
    expect(getVisitedStations().length).toEqual(0);
    expect(getVisitedStations(stationsMock, 0).length).toEqual(1);
    expect(getVisitedStations(stationsMock, 1600).length).toEqual(2);
    expect(getVisitedStations(stationsMock, 4000).length).toEqual(3);
  });
});
