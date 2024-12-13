import { fetchMovies } from "./modules/api.js";
import { renderMovies } from "./modules/ui.js";
import { attachFavoriteButtons } from "./modules/favorites.js";

const initializeApp = async () => {
  const movies = await fetchMovies();
  renderMovies(movies);
  attachFavoriteButtons();
};

initializeApp();
