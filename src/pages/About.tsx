import './About.css';

export function About() {
  return (
    <>
      <header className="page-header">
        <h1>About Me</h1>
        <p>A Solo Mom by Choice helping professional women navigate their fertility journey</p>
      </header>

      <main className="container about-container">
        <div className="hero-image-container">
          <img src="/images/Lisa Hooper2.png" alt="Lisa Hooper" className="hero-image" />
        </div>

        <section className="about-section">
          <h2>Hi, I'm Lisa.</h2>
          <p>I'm a Solo Mom by Choice who built my family while navigating a demanding professional career. Like many women, I didn't choose this path because I planned to do it alone — I chose it because I didn't want to wait any longer for the right circumstances to start the family I wanted.</p>
          <p>When I began my journey, I was successful, informed, and capable — yet still overwhelmed. There was no clear roadmap, no trusted person to ask real questions, and no resource that spoke to women balancing fertility decisions with full lives and careers.</p>
          <p>I created <strong>Solo Mom by Choice — Intentional by Design</strong> to be the guide I wish I had.</p>
        </section>

        <div className="highlight-box">
          <p>"My goal is simple: to give you clarity, structure, and support so you can make informed decisions about egg freezing, IVF, donor conception, and timing — without fear, confusion, or pressure."</p>
        </div>

        <section className="about-section">
          <h2>You Don't Have to Do This Alone</h2>
          <p>You don't have to figure it out the hard way. Whether you're just starting to explore your options or you're deep in the process and feeling overwhelmed, I'm here to help you make informed decisions with confidence.</p>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Clarity</h3>
              <p>Cut through the overwhelming information and understand your real options based on your unique situation.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">📋</div>
              <h3>Structure</h3>
              <p>Get a clear roadmap that works with your career, finances, and timeline—not against them.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Support</h3>
              <p>Get guidance from someone who truly understands because I've walked this path myself.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
