import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import './views/components/search-bar';

const app = new App({
  button: document.querySelector('.menu-icon'),
  drawer: document.querySelector('.menu-nav'),
  content: document.getElementById('mainContent'),
});

const hideDrawer = () => {
  const drawer = document.querySelector('.menu-nav');
  drawer.classList.remove('active');
};

const searchQuery = (query) => {
  app.renderSearch(query);
};

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  hideDrawer();
  await app.renderPage();
  swRegister();

  const url = window.location.hash;

  if (url === '#/explore' || url === '' || url === '#/home') {
    const searchButton = document.querySelector('search-bar');
    const restaurantsContainer = document.getElementById('restaurant-container');

    const onButtonSearchClicked = (e) => {
      e.preventDefault();
      restaurantsContainer.innerHTML = '';

      searchQuery(searchButton.value);
    };

    searchButton.clickEvent = onButtonSearchClicked;
  }
});
