import React from 'react';
import profilePic from '../assets/profile.jpg';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-header">
        <img
          src={profilePic}
          alt="Profile"
          className="about-profile-img"
        />
        <div>
          <h2>About Me</h2>
          <p>
            Hi! I'm a B.Tech graduate in Computer Science with a strong passion for web development.
            I enjoy building responsive and interactive web applications and always strive to learn new technologies.
          </p>
        </div>
      </div>
      <div className="about-details">
        <h3>Education</h3>
        <ul>
          <li>B.Tech in Computer Science</li>
        </ul>
        <h3>Interests</h3>
        <ul>
          <li>Web Development</li>
          <li>UI/UX Design</li>
          <li>Open Source Contribution</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
