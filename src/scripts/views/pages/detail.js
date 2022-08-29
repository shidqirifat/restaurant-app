import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate, createReviewTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';
import FavoriteRestaurantdb from '../../data/database';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        description: restaurant.description,
        city: restaurant.city,
      },
    });

    const reviewName = document.getElementById('review-name');
    const reviewText = document.getElementById('review-text');
    const reviewForm = document.getElementById('form-review-submit');

    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dataPost = {
        id: restaurant.id,
        name: reviewName.value,
        review: reviewText.value,
      };

      const review = await RestaurantDbSource.reviewRestaurant(dataPost);
      const reviewContainer = document.querySelector('#review-wrapper');
      reviewContainer.innerHTML = createReviewTemplate(review);
      reviewName.value = '';
      reviewText.value = '';
    });
  },
};

export default Detail;
