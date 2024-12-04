import React,{useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = () => {
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
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations = location.state?.recommendations || [];
  const recommendpagestyle = {
    backgroundImage: "url('/jobrecommendationbackground.jpg')",
    backgroundSize: 'cover', // Ensures the image covers the entire area proportionally
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    backgroundAttachment: 'fixed', // Keeps the background fixed on scroll
    backgroundPosition: 'center top', // Positions the image
    minHeight: '100vh', // Sets minimum height to viewport height
    width: '100%', // Ensures full width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const backgroundOverlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    opacity:'0.8',
    bottom: '0',
    background: 'rgba(0, 0, 0, 0.1)', // Set the opacity of the background image here
    zIndex: '-1', // Keeps the overlay behind the content
  };

  return (
    <div style={recommendpagestyle}>
      {/* Background overlay */}
      <div style={backgroundOverlayStyle}></div>

      <div className="recommendations-content">
        <h1 className="recommendations-title">Job Recommendations</h1>
        {recommendations.length > 0 ? (
          <div className="recommendations-list">
            {recommendations.map((job, index) => (
              <div className="recommendation-card" key={index}>
                <h2 className="job-title">{job['Job Title']?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</h2>
                <div className="skills-container">
                <ul className="skills-list">
                    {job['Skills Required'].split('|').map((skill, i) => (
                      <li className="skill-item" key={i}>
                        {skill.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                      </li>
                    ))}
                </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recommendations">No recommendations to display.</p>
        )}
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Back to Form
        </button>
      </div>
    </div>
    
  );
};

export default Recommendations;