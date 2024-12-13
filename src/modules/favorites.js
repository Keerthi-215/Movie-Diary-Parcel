export const saveToFavorites = (movie) => {
  const previousData = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  localStorage.setItem(
    "favoriteMovies",
    JSON.stringify([...previousData, movie])
  );
};

export const attachFavoriteButtons = () => {
  const favoriteButtons = document.querySelectorAll(".add-to-favorite");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { id, title, overview, poster } = button.dataset;
      saveToFavorites({ id, title, overview, poster });
      button.disabled = true;
      button.textContent = "Saved to Favorites";
      button.classList.add(
        "bg-yellow-800",
        "hover:bg-yellow-800",
        "active:bg-yellow-800"
      );
      alert(`${title} added to favorites!`);
    });
  });
};
