import { Link } from 'react-router-dom';

const Movies = ({ movies }) => {
  const genres = ['Action', 'Adventure', 'Comedy', 'Sci-Fi', 'Fantasy'];

  // const filterMoviesByGenre = (genre) => {
  //   return movies.filter((movie) => movie.genre.includes(genre)).slice(0, 5);
  // };
  const filterMoviesByGenre = (genre) => {
    return movies
      .filter((movie) => movie.genre && movie.genre.includes(genre))
      .slice(0, 5);
  };  

  return (
    <div className="movies-page">
      <h2 className="section-title">Browse Movies by Genre</h2>
      {genres.map((genre) => (
        <div key={genre} className="genre-section">
          <h3 className="genre-title">{genre}</h3>
          <div className="movie-genre-list">
            {filterMoviesByGenre(genre).map((movie) => (
              <div key={movie._id} className="movie-card">
                <Link className="movie-link" to={`/movies/${movie._id}`}>
                  <h4 className="movie-title">{movie.title}</h4>
                </Link>
              </div>
            ))}
          </div>
          <Link className="view-more" to={`/movies/genre/${genre.toLowerCase()}`}>
            View More {genre} Movies
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;
