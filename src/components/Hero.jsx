import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    const roles = [
      'AWS DevOps Engineer',
      'Cloud Architect',
      'Infrastructure Builder',
      'CI/CD Specialist',
    ]
    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    const el = titleRef.current

    function type() {
      const currentRole = roles[roleIndex]
      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIndex - 1)
        charIndex--
      } else {
        el.textContent = currentRole.substring(0, charIndex + 1)
        charIndex++
      }

      let speed = isDeleting ? 40 : 80

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        speed = 400
      }

      setTimeout(type, speed)
    }

    type()
  }, [])

  return (
    <section id="hero" data-section="hero" className="hero section">
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__greeting mono animate-in">
            <span className="hero__line-number">01</span>
            <span>Hello, I'm</span>
          </div>

          <h1 className="hero__name animate-in">
            Hemachandiran<br />
            <span className="hero__name-accent">Giri</span>
          </h1>

          <div className="hero__role animate-in">
            <span className="hero__role-prefix mono">&gt;_</span>
            <span ref={titleRef} className="hero__role-text mono"></span>
            <span className="hero__cursor">|</span>
          </div>

          <p className="hero__bio animate-in">
            Building production-grade cloud infrastructure at scale.
            <br />
            AWS Certified. Ex-Amazon. Currently freelancing.
          </p>

          <div className="hero__cta animate-in">
            <a href="#projects" className="hero__btn hero__btn--primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero__stats animate-in">
            <div className="hero__stat">
              <span className="hero__stat-number">3+</span>
              <span className="hero__stat-label">Years Exp.</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">2x</span>
              <span className="hero__stat-label">AWS Certified</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">5+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
          </div>
        </div>

        <div className="hero__visual animate-in">
          <div className="hero__terminal">
            <div className="hero__terminal-bar">
              <div className="hero__terminal-dots">
                <span style={{ background: '#ff5f56' }} />
                <span style={{ background: '#ffbd2e' }} />
                <span style={{ background: '#27c93f' }} />
              </div>
              <span className="hero__terminal-title mono">hemachandiran@aws ~ </span>
            </div>
            <div className="hero__terminal-body mono">
              <div className="hero__terminal-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd"> aws ecs describe-clusters</span>
              </div>
              <div className="hero__terminal-line t-output">
                <span className="t-key">"clusterName"</span>: <span className="t-string">"medzen-prod"</span>,
              </div>
              <div className="hero__terminal-line t-output">
                <span className="t-key">"status"</span>: <span className="t-success">"ACTIVE"</span>,
              </div>
              <div className="hero__terminal-line t-output">
                <span className="t-key">"runningTasksCount"</span>: <span className="t-number">42</span>,
              </div>
              <div className="hero__terminal-line t-output">
                <span className="t-key">"capacityProviders"</span>: [<span className="t-string">"FARGATE"</span>, <span className="t-string">"FARGATE_SPOT"</span>]
              </div>
              <div className="hero__terminal-line">
                <span className="t-prompt">$</span>
                <span className="t-cmd"> terraform plan</span>
              </div>
              <div className="hero__terminal-line t-output">
                <span className="t-success">Plan: 0 to add, 0 to change, 0 to destroy.</span>
              </div>
              <div className="hero__terminal-line">
                <span className="t-prompt">$</span>
                <span className="t-cursor">▊</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span className="mono">scroll</span>
      </div>
    </section>
  )
}
