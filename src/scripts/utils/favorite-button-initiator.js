import FavoriteMovieIdb from '../data/database';
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
    const movie = await FavoriteMovieIdb.getMovie(id);
    return !!movie;
  },

  renderFavorite() {
    this.likeButtonContainer.innerHTML = createFavoriteButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.updateMovie(this.restaurant);
      this.renderButton();
    });
  },

  renderFavorited() {
    this.likeButtonContainer.innerHTML = createFavoritedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.deleteMovie(this.restaurant.id);
      this.renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
