import { createFavoriteButtonTemplate, createFavoritedButtonTemplate } from '../views/templates/template-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, favoriteRestaurant, restaurant }) {
    this.favoriteButtonContainer = favoriteButtonContainer;
    this.restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

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
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  renderFavorite() {
    this.favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.updateRestaurant(this.restaurant);
      this.renderButton();
    });
  },

  renderFavorited() {
    this.favoriteButtonContainer.innerHTML = createFavoritedButtonTemplate();

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this.restaurant.id);
      this.renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
