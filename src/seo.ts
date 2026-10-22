import { getProductBySlug } from './data/products'

export const SITE_URL = 'https://sunaotechnologies.com'
export const SITE_NAME = 'Sunao Technologies'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`

export type SeoMeta = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

const defaults: SeoMeta = {
  title: 'Sunao Technologies | AI-First Software Engineering',
  description:
    'Sunao Technologies builds AI-first platforms, cloud infrastructure, and enterprise products. Explore SunaoAI, PukaarAI, and our services across healthcare, enterprise, and more.',
  path: '/',
  image: DEFAULT_OG_IMAGE,
  type: 'website',
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applySeo(meta: SeoMeta) {
  const title = meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`
  const description = meta.description
  const path = meta.path || '/'
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const image = meta.image || DEFAULT_OG_IMAGE
  const type = meta.type || 'website'

  document.title = title

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
  upsertMeta('name', 'author', SITE_NAME)
  upsertMeta('name', 'theme-color', '#0f766e')

  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:locale', 'en_US')

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)

  upsertLink('canonical', url)
}

export function seoForRoute(name: string | symbol | null | undefined, params: Record<string, unknown> = {}): SeoMeta {
  if (name === 'product-detail') {
    const slug = String(params.slug || '')
    const product = getProductBySlug(slug)
    if (!product) {
      return {
        title: 'Product not found',
        description: 'The requested product could not be found.',
        path: `/products/${slug}`,
        noindex: true,
      }
    }
    return {
      title: `${product.name} | ${product.tag}`,
      description: product.copy,
      path: `/products/${product.slug}`,
    }
  }

  const map: Record<string, SeoMeta> = {
    home: {
      title: 'Sunao Technologies | AI-First Software Engineering',
      description: defaults.description,
      path: '/',
    },
    services: {
      title: 'Services',
      description:
        'AI & machine learning, cloud & DevOps, web & mobile, ERP & CRM, healthcare products, and enterprise solutions from Sunao Technologies.',
      path: '/services',
    },
    industries: {
      title: 'Industries',
      description:
        'Software for healthcare, enterprise, fintech, public sector, education, and retail. Built by Sunao Technologies.',
      path: '/industries',
    },
    products: {
      title: 'Products',
      description:
        'Explore SunaoAI for early dementia detection and PukaarAI for voice-first anonymous reporting. Web and mobile platforms from Sunao Technologies.',
      path: '/products',
    },
    about: {
      title: 'About',
      description:
        'Learn about Sunao Technologies, an AI-first software company building platforms, products, and enterprise systems with clarity from architecture to launch.',
      path: '/about',
    },
    contact: {
      title: 'Contact',
      description:
        'Start a project with Sunao Technologies. Talk to us about SunaoAI, PukaarAI, or a custom AI, cloud, web, or enterprise build.',
      path: '/contact',
    },
    'not-found': {
      title: 'Page not found',
      description: 'This page does not exist on Sunao Technologies.',
      path: '/404',
      noindex: true,
    },
  }

  return map[String(name)] || { ...defaults, noindex: true }
}
