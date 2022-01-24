import RestarantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate, createFavoriteButtonTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';


const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestarantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    console.log(restaurant);
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    // FavoriteButtonInitiator.init({
    //   likeButtonContainer: document.querySelector('#likeButtonContainer'),
    //   restaurant: {
    //     id: restaurant.id,
    //     title: restaurant.title,
    //     overview: restaurant.overview,
    //     backdrop_path: restaurant.backdrop_path,
    //     vote_average: restaurant.vote_average,
    //   },
    // });
  },
};

export default Detail;