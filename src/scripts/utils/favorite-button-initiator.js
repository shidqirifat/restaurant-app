import FavoriteRestaurantdb from '../data/database';
import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this.favoriteButtonContainer = favoriteButtonContainer;
    this.restaurant = restaurant;

    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderFavorited();
    } else {
      this.renderFavorite();
    }
  },

  async isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantdb.getRestaurant(id);
    return !!restaurant;
  },

  renderFavorite() {
    this.favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantdb.updateRestaurant(this.restaurant);
      this.renderButton();
    });
  },

  renderFavorited() {
    this.favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteRestaurantdb.deleteRestaurant(this.restaurant.id);
      this.renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
