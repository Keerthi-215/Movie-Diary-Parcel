import { searchMovies } from "./api.js";
import { renderSearchResults } from "./ui.js";
import { attachFavoriteButtons } from "./favorites.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-movie");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value;

  const results = await searchMovies(query);
  renderSearchResults(results);
  attachFavoriteButtons();
});
