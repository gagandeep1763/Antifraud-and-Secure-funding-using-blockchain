import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css'; 

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate(); 

  const handlePasswordChange = (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields.');
      return;
    }

    if (storedUser.password !== currentPassword) {
      setPasswordError('Current password is incorrect.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    const updatedUser = { ...storedUser, password: newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setPasswordError('');
    setSuccessMessage('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user'); 
    navigate('/sign-in'); 
  };

  if (!storedUser) {
    return <p style={{ textAlign: 'center' }}>Please log in or register to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>User Profile</h2>
        <form className="profile-details">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={storedUser.username} readOnly />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={storedUser.name} readOnly />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={storedUser.email} readOnly />
          </div>
        </form>
        <div className="button-group">
          <button
            className="change-password-button"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        {showPasswordForm && (
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="update-password">
              <button type="submit">Update Password</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
