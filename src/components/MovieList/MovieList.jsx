import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieList = () => {
  const { genre } = useParams(); // Get the genre from the URL
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(genre);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        console.log('stuff');
        const movieData = await movieService.getMoviesByGenre(genre); // Call the service to get movies by genre
        console.log(movieData, 'stuff');
        setMovies(movieData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load movies');
        setLoading(false);
      }
    };

    if(genre) fetchMoviesByGenre();
  }, [genre]); // Re-run this effect when the genre changes

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-list">
      <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} Movies</h1> {/* Capitalize genre */}
      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie._id} className="movie-item">
            <h2>{movie.title}</h2>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            {/* Add more details or a "view details" link if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;