// Calculate and format distances

module.exports = {

  simple: (pos, list) => {
    return list.map(l => {
      l.distance = Math.sqrt(
        Math.pow(l.latitude - pos.latitude, 2) +
        Math.pow(l.longitude - pos.longitude, 2)
      );
      return l;
    });
  },

  haversine: (pos, list) => {
    return list.map(l => {
      // Code from https://www.movable-type.co.uk/scripts/latlong.html

      const R = 6371e3; // Earth radius in metres

      const φ1 = toRadians(pos.latitude);
      const φ2 = toRadians(l.latitude);
      const λ1 = toRadians(pos.longitude);
      const λ2 = toRadians(l.longitude);
      const Δφ = toRadians(l.latitude-pos.latitude);
      const Δλ = toRadians(l.longitude-pos.longitude);

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;

      l.distance = d;

      const y = Math.sin(λ2-λ1) * Math.cos(φ2);
      const x = Math.cos(φ1)*Math.sin(φ2) -
                Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
      const brng = toDegrees(Math.atan2(y, x));

      l.bearing = brng;
      return l;
    });
  },

  human: dist => {
    if ( dist === undefined )
      return 'Onbekend';
    if ( dist > 10000 )
      return Math.round(dist / 1000) + ' km';
    if ( dist > 1000 )
      return Math.round(dist / 100) / 10 + ' km';
    return dist + ' m';
  }

}

function toRadians(deg) {
  return deg * Math.PI / 180;
}

function toDegrees(rad) {
  return rad * 180 / Math.PI;
}
