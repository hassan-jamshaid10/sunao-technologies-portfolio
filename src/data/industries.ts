export type Industry = {
  id: string
  title: string
  shortTitle: string
  icon: string
  summary: string
  details: string[]
}

export const industries: Industry[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    shortTitle: 'Healthcare',
    icon: 'lucide:heart-pulse',
    summary:
      'Patient and family-facing platforms, from elder medication support with SunaoCall to early-stage cognitive-health research with SunaoAI.',
    details: [
      'Medication adherence and care-coordination tools',
      'Secure patient and family data patterns',
      'Clinician-ready interfaces',
      'Interop with existing hospital systems',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise & Corporate',
    shortTitle: 'Enterprise',
    icon: 'lucide:building-2',
    summary:
      'Internal platforms that scale, including anonymous reporting with PukaarAI and enterprise system delivery.',
    details: [
      'Whistleblowing and compliance portals',
      'ERP / CRM modernization',
      'SSO, audit, and governance',
      'Department-wide digital workflows',
    ],
  },
  {
    id: 'fintech',
    title: 'Fintech & Banking',
    shortTitle: 'Fintech',
    icon: 'lucide:landmark',
    summary:
      'Secure, regulated software for payments, risk, and customer operations with production-grade reliability.',
    details: [
      'Fraud and risk signal systems',
      'Customer onboarding journeys',
      'Audit-ready architectures',
      'Cloud infrastructure for scale',
    ],
  },
  {
    id: 'public',
    title: 'Public Sector',
    shortTitle: 'Public Sector',
    icon: 'lucide:globe-2',
    summary:
      'Citizen-facing and agency systems built for transparency, accessibility, and long-term maintainability.',
    details: [
      'Case management platforms',
      'Accessible digital services',
      'Secure document workflows',
      'Reporting and oversight tools',
    ],
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    shortTitle: 'Education',
    icon: 'lucide:graduation-cap',
    summary:
      'Learning platforms and institutional tools that support students, faculty, and administrators.',
    details: [
      'Learning management experiences',
      'Assessment and analytics',
      'Campus operations software',
      'Mobile-first student apps',
    ],
  },
  {
    id: 'retail',
    title: 'Retail & Commerce',
    shortTitle: 'Retail',
    icon: 'lucide:shopping-bag',
    summary:
      'Commerce and operations systems that connect inventory, customers, and real-time decisions.',
    details: [
      'E-commerce and marketplace builds',
      'Inventory and fulfillment tooling',
      'Customer engagement platforms',
      'Data pipelines for retail ops',
    ],
  },
]

export const featuredIndustries = industries.slice(0, 4)
