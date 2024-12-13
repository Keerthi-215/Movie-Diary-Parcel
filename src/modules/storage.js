// storage.js

export const loadFavorites = () => {
  return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
};

export const saveFavorites = (movies) => {
  localStorage.setItem("favoriteMovies", JSON.stringify(movies));
};
