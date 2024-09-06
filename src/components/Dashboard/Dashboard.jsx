const Dashboard = ({ movies }) => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome to Movie Recommendation System</h1>
      <h2 className="section-title">Recommended Movies</h2>
      <div className="movie-list">
        {movies.slice(0, 5).map((movie) => (
          <div key={movie._id} className="movie-card">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-description">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

