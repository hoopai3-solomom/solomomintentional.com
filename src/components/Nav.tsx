import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/images/logo (2).png" alt="Solo Mom Intentional" className="nav-logo-img" />
        </Link>
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link to="/blog" className={isActive('/blog') || location.pathname.startsWith('/blog/') ? 'active' : ''}>Blog</Link></li>
          <li><Link to="/partners" className={isActive('/partners') ? 'active' : ''}>Partners</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          <li><Link to="/book" className="btn-book">Book a Session</Link></li>
        </ul>
      </div>
    </nav>
  );
}
