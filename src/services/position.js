// Promise-ify geolocation API and add caching with reset

const storage = require('./storage');
const storageKey = 'geolocation';

module.exports = {
  available: () => !!navigator.geolocation,

  get: async () => {
    let location = storage.get(storageKey);
    if ( location ) return JSON.parse(location);

    try {
      location = await geolocation();
    } catch(e) {
      throw e;
    }

    location = {
      timestamp: location.timestamp,
      latitude:  location.coords.latitude,
      longitude: location.coords.longitude,
      altitude:  location.coords.altitude,
    };

    storage.store(storageKey, JSON.stringify(location));
    return location;
  },

  reset: () => {
    storage.store(storageKey, null);
  }
}

function geolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(pos => {
      resolve(pos);
    }, err => {
      reject(err);
    });
  });
}
