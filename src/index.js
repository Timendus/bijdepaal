import Thimbleful from 'thimbleful';
const router = new Thimbleful.Router();

let appCache;
function app() {
  if ( appCache ) return appCache;
  return appCache = document.getElementById('app');
}

router.addRoute('location-list', async (a, b, e) => {
  const list = require('./components/location/list');
  app().innerHTML = await list.render();
});

router.addRoute(/location\-details\/(.+)/, async (route, matches) => {
  const details = require('./components/location/details');
  app().innerHTML = await details.render(matches[1]);
});

window.addEventListener('load', () => {
  if ( !window.location.hash )
    window.location.hash = 'location-list';
});
