// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import * as authService from '../../services/authService';
// import styles from './SignupForm.module.css';

// const SignupForm = ({ setUser }) => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     username: '',
//     password: '',
//     passwordConf: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (message) setMessage('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newUserResponse = await authService.signup(formData);
//       setUser(newUserResponse.user);
//       navigate('/');
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   const { firstname, lastname, email, username, password, passwordConf } = formData;

//   const isFormInvalid = () => {
//     return !(firstname && lastname && email && username && password && password === passwordConf);
//   };

//   return (
//     <main className="signup-container">
//       <h1 className="signup-title">Sign Up</h1>
//       {message && <p className="signup-message">{message}</p>}
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <div className="signup-field">
//           <label htmlFor="firstname">First Name:</label>
//           <input
//             type="text"
//             id="firstname"
//             name="firstname"
//             value={firstname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-field">
//           <label htmlFor="lastname">Last Name:</label>
//           <input
//             type="text"
//             id="lastname"
//             name="lastname"
//             value={lastname}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-field">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-field">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-field">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-field">
//           <label htmlFor="passwordConf">Confirm Password:</label>
//           <input
//             type="password"
//             id="passwordConf"
//             name="passwordConf"
//             value={passwordConf}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="signup-buttons">
//           <button type="submit" disabled={isFormInvalid()} className="signup-submit">Sign Up</button>
//           <Link to="/">
//             <button type="button" className="signup-cancel">Cancel</button>
//           </Link>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default SignupForm;


import { useState } from 'react';
import * as authService from '../../services/authService';

const SignupForm = ({ openSignin }) => {
  const [formData, setFormData] = useState({password: '', username: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      // window.location.reload();
    } catch (err) {
      console.log('Signup error:', err);  // Log the error to the console
      setError('Sign up failed. Please try again.');
    }
  };  

  return (
    <div className="signup-form">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="form-button" type="submit">Sign Up</button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <button className="form-switch-button" onClick={openSignin}>Already have an account? Sign in here!</button>
    </div>
  );
};

export default SignupForm;
