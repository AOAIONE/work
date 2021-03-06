import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 存储token
  Authorization: localStorage.getItem('Authorization')
    ? localStorage.getItem('Authorization')
    : ''
}

const mutations = {
  // 修改token，并将token存入localStorage
  changeLogin (state, user) {
    state.Authorization = user.Authorization
    localStorage.setItem('Authorization', user.Authorization)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
