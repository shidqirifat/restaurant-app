/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');
const QUERY_DOCUMENT = require('./_DATA');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#favorite-container');
  I.see('Tidak Ada Restaurant Favorite Saat Ini', '.empty-fav-restaurant h3');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak Ada Restaurant Favorite Saat Ini', '.empty-fav-restaurant h3');

  I.amOnPage('/');

  I.waitForElement(QUERY_DOCUMENT.titleRestaurantCard, 10);

  I.seeElement(QUERY_DOCUMENT.titleRestaurantCard);

  const firstResturant = locate(QUERY_DOCUMENT.titleRestaurantCard).first();
  const titleFirstResturant = await I.grabTextFrom(firstResturant);

  I.click(firstResturant);

  I.waitForElement(QUERY_DOCUMENT.favButton, 10);
  I.seeElement(QUERY_DOCUMENT.favButton);
  I.click(QUERY_DOCUMENT.favButton);

  I.amOnPage('/#/favorite');

  I.waitForElement(QUERY_DOCUMENT.cardRestaurant, 10);
  I.seeElement(QUERY_DOCUMENT.cardRestaurant);

  const likedRestaurant = locate(QUERY_DOCUMENT.titleRestaurantCard).first();
  const titleLikedRestaurant = await I.grabTextFrom(likedRestaurant);

  assert.strictEqual(titleFirstResturant, titleLikedRestaurant);
});
