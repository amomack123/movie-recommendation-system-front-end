import { useEffect, useState, useContext} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import * as movieService from '../../services/movieService';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieData = await movieService.getMovieById(id);
      setMovie(movieData);
    };
    fetchMovieDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await movieService.deleteMovie(id);
      navigate('/movies'); // Redirect to movies after deletion
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-language"><strong>Language:</strong> {movie.language}</p>
          <p className="movie-rating"><strong>Rating:</strong> {movie.rating}</p>
          <p className="movie-description"><strong>Description:</strong> {movie.description}</p>
          <h3 className="reviews-title">Reviews</h3>
          <ul className="reviews-list">
            {movie.reviews.map((review) => (
              <li key={review._id} className="review-item">
                {review.text} - {review.rating}/5
              </li>
            ))}
          </ul>
          {/* Edit/Delete buttons for admin */}
          {user?.isAdmin && (
            <div className="admin-controls">
              <button onClick={() => navigate(`/movies/${id}/edit`)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      ) : (
        <p className="loading-message">Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './MovieDetails.module.css'; // Import custom CSS for styling

// const MovieDetails = () => {
//   const { id } = useParams(); // Get the movie ID from the URL
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(${process.env.REACT_APP_API_BASE_URL}/api/movies/${id});
//         if (!response.ok) {
//           throw new Error('Failed to fetch movie details');
//         }
//         const data = await response.json();
//         setMovie(data.movie);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   if (loading) return <p>Loading movie details...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="movie-details-container">
//       <h1>{movie.title}</h1>
//       <div className="movie-info">
//         <p><strong>Language:</strong> {movie.language}</p>
//         <p><strong>Rating:</strong> {movie.rating} / 10</p>
//         <p><strong>Description:</strong> {movie.description}</p>
//         <p><strong>Reviews:</strong></p>
//         <ul>
//           {movie.reviews.length > 0 ? (
//             movie.reviews.map((review, index) => (
//               <li key={index}>{review}</li>
//             ))
//           ) : (
//             <p>No reviews available.</p>
//           )}
//         </ul>
//       </div>
//       {/* Additional sections like cast, trailer, etc. can be added here */}
//     </div>
//   );
// };

// export default MovieDetails;
