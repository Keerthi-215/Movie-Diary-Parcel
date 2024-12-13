// render.js

import { loadFavorites, saveFavorites } from "./storage.js";
import {
  attachRemoveFavoriteHandler,
  attachSaveNoteHandler,
} from "./events.js";

export const renderMovie = (movie, container) => {
  const movieDiv = document.createElement("div");
  movieDiv.className =
    "flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow text-gray-200";

  movieDiv.innerHTML = `
    <img
      src="${movie.poster}"
      alt="${movie.title}"
      class="w-80 object-cover rounded-md m-3"
    />
    <h2 class="text-lg font-semibold mb-2">${movie.title}</h2>
    <p class="mb-auto text-sm text-gray-400 mb-3">${movie.overview}</p>
    <textarea
      class="w-full border border-gray-600 rounded p-2 m-3 bg-gray-700 text-gray-200 placeholder-gray-500"
      placeholder="Add personal notes here..."
    >${movie.notes || ""}</textarea>
    <button
      class="font-bold text-gray-900 px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-500 transition duration-300 active:bg-yellow-300"
      data-id="${movie.id}"
    >
      Save Note
    </button>
    <a href="#"
      class="text-sm text-gray-500 mt-3 hover:text-yellow-400 transition duration-300"
      data-id="${movie.id}"
    >
      Remove from Favorites
    </a>
  `;

  // Attach event listeners
  attachSaveNoteHandler(movieDiv, movie);
  attachRemoveFavoriteHandler(movieDiv, movie);

  container.appendChild(movieDiv);
};

export const renderFavorites = (container) => {
  const favoriteMovies = loadFavorites();
  favoriteMovies.forEach((movie) => renderMovie(movie, container));
};
