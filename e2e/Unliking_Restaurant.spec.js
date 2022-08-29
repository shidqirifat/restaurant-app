/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const QUERY_DOCUMENT = require('./_DATA');

Feature('Unliking Restaurant');

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');

  I.see('Tidak Ada Restaurant Favorite Saat Ini', '.empty-fav-restaurant h3');

  I.amOnPage('/');

  const titles = [];
  for (let i = 1; i <= 3; i += 1) {
    I.waitForElement(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i), 10);
    I.seeElement(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i));
    I.click(locate(QUERY_DOCUMENT.titleRestaurantCard).at(i));

    I.waitForElement(QUERY_DOCUMENT.favButton, 10);
    I.seeElement(QUERY_DOCUMENT.favButton);
    I.click(QUERY_DOCUMENT.favButton);
    titles.push(await I.grabTextFrom(QUERY_DOCUMENT.titleRestaurantDetail));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
});
