import { useState } from 'react';
import * as authService from '../../services/authService';

const SigninForm = ({ openSignup }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signin(formData);
      window.location.reload();
    } catch (err) {
      setError('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <div className="signin-form">
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form-input"
          type="text"
          name="username"
          placeholder="usernmae"
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="form-button" type="submit">Sign In</button>
      </form>
      {error && <p className="form-error">{error}</p>}
      <button className="form-switch-button" onClick={openSignup}>Don't have an account? Sign up here!</button>
    </div>
  );
};

export default SigninForm;

