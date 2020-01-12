const storage    = require('./storage');
const distance   = require('./distance');
const storageKey = 'locations';
const timingKey  = 'locationTimestamp';

const cacheInvalidation = 10 * 60 * 1000; // 10 minutes
const paaldbUrl = "http://paaldb.timendus.com/api";

module.exports = {
  allLocations: () => locations(),
  location:     id => paalFetch(`${paaldbUrl}/locations/${id}`),
  getNearest:   async (latitude, longitude, num) => {
    let list;
    try {
      list = await locations();
    } catch(e) {
      throw e;
    }

    return distance.haversine({ latitude, longitude }, list)
                   .sort((l1, l2) => l1.distance - l2.distance)
                   .slice(0, num);
  }
}

// Get locations from cache, or from network if stale
// (should probably be handled by service worker)
async function locations() {
  let timestamp = storage.get(timingKey);
  let locations = storage.get(storageKey);
  if ( locations ) locations = JSON.parse(locations);
  if ( !locations || timestamp < (new Date() - cacheInvalidation) ) {
    try {
      locations = await paalFetch(`${paaldbUrl}/locations`);
    } catch(e) {
      throw e;
    }
    storage.store(storageKey, JSON.stringify(locations));
    storage.store(timingKey, 1*new Date());
  }
  return locations;
}

// Fetch locations from PaalDB
async function paalFetch(url) {
  try {
    const request = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if ( request.ok ) return await request.json();
    throw `PaalDB returned error status: ${request.status}`;
  } catch(e) {
    throw `Could not reach PaalDB: ${e}`;
  }
}
