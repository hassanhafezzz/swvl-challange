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
