import './Book.css';

export function Book() {
  return (
    <>
      <header className="page-header book-header">
        <h1>Book a Session</h1>
        <p>One-on-one guidance for your fertility journey</p>
      </header>

      <main className="container book-container">
        <div className="intro-text">
          <p>Ready to take the next step? Book a session and get the clarity and confidence you need to move forward on your fertility journey.</p>
        </div>

        {/* About the Session */}
        <div className="about-session">
          <div className="about-session-content">
            <h2>About the Session</h2>
            <p className="session-description">Becoming a Solo Mom by Choice is an empowered decision, but the process can feel overwhelming, isolating, and unclear. I help women cut through the noise, understand their options, and move forward with confidence — without putting their careers or lives on pause.</p>
          </div>
          <div className="what-youll-gain">
            <h3>What You'll Gain</h3>
            <div className="gain-items">
              <div className="gain-item">
                <span className="gain-icon">✨</span>
                <span className="gain-text">Confidence</span>
              </div>
              <div className="gain-item">
                <span className="gain-icon">🔍</span>
                <span className="gain-text">Clarity</span>
              </div>
              <div className="gain-item">
                <span className="gain-icon">📍</span>
                <span className="gain-text">Next Steps</span>
              </div>
              <div className="gain-item">
                <span className="gain-icon">💜</span>
                <span className="gain-text">Support</span>
              </div>
              <div className="gain-item bonus">
                <span className="gain-icon">📋</span>
                <span className="gain-text">Cheat Sheet Included</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sessions-grid">
          {/* Clarity Session */}
          <div className="session-card featured">
            <div className="session-header">
              <h2>Clarity Session</h2>
              <span className="duration">30 minutes</span>
            </div>
            <div className="session-price">
              <span className="price">$100</span>
              <span className="per">/ session</span>
            </div>
            <div className="session-body">
              <p>A deep-dive session to create a clear action plan for your fertility journey, tailored to your unique situation.</p>
              <ul className="session-features">
                <li>Comprehensive situation review</li>
                <li>Personalized action plan</li>
                <li>Cost & timeline breakdown</li>
                <li>Clinic & provider guidance</li>
                <li>Follow-up email summary</li>
              </ul>
              <a href="https://buy.stripe.com/9B63cu928bHZ7gw0QX8g000" className="btn-book-session">Book Clarity Session</a>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="testimonials-section">
          <h2>What Women Are Saying</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">Lisa's knowledge of the IVF process is incredibly thoughtful and practical. She helped me understand what to expect, ask the right questions, and feel more confident in my decisions. Having her insight brought a sense of calm and clarity during a time that can otherwise feel very uncertain. I'm so grateful for her guidance during such an emotional journey.</p>
              <div className="testimonial-author">
                <p className="author-name">Addi</p>
                <p className="author-title">Account Executive</p>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">When I spoke with Lisa, I had already gone through IVF and the sperm donor process, but I was starting to get scared about how I would manage it all as a single mom with a demanding career. Talking to Lisa put me at ease. She did not sugarcoat the hard parts, but she showed me how it can work. I walked away feeling so much better.</p>
              <div className="testimonial-author">
                <p className="author-name">Daniella</p>
                <p className="author-title">Director of IT</p>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">I felt stressed from every angle–job, getting older, being single even though I was trying to find someone–and egg freezing scared me. Lisa normalized everything I was feeling and helped me approach it with confidence instead of fear. And now I have healthy eggs for when I am ready which puts me at ease.</p>
              <div className="testimonial-author">
                <p className="author-name">Lindsay</p>
                <p className="author-title">Account Director</p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Common Questions</h2>

          <div className="faq-item">
            <h3>How do sessions work?</h3>
            <p>All sessions are conducted via video call (Zoom). After booking, you'll receive a confirmation email with the link and any prep materials.</p>
          </div>

          <div className="faq-item">
            <h3>What if I need to reschedule?</h3>
            <p>Life happens! You can reschedule up to 24 hours before your appointment at no charge.</p>
          </div>

          <div className="faq-item">
            <h3>Is everything confidential?</h3>
            <p>Absolutely. Everything we discuss stays between us. Your privacy is my priority.</p>
          </div>
        </section>
      </main>
    </>
  );
}
