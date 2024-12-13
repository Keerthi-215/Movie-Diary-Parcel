// Authorization Token
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDA5NmM3NzM1M2I5OTFlNzlhZWZhMzJkMzc1NDc2NCIsIm5iZiI6MTczMzIxNDU4MC4xNCwic3ViIjoiNjc0ZWMxNzQ3OTliYzA0NzJkZWVhNjgwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KJIvTK6gNCgpJNKw2i3ecXIT5SczGO-InrhIvZNrmEg",
  },
};
// Selectors
const movieContainer = document.querySelector("section.container.mx-auto.grid");

/// Function to fetch popular movies
const fetchMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    return data.results; // Returns the list of popular movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

/// Function to generate movie card HTML
const createMovieCard = (movie) => {
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
      <p class="text-sm text-gray-400 mb-3 ">${
        overview || "No description available."
      }</p>
      <button
        class="bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-500 active:bg-yellow-300 add-to-favorite mt-auto"
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

// Function to populate movies into the DOM
const populateMovies = async () => {
  const movies = await fetchMovies();
  if (movies.length === 0) {
    movieContainer.innerHTML = `<p class="text-white text-center col-span-full">No movies available.</p>`;
    return;
  }

  movieContainer.innerHTML = movies
    //.slice(0, 6) // Display only the first 6 movies for now
    .map(createMovieCard)
    .join("");

  attachFavoriteButtons();
};

// Function to handle "Add to Favorite" button clicks
const attachFavoriteButtons = () => {
  const favoriteButtons = document.querySelectorAll(".add-to-favorite");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieTitle = button.dataset.title;
      const movieId = button.dataset.id;
      const movieOverview = button.dataset.overview;
      const moviePoster = button.dataset.poster;
      const addFavMovie = {
        id: movieId,
        Title: movieTitle,
        Overview: movieOverview,
        Poster: moviePoster,
      };
      alert(`${movieTitle} added to favorites!`);
      button.disabled = true;
      button.textContent = "Saved to Favorites";
      button.classList.add(
        "bg-yellow-800",
        "hover:bg-yellow-800",
        "active:bg-yellow-800"
      );

      const previousData =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      // Set item to a stringified version of an array with the old and new tasks
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify([...previousData, addFavMovie])
      );
    });
  });
};

// Initialize the app
populateMovies();

// SEARCH for a Movie title, page 1, 20 results

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-movie");
const searchResultsContainerEl = document.getElementById("search-container");
const clearButton = document.getElementById("clear-button");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const queryMovieTitle = searchInput.value;

  // Clear previous results
  searchResultsContainerEl.innerHTML = "";

  // Fetch new search results
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${queryMovieTitle}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.results.length === 0) {
        // Display "No results found" message
        const noResultsMessage = document.createElement("p");
        noResultsMessage.className = "text-center text-gray-400 text-lg mt-4";
        noResultsMessage.textContent =
          "No results found. Please try another search.";
        searchResultsContainerEl.appendChild(noResultsMessage);
      } else {
        res.results.forEach((movie) => {
          const imgPath = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://placehold.co/200x300?text=No+Movie+Poster";

          const moviesDiv = document.createElement("div");
          moviesDiv.className =
            "flex flex-col col-span-full items-center w-64 m-2 bg-gray-800 rounded-lg p-3";
          moviesDiv.innerHTML = `
            <img class="object-cover rounded-lg mt-2 mb-3" src="${imgPath}" alt="Image of ${
            movie.title
          }">
          <div class="mt-auto">
            <p class=""><strong>${movie.title}</strong></p>
            <p class=" text-gray-400 text-sm mb-3">${
              movie.release_date ? movie.release_date.slice(0, 4) : "N/A"
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
          searchResultsContainerEl.appendChild(moviesDiv);
        });
      }
      attachFavoriteButtons();
    })
    .catch((err) => console.error(err));
});
