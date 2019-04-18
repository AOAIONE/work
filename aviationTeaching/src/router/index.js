import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/selectTeacher',
      name: 'SelectTeacher',
      component: () => import('@/page/SelectTeacher'),
      meta: {
        title: '选择教员'
      }
    },
    {
      path: '/teacherDetail',
      name: 'TeacherDetail',
      component: () => import('@/page/TeacherDetail'),
      meta: {
        title: '教员详细信息'
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
    }
  ]
})
