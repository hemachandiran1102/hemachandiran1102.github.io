import './Experience.css'

const EXPERIENCES = [
  {
    title: 'Freelance DevOps / Automation Engineer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'Jun 2025 — Present',
    current: true,
    bullets: [
      'Architected production-grade AWS infrastructure (ap-south-1) from scratch for Medzen Innovations — ECS Fargate, Aurora v2, ElastiCache Redis, Terraform IaC, dual GitHub Actions CI/CD pipelines.',
      'Built self-hosted n8n workflow automation with WhatsApp Business API for local SMBs, automating order notifications and appointment scheduling.',
    ],
    tags: ['AWS', 'Terraform', 'ECS Fargate', 'GitHub Actions', 'n8n'],
  },
  {
    title: 'DevOps Engineer (L3)',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: 'Jun 2024 — Jun 2025',
    logo: '🟠',
    bullets: [
      'Managed containerised applications on Kubernetes (EKS) and Amazon ECS, ensuring high availability, auto-scaling, and persistent storage across multiple microservice clusters.',
      'Led zero-downtime migration of customer-facing services from Citrix NetScaler to Tardigrade Load Balancer using CloudFormation and CDK templates.',
      'Executed region expansion from Ireland (eu-west-1) to Spain (eu-south-2), provisioning SQS, DynamoDB, RDS, Lambda, and OpenSearch.',
      'Developed EventAggregatorLambda aggregating Weblab, MCM, and IGraph events, auto-commenting diagnostic metrics on on-call tickets.',
    ],
    tags: ['EKS', 'ECS', 'CDK', 'CloudFormation', 'Lambda'],
  },
  {
    title: 'Network Engineer & DevOps Support (L1.5 / L2)',
    company: 'Infiniti Research — Cessna Business Park',
    location: 'Bangalore, India',
    period: 'May 2023 — May 2024',
    bullets: [
      'Managed end-to-end release lifecycle using Azure DevOps Pipelines and AWS CodePipeline, reducing deployment time by 30%.',
      'Maintained Grafana and Prometheus dashboards with threshold-based alerts integrated with PagerDuty and Squadcast.',
      'Implemented IaC with Terraform and CloudFormation; supported EKS cluster operations.',
      'Enforced security via Veracode (SAST) and SonarQube in CI/CD gates.',
    ],
    tags: ['Azure DevOps', 'Grafana', 'Terraform', 'EKS', 'Veracode'],
  },
  {
    title: 'Freelance DevOps Engineer',
    company: 'Self-Employed (RoR Application)',
    location: 'Remote',
    period: 'Jan 2023 — May 2023',
    bullets: [
      'Migrated payment gateway from Elastic Beanstalk to AWS Fargate serverless architecture, improving scalability and eliminating server management overhead.',
    ],
    tags: ['AWS Fargate', 'Elastic Beanstalk', 'Docker'],
  },
  {
    title: 'DevOps & Release Engineer',
    company: 'PondyBiz Technologies',
    location: 'Pondicherry, India',
    period: 'Jan 2022 — Dec 2022',
    bullets: [
      'Managed releases across 5 environments using Jenkins and GitLab CI/CD for Node.js, Vue.js, PHP, and Rails stacks.',
      'Provisioned 3-tier AWS architectures (EC2, RDS, S3, CloudFront, VPC); configured NGINX and Apache.',
      'Built CloudWatch dashboards with SNS alerting for uptime SLAs.',
    ],
    tags: ['Jenkins', 'GitLab CI', 'NGINX', 'CloudWatch'],
  },
]

export default function Experience() {
  return (
    <section id="experience" data-section="experience" className="experience section">
      <div className="container">
        <div className="animate-in">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Where I've Worked</h2>
          <p className="section-subtitle">
            From startups to Amazon, building infrastructure that powers millions of users.
          </p>
        </div>

        <div className="experience__timeline">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="experience__item animate-in">
              <div className="experience__timeline-marker">
                <div className={`experience__dot ${exp.current ? 'experience__dot--active' : ''}`} />
                {i < EXPERIENCES.length - 1 && <div className="experience__line" />}
              </div>

              <div className="experience__card glass-card">
                <div className="experience__header">
                  <div>
                    <h3 className="experience__title">{exp.title}</h3>
                    <div className="experience__meta">
                      <span className="experience__company">
                        {exp.logo && <span className="experience__company-logo">{exp.logo}</span>}
                        {exp.company}
                      </span>
                      <span className="experience__separator">•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="experience__period mono">{exp.period}</span>
                </div>

                <ul className="experience__bullets">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>

                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
