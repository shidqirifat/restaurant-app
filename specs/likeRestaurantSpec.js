import FavoriteRestaurantdb from '../src/scripts/data/database';
import createFavoriteButtonPresenterWithRestaurant from './helper/testFactories';

/* eslint-disable no-undef */
describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
    await FavoriteRestaurantdb.updateRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol suka restaurant
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    // tidak ada restaurant yang ganda
    expect(await FavoriteRestaurantdb.getAllRestaurant()).toEqual([{ id: 1 }]);

    FavoriteRestaurantdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoriteButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantdb.getAllRestaurant()).toEqual([]);
  });
});
