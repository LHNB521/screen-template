import router from '@/router'
import { useUserStore } from '@/store'
import { isRelogin } from '@/utils/request'

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
        if (useUserStore().roles.length === 0) {
          isRelogin.show = true
          // 判断当前用户是否已拉取完user_info信息
          const res: any = useUserStore().getInfo()
          if (res) {
            await useUserStore().logout()
            ElMessage.error(res)
            next({ path: '/' })
          } else {
            isRelogin.show = false
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          }
        } else {
          next()
        }
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      }
    }
  })
}
