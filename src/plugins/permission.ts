import router from '@/router'
import { useUserStore } from '@/store'

export function setupPermission() {
  // 白名单路由
  // const whiteList = ['/login']
  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      if (to.path === '/login') {
        // 如果已登录，跳转首页
        next({ path: '/' })
      } else {
        const userStore = useUserStore()
      }
    }
    next()
  })
}
