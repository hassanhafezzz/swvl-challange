export const getFormattedDate = (date) => {
  return `${[date.getMonth() + 1, date.getDate(), date.getFullYear()].join(
    '/',
  )}`;
};

export const getFormattedTime = (date) => {
  return `${[date.getHours() % 12 || 12, date.getMinutes()].join(':')} ${
    date.getHours() >= 12 ? 'PM' : 'AM'
  }`;
};

export const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isLink = (link) => {
  // eslint-disable-next-line no-useless-escape
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(
    link,
  );
};
