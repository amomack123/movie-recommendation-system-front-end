import React, { useState } from 'react';

const PreferenceForm = () => {
  const [preferences, setPreferences] = useState({
    genres: [],
    Rating: 1,
    favoriteActors: [],
  });

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setPreferences((prevPreferences) => {
      const updatedGenres = checked
        ? [...prevPreferences.genres, value]
        : prevPreferences.genres.filter((genre) => genre !== value);

      return { ...prevPreferences, genres: updatedGenres };
    });
  };

  const handleRatingChange = (event) => {
    const { name, value } = event.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: Number(value),
    }));
  };

  const handleActorChange = (event) => {
    const { value } = event.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      favoriteActors: value.split(',').map((actor) => actor.trim()),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit preferences to the server or handle them as needed
    console.log('Submitted Preferences:', preferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Movie Preferences</h2>
      
      <fieldset>
        <legend>Preferred Genres:</legend>
        <label>
          <input
            type="checkbox"
            value="action"
            onChange={handleGenreChange}
          /> Action
        </label>
        <label>
          <input
            type="checkbox"
            value="adventure"
            onChange={handleGenreChange}
          /> Adventure
        </label>
        <label>
          <input
            type="checkbox"
            value="comedy"
            onChange={handleGenreChange}
          /> Comedy
        </label>
        <label>
          <input
            type="checkbox"
            value="sci-fi"
            onChange={handleGenreChange}
          /> Sci-Fi
        </label>
        <label>
          <input
            type="checkbox"
            value="fantasy"
            onChange={handleGenreChange}
          /> Fantasy
        </label>
      </fieldset>

      <fieldset>
        <legend>Rating Preferences:</legend>
        <label>
          Rating:
          <input
            type="number"
            name="Rating"
            min="1"
            max="10"
            value={preferences.Rating}
            onChange={handleRatingChange}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Favorite Actors:</legend>
        <input
          type="text"
          placeholder="Comma-separated list"
          onBlur={handleActorChange}
        />
      </fieldset>

      <button type="submit">Submit Preferences</button>
    </form>
  );
};

export default PreferenceForm;
