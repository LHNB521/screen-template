import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { UserInfo } from './types'

// 获取用户信息
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function loginApi(data: any): AxiosPromise<any> {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
