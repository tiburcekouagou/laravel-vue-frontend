import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/guest',
      component: () => import('@/layouts/CenteredLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('@/views/MeView.vue')
        },
        {
          path: '/links',
          name: 'links',
          component: () => import('@/views/links/IndexView.vue')
        },
        {
          path: '/links/create',
          name: 'links.create',
          component: () => import('@/views/links/CreateView.vue')
        },
        {
          path: '/links/:id',
          name: 'links.show',
          component: () => import('@/views/links/ShowView.vue')
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/views/LogoutView.vue')
        }
      ]
    }
  ]
})

export default router
