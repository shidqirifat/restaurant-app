import FavoriteRestaurantdb from '../../src/scripts/data/database';
import FavoriteButtonInitiator from '../../src/scripts/utils/favorite-button-initiator';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonInitiator.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantdb,
    restaurant,
  });
};

export default createFavoriteButtonPresenterWithRestaurant;
