import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Your Fertility Journey, Simplified</p>
          <img src="/images/LisaLogo.png" alt="Solo Mom by Choice — Intentional by Design" className="hero-logo" />
          <p className="hero-subtitle">Clarity and support for professional women navigating solo motherhood.</p>
        </div>
      </section>

      <main className="container">
        <div className="cards-grid">
          {/* Session Overview Card */}
          <div className="card session-highlight">
            <h2>30-Minute Private Session</h2>
            <p>A 30-minute private session where I guide women through the donor conception and single-motherhood-by-choice decision-making process with real-life insight, emotional support, and clear next steps.</p>
            <p style={{ marginTop: '16px' }}>Designed specifically for professional women who are considering becoming Solo Moms by Choice or who have already begun the journey — but feel overwhelmed, unsure, or alone.</p>

            <p className="card-subheading">This Session Gives You</p>
            <ul className="benefits-list">
              <li>A safe, confidential space to ask anything about becoming a Solo Mom by Choice</li>
              <li>Clarity on egg freezing, IVF, PGT-A, and transfers</li>
              <li>Support navigating the emotional and logistical parts of the journey</li>
              <li>Guidance on balancing single motherhood and a demanding career</li>
            </ul>

            <div className="card-note">
              <strong>Bonus:</strong> The Solo Mom by Choice Cheat Sheet (PDF takeaway)
            </div>
          </div>

          {/* Who This Is For Card */}
          <div className="card">
            <h2>Who This Session Is Perfect For</h2>
            <p>Professional women who are:</p>
            <ul className="benefits-list">
              <li>Considering becoming a Solo Mom by Choice</li>
              <li>Unsure where to start</li>
              <li>Feeling overwhelmed by donor selection</li>
              <li>Confused about IVF, meds, vials, and timelines</li>
              <li>Wanting actionable clarity, not vague advice</li>
              <li>Wishing they had support from someone who actually lived the journey</li>
            </ul>
          </div>

          {/* Agenda Card */}
          <div className="card agenda-card">
            <h2>Session Agenda</h2>

            <div className="agenda-item">
              <div className="agenda-time">2–3 min</div>
              <div className="agenda-content">
                <h3>Quick Welcome</h3>
                <p>Where are you in the process? What's top of mind?</p>
              </div>
            </div>

            <div className="agenda-item">
              <div className="agenda-time">20 min</div>
              <div className="agenda-content">
                <h3>Your Top Questions</h3>
                <p>We focus on what matters most to you:</p>
                <ul className="agenda-topics">
                  <li>Donor selection</li>
                  <li>Egg freezing</li>
                  <li>IVF & PGT-A</li>
                  <li>Transfer decisions</li>
                  <li>Emotional readiness</li>
                  <li>Career planning & timing</li>
                  <li>Cost expectations</li>
                </ul>
              </div>
            </div>

            <div className="agenda-item">
              <div className="agenda-time">5 min</div>
              <div className="agenda-content">
                <h3>Clear Next Steps</h3>
                <p>You walk away with a personalized plan so you know exactly what to do next.</p>
              </div>
            </div>

            <div className="card-highlight">
              <p><strong>PDF Follow-Up:</strong> The Solo Mom by Choice Cheat Sheet</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-testimonial cta-testimonial-left">
            <p className="cta-testimonial-text">"Lisa's knowledge of the IVF process is incredibly thoughtful and practical. She helped me understand what to expect, ask the right questions, and feel more confident in my decisions."</p>
            <p className="cta-testimonial-author">— Addi, Account Executive</p>
          </div>
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Book your 30-minute session and take the first step with clarity and confidence.</p>
            <Link to="/book" className="cta-button">Book Your Session</Link>
          </div>
          <div className="cta-testimonial cta-testimonial-right">
            <p className="cta-testimonial-text">"Lisa normalized everything I was feeling and helped me approach it with confidence instead of fear. And now I have healthy eggs for when I am ready."</p>
            <p className="cta-testimonial-author">— Lindsay, Account Director</p>
          </div>
        </div>
      </main>
    </>
  );
}
