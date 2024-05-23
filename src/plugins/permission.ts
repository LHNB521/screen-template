import router from '@/router'
import { useUserStore } from '@/store'

// 白名单路由
const whiteList = ['/login']
export function setupPermission() {
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()
    if (userStore.token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next()
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      }
    }
  })
}
