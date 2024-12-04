import React, { useState,useEffect } from 'react';
import './CareerMap.css';

const professions = [
  'engineer-manager',
  'developer-reactions',
  'product-manager',
  'mlops',
  'technical-writer',
  'game-developer',
  'ux-design',
  'cybersecurity',
  'software-architect',
  'qa',
  'blockchain',
  'postgresql',
  'ios-developer',
  'android-developer',
  'data-analyst',
  'ai-developer',
  'fullstack-developer',
  'devops',
  'frontend-developer',
  'backend-developer',
];

const CareerMap = () => {
  const [selectedProfession, setSelectedProfession] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  useEffect(() => {
    const body = document.body;
    body.classList.add('page-transition');

    // Remove the transition class after page load
    setTimeout(() => {
      body.classList.remove('page-transition');
    }, 500);

    return () => {
      body.classList.add('page-transition');
    };
  }, []);
  return (
    <div className="career-map-container">
      <div className="career-heading">
        <h1>Career Map</h1>
        <p>
          Discover various career paths and find the right one for you. Explore detailed roadmaps and resources for each profession.
        </p>
      </div>

      <div className="career-introduction">
      {/* Career Intro Text */}
        <div className="career-intro-text">
          <p>
            Welcome to the Career Map. Here you can explore various career paths and gain valuable insights into each profession. Choose your desired profession to learn more about the opportunities, skills, and roadmaps available to you.
          </p>
        </div>

        {/* Career Images (Left and Right) */}
        <div className="career-images">
          <img
            src="./jobrecommendation1.jpg" // Replace with actual image paths
            alt="Career Recommendation 1"
            className="career-image"
          />
          <img
            src="./jobrecommendation2.jpg" // Replace with actual image paths
            alt="Career Recommendation 2"
            className="career-image"
          />
        </div>

        {/* Second Paragraph Text */}
        <div className="career-intro-text">
          <p>
            Whether you are starting your career journey or looking to switch paths, this map will guide you step by step. Get an overview of each profession, what skills you need, and how to succeed in your chosen field.
          </p>
        </div>
      </div>

      {/* Profession List */}
      <div className="profession-list">
        {professions.map((profession) => (
          <div
            key={profession}
            className="profession-item"
            onClick={() => setSelectedProfession(profession)}
          >
            <h3>{profession.replace('-', ' ').toUpperCase()}</h3>
          </div>
        ))}
      </div>

      {selectedProfession && (
        <div className="profession-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedProfession.replace('-', ' ').toUpperCase()}</h2>
              <button className="close-button" onClick={() => setSelectedProfession(null)}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <img
                src={`./${selectedProfession}.png`}
                alt={selectedProfession}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 SkillSync AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CareerMap;
