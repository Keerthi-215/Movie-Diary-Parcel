// events.js

import { loadFavorites, saveFavorites } from "./storage.js";

export const attachSaveNoteHandler = (movieDiv, movie) => {
  const saveButton = movieDiv.querySelector("button");
  saveButton.addEventListener("click", () => {
    const textarea = movieDiv.querySelector("textarea");

    // Update notes in favoriteMovies array
    const favoriteMovies = loadFavorites();
    const movieToUpdate = favoriteMovies.find(
      (favMovie) => Number(favMovie.id) === Number(movie.id)
    );

    if (movieToUpdate) {
      movieToUpdate.notes = textarea.value; // Update the notes
      saveFavorites(favoriteMovies); // Save to localStorage
      alert("Note saved!");
    }
  });
};

export const attachRemoveFavoriteHandler = (movieDiv, movie) => {
  const removeLink = movieDiv.querySelector("a");
  removeLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Remove movie from favorites
    const favoriteMovies = loadFavorites();
    const updatedMovies = favoriteMovies.filter(
      (favMovie) => Number(favMovie.id) !== Number(movie.id)
    );

    saveFavorites(updatedMovies);

    // Remove the movie card from the DOM
    movieDiv.remove();
  });
};
