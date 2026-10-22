export type Product = {
  id: string
  name: string
  slug: string
  tag: string
  meaning?: string
  copy: string
  longCopy: string
  problem?: string
  points: string[]
  features: { title: string; copy: string }[]
  howItWorks?: { title: string; copy: string; icon?: string }[]
  tone: 'teal' | 'amber'
}

export const products: Product[] = [
  {
    id: 'SunaoAI',
    name: 'SunaoAI',
    slug: 'sunaoai',
    tag: 'Healthcare · Web platform',
    copy: 'An AI-powered dementia detection system: a clinical platform that helps teams assess cognitive risk early, track patient signals, and support timely care decisions.',
    longCopy:
      'SunaoAI is a healthcare web platform focused on early dementia detection. It supports cognitive screening workflows, risk scoring, and clinical insights so care teams can act sooner, with a secure, clinician-ready experience across desktop and mobile.',
    points: [
      'Cognitive screening workflows',
      'Risk scoring & clinical insights',
      'Secure healthcare-ready experience',
    ],
    features: [
      {
        title: 'Early risk signals',
        copy: 'Surface cognitive patterns that help clinicians prioritize follow-up and intervention.',
      },
      {
        title: 'Assessment workflows',
        copy: 'Structured screening journeys designed for real clinical and care-team operations.',
      },
      {
        title: 'Cross-device access',
        copy: 'Use the same platform on laptop and mobile so teams can work where patients are.',
      },
      {
        title: 'Security by default',
        copy: 'Built with healthcare-minded access, auditability, and data handling practices.',
      },
    ],
    tone: 'teal',
  },
  {
    id: 'PukaarAI',
    name: 'PukaarAI',
    slug: 'pukaarai',
    tag: 'Voice-first · Anonymous reporting',
    meaning: 'A call. A cry for help.',
    copy: 'Anonymous, voice-first whistleblowing for organizations. Speak in Urdu or regional languages, stay untraceable, and give leadership early signals before talent walks out.',
    longCopy:
      'PukaarAI turns raw native-language audio into predictive organizational intelligence. Employees report wrongdoing by speaking with no forms and no identity exposure, while HR and leadership get structured cases, live witness consensus, attrition forecasts, and executive PDF reports.',
    problem:
      'Language barriers and fear of retaliation keep employees silent. Leadership stays blind until critical talent walks out the door. PukaarAI asks: what if reporting wrongdoing was as simple as speaking?',
    points: [
      'Zero-trace anonymity (IP/metadata stripped)',
      'Native voice ingestion (Urdu & regional languages)',
      'Real-time peer witness consensus',
      'Predictive attrition intelligence',
      'Executive PDF & API reports',
    ],
    features: [
      {
        title: 'Zero-trace anonymity',
        copy: 'Strips IP and metadata, hashes user identity with SHA-256. Submissions stay untraceable.',
      },
      {
        title: 'Native voice ingestion',
        copy: 'Record audio in Urdu or regional languages; speech is translated into structured case intelligence.',
      },
      {
        title: 'Real-time witness relay',
        copy: 'Masked voting links go to peers; live Support vs Miss consensus streams into the case UI.',
      },
      {
        title: 'Predictive attrition',
        copy: 'AI weighs evidence and witness signals to forecast resignation risk windows for teams.',
      },
      {
        title: 'Executive reports',
        copy: 'Clean API endpoints and instant downloadable PDF intelligence for founders, HR, and execs.',
      },
      {
        title: 'Web and mobile',
        copy: 'Report by voice on phone or review cases on desktop, built for how organizations actually work.',
      },
    ],
    howItWorks: [
      {
        title: 'Speak your report',
        copy: 'Employees raise concerns by voice in Urdu or regional languages. Reporting feels as natural as a call for help.',
        icon: 'lucide:mic',
      },
      {
        title: 'Anonymity locked in',
        copy: 'Metadata and IP are stripped; identity is hashed. The organization sees the case, never the person.',
        icon: 'lucide:shield-off',
      },
      {
        title: 'Witnesses weigh in',
        copy: 'Masked peer links collect live Support vs Miss consensus over WebSockets. Evidence gains weight in real time.',
        icon: 'lucide:users',
      },
      {
        title: 'Intelligence for leaders',
        copy: 'Attrition forecasts and PDF/API reports surface early signals before performance, people, or profit take the hit.',
        icon: 'lucide:line-chart',
      },
    ],
    tone: 'amber',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug || p.id.toLowerCase() === slug.toLowerCase())
}
