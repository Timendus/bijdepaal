const paaldb   = require('../../services/paaldb');
const position = require('../../services/position');
const distance = require('../../services/distance');

module.exports = {
  render: async (id) => {
    try {
      let location = await paaldb.location(id);
      [location] = distance.haversine((await position.get()), [location]);
      console.log(location);
      return template(location);
    } catch(e) {
      throw e;
    }
  }
}

function template(location) {
  return `
    <header>
      <span class='left'><a class='back' href='#location-list'></a></span>
      <h1>${location.name}</h1>
    </header>

    <div class='location-details'>
      <p class='direction'>
        Afstand:
        <span class='distance'>${distance.human(location.distance)}</span>
        <span class='bearing' style='display: inline-block; transform: rotate(${location.bearing}deg)'>↑</span>
      </p>

      <ul class='maps'>
        <li><a href='https://maps.google.com/?q=${location.latitude},${location.longitude}' target='_blank'><img src='images/google-maps.png'/></a></li>
        <li><a href='https://maps.apple.com/?q=${location.latitude},${location.longitude}' target='_blank'><img src='images/apple-maps.png'/></a></li>
      </ul>

      ${ location.fireHazard ?
        `<p class='fire-hazard'>Brandrisico: ${location.fireHazard}</p>` : '' }

      <p>Deze locatie wordt vermeld door ${location.Mentions.map(m => m.Source.name).join(', ')}.</p>
    </div>
  `;
}
