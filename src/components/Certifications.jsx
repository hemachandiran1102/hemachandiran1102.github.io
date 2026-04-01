import './Certifications.css'

const CERTS = [
  {
    name: 'AWS Certified DevOps Engineer',
    level: 'Professional',
    status: 'Valid until Feb 2027',
    icon: '🏆',
    color: 'var(--accent-primary)',
    badge: 'PRO',
  },
  {
    name: 'AWS Certified Solutions Architect',
    level: 'Associate',
    status: 'Renewal in progress',
    icon: '🏅',
    color: 'var(--accent-cyan)',
    badge: 'SAA',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" data-section="certifications" className="certifications section">
      <div className="container">
        <div className="animate-in">
          <span className="section-label">Certifications</span>
          <h2 className="section-title">AWS Certified</h2>
        </div>

        <div className="certs__grid">
          {CERTS.map((cert, i) => (
            <div key={i} className="certs__card glass-card animate-in" style={{ '--cert-color': cert.color }}>
              <div className="certs__badge mono">{cert.badge}</div>
              <div className="certs__icon">{cert.icon}</div>
              <h3 className="certs__name">{cert.name}</h3>
              <span className="certs__level">{cert.level}</span>
              <span className="certs__status mono">{cert.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
