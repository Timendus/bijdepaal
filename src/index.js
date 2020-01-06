import Thimbleful from 'thimbleful';
const router = new Thimbleful.Router();

router.addRoute('location-list', async (a, b, e) => {
  try {
    const list = require('./components/location/list');
    document.getElementById('app').innerHTML = await list.render();
  } catch(e) {
    showError(e);
  }
});

router.addRoute(/location\-details\/(.+)/, async (route, matches) => {
  try {
    const details = require('./components/location/details');
    document.getElementById('app').innerHTML = await details.render(matches[1]);
  } catch(e) {
    showError(e);
  }
});

window.addEventListener('load', () => {
  if ( !window.location.hash )
    window.location.hash = 'location-list';
});

function showError(e) {
  const error = document.getElementById('error');
  error.innerHTML = e;
  error.classList.add('active');
}
