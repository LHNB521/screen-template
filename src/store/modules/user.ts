import { defineStore } from 'pinia'
import { store } from '@/store'
import { UserInfo } from '@/api/user/types'

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
  return {
    user,
    getUserInfo,
  }
})
export function useUserStoreHook() {
  return useUserStore(store)
}
