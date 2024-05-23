import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Local } from '@/utils/local'
import { tansParams } from '@/utils/lh'
import cache from '@/plugins/cache'
import { HttpStatus } from '@/enums/RespEnum'

// 是否显示重新登录
export const isRelogin = { show: false }

const errorCode: any = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  default: '系统未知错误，请反馈给管理员',
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建 axios 实例
const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: '/',
  timeout: 50000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isToken = (config.headers || ({} as any)).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || ({} as any)).repeatSubmit === false

    if (Local.get('token') && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + Local.get('token') // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 500 // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${s_url}]: ` + message)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }
    // FormData数据去请求头Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || HttpStatus.SUCCESS
    // 获取错误信息
    const msg = errorCode[code] || response.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            isRelogin.show = false
            // useUserStore()
            //   .logout()
            //   .then(() => {
            //     location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'index'
            //   })
          })
          .catch(() => {
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === HttpStatus.SERVER_ERROR) {
      console.log(msg)
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === HttpStatus.WARN) {
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else if (code !== HttpStatus.SUCCESS) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return Promise.resolve(response.data)
    }
  },
  (error: any) => {
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

// 导出 axios 实例
export default service
