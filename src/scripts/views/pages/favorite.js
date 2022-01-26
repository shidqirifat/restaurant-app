import FavoriteRestaurantdb from '../../data/database';
import { createRestaurantItemTemplate } from '../templates/template-creator';

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
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
