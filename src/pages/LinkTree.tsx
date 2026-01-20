import { Link } from 'react-router-dom';
import './LinkTree.css';

const links = [
  {
    icon: '📅',
    title: 'Book a Session',
    description: '30-minute private guidance session',
    url: 'https://buy.stripe.com/9B63cu928bHZ7gw0QX8g000',
    featured: true
  },
  {
    icon: '📋',
    title: 'Free Solo Mom Cheat Sheet',
    description: 'Download your guide to getting started',
    url: '#'
  },
  {
    icon: '🌐',
    title: 'Visit My Website',
    description: 'Learn more about my services',
    url: '/',
    internal: true
  },
  {
    icon: '📝',
    title: 'Read the Blog',
    description: 'Insights for your fertility journey',
    url: '/blog',
    internal: true
  },
  {
    icon: '📸',
    title: 'Instagram',
    description: '@solomomintentional',
    url: '#'
  },
  {
    icon: '🎵',
    title: 'TikTok',
    description: '@solomomintentional',
    url: 'https://www.tiktok.com/@solomomintentional?_r=1&_t=ZP-93Eud5GRW5W'
  },
  {
    icon: '👥',
    title: 'Facebook',
    description: 'Join our community',
    url: 'https://www.facebook.com/share/1GK7kPY2wE/?mibextid=wwXIfr'
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    description: 'Connect professionally',
    url: '#'
  },
  {
    icon: '📧',
    title: 'Contact Me',
    description: 'Get in touch',
    url: '/contact',
    internal: true
  }
];

export function LinkTree() {
  return (
    <div className="linktree">
      <div className="linktree-container">
        {/* Profile Section */}
        <div className="linktree-profile">
          <div className="profile-image-wrapper">
            <img
              src="/images/Lisa Hooper2.png"
              alt="Lisa Hooper"
              className="profile-image"
            />
          </div>
          <h1 className="profile-greeting">Hi, I'm Lisa!</h1>
          <p className="profile-intro">
            I'm a Solo Mom by Choice helping professional women navigate their fertility journey with clarity, confidence, and real-life insight. Whether you're considering egg freezing, IVF, or donor conception — I'm here to guide you.
          </p>
        </div>

        {/* Logo Badge */}
        <div className="linktree-badge">
          <img
            src="/images/logo (2).png"
            alt="Solo Mom Intentional"
            className="badge-logo"
          />
        </div>

        {/* Tagline */}
        <p className="linktree-tagline">
          Solo Mom by Choice — Intentional by Design
        </p>

        {/* Links Section */}
        <div className="linktree-links">
          {links.map((link, index) => (
            link.internal ? (
              <Link
                to={link.url}
                className={`linktree-card ${link.featured ? 'featured' : ''}`}
                key={index}
              >
                <span className="card-icon">{link.icon}</span>
                <div className="card-content">
                  <h3 className="card-title">{link.title}</h3>
                  <p className="card-description">{link.description}</p>
                </div>
                <span className="card-arrow">→</span>
              </Link>
            ) : (
              <a
                href={link.url}
                className={`linktree-card ${link.featured ? 'featured' : ''}`}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="card-icon">{link.icon}</span>
                <div className="card-content">
                  <h3 className="card-title">{link.title}</h3>
                  <p className="card-description">{link.description}</p>
                </div>
                <span className="card-arrow">→</span>
              </a>
            )
          ))}
        </div>

        {/* Back to Main Site */}
        <Link to="/" className="back-to-site">
          ← Back to main site
        </Link>

        {/* Copyright Footer */}
        <footer className="linktree-footer">
          <p>&copy; {new Date().getFullYear()} Solo Mom Intentional. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
