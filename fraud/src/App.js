import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Campaigns from './components/Campaigns';
import Feedback from './components/Feedback';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs';
import 'bootstrap/dist/css/bootstrap.css';
import './components/styles/main.css';
import logo from './components/images/wegrow.png';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    alert('You have been logged out.');
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="logo Illustration" className="logo" />
          </div>
          <div className="nav-links">
            <NavLink to="/" className="nav-item" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              to="/campaigns"
              className={`nav-item ${!isLoggedIn ? 'disabled' : ''}`}
              activeClassName="active"
            >
              Campaigns
            </NavLink>
            <NavLink
              to="/feedback"
              className={`nav-item ${!isLoggedIn ? 'disabled' : ''}`}
              activeClassName="active"
            >
              Feedback
            </NavLink>
            <NavLink to="/about-us" className="nav-item" activeClassName="active">
              About Us
            </NavLink>
            <NavLink
              to="/profile"
              className={`nav-item ${!isLoggedIn ? 'disabled' : ''}`}
              activeClassName="active"
            >
              Profile
            </NavLink>
            {!isLoggedIn ? (
              <NavLink to="/sign-in" className="nav-item" activeClassName="active">
                Sign In
              </NavLink>
            ) : (
              <span className="nav-item" onClick={handleLogout}>
                Logout
              </span>
            )}
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/sign-in" />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/sign-in"
            element={<SignIn onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/campaigns"
            element={isLoggedIn ? <Campaigns /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/feedback"
            element={isLoggedIn ? <Feedback /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/sign-in" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
