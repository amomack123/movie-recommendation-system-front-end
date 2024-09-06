const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getReviewsByMovieId = async (movieId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/reviews`);
    const reviews = await res.json();
    return reviews;
  } catch (err) {
    console.error('Error fetching reviews:', err);
    throw err;
  }
};

const addReview = async (movieId, reviewData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding review:', err);
    throw err;
  }
};

const updateReview = async (reviewId, reviewData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    return await res.json();
  } catch (err) {
    console.error('Error updating review:', err);
    throw err;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    const res = await fetch(`${BACKEND_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error('Error deleting review:', err);
    throw err;
  }
};

export { getReviewsByMovieId, addReview, updateReview, deleteReview };
