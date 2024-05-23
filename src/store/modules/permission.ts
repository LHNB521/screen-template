import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router/routes'

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])

  const setRoutes = (newRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(newRoutes)
  }
  function generateRoutes() {}

  return {
    routes,
    setRoutes,
    generateRoutes,
  }
})
