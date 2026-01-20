import { Link } from 'react-router-dom';
import './Partners.css';

const partners = [
  {
    icon: '🏥',
    name: 'Fertility Clinic',
    type: 'Medical Partner',
    description: 'Leading fertility specialists providing comprehensive IVF, egg freezing, and reproductive care services.',
    link: '#'
  },
  {
    icon: '🧬',
    name: 'Sperm Bank',
    type: 'Donor Services',
    description: 'Trusted donor sperm bank with extensive donor profiles and excellent support throughout the selection process.',
    link: '#'
  },
  {
    icon: '💼',
    name: 'Fertility Benefits',
    type: 'Financial Partner',
    description: 'Helping you navigate insurance benefits and financing options for your fertility treatments.',
    link: '#'
  },
  {
    icon: '🧘',
    name: 'Wellness Support',
    type: 'Holistic Care',
    description: 'Mental health and wellness resources specifically designed for women on their fertility journey.',
    link: '#'
  },
  {
    icon: '⚖️',
    name: 'Legal Services',
    type: 'Legal Partner',
    description: 'Family law attorneys specializing in donor agreements, parental rights, and solo parent documentation.',
    link: '#'
  },
  {
    icon: '👶',
    name: 'Parenting Resources',
    type: 'Community',
    description: 'Solo mom communities and resources for support before, during, and after your journey to motherhood.',
    link: '#'
  }
];

export function Partners() {
  return (
    <>
      <header className="page-header partners-header">
        <h1>Our Partners</h1>
        <p>Trusted resources and providers supporting your journey to solo motherhood</p>
      </header>

      <main className="container partners-container">
        <div className="intro-text">
          <p>I've partnered with trusted professionals and organizations who share my commitment to supporting women on their fertility journey. Each partner has been personally vetted to ensure they provide exceptional care and service.</p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div className="partner-card" key={index}>
              <div className="partner-logo-placeholder">{partner.icon}</div>
              <h3>{partner.name}</h3>
              <p className="partner-type">{partner.type}</p>
              <p>{partner.description}</p>
              <a href={partner.link} className="partner-link">Learn More</a>
            </div>
          ))}
        </div>

        <div className="partner-cta">
          <h2>Become a Partner</h2>
          <p>Are you a provider or organization that supports women on their fertility journey? Let's connect.</p>
          <Link to="/contact" className="partner-cta-button">Get in Touch</Link>
        </div>
      </main>
    </>
  );
}
