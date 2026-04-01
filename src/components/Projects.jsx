import './Projects.css'

const PROJECTS = [
  {
    title: 'Medzen Innovations — AWS Platform',
    description: 'Full-stack AWS infrastructure for a medical research startup. VPC with public/private subnets, ALB + ACM SSL, ECS Fargate cluster with auto-scaling to 100 tasks, ElastiCache Redis, RDS Proxy, Aurora v2 Serverless, Secrets Manager, CloudWatch, SES. Dual GitHub Actions pipelines with Terraform remote state.',
    tech: ['Terraform', 'ECS Fargate', 'Aurora v2', 'ElastiCache', 'RDS Proxy', 'GitHub Actions'],
    year: '2025',
    featured: true,
    link: 'https://medzeninnovations.in',
    color: 'var(--accent-primary)',
  },
  {
    title: 'Subscribe & Save — Amazon Global',
    description: 'Contributed to high-traffic microservice enabling recurring shipments on Amazon\'s global e-commerce platform. Managed Kubernetes clusters and CI/CD pipelines at Amazon scale.',
    tech: ['EKS', 'ECS', 'CloudFormation', 'CDK', 'Lambda'],
    year: '2024–2025',
    color: 'var(--accent-cyan)',
  },
  {
    title: 'SmartCare — Cloud Healthcare Platform',
    description: 'Managed AWS infrastructure for a Swedish digital healthcare platform integrating medical, clinical, and pharmaceutical records with strict compliance requirements.',
    tech: ['AWS', 'Terraform', 'Docker', 'CI/CD', 'Monitoring'],
    year: '2023',
    color: 'var(--accent-emerald)',
  },
  {
    title: 'Quantzig — SaaS Analytics',
    description: 'Supported multi-region AWS deployments for a SaaS analytics platform serving clients across 5 countries (Canada, USA, UK, India, Australia).',
    tech: ['Multi-Region', 'EC2', 'RDS', 'CloudFront', 'Jenkins'],
    year: '2022',
    color: 'var(--accent-purple)',
  },
]

export default function Projects() {
  return (
    <section id="projects" data-section="projects" className="projects section">
      <div className="container">
        <div className="animate-in">
          <span className="section-label">Projects</span>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle">
            Production infrastructure powering real businesses — from startups to global platforms.
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className={`projects__card glass-card animate-in ${project.featured ? 'projects__card--featured' : ''}`}
              style={{ '--card-accent': project.color }}
            >
              <div className="projects__card-top">
                <div className="projects__card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="projects__card-links">
                  <span className="projects__year mono">{project.year}</span>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__external-link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-desc">{project.description}</p>

              <div className="projects__card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="projects__tech-tag mono">{t}</span>
                ))}
              </div>

              {project.featured && (
                <div className="projects__featured-badge mono">★ Featured</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
