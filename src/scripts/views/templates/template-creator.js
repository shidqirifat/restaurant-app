import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => {
  const { foods, drinks } = restaurant.menus;

  const foodItem = foods.map(food => {
    return `<li>${food.name}</li>`;
  }).join('');

  const drinkItem = drinks.map(drink => {
    return `<li>${drink.name}</li>`;
  }).join('');

  const categorieItem = restaurant.categories.map((categorie) => {
    return `<span>${categorie.name}</span>`
  }).join('');

  const reviewItem = restaurant.customerReviews.map(review => {
    return `
        <div class="review-item">
          <h3 class="review-name">${review.name}</h3>
          <h3 class="review-text">${review.review}</h3>
          <h3 class="review-date">${review.date}</h3>
        </div>
      `;
  }).join('');

  return (
    `
      <div class="detail-container">
        <h2 class="detail-name">${restaurant.name}</h2>
        <div class="detail-image">
          <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
        </div>
        <div class="detail-content">
          <h3>Information</h3>
          <h3 class="categorie-title">Kategori:</h3>
          <span class="categorie">
            ${categorieItem}
          </span>
          <h3 class="location-title">Lokasi: </h3>
          <p>${restaurant.address}, ${restaurant.city}</p>
          <span class="detail-rating">
            <h3 class="rating-title">Rating: </h3>
            <i class="fas fa-star"></i>
            <h5>${restaurant.rating % 1 === 0 ? restaurant.rating + '.0' : restaurant.rating}</h5>
          </span>
          <h3 class="description-title">Deskripsi:<h3>
          <p class="description-text">${restaurant.description}</p>
          <h4 class="menu-title">Menu:</h4>
          <div class="menu">
            <div class="menu-item">
              <h4>Makanan:</h4>
              <ul>
                ${foodItem}
              </ul>
            </div>
            <div class="menu-item">
              <h4>Minuman:</h4>
              <ul>
                ${drinkItem}
              </ul>
            </div>
          </div>
        </div >
        <h3 class="review-title">Review Pelanggan:</h3>
        <div class="detail-review">
          ${reviewItem}
        </div>
        <div class="review-new">
          <h3>Berikan Review:</h3>
          <form>
            <input type="text" id="review-name" placeholder="Nama kamu" autocomplete="off">
            <textarea id="review-text" placeholder="Tulis komentar kamu di sini"></textarea>
            <button id="review-submit" type="submit">Kirim review</button>
          </form>
        </div>
        <div id="favoriteButtonContainer"></div>
      </div >
    `
  );
}

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-card">
    <span class="restaurant-rating">
      <i class="fas fa-star"></i>
      <h5>${restaurant.rating % 1 === 0 ? restaurant.rating + '.0' : restaurant.rating}</h5>
    </span>
    <img class="restaurant-img" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Foto ${restaurant.name}" />
    <div class="restaurant-content">
      <h4 class="restaurant-city">${restaurant.city}</h4>
      <h3 class="restaurant-name"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h3>
      <h4 class="restaurant-desc">${restaurant.description}</h4>
    </div>
  </div>
`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="like this restaurant">
    <i class="far fa-heart" aria-hidden="true" id="favoriteButton"></i>
  </button>
`;

const createFavoritedButtonTemplate = () => `
  <button aria-label="unlike this restaurant">
    <i class="fa fa-heart" aria-hidden="true" id="favoriteButton"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createFavoriteButtonTemplate,
  createFavoritedButtonTemplate
};