import React, { useState } from 'react';

const ReviewForm = ({ movieId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }
    
    // Submit review data to server
    try {
      const response = await fetch(`/api/movies/${movieId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText, rating }),
      });
      
      if (response.ok) {
        // Handle successful submission
        setReviewText('');
        setRating(0);
        setError('');
        // Optionally, refresh the reviews list or show a success message
      } else {
        // Handle error response
        setError('Failed to submit review');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Review</h2>
      
      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          required
        />
      </label>
      <br />
      
      <label>
        Review Text:
        <textarea
          value={reviewText}
          onChange={handleTextChange}
          rows="4"
          cols="50"
          required
        />
      </label>
      <br />
      
      {error && <p className="error">{error}</p>}
      
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
