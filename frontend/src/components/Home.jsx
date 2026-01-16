import React from 'react';
import profilePic from '../assets/profile.jpg';
// import backgroundVideo from '../assets/background.mp4';
import '../App.css';

const Home = () => {
  return (
    <>
      {/* <video autoPlay muted loop className="video-background">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="hero-content">
        <div>
          <h1>Hi,<br />I'm Arna Chaulia</h1>
          <h2>Web Developer</h2>
          <a href="/contact" className="contact-btn">Contact</a>
        </div>

        <div className="hero-image">
          <img
            src={profilePic}
            alt="Arna Profile"
            className="profile-image"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
