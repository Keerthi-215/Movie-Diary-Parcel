const API_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDA5NmM3NzM1M2I5OTFlNzlhZWZhMzJkMzc1NDc2NCIsIm5iZiI6MTczMzIxNDU4MC4xNCwic3ViIjoiNjc0ZWMxNzQ3OTliYzA0NzJkZWVhNjgwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KJIvTK6gNCgpJNKw2i3ecXIT5SczGO-InrhIvZNrmEg",
  },
};

// Fetch popular movies
export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/movie/popular?language=en-US&page=1`,
      API_OPTIONS
    );
    if (!response.ok) throw new Error("Failed to fetch movies");
    return (await response.json()).results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Search movies by title
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    if (!response.ok) throw new Error("Failed to search movies");
    return (await response.json()).results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
