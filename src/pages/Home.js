import React,{useEffect} from 'react';
import './Home.css';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">SkillSync <span>AI</span></h1>
          <p className="hero-subtitle">
            Empowering job seekers and employers with AI-driven insights for perfect skill matching.
          </p>
          <div className="hero-buttons">
            <button className="hero-button" onClick={() => navigate('/form')}>
              Join Now
            </button>
            <Link 
              to="about-section"
              smooth={true}
              duration={500}
              className="hero-button secondary"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="./hero-image.jpg" alt="Hero Section" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <img src="./job1.jpg" alt="Step 1" className="step-image" />
            <h3>Step 1: Create Your Profile</h3>
            <p>Sign up and share your skills, experience, and career goals.</p>
          </div>
          <div className="step">
            <img src="./job2.png" alt="Step 2" className="step-image" />
            <h3>Step 2: AI Skill Analysis</h3>
            <p>Our AI analyzes your profile to find the best matches and suggest improvements.</p>
          </div>
          <div className="step">
            <img src="./job3.jpg" alt="Step 3" className="step-image" />
            <h3>Step 3: Get Matched</h3>
            <p>Explore job roles tailored to your skills and land your dream job.</p>
          </div>
        </div>
      </section>

      {/* Career Map Section */}
      <section id="career-map-section" className="career-map-section">
        <div class="career-map-content">
          <h2 class="career-map-title">Career Map <span>Overview</span></h2>
          <p class="career-map-subtitle">
              Discover detailed paths for various professions and align your skills to achieve your dream career. 
              SkillSync AI offers tailored guidance to navigate these paths with confidence.
          </p>
          <div class="career-map-buttons">
            <button className="career-map-button" onClick={() => navigate('/career-map')}>
             View Career Map
          </button>
          </div>
        </div>
        <div className="career-map-image">
          <img src="./career-map.jpg" alt="Career Map" />
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="about-section">
        <div className="about-content">
          <h2>About SkillSync AI</h2>
          <p>
            SkillSync AI leverages advanced AI to match job seekers with the right roles based on their skills. We provide 
            personalized recommendations and career tools to help professionals and employers connect more efficiently.
          </p>
          <h3>Our Mission</h3>
          <p>
            Our mission is to connect skilled professionals with the best job opportunities, and assist employers in finding 
            top-tier talent efficiently through AI-driven matching and insights.
          </p>
          <h3>Why Choose Us?</h3>
          <p>
            SkillSync AI offers a smarter, faster way to connect talent with employers, backed by continuous AI-driven 
            support and personalized insights.
          </p>
        </div>
        <div className="about-image">
          <img src="./about-image.jpg" alt="About Us" />
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 SkillSync AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  
  );
};

export default Home;
