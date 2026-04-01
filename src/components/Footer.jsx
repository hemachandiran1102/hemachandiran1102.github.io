import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span className="footer__logo mono">
            <span style={{ color: 'var(--accent-primary)' }}>&lt;</span>
            HG
            <span style={{ color: 'var(--accent-primary)' }}>/&gt;</span>
          </span>
          <span className="footer__credit">
            Designed & Built by Hemachandiran Giri
          </span>
        </div>

        <div className="footer__links">
          <a href="https://github.com/hemachandiran1102" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/hemachandiran-g-43099bb7/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:hemachandiran1102@hotmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
