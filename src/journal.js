document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favorites-container");

  // Load favorite movies from localStorage
  const loadFavorites = () => {
    return JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  };

  // Save updated favorite movies to localStorage
  const saveFavorites = (movies) => {
    localStorage.setItem("favoriteMovies", JSON.stringify(movies));
  };

  // Remove movie from favorites
  const removeFavorites = (movieId) => {
    // Load current favorite movies
    const favoriteMovies = loadFavorites();

    // Filter out the movie with the given ID
    const updatedMovies = favoriteMovies.filter(
      (movie) => Number(movie.id) !== Number(movieId)
    );

    // Save the updated list of favorite movies
    saveFavorites(updatedMovies);

    // Optionally, you can re-render the favorites or remove the movie element from the DOM here
    const movieDiv = document
      .querySelector(`[data-id="${movieId}"]`)
      .closest("div");
    if (movieDiv) {
      movieDiv.remove(); // Remove the movie card from the DOM
    }
  };

  // Render a single movie card
  const renderMovie = (movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.className =
      "flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow text-gray-200";

    movieDiv.innerHTML = `
        <img
          src="${movie.Poster}"
          alt="${movie.Title}"
          class="w-80 object-cover rounded-md m-3"
        />
        <h2 class="text-lg font-semibold mb-2">${movie.Title}</h2>
        <p class="mb-auto text-sm text-gray-400 mb-3">${movie.Overview}</p>
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

    // Add event listener to save button
    const saveButton = movieDiv.querySelector("button");
    saveButton.addEventListener("click", () => {
      const textarea = movieDiv.querySelector("textarea");

      const movieId = Number(saveButton.dataset.id);

      // Update the favoriteMovies array in localStorage
      const favoriteMovies = loadFavorites();

      const movieToUpdate = favoriteMovies.find(
        (movie) => Number(movie.id) === Number(movieId)
      );

      if (movieToUpdate) {
        movieToUpdate.notes = textarea.value; // Update the notes
        saveFavorites(favoriteMovies); // Save updated array to localStorage
        alert("Note saved!");
      }
    });

    favoritesContainer.appendChild(movieDiv);

    // Add event listener to remove link
    const removeLink = movieDiv.querySelector("a");
    removeLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default action of the anchor tag (navigation)
      const movieId = Number(removeLink.dataset.id); // Get the movie ID from the data-id attribute
      removeFavorites(movieId);
    });
  };

  // Render all favorite movies
  const renderFavorites = () => {
    const favoriteMovies = loadFavorites(); // Fetch favorite movies from localStorage
    favoriteMovies.forEach((movie) => {
      renderMovie(movie);
    });
  };

  renderFavorites();
});
