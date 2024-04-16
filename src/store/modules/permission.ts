import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router/dist/vue-router'
import { constantRoutes } from '@/router/routes'

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])

  const setRoutes = (newRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(newRoutes)
  }

  return {
    routes,
    setRoutes,
  }
})
