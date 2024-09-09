// import { useEffect, useState, useContext} from 'react';
// import { useParams, useNavigate} from 'react-router-dom';
// import * as movieService from '../../services/movieService';

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const movieData = await movieService.getMovieById(id);
//       setMovie(movieData);
//     };
//     fetchMovieDetails();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await movieService.deleteMovie(id);
//       navigate('/movies'); // Redirect to movies after deletion
//     } catch (error) {
//       console.error('Failed to delete movie:', error);
//     }
//   };

//   return (
//     <div className="movie-details">
//       {movie ? (
//         <>
//           <h2 className="movie-title">{movie.title}</h2>
//           <p className="movie-language"><strong>Language:</strong> {movie.language}</p>
//           <p className="movie-rating"><strong>Rating:</strong> {movie.rating}</p>
//           <p className="movie-description"><strong>Description:</strong> {movie.description}</p>
//           <h3 className="reviews-title">Reviews</h3>
//           <ul className="reviews-list">
//             {movie.reviews.map((review) => (
//               <li key={review._id} className="review-item">
//                 {review.text} - {review.rating}/5
//               </li>
//             ))}
//           </ul>
//           {/* Edit/Delete buttons for admin */}
//           {user?.isAdmin && (
//             <div className="admin-controls">
//               <button onClick={() => navigate(`/movies/${id}/edit`)}>Edit</button>
//               <button onClick={handleDelete}>Delete</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="loading-message">Loading movie details...</p>
//       )}
//     </div>
//   );
// };

// export default MovieDetails;

import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import * as reviewService from '../../services/reviewService';
import ReviewForm from '../ReviewForm/ReviewForm';

const MovieDetails = ({movies, setMovies}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState(movie&&movie);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieData = await movieService.getMovieById(id);
      setMovie(movieData);
      setEditedMovie(movieData);
    };
    fetchMovieDetails();
  }, [id]);

  const handleChange = (event) => {
    const movie = {...editedMovie, [event.target.name]: event.target.value}
    setEditedMovie(movie);
  };

  const handleDelete = async () => {
    try {
      const movie = await movieService.deleteMovie(id);
      const updatedMoviesArr=movies.filter(m => m._id !== movie._id)
      setMovies(updatedMoviesArr)
      navigate('/movies'); // Redirect to movies after deletion
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(id, reviewId); // Ensure deleteReview is implemented in movieService
      setMovie((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleSave = async () => {
    try {
      await movieService.editMovie(id, editedMovie);
      setMovie(editedMovie); // Update the displayed movie details
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  return (
    <div className="movie-details">
      {movie ? (
            isEditing ? (
              <div className="edit-movie-form">
                <label>
                  Title:
                  <input type="text" name="title" value={editedMovie.title} onChange={handleChange} />
                </label>
                <label>
                  Rating:
                  <input type="number" name="rating" value={editedMovie.rating} onChange={handleChange} />
                </label>
                <label>
                  Description:
                  <textarea name="description" value={editedMovie.description} onChange={handleChange} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
        <>
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-rating"><strong>Rating:</strong> {movie.rating}</p>
          <p className="movie-description"><strong>Description:</strong> {movie.description}</p>
          <h3 className="reviews-title">Reviews</h3>
          <ul className="reviews-list">
            {movie.reviews.map((review) => (
              <li key={review._id} className="review-item">
                {review.comment} - {review.rating}/5
                <button onClick={() => handleReviewDelete(review._id)}>Delete</button>
                <button onClick={() => setShowReviewForm(true)}>Edit</button>
              </li>
            ))}
          </ul>
          {/* Button to add a new review */}
          <button onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? 'Close Review Form' : 'Add Review'}
          </button>
          {showReviewForm && <ReviewForm movieId={id} />}
          {/* Edit/Delete buttons for admin */}
          {/* {user?.isAdmin && ( */}
            <div className="admin-controls">
              <button onClick={() => setIsEditing(true)}>Edit the movie</button>
              <button onClick={handleDelete}>Delete the movie</button>
            </div>
          {/* )} */}
        </>
        )
      ) : (
        <p className="loading-message">Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
