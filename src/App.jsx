import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Movies from './components/Movies/Movies';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import PreferenceForm from './components/PreferenceForm/PreferenceForm';
import ReviewForm from './components/ReviewForm/ReviewForm';
import * as authService from './services/authService';
import * as movieService from './services/movieService';
import MovieList from './components/MovieList/MovieList';
import AddMovie from './components/AdminAddMovie/AdminAddMovie';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [movies, setMovies] = useState([]);
  const [isSigninOpen, setSigninOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Signout handler
  const handleSignout = () => {
    authService.signout();
    setUser(null);
    navigate('/signin');
  };

  // Handlers to open/close modals
  const openSigninModal = () => {
    setSigninOpen(true);
    setSignupOpen(false);
  };
  
  const openSignupModal = () => {
    setSignupOpen(true);
    setSigninOpen(false);
  };

  const closeModals = () => {
    setSigninOpen(false);
    setSignupOpen(false);
  };

  // Fetch all movies after user is authenticated
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const movieData = await movieService.getMovies();
        setMovies(movieData);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    if (user) fetchAllMovies();
  }, [user]);

  return (
    <AuthedUserContext.Provider value={{ user, setUser }}>
      {user ? (
        <>
          {/* Navbar visible after sign-in */}
          <NavBar onSignout={handleSignout} />
          
          {/* Main routes */}
          <Routes>
            <Route path="/" element={<Dashboard movies={movies} />} />
            <Route path="/movies" element={<Movies movies={movies} />} />
            <Route path="/movies/genre/:genre" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails movies={movies} setMovies = {setMovies}/>} />
            <Route path="/preferences" element={<PreferenceForm />} />
            <Route path="/review/:id" element={<ReviewForm />} />
            <Route path="/movies/add" element={<AddMovie movies={movies} setMovies = {setMovies}/>} />
          </Routes>
        </>
      ) : (
        <>
          {/* Authentication Routes */}
          <Routes>
            <Route path="/signin" element={<SigninForm openSignup={openSignupModal} />} />
            <Route path="/signup" element={<SignupForm openSignin={openSigninModal} />} />
          </Routes>
        </>
      )}
      
      {/* Signin and Signup modals */}
      {isSigninOpen && <SigninForm close={closeModals} />}
      {isSignupOpen && <SignupForm close={closeModals} />}
    </AuthedUserContext.Provider>
  );
};

export default App;
