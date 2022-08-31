import RestarantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
      <div class="hero-container">
        <picture>
          <source class="hero-img" media="(max-width: 600px)" srcset="./images/hero-image-small.jpg">
          <img src='./images/hero-image-large.jpg'
            class="hero-img"
            width="450" 
            alt="Hero Image">
        </picture>
        <a href="#/explore"
          >EXPLORE <i class="fas fa-angle-double-down arrow-explore"></i
        ></a>
      </div>

      <h2 id="/explore" class="restaurant-title">Eksplor Restoran</h2>
      <search-bar></search-bar>
      <section id="restaurant-container"></section>
    `;
  },

  async afterRender() {
    const restaurants = await RestarantDbSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#restaurant-container');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },

  async refreshSearch(query) {
    const restaurants = await RestarantDbSource.search(query);
    const restaurantsContainer = document.querySelector('#restaurant-container');
    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = `<h3 style="text-align: center"><span style="color: red">${query}</span> tidak ada dalam daftar pencarian</h3>`;
      return;
    }

    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default ListRestaurant;
