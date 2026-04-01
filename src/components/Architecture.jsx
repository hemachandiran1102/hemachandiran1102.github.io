import { useState } from 'react'
import './Architecture.css'

export default function Architecture() {
  const [expanded, setExpanded] = useState(false)

  const sections = [
    { num: '01', title: 'GitOps & Dual CI/CD', desc: 'Two repos (Node.js backend + React/Vue frontend) trigger independent GitHub Actions pipelines. Frontend: terraform apply → S3/CloudFront sync. Backend: Docker → ECR → forced ECS deployment.' },
    { num: '02', title: 'State & Secrets', desc: 'Terraform remote state in S3 with DynamoDB locking. Secrets Manager injects RDS credentials at startup (auto-rotation). SSM Parameter Store for app config.' },
    { num: '03', title: 'VPC Networking', desc: 'Public subnets: ALB (HTTPS/443, ACM SSL) + S3 + CloudFront. Private subnets: ECS tasks, Redis, RDS Proxy, Aurora — no IGW for data tier.' },
    { num: '04', title: 'ECS Fargate', desc: 'Serverless compute. Core App (:5002) auto-scales to 100 tasks. Grafana (:3000) as dedicated container. Fargate Spot for background jobs (70% savings).' },
    { num: '05', title: 'Data Tier', desc: 'ElastiCache Redis (sub-ms caching), RDS Proxy (connection pooling), Aurora v2 Serverless (auto-scaling, zero idle cost), SES (transactional email).' },
    { num: '06', title: 'Design Strengths', desc: 'Fully serverless, defence-in-depth secrets, RDS Proxy resilience, Fargate Spot + Aurora cost optimisation, Grafana observability, private-subnet isolation.' },
  ]

  return (
    <section id="architecture" data-section="architecture" className="architecture section">
      <div className="container">
        <div className="animate-in">
          <span className="section-label">Infrastructure Portfolio</span>
          <h2 className="section-title">Architecture Deep Dive</h2>
          <p className="section-subtitle">
            Production AWS infrastructure for Medzen Innovations (ap-south-1)
          </p>
        </div>

        <div className="architecture__content animate-in">
          <div className="architecture__diagram glass-card">
            <div className="architecture__diagram-header">
              <span className="mono" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
                // infra-architecture.svg
              </span>
              <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                AWS ap-south-1
              </span>
            </div>

            <div className="architecture__visual">
              <div className="arch__layer arch__layer--internet">
                <span className="arch__layer-label mono">Internet</span>
                <div className="arch__nodes">
                  <div className="arch__node arch__node--dns">
                    <span>🌐</span>
                    <span>DNS</span>
                  </div>
                  <div className="arch__arrow">→</div>
                  <div className="arch__node arch__node--cdn">
                    <span>⚡</span>
                    <span>CloudFront</span>
                  </div>
                </div>
              </div>

              <div className="arch__connector">↓</div>

              <div className="arch__layer arch__layer--public">
                <span className="arch__layer-label mono">Public Subnet</span>
                <div className="arch__nodes">
                  <div className="arch__node arch__node--alb">
                    <span>🔒</span>
                    <span>ALB + SSL</span>
                  </div>
                  <div className="arch__node arch__node--s3">
                    <span>📦</span>
                    <span>S3 Frontend</span>
                  </div>
                </div>
              </div>

              <div className="arch__connector">↓</div>

              <div className="arch__layer arch__layer--compute">
                <span className="arch__layer-label mono">ECS Fargate Cluster</span>
                <div className="arch__nodes">
                  <div className="arch__node arch__node--ecs">
                    <span>🚀</span>
                    <span>Core App</span>
                    <span className="arch__node-detail">:5002 × 100</span>
                  </div>
                  <div className="arch__node arch__node--grafana">
                    <span>📊</span>
                    <span>Grafana</span>
                    <span className="arch__node-detail">:3000</span>
                  </div>
                  <div className="arch__node arch__node--spot">
                    <span>💰</span>
                    <span>Spot Tasks</span>
                    <span className="arch__node-detail">-70% cost</span>
                  </div>
                </div>
              </div>

              <div className="arch__connector">↓</div>

              <div className="arch__layer arch__layer--data">
                <span className="arch__layer-label mono">Private Data Tier</span>
                <div className="arch__nodes">
                  <div className="arch__node arch__node--redis">
                    <span>⚡</span>
                    <span>Redis</span>
                  </div>
                  <div className="arch__node arch__node--proxy">
                    <span>🔄</span>
                    <span>RDS Proxy</span>
                  </div>
                  <div className="arch__node arch__node--aurora">
                    <span>🗄️</span>
                    <span>Aurora v2</span>
                  </div>
                  <div className="arch__node arch__node--ses">
                    <span>📧</span>
                    <span>SES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="architecture__details">
            {sections.map((s) => (
              <div key={s.num} className="architecture__detail-item glass-card">
                <span className="architecture__detail-num mono">{s.num}</span>
                <div>
                  <h4 className="architecture__detail-title">{s.title}</h4>
                  <p className="architecture__detail-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
