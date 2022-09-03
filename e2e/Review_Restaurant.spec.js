/* eslint-disable no-undef */
const assert = require('assert');
const QUERY_DOCUMENT = require('./_DATA');

Feature('Review Restaurant');

Scenario('review a restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement(QUERY_DOCUMENT.titleRestaurantCard, 10);
  I.seeElement(QUERY_DOCUMENT.titleRestaurantCard);

  const firstResturant = locate(QUERY_DOCUMENT.titleRestaurantCard).first();
  I.click(firstResturant);

  I.waitForElement(QUERY_DOCUMENT.formReview, 10);
  I.seeElement(QUERY_DOCUMENT.formReview);

  const sampleReview = {
    name: 'Shidqi',
    text: 'Makanannya Murah',
  };

  I.fillField(QUERY_DOCUMENT.reviewNameForm, sampleReview.name);
  I.fillField(QUERY_DOCUMENT.reviewTextForm, sampleReview.text);
  I.click(locate(QUERY_DOCUMENT.submitReview));

  // wait for response review
  I.wait(3);

  const lastReviewName = await I.grabTextFrom(locate(QUERY_DOCUMENT.reviewNameCard).last());
  const lastReviewText = await I.grabTextFrom(locate(QUERY_DOCUMENT.reviewTextCard).last());

  assert.strictEqual(lastReviewName, sampleReview.name);
  assert.strictEqual(lastReviewText, sampleReview.text);
});
