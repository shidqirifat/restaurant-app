import FavoriteRestaurantdb from '../../data/database';
import { createEmptyRestaurantFavTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <h2 class="favorite-page">Restaurant Favorit</h2>
      <section id="favorite-container"></section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#favorite-container');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = createEmptyRestaurantFavTemplate();
      return;
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
