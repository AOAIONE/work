import { post } from './axios.js' // 导入axios实例文件中方法
// login登录
export const login = data => {
  return post('/api/account_info/get_roles', data)
}
// 选择角色
export const selectRole = data => {
  return post('/connect/token', data, {
    'Content-Type': 'application/x-www-form-urlencoded'
  })
}
