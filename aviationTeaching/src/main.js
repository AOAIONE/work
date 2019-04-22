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
import { selectRole } from '@/service/service'

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
// 轮询查询token刷新
let myUtil = util
setInterval(function () {
  let refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    let bol =
      myUtil.formatTimeStamp(new Date()) - localStorage.getItem('tokenDeadline')
    if (bol === 2000) {
      let data = {
        client_id: 'ro.client',
        client_secret: 'secret',
        Grant_Type: 'refresh_token',
        refresh_token: refreshToken
      }
      selectRole(data).then(res => {
        let userToken = 'Bearer' + res.data.access_token
        localStorage.setItem('refreshToken', res.data.refresh_token)
        let tokenDeadline =
          util.formatTimeStamp(new Date()) + res.data.expires_in * 1000
        localStorage.setItem('tokenDeadline', tokenDeadline)
        localStorage.setItem('Authorization', userToken)
      })
    }
  }
}, 1000)

// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  if (to.path === '/selectRole') {
    next()
  } else {
    let token = localStorage.getItem('Authorization')
    if (token === 'null' || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
