import './Skills.css'

const SKILL_CATEGORIES = [
  {
    title: 'Cloud Platforms',
    color: 'var(--accent-primary)',
    items: [
      { name: 'AWS ECS Fargate', level: 95 },
      { name: 'AWS Lambda', level: 88 },
      { name: 'Aurora / RDS', level: 90 },
      { name: 'ElastiCache', level: 85 },
      { name: 'CloudFront / S3', level: 92 },
      { name: 'Azure DevOps', level: 78 },
    ],
  },
  {
    title: 'Infrastructure as Code',
    color: 'var(--accent-cyan)',
    items: [
      { name: 'Terraform', level: 93 },
      { name: 'CloudFormation', level: 88 },
      { name: 'AWS CDK', level: 82 },
      { name: 'Pulumi', level: 70 },
      { name: 'AWS SAM', level: 75 },
    ],
  },
  {
    title: 'Containers & CI/CD',
    color: 'var(--accent-purple)',
    items: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes (EKS)', level: 80 },
      { name: 'GitHub Actions', level: 95 },
      { name: 'Jenkins', level: 85 },
      { name: 'GitLab CI/CD', level: 82 },
    ],
  },
  {
    title: 'Monitoring & Security',
    color: 'var(--accent-emerald)',
    items: [
      { name: 'Grafana', level: 90 },
      { name: 'Prometheus', level: 85 },
      { name: 'CloudWatch', level: 92 },
      { name: 'Veracode / SonarQube', level: 78 },
      { name: 'Secrets Manager', level: 90 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" data-section="skills" className="skills section">
      <div className="container">
        <div className="animate-in">
          <span className="section-label">Technical Skills</span>
          <h2 className="section-title">Tools & Technologies</h2>
          <p className="section-subtitle">
            Specialized in AWS cloud services, container orchestration, and DevOps automation.
          </p>
        </div>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={cat.title} className="skills__category glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <h3 className="skills__category-title" style={{ color: cat.color }}>
                {cat.title}
              </h3>
              <div className="skills__items">
                {cat.items.map((skill) => (
                  <div key={skill.name} className="skills__item">
                    <div className="skills__item-header">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-level mono">{skill.level}%</span>
                    </div>
                    <div className="skills__bar">
                      <div
                        className="skills__bar-fill"
                        style={{
                          '--fill-width': `${skill.level}%`,
                          '--fill-color': cat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
