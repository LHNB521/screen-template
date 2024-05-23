import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { UserInfo } from './types'

// 获取用户信息
export function getInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function login(data: any): AxiosPromise<any> {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  })
}
