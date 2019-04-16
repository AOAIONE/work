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
    }
  ]
})
