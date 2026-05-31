import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/insights', name: 'insights', component: () => import('@/views/InsightsView.vue') },
    { path: '/cleansing', name: 'cleansing', component: () => import('@/views/CleansingView.vue') },
    {
      path: '/custom-path',
      name: 'custom-path',
      component: () => import('@/views/CustomPathView.vue'),
    },
    { path: '/learn', name: 'learn', component: () => import('@/views/LearnView.vue') },
    { path: '/blog', name: 'blog', component: () => import('@/views/BlogListView.vue') },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('@/views/BlogDetailView.vue'),
    },
    { path: '/projects', name: 'projects', component: () => import('@/views/ProjectListView.vue') },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
    },
    { path: '/booking', name: 'booking', component: () => import('@/views/BookingView.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
