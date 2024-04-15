import { Router, createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'
const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})
export default router
