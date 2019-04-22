import { get, post } from './axios.js' // 导入axios实例文件中方法
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

// 获取列表
export const list = data => {
  return post('/api/course_ware/list', data)
}

// 获取课件分类列表
export const courseTypeList = () => {
  return get('/api/course_ware/course_type_list')
}
