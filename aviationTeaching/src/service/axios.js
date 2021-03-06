import axios from 'axios'
import Qs from 'qs'

import router from '../router'

// 创建axios实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
  // withCredentials: true, // 允许跨域携带token
  headers: { 'Content-Type': 'application/json' },
  baseURL: 'http://192.168.0.138:9099'
})

// 添加request拦截器
// 异步请求前在header里加入token
service.interceptors.request.use(
  config => {
    if (
      config.url === '/connect/token' ||
      config.url === '/api/account_info/get_roles'
    ) {
      // 如果是登录和注册操作，则不需要携带header里面的token
      // 更改服务器地址
      // config.baseURL = 'http://192.168.0.138:5000'
      config.baseURL = 'http://demo-user.ccar142.com/'
    } else if (config.url === '/api/OAuth2/wx/base') {
      config.baseURL = 'http://wx3.ccar142.com'
    } else if (config.url === '/api/uploadFile') {
      config.baseURL = 'http://demo-scal.ccar142.com/upload/uploadify.ashx'
      config.url = ''
    } else {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization')
        // config.baseURL = 'http://192.168.0.138:9099'
        config.baseURL = 'http://demo-wjx.ccar142.com'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加respone拦截器
// 异步请求后，判断token是否过期
service.interceptors.response.use(
  response => {
    let res = {}
    res.status = response.status
    res.data = response.data
    return res
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('Authorization')
          localStorage.removeItem('currentRole')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('role')
          localStorage.removeItem('tokenDeadline')
          router.push('/login')
          break
        case 404:
          router.push('/404.vue')
          break
      }
      return Promise.reject(error.response)
    }
  }
)

export function get (url, params = {}, headers = {}) {
  params.t = new Date().getTime() // get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {},
    params
  })
}

// 封装post请求
export function post (url, data = {}, headers = {}) {
  // 默认配置
  let sendObject = {
    url: url,
    method: 'post',
    data: data
  }
  if (headers.hasOwnProperty('Content-Type')) {
    sendObject.headers = headers
    sendObject.data = Qs.stringify(data)
  } else {
    sendObject.data = JSON.stringify(data)
  }
  return service(sendObject)
}

// 封装put方法 (resfulAPI常用)
export function put (url, data = {}) {
  return service({
    url: url,
    method: 'put',
    data: JSON.stringify(data)
  })
}
// 删除方法(resfulAPI常用)
export function deletes (url) {
  return service({
    url: url,
    method: 'delete',
    headers: {}
  })
}
// 封装文件post请求
export function file (url, data = {}, headers = {}) {
  // 默认配置
  let sendObject = {
    url: url,
    method: 'post',
    data: data
  }
  sendObject.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return service(sendObject)
}
export { service }
