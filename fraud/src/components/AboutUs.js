import React, { useEffect } from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.8) {
          section.style.animationPlayState = 'running'; 
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="about-us">

      <section className="about-section first-section">
        <div className="content">
          <h2>About Our Project</h2>
          <p>
            Secure Fund Raising using Blockchain is a revolutionary project aimed at ensuring transparency 
            and accountability in fundraising processes. By leveraging blockchain technology, our solution 
            guarantees that every transaction is secure, immutable, and verifiable. This project addresses 
            the challenges of traditional fundraising by providing a decentralized platform for donations 
            and fund management, fostering trust among contributors.
          </p> 
          <br></br>
          <p>
          Through Secure Fund Raising using Blockchain, we aim to redefine how fundraising is conducted 
          in the digital era. Our mission is to empower both fundraisers and contributors with a trustless 
          system where every donation counts, and every transaction is accounted for.This project is a step towards 
          creating a fair, efficient, and trustworthy ecosystem for global fundraising initiatives.
    
          </p>
        </div>
      </section>

      <section className="about-section second-section">
        <div className="content">
          <h2>About the Team</h2>
          <p>
          We are students of RV Institute of Technology and Management, affiliated with VTU University, 
          pursuing a Bachelor of Engineering in Computer Science and Engineering (CSE). Our team consists 
          of Aryan Eshwar K A, Chinmay Kishor Naik, Darshan M S, and Gagandeep D.
          </p>
          <br></br>
        <p>
         This project, part of our 5th-semester subject (BCS586) mini-project, reflects our passion for 
         combining theoretical concepts with practical implementation. By leveraging blockchain technology 
         and innovative development practices, we aim to create impactful solutions that address real-world problems. 
         Our collaborative efforts and shared vision have made this project a significant learning experience and a 
         testament to our technical skills and teamwork.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
