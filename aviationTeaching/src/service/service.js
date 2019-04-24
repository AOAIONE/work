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
// 获取课件分类详情
export const detail = data => {
  return get('/api/course_ware/detail', data)
}
// 获取指派教员列表
export const teacherList = data => {
  return post('/api/account/designated_teacher_list', data)
}
// 获取指派教员详情
export const teacherDetail = data => {
  return get('/api/course_ware/designate_teacher_detail', data)
}
// 获取申请课件列表
export const applyCourseList = data => {
  return post('/api/course_ware/my_application_list', data)
}
// 取消课件指派
export const delCourseAssign = data => {
  return get('/api/course_ware/del_course_designate_student', data)
}
