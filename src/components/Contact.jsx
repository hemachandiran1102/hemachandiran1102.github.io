import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" data-section="contact" className="contact section">
      <div className="container">
        <div className="contact__inner animate-in">
          <span className="section-label">Get In Touch</span>
          <h2 className="contact__title">Let's Build Something Together</h2>
          <p className="contact__text">
            I'm currently open to freelance DevOps projects, cloud architecture consulting,
            and full-time opportunities. Whether you need AWS infrastructure from scratch or
            CI/CD pipeline automation — let's talk.
          </p>

          <div className="contact__links">
            <a href="mailto:hemachandiran1102@hotmail.com" className="contact__link glass-card">
              <div className="contact__link-icon">✉️</div>
              <div>
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">hemachandiran1102@hotmail.com</span>
              </div>
            </a>

            <a href="tel:+918754131660" className="contact__link glass-card">
              <div className="contact__link-icon">📱</div>
              <div>
                <span className="contact__link-label">Phone</span>
                <span className="contact__link-value">+91-8754131660</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/hemachandiran-g-43099bb7/" target="_blank" rel="noopener noreferrer" className="contact__link glass-card">
              <div className="contact__link-icon">💼</div>
              <div>
                <span className="contact__link-label">LinkedIn</span>
                <span className="contact__link-value">hemachandiran-g</span>
              </div>
            </a>

            <a href="https://github.com/hemachandiran1102" target="_blank" rel="noopener noreferrer" className="contact__link glass-card">
              <div className="contact__link-icon">🐙</div>
              <div>
                <span className="contact__link-label">GitHub</span>
                <span className="contact__link-value">hemachandiran1102</span>
              </div>
            </a>
          </div>

          <a href="mailto:hemachandiran1102@hotmail.com" className="contact__cta">
            <span>Say Hello</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
