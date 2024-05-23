import { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/rem',
    component: () => import('@/views/rem/index.vue'),
  },
]
