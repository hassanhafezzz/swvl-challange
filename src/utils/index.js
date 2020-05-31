export const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
};

export const getFormattedDate = (d) => {
  if (!d) {
    return null;
  }
  const date = new Date(d);
  if (!isValidDate(date)) {
    return null;
  }
  return `${[date.getMonth() + 1, date.getDate(), date.getFullYear()].join(
    '/',
  )}`;
};

export const getFormattedTime = (d) => {
  if (!d) {
    return null;
  }
  const date = new Date(d);
  if (!isValidDate(date)) {
    return null;
  }
  const hours = date.getHours() % 12 || 12;
  const mins = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
  return `${[hours, mins].join(':')} ${hours >= 12 ? 'AM' : 'PM'}`;
};

export const getEta = (time, eta) => {
  if (!time) {
    return '';
  }
  const startDate = new Date(time);
  if (!isValidDate(startDate)) {
    return '';
  }
  if (!eta && eta !== 0) {
    return getFormattedTime(startDate);
  }

  const etaDate = new Date(startDate.getTime() + eta);
  return getFormattedTime(etaDate);
};

export const getRandomArbitrary = (min, max) => {
  if ((!min && min !== 0) || (!max && max !== 0)) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isLink = (link) => {
  // eslint-disable-next-line no-useless-escape
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(
    link,
  );
};

export const calcFullDistance = (directions) => {
  if (!directions) {
    return null;
  }
  const { legs } = directions.routes[0];
  return legs.reduce((acc, leg) => acc + leg.distance.value, 0);
};

export const getVisitedStations = (stations = [], distance) => {
  return stations.filter((station) => station.distance <= distance);
};
