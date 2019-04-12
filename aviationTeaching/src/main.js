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
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.prototype.$weui = weui

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
