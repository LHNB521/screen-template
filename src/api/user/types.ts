/**
 * 登录用户信息
 */
export interface UserInfo {
  userId?: number
  username?: string
  nickname?: string
  avatar?: string
  roles: string[]
  perms: string[]
}

/**
 * 登录请求
 */
export interface LoginData {
  name?: string
  password?: string
}
