const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getMovies = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies`);
    const movies = await res.json();
    return movies;
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err;
  }
};

const getMovieById = async (movieId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}`);
    const movie = await res.json();
    return movie;
  } catch (err) {
    console.error('Error fetching movie:', err);
    throw err;
  }
};

// movieService.js
const getMoviesByGenre = async (genre) => {
  console.log(genre, 'in service');
  const response = await fetch(`${BACKEND_URL}/movies/genre/${genre}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre');
  }
  return await response.json();
};


// Admin only
const addMovie = async (movieData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding movie:', err);
    throw err;
  }
};

// Delete movie
const deleteMovie = async (movieId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (err) {
    console.error('Error deleting movie:', err);
    throw err;
  }
};

// Edit movie
const editMovie = async (movieId, movieData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    return await res.json();
  } catch (err) {
    console.error('Error updating movie:', err);
    throw err;
  }
};

// Export functions
export { getMovies, getMovieById, addMovie, getMoviesByGenre, deleteMovie, editMovie};
