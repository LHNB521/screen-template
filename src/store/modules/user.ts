import { defineStore } from 'pinia'
import { store } from '@/store'
import { LoginData } from '@/api/user/types'
import { Local } from '@/utils/local'
import { login as loginApi, getInfo as getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(Local.get('token'))
  const name = ref('')
  const nickname = ref('')
  const avatar = ref('')
  const roles = ref<Array<string>>([]) // 用户角色编码集合 → 判断路由权限
  const permissions = ref<Array<string>>([]) // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录
   * @param userInfo
   * @returns
   */
  const login = async (userInfo: LoginData) => {
    const res = await loginApi(userInfo)
    if (res) {
      const data = res.data
      Local.set('token', data.token)
      token.value = data.token
      return res
    }
    return '登录失败'
  }

  // 获取用户信息
  const getInfo = async (): Promise<void> => {
    const res: any = await getUserInfo()
    if (res) {
      const data = res.data
      const user = data.user
      const profile = user.avatar == '' || user.avatar
      if (data.roles && data.roles.length > 0) {
        // 验证返回的roles是否是一个非空数组
        roles.value = data.roles
        permissions.value = data.permissions
      } else {
        roles.value = ['ROLE_DEFAULT']
      }
      name.value = user.userName
      nickname.value = user.nickName
      avatar.value = profile
      return Promise.resolve()
    }
    return Promise.reject('获取用户信息失败')
  }

  // 注销
  const logout = async (): Promise<void> => {
    token.value = ''
    roles.value = []
    permissions.value = []
    removeToken()
  }

  // 移除token
  function removeToken() {
    token.value = ''
    Local.remove('token')
  }

  const setAvatar = (value: string) => {
    avatar.value = value
  }
  return {
    getInfo,
    token,
    setAvatar,
    logout,
    login,
    roles,
    permissions,
    name,
    nickname,
    avatar,
  }
})
export function useUserStoreHook() {
  return useUserStore(store)
}
