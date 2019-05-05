import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/page/login/Login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/page/login/Login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/selectRole',
      name: 'SelectRole',
      component: () => import('@/page/SelectRole'),
      meta: {
        title: '选择身份'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/page/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/classDetail',
      name: 'ClassDetail',
      component: () => import('@/page/ClassDetail'),
      meta: {
        title: '课表详情页'
      }
    },
    {
      path: '/courseCenter',
      name: 'CourseCenter',
      component: () => import('@/page/CourseCenter'),
      meta: {
        title: '课件中心'
      }
    },
    {
      path: '/courseList',
      name: 'CourseList',
      component: () => import('@/page/CourseList'),
      meta: {
        title: '课件目录'
      }
    },
    {
      path: '/courseCenterDetail',
      name: 'CourseCenterDetail',
      component: () => import('@/page/CourseCenterDetail'),
      meta: {
        title: '课件详细页'
      }
    },
    {
      path: '/myCourse',
      name: 'MyCourse',
      component: () => import('@/page/MyCourse'),
      meta: {
        title: '我的课件'
      }
    },
    {
      path: '/myCourseDetail',
      name: 'MyCourseDetail',
      component: () => import('@/page/MyCourseDetail'),
      meta: {
        title: '我的课件详情'
      }
    },
    {
      path: '/readStatistics',
      name: 'ReadStatistics',
      component: () => import('@/page/ReadStatistics'),
      meta: {
        title: '阅读统计'
      }
    },
    {
      path: '/readUserDetail',
      name: 'ReadUserDetail',
      component: () => import('@/page/ReadUserDetail'),
      meta: {
        title: '阅读人详情'
      }
    },
    {
      path: '/assignRead',
      name: 'AssignRead',
      component: () => import('@/page/AssignRead'),
      meta: {
        title: '指定阅读课件'
      }
    },
    {
      path: '/assignReadDetail',
      name: 'AssignReadDetail',
      component: () => import('@/page/AssignReadDetail'),
      meta: {
        title: '指定阅读课件详情'
      }
    },
    {
      path: '/myApplyCourse',
      name: 'MyApplyCourse',
      component: () => import('@/page/MyApplyCourse'),
      meta: {
        title: '我申请的课件'
      }
    },
    {
      path: '/selectUser',
      name: 'SelectUser',
      component: () => import('@/page/SelectUser'),
      meta: {
        title: '选择教员'
      }
    },
    {
      path: '/selectTeacher',
      name: 'SelectTeacher',
      component: () => import('@/page/SelectTeacher'),
      meta: {
        title: '选择学员'
      }
    },
    {
      path: '/userDetail',
      name: 'UserDetail',
      component: () => import('@/page/UserDetail'),
      meta: {
        title: '教员详细信息'
      }
    },
    {
      path: '/teacherDetail',
      name: 'TeacherDetail',
      component: () => import('@/page/TeacherDetail'),
      meta: {
        title: '学员详细信息'
      }
    },
    {
      path: '/assignCourse',
      name: 'AssignCourse',
      component: () => import('@/page/AssignCourse'),
      meta: {
        title: '指派课件'
      }
    },
    {
      path: '/assignCourse',
      name: 'AssignCourse',
      component: () => import('@/page/AssignCourse'),
      meta: {
        title: '指派课件'
      }
    },
    {
      path: '/assignCourseDetail',
      name: 'AssignCourseDetail',
      component: () => import('@/page/AssignCourseDetail'),
      meta: {
        title: '指派课件详情'
      }
    },
    {
      path: '/myApplyCourseDetailPass',
      name: 'MyApplyCourseDetailPass',
      component: () => import('@/page/MyApplyCourseDetailPass'),
      meta: {
        title: '课件详情页-已通过'
      }
    },
    {
      path: '/myApplyCourseDetailUnderway',
      name: 'MyApplyCourseDetailUnderway',
      component: () => import('@/page/MyApplyCourseDetailUnderway'),
      meta: {
        title: '课件详情页-申请中'
      }
    },
    {
      path: '/myApplyCourseDetailNotPass',
      name: 'MyApplyCourseDetailNotPass',
      component: () => import('@/page/MyApplyCourseDetailNotPass'),
      meta: {
        title: '课件详情页-未通过'
      }
    },
    {
      path: '/courseApplyApproval',
      name: 'CourseApplyApproval',
      component: () => import('@/page/CourseApplyApproval'),
      meta: {
        title: '课件申请批复'
      }
    },
    {
      path: '/courseApprovalDetail',
      name: 'CourseApprovalDetail',
      component: () => import('@/page/CourseApprovalDetail'),
      meta: {
        title: '课件申请批复详情页'
      }
    },
    {
      path: '/teacherAssignCourse',
      name: 'TeacherAssignCourse',
      component: () => import('@/page/TeacherAssignCourse'),
      meta: {
        title: '教员指派课件'
      }
    },
    {
      path: '/userIndex',
      name: 'UserIndex',
      component: () => import('@/page/usersetting/UserIndex'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/dataComplete',
      name: 'DataComplete',
      component: () => import('@/page/usersetting/DataComplete'),
      meta: {
        title: '资料完善'
      }
    },
    {
      path: '/passwordModifi',
      name: 'PasswordModifi',
      component: () => import('@/page/usersetting/PasswordModifi'),
      meta: {
        title: '密码修改'
      }
    },
    {
      path: '/feedBack',
      name: 'FeedBack',
      component: () => import('@/page/usersetting/FeedBack'),
      meta: {
        title: '系统意见反馈'
      }
    },
    {
      path: '/converRole',
      name: 'ConverRole',
      component: () => import('@/page/usersetting/ConverRole'),
      meta: {
        title: '切换身份'
      }
    },
    {
      path: '/unbound',
      name: 'Unbound',
      component: () => import('@/page/usersetting/Unbound'),
      meta: {
        title: '解除绑定'
      }
    },
    {
      path: '/classSchedule',
      name: 'ClassSchedule',
      component: () => import('@/page/ClassSchedule'),
      meta: {
        title: '课表'
      }
    },
    {
      path: '/analogClassSchedule',
      name: 'AnalogClassSchedule',
      component: () => import('@/page/AnalogClassSchedule'),
      meta: {
        title: '模拟机课表'
      }
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/page/News'),
      meta: {
        title: '课表'
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('@/page/404'),
      meta: {
        title: '页面未找到'
      }
    }
  ]
})
