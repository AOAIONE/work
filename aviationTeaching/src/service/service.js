import { get, post, file } from './axios.js' // 导入axios实例文件中方法
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
// 获取我的课件列表
export const myCourseList = data => {
  return post('/api/course_ware/list_mine', data)
}
// 获取热门列表
export const hotList = data => {
  return post('/api/course_ware/hot_list', data)
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
export const studentList = data => {
  return post('/api/account/designated_student_list', data)
}
// 获取指派学员列表
export const teacherList = data => {
  return post('/api/account/designated_teacher_list', data)
}
// 获取指派教员详情
export const teacherDetail = data => {
  return get('/api/course_ware/designate_teacher_detail', data)
}
// 获取指派学员详情
export const studentDetail = data => {
  return get('/api/course_ware/designate_student_detail', data)
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
  return get('api/course_ware/del_application', data)
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
// 获取模拟机排课表
export const scheduleList = data => {
  return post('/api/course_schedule/simulator_course_schedule_list', data)
}
// 获取课表
export const courseScheduleList = data => {
  return post('/api/course_schedule/list', data)
}
// 获取课表详情
export const scheduleDetail = data => {
  return get('/api/course_schedule/detail', data)
}
// 获取openid
export const wxOpenid = data => {
  return get('/api/OAuth2/wx/base', data)
}
// 绑定微信
export const bondWechat = data => {
  return get('/api/account/bond_wechat', data)
}
// 解除绑定微信
export const delBondWechat = () => {
  return get('/api/account/del_bond_wechat')
}
// 获取模拟机数据
export const getSimulator = () => {
  return get('/api/course_schedule/simulator_list')
}
// 获取课件阅读记录列表
export const readStaticList = data => {
  return post('/api/course_ware/read_static', data)
}
// 获取课件阅读记录详情
export const readStaticDetail = data => {
  return post('/api/course_ware/read_static_detail', data)
}
// 获取课件监听
export const playListening = data => {
  return post('/api/play/play_listening', data)
}
// 获取消息
export const messageList = data => {
  return post('/api/messages/list', data)
}
// 阅读消息
export const messageRead = data => {
  return get('/api/messages/read', data)
}
// 文件上传
export const upLoadFile = data => {
  return file('/api/uploadFile', data)
}
// 当前登录信息
export const myInfo = data => {
  return get('/api/account/my_info', data)
}
