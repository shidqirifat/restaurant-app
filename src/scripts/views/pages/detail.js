import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate, createFavoriteButtonTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';


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
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        description: restaurant.description,
        city: restaurant.city
      },
    });

    const reviewName = document.getElementById('review-name');
    const reviewText = document.getElementById('review-text');
    const reviewButton = document.getElementById('review-submit');

    reviewButton.addEventListener('click', async () => {
      const dataPost = {
        id: restaurant.id,
        name: reviewName.value,
        review: reviewText.value
      };

      console.log(dataPost);
      const postReview = await RestaurantDbSource.reviewRestaurant(dataPost);

    })
  },
};

export default Detail;