const movieContainer = document.querySelector("section.container.mx-auto.grid");
const searchResultsContainerEl = document.getElementById("search-container");

export const renderMovies = (movies) => {
  if (!movies || movies.length === 0) {
    movieContainer.innerHTML = `<p class="text-white text-center col-span-full">No movies available.</p>`;
    return;
  }

  movieContainer.innerHTML = movies.map(createMovieCard).join("");
};

export const createMovieCard = (movie) => {
  const { id, title, overview, poster_path } = movie;
  const imagePath = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://placehold.co/150x225?text=No+Movie+Poster";

  return `
    <div class="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
      <img
        src="${imagePath}"
        alt="${title}"
        class="w-40 h-60 object-cover rounded-md mb-3"
      />
      <h2 class="text-lg color text-white font-bold mb-2 text-center">${title}</h2>
      <p class="text-sm text-gray-400 mb-3">${
        overview || "No description available."
      }</p>
      <button
        class="bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-500 active:bg-yellow-300 add-to-favorite"
        data-id="${id}"
        data-title="${title}"
        data-poster="${imagePath}"
        data-overview="${overview}"
      >
       Add to Favorites
      </button>
    </div>
  `;
};

export const renderSearchResults = (movies) => {
  searchResultsContainerEl.innerHTML = ""; // Clear previous results
  if (!movies || movies.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.className = "text-center text-gray-400 text-lg mt-4";
    noResultsMessage.textContent =
      "No results found. Please try another search.";
    searchResultsContainerEl.appendChild(noResultsMessage);
    return;
  }

  movies.forEach((movie) => {
    const imgPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://placehold.co/200x300?text=No+Movie+Poster";

    const movieDiv = document.createElement("div");
    movieDiv.className =
      "flex flex-col col-span-full items-center w-64 m-2 bg-gray-800 rounded-lg p-3";
    movieDiv.innerHTML = `
      <img class="object-cover rounded-lg mt-2 mb-3" src="${imgPath}" alt="${
      movie.title
    }">
      <div class="mt-auto">
        <p class=""><strong>${movie.title}</strong></p>
        <p class="text-gray-400 text-sm mb-3">${
          movie.release_date?.slice(0, 4) || "N/A"
        }</p>
        <button
          class="bg-yellow-400 text-black px-4 py-2 mb-1 rounded-md font-bold hover:bg-yellow-500 active:bg-yellow-300 add-to-favorite"
          data-id="${movie.id}"
          data-title="${movie.title}"
          data-poster="${imgPath}"
          data-overview="${movie.overview}"
        >
        Add to Favorites
        </button>
      </div>
    `;
    searchResultsContainerEl.appendChild(movieDiv);
  });
};
