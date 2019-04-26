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
// 申请阅读课件
export const applyCourse = data => {
  return get('/api/course_ware/apply', data)
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
  return post('/api/course_ware/application_list', data)
}
// 获取我申请的课件列表
export const MyApplyCourseList = data => {
  return post('/api/course_ware/my_application_list', data)
}
// 取消课件指派
export const delCourseAssign = data => {
  return get('/api/course_ware/del_course_designate_student', data)
}
// 获取账号信息
export const getInfo = () => {
  return get('/api/account/get_info')
}
// 更改密码
export const changePassword = data => {
  return post('/api/account/change_password', data)
}
// 意见反馈
export const feedBack = data => {
  return post('/api/feedback/add', data)
}
// 更改用户信息
export const changeInfo = data => {
  return post('/api/account/change_info', data)
}
// 课件指派教员
export const designateTeacher = data => {
  return get('/api/course_ware/course_designate_teacher', data)
}
// 课件指派学员
export const designateStudent = data => {
  return get('/api/course_ware/course_designate_student', data)
}
// 课件取消指派（教员/教务员通用）
export const delDesignateTeacher = data => {
  return get('/api/course_ware/del_course_designate_student', data)
}
// 获取申请中课件详情
export const applicationDetail = data => {
  return get('/api/course_ware/application_detail', data)
}
// 处理课件阅读申请
export const handleApplication = data => {
  return post('/api/course_ware/handle_application', data)
}
// 取消申请
export const cancelApplication = data => {
  return get('/api/course_ware/del_designate', data)
}
// 设置任务完成状态
export const completeTask = data => {
  return get('/api/course_ware/complete_designate_task', data)
}
// 获取指定阅读课件列表
export const designatedCourseWareList = data => {
  return post('/api/course_ware/designated_courseWare_list_mine', data)
}
// 获取指定阅读课件详情
export const designatedCourseWareDetail = data => {
  return get('/api/course_ware/designated_courseWare_detail_mine', data)
}
