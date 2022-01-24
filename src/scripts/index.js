import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import CONFIG from './globals/config';
import './views/components/search-bar';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

const app = new App({
  button: document.querySelector('.menu-icon'),
  drawer: document.querySelector('.menu-nav'),
  content: document.getElementById('mainContent'),
});

const hideDrawer = () => {
  const drawer = document.querySelector('.menu-nav');
  drawer.classList.remove('active');
}

const searchQuery = (query) => {
  app.renderSearch(query);
}

window.addEventListener('hashchange', () => {
  app.renderPage();
});

document.addEventListener('DOMContentLoaded', async () => {
  hideDrawer();
  await app.renderPage();
  swRegister();

  const searchButton = document.querySelector('search-bar'),
    restaurantsContainer = document.getElementById("restaurant-container");;

  const onButtonSearchClicked = (e) => {
    e.preventDefault();
    restaurantsContainer.innerHTML = '';

    searchQuery(searchButton.value);
  };

  searchButton.clickEvent = onButtonSearchClicked;
});