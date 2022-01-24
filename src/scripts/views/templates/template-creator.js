import CONFIG from '../../globals/config';

// const createRestaurantDetailTemplate = (movie) => `
//   <h2 class="movie__title">${movie.title}</h2>
//   <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL + movie.poster_path}" alt="${movie.title}" />
//   <div class="movie__info">
//   <h3>Information</h3>
//     <h4>Tagline</h4>
//     <p>${movie.tagline}</p>
//     <h4>Release Date</h4>
//     <p>${movie.release_date}</p>
//     <h4>Duration</h4>
//     <p>${movie.runtime} minutes</p>
//     <h4>Rating</h4>
//     <p>${movie.vote_average}</p>
//   </div>
//   <div class="movie__overview">
//     <h3>Overview</h3>
//     <p>${movie.overview}</p>
//   </div>
// `;

const createRestaurantDetailTemplate = (restaurant) => `
  <h3>restaurant ${restaurant.restaurant.name}</h3>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-card">
  <span class="restaurant-rating">
    <i class="fas fa-star"></i>
    <h5>${restaurant.rating % 1 === 0 ? restaurant.rating + '.0' : restaurant.rating}</h5>
  </span>
  <img class="restaurant-img" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Foto ${restaurant.name}" />
  <div class="restaurant-content">
    <h4 class="restaurant-city">${restaurant.city}</h4>
    <h3 class="restaurant-name">${restaurant.name}</h3>
    <h4 class="restaurant-desc">${restaurant.description}</h4>
  </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate
};