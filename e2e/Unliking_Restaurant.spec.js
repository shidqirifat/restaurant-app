/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');
const QUERY_DOCUMENT = require('./_DATA');

Feature('Unliking Restaurant');

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.see('Tidak Ada Restaurant Favorite Saat Ini', '.empty-fav-restaurant h3');

  // LIKE 3 RESTAURANT
  const titles = [];
  for (let i = 1; i <= 3; i += 1) {
    I.amOnPage('/');
    I.waitForElement(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i), 10);
    I.seeElement(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i));
    I.click(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i));

    I.waitForElement(QUERY_DOCUMENT.favButton, 10);
    I.seeElement(QUERY_DOCUMENT.favButton);
    I.click(QUERY_DOCUMENT.favButton);
    titles.push(await I.grabTextFrom(QUERY_DOCUMENT.titleRestaurantDetail));
  }

  I.amOnPage('/#/favorite');

  // COMPARE EACH TITLE LIKE RESTAURANT TO RESTAURANT IN FAV PAGE
  const favoriteRestaurantsBefore = [];
  for (let i = 1; i <= 3; i += 1) {
    const selectedRestaurant = await I.grabTextFrom(
      locate(QUERY_DOCUMENT.titleRestaurantCard).at(i),
    );
    assert.strictEqual(titles[i - 1], selectedRestaurant);
    favoriteRestaurantsBefore.push(selectedRestaurant);
  }

  // COMPARE LENGTH OF TITLE LIKE RESTAURANT TO RESTAURANT IN FAV PAGE
  assert.strictEqual(titles.length, favoriteRestaurantsBefore.length);

  // UNLIKE FIRST RESTAURANT IN FAV PAGE
  I.click(locate(QUERY_DOCUMENT.titleRestaurantCard).first());
  I.waitForElement(QUERY_DOCUMENT.favButton, 10);
  I.seeElement(QUERY_DOCUMENT.favButton);
  I.click(QUERY_DOCUMENT.favButton);

  const titleUnlikeRestaurant = await I.grabTextFrom(QUERY_DOCUMENT.titleRestaurantDetail);
  const indexUnlikeRestaurant = titles.indexOf(titleUnlikeRestaurant);

  // REMOVE FIRST RESTAURANT WHICH UNLIKE BEFORE
  titles.splice(indexUnlikeRestaurant, 1);

  I.amOnPage('/#/favorite');

  // COMPARE EACH TITLE LIKE RESTAURANT TO RESTAURANT IN FAV PAGE
  const favoriteRestaurantsAfter = [];
  for (let i = 1; i <= titles.length; i += 1) {
    const selectedRestaurant = await I.grabTextFrom(
      locate(QUERY_DOCUMENT.titleRestaurantCard).at(i),
    );
    assert.strictEqual(titles[i - 1], selectedRestaurant);
    favoriteRestaurantsAfter.push(selectedRestaurant);
  }

  // COMPARE LENGTH TITLE LIKE RESTAURANT TO RESTAURANT IN FAV PAGE
  assert.strictEqual(titles.length, favoriteRestaurantsAfter.length);
});
