import { getAxiosInstance } from '@/axios'
import { AxiosError } from 'axios'
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
          component: () => import('@/views/LoginView.vue'),
          meta: { requiresAuth: false }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta: { requiresAuth: false }
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
          component: () => import('@/views/HomeView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('@/views/MeView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/links',
          name: 'links',
          component: () => import('@/views/links/IndexView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/links/create',
          name: 'links.create',
          component: () => import('@/views/links/CreateView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/links/:id',
          name: 'links.show',
          component: () => import('@/views/links/ShowView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/views/LogoutView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

declare module 'vue-router' {
  interface RouteMeta {
    // must be declared by every route
    requiresAuth: boolean
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    let canLogin = false
    try {
      const axiosClient = await getAxiosInstance()
      const resp = await axiosClient.get('/user')
      canLogin = true
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        canLogin = false
      }
    } finally {
      if (canLogin) next()
      else next({ name: 'login' })
    }
  } else next()
})

export default router
