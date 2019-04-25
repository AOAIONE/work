<template>
  <div class="select-container">
    <ul>
      <li class="cell" v-for="tab in tabs" :key="tab.id" @click="toRoute(tab.role)">
        <div class="img_background">
          <div class="img" :class="{mx:tab.isMx}" :style="{'background-image':'url('+tab.img+')','background-repate':'no-repeat','background-size':'cover'}"></div>
        </div>
        <span :class="{lf:tab.isLeft}">{{tab.text}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { selectRole } from '@/service/service'
import { mapMutations } from 'vuex'

export default {
  name: 'SelectRole',
  data () {
    return {
      userToken: '',
      tabs: []
    }
  },
  created () {
    this.getRole()
  },
  methods: {
    ...mapMutations(['changeLogin']),
    toRoute: function (text) {
      let that = this
      let role = JSON.parse(that.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法加密
      let data = {
        UserName: role.userName,
        Password: role.passWord,
        client_id: 'ro.client',
        client_secret: 'secret',
        scope: text + ' offline_access api1',
        Grant_Type: 'password'
      }
      selectRole(data).then(res => {
        that.userToken = 'Bearer ' + res.data.access_token
        localStorage.setItem('refreshToken', res.data.refresh_token)
        let tokenDeadline = that.$myUtil.formatTimeStamp(new Date()) + res.data.expires_in * 1000
        localStorage.setItem('tokenDeadline', tokenDeadline)
        localStorage.setItem('currentRole', text)
        that.changeLogin({Authorization: that.userToken})
        that.$router.push('/home')
      })
    },
    // 页面初始化之前请求用户角色
    getRole: function () {
      let that = this
      let role = JSON.parse(this.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法解密
      let roleMapperNames = role.roleMapperNames
      roleMapperNames.forEach(e => {
        let tab = {}
        switch (e.roleName) {
          case 'user':
            tab = {text: '教务员', id: 1, userId: e.userId, img: require('../assets/user_dean.png'), role: e.roleName}
            that.tabs.push(tab)
            break
          case 'schemer':
            tab = {text: '计划员', id: 2, userId: e.userId, img: require('../assets/user_planner.png'), role: e.roleName}
            that.tabs.push(tab)
            break
          case 'teacher':
            tab = {text: '教员', id: 3, userId: e.userId, isLeft: true, img: require('../assets/user_student.png'), role: e.roleName}
            that.tabs.push(tab)
            break
          case 'student':
            tab = {text: '学员', id: 4, userId: e.userId, isLeft: true, isMx: true, img: require('../assets/user_teacher.png'), role: e.roleName}
            that.tabs.push(tab)
            break
          default:
            console.log('角色请求出错')
            break
        }
      })
    }
  }
}
</script>
<style scoped>
@import "../styles/select-role.less";
</style>
