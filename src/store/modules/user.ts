import { defineStore } from 'pinia'
import { store } from '@/store'
import { LoginData } from '@/api/user/types'
import { Local } from '@/utils/local'
import { login as loginApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(Local.get('token'))
  const name = ref('')
  const avatar = ref('')

  const login = async (userInfo: LoginData): Promise<void> => {
    const res = await loginApi(userInfo)
    if (res) {
      const data = res.data
      Local.set('token', data.token)
      token.value = data.token
      name.value = data.userInfo.name
      avatar.value = data.userInfo.avatar
      return Promise.resolve()
    }
    return Promise.reject(new Error('登录失败'))
  }

  // 注销
  const logout = async (): Promise<void> => {
    token.value = ''
    name.value = ''
    avatar.value = ''
    Local.remove('token')
  }

  return {
    token,
    logout,
    login,
    name,
    avatar,
  }
})
export function useUserStoreHook() {
  return useUserStore(store)
}
