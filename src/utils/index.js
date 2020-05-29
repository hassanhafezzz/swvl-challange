export const getFormattedDate = (d) => {
  if (!d) {
    return null;
  }
  const date = new Date(d);
  return `${[date.getMonth() + 1, date.getDate(), date.getFullYear()].join(
    '/',
  )}`;
};

export const getFormattedTime = (d) => {
  if (!d) {
    return null;
  }
  const date = new Date(d);
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

export const computeDistanceBetween = (from, to) => {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(from.lat, from.lng),
    new window.google.maps.LatLng(to.lat, to.lng),
  );
};

export const computeRouteDistancesAndETAs = (route, fullDistance, duration) => {
  const speed = fullDistance / (duration * 60);
  const from = {
    lat: route[0].lat,
    lng: route[0].lng,
  };

  const computedRoute = route.map((coord) => {
    const to = {
      lat: coord.lat,
      lng: coord.lng,
    };

    const distance = computeDistanceBetween(from, to);
    const eta = distance / speed;

    return { ...coord, distance, eta };
  });

  return computedRoute;
};

export const formatETA = (eta) => {
  const time = Math.floor(eta);
  if (time >= 60) {
    return `${Math.floor(time / 60)} min`;
  }
  return `${time} sec`;
};
