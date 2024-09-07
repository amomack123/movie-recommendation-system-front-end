import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import movieService from '../services/movieService';
import * as movieService from '../../services/movieService';

const AddMovie = ({movies, setMovies}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { title, description, genre, actors };
    
    try {
      const newMovie = await movieService.addMovie(movieData);
      setMovies([...movies, newMovie])
      navigate('/movies'); // Redirect to movies page after success
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <div className="add-movie-form">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Genre</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <label>Actors (comma-separated)</label>
        <input type="text" value={actors} onChange={(e) => setActors(e.target.value)} required />

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
