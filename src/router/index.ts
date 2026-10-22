import { createRouter, createWebHistory } from 'vue-router'
import { applySeo, seoForRoute } from '../seo'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import HomePage from '../views/HomePage.vue'
import IndustriesPage from '../views/IndustriesPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ServicesPage from '../views/ServicesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'Home' },
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesPage,
      meta: { title: 'Services' },
    },
    {
      path: '/industries',
      name: 'industries',
      component: IndustriesPage,
      meta: { title: 'Industries' },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsPage,
      meta: { title: 'Products' },
    },
    {
      path: '/products/:slug',
      name: 'product-detail',
      component: ProductDetailPage,
      meta: { title: 'Product' },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { title: 'About' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { title: 'Contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      meta: { title: 'Not found' },
    },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  applySeo(seoForRoute(to.name, to.params as Record<string, unknown>))
})

export default router
