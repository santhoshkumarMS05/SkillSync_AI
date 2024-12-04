import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {

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

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    experience: '',
    skills: '',
    desiredRole: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the Flask API
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        {
          skills: formData.skills,
          desiredRole: formData.desiredRole,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setError('');
        // Navigate to the recommendations page and pass the results
        navigate('/recommendations', { state: { recommendations: response.data } });
      } else {
        setError('No recommendations found for the given input.');
      }
    } catch (err) {
      console.error('Error from Flask:', err);
      setError('Failed to get recommendations. Please try again.');
    }
  };
  const formPageStyle = {
    backgroundImage: `url('/background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0, // Start with opacity 0 for smooth transition
    animation: 'fadeIn 0.5s forwards', // Add fade-in animation
  };
  

  return (
    <div style={formPageStyle}>
      <div className="form-container">
        <h1 className="form-title">Job Seeking Form</h1>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Full Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your full name"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userEmail">Email Address</label>
            <input
              type="email"
              id="userEmail"
              placeholder="Enter your email"
              value={formData.userEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <input
              type="number"
              id="experience"
              placeholder="e.g., 5"
              value={formData.experience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Your Skills</label>
            <textarea
              id="skills"
              rows="4"
              placeholder="List your skills (e.g., Python, Data Analysis)"
              value={formData.skills}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="desiredRole">Desired Job Role</label>
            <input
              type="text"
              id="desiredRole"
              placeholder="Enter your desired job role"
              value={formData.desiredRole}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      
    </div>
  );
};

export default Form;
