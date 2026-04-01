import './About.css'

export default function About() {
  return (
    <section id="about" data-section="about" className="about section">
      <div className="container">
        <div className="about__grid">
          <div className="about__content animate-in">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Crafting Cloud Infrastructure That Scales</h2>
            <div className="about__text">
              <p>
                I'm an <strong>AWS DevOps Engineer</strong> with 3+ years of hands-on experience
                building cloud-native infrastructure, container orchestration with ECS Fargate,
                and CI/CD automation pipelines that ship code reliably.
              </p>
              <p>
                Currently, I'm architecting the production AWS infrastructure for{' '}
                <a href="https://medzeninnovations.in" target="_blank" rel="noopener noreferrer">
                  Medzen Innovations
                </a>
                , a Chennai-based medical research startup — from VPC networking to Fargate auto-scaling
                to Terraform IaC with dual GitHub Actions pipelines.
              </p>
              <p>
                Previously at <strong>Amazon</strong>, I led zero-downtime migrations, executed
                multi-region expansions across EU, and built event aggregation Lambdas that
                auto-triaged on-call incidents at scale.
              </p>
            </div>
          </div>

          <div className="about__highlights animate-in">
            <div className="about__highlight-card glass-card">
              <div className="about__highlight-icon">☁️</div>
              <div>
                <h4>Cloud Native</h4>
                <p>Serverless-first with ECS Fargate, Lambda, Aurora Serverless</p>
              </div>
            </div>
            <div className="about__highlight-card glass-card">
              <div className="about__highlight-icon">🔄</div>
              <div>
                <h4>GitOps & IaC</h4>
                <p>Terraform, CDK, CloudFormation — infrastructure as version-controlled code</p>
              </div>
            </div>
            <div className="about__highlight-card glass-card">
              <div className="about__highlight-icon">🚀</div>
              <div>
                <h4>CI/CD Automation</h4>
                <p>GitHub Actions, Jenkins, GitLab CI — zero-touch deployments</p>
              </div>
            </div>
            <div className="about__highlight-card glass-card">
              <div className="about__highlight-icon">📊</div>
              <div>
                <h4>Observability</h4>
                <p>Grafana, Prometheus, CloudWatch — real-time dashboards & alerting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
