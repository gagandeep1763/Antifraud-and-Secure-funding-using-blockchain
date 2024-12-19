import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signin.css';
import welcomeImage from './images/logo.png';

const SignIn = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setPasswordMatchError('');
    setLoginError('');
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match!');
      return;
    }

    const user = { username, name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful!');
    form.reset();
    toggleForm(); 
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setLoginError('No user found. Please register first.');
      return;
    }

    if (storedUser.username === username && storedUser.password === password) {
      alert('Login successful!');
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
      navigate('/'); 
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div className="signin-page">
      <div className="main-section">
        <div className="welcome-section">
          <img src={welcomeImage} alt="Welcome Illustration" className="welcome-image" />
          <h1>Welcome to WEGROW Secure Funding</h1>
          <hr />
          <p>Join our secure blockchain-based platform for fundraising. Join the movement to create a better world.</p>
        </div>

        <div className="form-section">
          {isRegister ? (
            <div className="form-container">
              <h2>Register</h2>
              <form onSubmit={handleRegisterSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />

                {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
                <button type="submit">Register</button>
              </form>
              <p className="switch-link">
                Already have an account?{' '}
                <span onClick={toggleForm} className="toggle-form">
                  Sign In here
                </span>
              </p>
            </div>
          ) : (
            <div className="form-container">
              <h2>Sign In</h2>
              <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                {loginError && <p className="error-message">{loginError}</p>}

                <button type="submit">Sign In</button>
              </form>
              <p className="switch-link">
                New user?{' '}
                <span onClick={toggleForm} className="toggle-form">
                  Register here
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
