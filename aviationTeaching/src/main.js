// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import weui from 'weui.js'
import 'weui'
import store from './store/store'
import 'babel-polyfill'
import './assets/css/reset.css'
import './assets/css/common.css'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import VueWechatTitle from 'vue-wechat-title'
import baseUrl from '@/assets/js/common.js'
import util from '@/utils/util.js'

axios.defaults.baseURL = baseUrl
Vue.use(VueWechatTitle)
Vue.prototype.$weui = weui
Vue.prototype.$axios = axios
Vue.prototype.$myUtil = util

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  if (to.path === '/selectRole') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    console.log('我是浏览器本地缓存的token: ' + token)
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
