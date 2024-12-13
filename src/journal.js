// main.js

import { renderFavorites } from "./modules/render.js";

document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");
  renderFavorites(favoritesContainer);
});
