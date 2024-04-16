import { defineStore } from 'pinia'
import { store } from '@/store'
import { UserInfo } from '@/api/user/types'
import { getUserInfoApi } from '@/api/user'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>({
    roles: [],
    perms: [],
  })
  //  获取用户信息
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfoApi()
        .then(({ data }) => {
          user.value = data
          Object.assign(user.value, { ...data })
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  // 移除token
  function resetToken() {
    return new Promise<void>((resolve) => {
      removeToken()
      router.replace({ path: '/login' })
      resolve()
    })
  }
  function removeToken() {
    localStorage.removeItem('token')
  }
  return {
    user,
    getUserInfo,
    resetToken,
  }
})
export function useUserStoreHook() {
  return useUserStore(store)
}
