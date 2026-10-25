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
  stage?: { label: string; note: string }
  moat?: string
  tone: 'teal' | 'amber' | 'violet'
}

export const products: Product[] = [
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
  {
    id: 'SunaoCall',
    name: 'SunaoCall',
    slug: 'sunaocall',
    tag: 'Elder care · AI phone companion',
    meaning: 'A call that cares.',
    copy: 'An AI phone companion that calls elderly family members to remind them about medication, and keeps caretakers informed on WhatsApp, no app required for the person who needs it most.',
    longCopy:
      'SunaoCall closes the gap between a prescription and a taken dose. It calls elders directly, on any phone, even a basic keypad one, with short, natural check-ins timed around their day. Caretakers manage everything from WhatsApp: setting up the schedule, getting missed-dose alerts, and reviewing weekly summaries, without ever asking an elder to install or learn anything new.',
    problem:
      'Medication non-adherence among elderly patients is common, and most reminder apps assume a smartphone, good eyesight, and patience for notifications. Families need something that works over a simple phone call instead.',
    points: [
      'Works on any phone, no app for the elder',
      'Short, natural check-in calls, not robotic reminders',
      'Caretaker setup and alerts via WhatsApp',
      'Calls back only if a dose goes unconfirmed',
      'Weekly adherence summaries for the family',
    ],
    features: [
      {
        title: 'Any phone works',
        copy: 'No smartphone, no app, no login. A regular phone call is all an elder ever has to answer.',
      },
      {
        title: 'Caretaker-led setup',
        copy: 'Family members register the elder, confirm the medication schedule, and manage everything over WhatsApp.',
      },
      {
        title: 'Considerate call logic',
        copy: 'A gentle reminder call, and a follow-up only if a dose is missed, never repeated unnecessary calls.',
      },
      {
        title: 'Family peace of mind',
        copy: 'Missed-dose alerts and a weekly summary keep caretakers informed without having to ask.',
      },
    ],
    howItWorks: [
      {
        title: 'Caretaker sets it up',
        copy: 'A family member registers the elder on WhatsApp and confirms the medication schedule.',
        icon: 'lucide:smartphone',
      },
      {
        title: 'Elder gets a call',
        copy: 'A short, friendly voice call at the right time, understandable on any phone.',
        icon: 'lucide:phone-call',
      },
      {
        title: 'Gentle follow-up',
        copy: 'If a dose isn\'t confirmed, one more call is tried, then the family is notified, never a flood of calls.',
        icon: 'lucide:phone-forwarded',
      },
      {
        title: 'Family stays informed',
        copy: 'Caretakers get missed-dose alerts in the moment and a weekly summary of how things are going.',
        icon: 'lucide:message-circle',
      },
    ],
    tone: 'violet',
  },
  {
    id: 'SunaoAI',
    name: 'SunaoAI',
    slug: 'sunaoai',
    tag: 'Healthcare · Research',
    meaning: 'Listening for what changes.',
    copy: 'An early-stage research effort exploring whether everyday speech can reveal early signs of cognitive decline, built for Urdu speakers from the ground up.',
    longCopy:
      'SunaoAI is our research initiative into voice-based early detection of cognitive decline, with a focus on Urdu and underserved languages largely ignored by existing tools. It is still a proof-of-concept: we are validating signal quality and model behavior before any clinical use, not shipping a diagnostic product today.',
    problem:
      'Most cognitive-screening research is built and validated on English speech. Urdu speakers, and the markets they live in, are left with no equivalent tool, even though early detection could meaningfully change outcomes.',
    points: [
      'Proof-of-concept stage, not a clinical product yet',
      'Focused on Urdu and other underserved languages',
      'Privacy-first: voice data stays in-house',
      'Grounded in real-world data, not synthetic benchmarks',
    ],
    features: [
      {
        title: 'Urdu-first research',
        copy: 'Built around Urdu speech patterns from the outset, instead of adapting an English-first model after the fact.',
      },
      {
        title: 'Privacy by design',
        copy: 'Voice data is processed in-house and never shared with outside parties.',
      },
      {
        title: 'Honest about the stage',
        copy: 'We are candid that this is early research: validating signal quality before anything resembling a clinical claim.',
      },
    ],
    stage: {
      label: 'Research · POC',
      note: 'Early-stage research, validated on real-world data, not yet a clinical product.',
    },
    moat: 'Grounded in proprietary, real-world Urdu voice data rather than synthetic benchmarks, the kind of data advantage that is hard to assemble and harder to replicate.',
    tone: 'teal',
  },
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug || p.id.toLowerCase() === slug.toLowerCase())
}
