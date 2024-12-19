import React from 'react';
import './styles/feedback.css';
import QR from './images/QR.jpg';
import BackgroundImage from './styles/bg.png'; 

const Feedback = () => {
  const openFeedbackForm = () => {
    window.open("https://forms.gle/msyKmWjohEqqNx826", "_blank");
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className="App-header">
        <h1 className="myh1">We Value Your Feedback!</h1>
        <p className="myp">
          Your feedback helps us improve our service. Please share your thoughts with us.
        </p>
        <button className="feedback-button" onClick={openFeedbackForm}>
          Give Your Feedback
        </button>
        <div className="qr-container">
          <img
            src={QR}
            alt="QR Code for Feedback Form"
            className="qr-code"
          />
        </div>
      </header>
    </div>
  );
};

export default Feedback;
