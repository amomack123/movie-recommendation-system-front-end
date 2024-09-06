// import { Link } from 'react-router-dom';

// const NavBar = ({ onSignout }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-links">
//         <Link className="nav-link" to="/">Home</Link>
//         <Link className="nav-link" to="/movies">Movies</Link>
//         <Link className="nav-link" to="/preferences">Preferences</Link>
//         <button className="nav-button" onClick={onSignout}>Sign Out</button>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// import { Link } from 'react-router-dom';

// const NavBar = ({ onSignout }) => {

//   return (
//     <nav className="navbar">
//       <div className="navbar-links">
//         <Link className="nav-link" to="/">Home</Link>
//         <Link className="nav-link" to="/movies">Movies</Link>
//         <Link className="nav-link" to="/preferences">Preferences</Link>
//         <button className="nav-button" onClick={onSignout}>Sign Out</button>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import { Link } from 'react-router-dom';

const NavBar = ({ onSignout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/movies">Movies</Link>
        <Link className="nav-link" to="/preferences">Preferences</Link>
        <Link className="nav-link" to="/movies/add">Add Movie</Link>

        <button className="nav-button" onClick={onSignout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default NavBar;
