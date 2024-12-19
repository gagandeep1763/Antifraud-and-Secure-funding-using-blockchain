import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/home.css';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMetaMask, setShowMetaMask] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const metaMaskSection = document.querySelector('.donation-section');
      const exploreSection = document.querySelector('.explore-section');

      if (metaMaskSection && window.scrollY + window.innerHeight > metaMaskSection.offsetTop + 100) {
        setShowMetaMask(true);
      }

      if (exploreSection && window.scrollY + window.innerHeight > exploreSection.offsetTop + 100) {
        setShowExplore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
      );
    }
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => alert(`Connected wallet: ${accounts[0]}`))
        .catch((err) => console.error('Error connecting wallet:', err));
    } else {
      alert('MetaMask not found. Please install the extension!');
    }
  };

  return (
    <div className="home-container">
      <div className="carousel">
        <button className="slide-button left" onClick={() => handleSlideChange('prev')}>
          &#60;
        </button>
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          <div className="slide" id="slide1"></div>
          <div className="slide" id="slide2"></div>
          <div className="slide" id="slide3"></div>
          <div className="slide" id="slide4"></div>
        </div>
        <button className="slide-button right" onClick={() => handleSlideChange('next')}>
          &#62;
        </button>
      </div>
      <div className={`donation-section ${showMetaMask ? 'fade-in' : ''}`}>
        <h2>How to Donate Using MetaMask</h2>
        <p>1. Install the MetaMask browser extension or app and create a wallet.</p>
        <p>2. Connect your wallet to our platform securely.</p>
        <p>3. Select the campaign you want to support and donate directly from your wallet.</p>
        <p>4. Your donation is securely recorded on the blockchain.</p>

        <button className="connect-wallet" onClick={connectWallet}>
          Connect MetaMask Wallet
        </button>
      </div>
      <div className={`explore-section ${showExplore ? 'fade-in' : ''}`}>
        <h2>Explore Campaigns</h2>
        <p>
          Discover inspiring campaigns that need your support. Your contribution can make a real
          difference in someone's life.
        </p>
        <p>
          Browse through various causes, select one that resonates with you, and donate securely
          with MetaMask.
        </p>
        <Link to="/campaigns">
          <button className="explore-button">Explore Campaigns</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
