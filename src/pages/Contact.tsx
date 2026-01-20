import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - you could integrate with a form service
    window.location.href = `mailto:hello@solomomintentional.com?subject=Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <>
      <header className="page-header contact-header">
        <h1>Get In Touch</h1>
        <p>Have questions about your fertility journey? I'm here to help.</p>
      </header>

      <main className="container contact-container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p>Whether you have a quick question or want to learn more about how I can support you, I'd love to hear from you.</p>

            <div className="contact-method">
              <div className="contact-method-icon">📧</div>
              <div className="contact-method-text">
                <h3>Email</h3>
                <p><a href="mailto:hello@solomomintentional.com">hello@solomomintentional.com</a></p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">📱</div>
              <div className="contact-method-text">
                <h3>Social Media</h3>
                <p><a href="#">@solomomintentional</a></p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-method-icon">📅</div>
              <div className="contact-method-text">
                <h3>Book a Call</h3>
                <p><Link to="/book">Schedule a session</Link></p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jane@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me a little about yourself and how I can help..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
