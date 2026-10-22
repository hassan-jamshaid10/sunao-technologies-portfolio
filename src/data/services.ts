export type Service = {
  id: string
  title: string
  shortTitle: string
  icon: string
  summary: string
  details: string[]
}

export const services: Service[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    shortTitle: 'AI & ML',
    icon: 'lucide:brain-circuit',
    summary:
      'Production ML systems, model pipelines, and AI features embedded into products that ship.',
    details: [
      'Custom model development & fine-tuning',
      'Inference APIs and orchestration',
      'RAG, agents, and decision systems',
      'Monitoring, evals, and safe rollout',
    ],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud & DevOps',
    icon: 'lucide:cloud-cog',
    summary:
      'Reliable cloud foundations with CI/CD, infrastructure automation, and observability.',
    details: [
      'AWS, GCP, and Azure architectures',
      'Kubernetes, containers, and IaC',
      'CI/CD pipelines and release automation',
      'Security baselines and cost control',
    ],
  },
  {
    id: 'web-mobile',
    title: 'Web & Mobile',
    shortTitle: 'Web & Mobile',
    icon: 'lucide:smartphone',
    summary:
      'Responsive web platforms and mobile apps engineered for performance and accessibility.',
    details: [
      'Vue, React, and Next.js products',
      'Flutter and React Native apps',
      'Design systems and component libraries',
      'Performance, SEO, and accessibility',
    ],
  },
  {
    id: 'erp-crm',
    title: 'ERP & CRM',
    shortTitle: 'ERP & CRM',
    icon: 'lucide:network',
    summary:
      'Business systems that unify operations, sales, and customer journeys with clean integrations.',
    details: [
      'Custom ERP / CRM platforms',
      'Integrations across finance & ops',
      'Workflow automation',
      'Reporting and role-based access',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare Products',
    shortTitle: 'Healthcare',
    icon: 'lucide:heart-pulse',
    summary:
      'Human-centered healthcare software designed around clinical and operational workflows.',
    details: [
      'Patient and clinician experiences',
      'Compliance-minded architecture',
      'Interoperability with existing systems',
      'Secure data handling patterns',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    shortTitle: 'Enterprise',
    icon: 'lucide:building-2',
    summary:
      'Complex systems delivered with clarity, architecture, security, and long-term maintainability.',
    details: [
      'System architecture & modernization',
      'Internal platforms and portals',
      'SSO, audit, and governance',
      'Scale, reliability, and support models',
    ],
  },
]

export const featuredServices = services.slice(0, 4)
