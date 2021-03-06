const paaldb   = require('../../services/paaldb');
const position = require('../../services/position');
const distance = require('../../services/distance');

module.exports = {
  render: async () => {
    try {
      let list;
      if ( position.available() ) {
        const pos  = await position.get();
        list = await paaldb.getNearest(pos.latitude, pos.longitude, 15);
      } else {
        list = (await paaldb.allLocations()).slice(0,10);
      }
      return template(list);
    } catch(e) {
      throw e;
    }
  }
}

function template(list) {
  return `
    <header>
      <!--<span class='left'>Logo hier</span>-->
      <h1>Bij de Paal</h1>
    </header>

    <ul class='location-list'>
      ${
        list.length > 0 ? list.map(l => `
          <li>
            <a href='#location/${l.id}'>
              <span class='name'>${l.name}</span>
              ${
                l.distance && l.bearing ? `
                  <span class='direction'>
                    <span class='distance'>${distance.human(l.distance)}</span>
                    <span class='bearing' style='display: inline-block; transform: rotate(${l.bearing}deg)'>↑</span>
                  </span>
                ` : ''
              }
            </a>
          </li>
        `).join('') : `<li>Empty</li>`
      }
    </ul>
  `;
}
