<template>
  <div class="select-container">
    <ul>
      <li class="cell" v-for="tab in tabs" :key="tab.userId" @click=toRoute(tab.text)>
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
      tabs: [
        // {text: '教务员', id: 1, isMg: false, img: require('../assets/user_dean.png')},
        // {},
        // {text: '教员', id: 3, isMg: true, isLeft: true, img: require('../assets/user_student.png')},
        // {text: '学员', id: 4, isMg: true, isLeft: true, isMx: true, img: require('../assets/user_teacher.png')}
      ]
    }
  },
  created () {
    this.getRole()
  },
  methods: {
    // ...mapMutations(['changeLogin']),
    toRoute: function (id) {
      debugger
      // selectRole(data).then(res => {

      // })
    },
    // 页面初始化之前请求用户角色
    getRole: function () {
      let that = this
      let role = JSON.parse(this.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法加密
      let roleMapperNames = role.roleMapperNames
      roleMapperNames.forEach(e => {
        let tab = {}
        switch (e.roleName) {
          case 'user':
            tab = {text: '教务员', userId: e.userId, img: require('../assets/user_dean.png')}
            that.tabs.push(tab)
            break
          case 'schemer':
            tab = {text: '计划员', userId: e.userId, img: require('../assets/user_planner.png')}
            that.tabs.push(tab)
            break
          case 'teacher':
            tab = {text: '教员', id: 3, isLeft: true, img: require('../assets/user_student.png')}
            that.tabs.push(tab)
            break
          case 'student':
            tab = {text: '学员', id: 4, isLeft: true, isMx: true, img: require('../assets/user_teacher.png')}
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
