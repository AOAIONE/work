<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item role_content ax_default ">您当前的身份是“{{role}}”</div>
    <a v-if="role!==tab.text" class="conver_btn" v-for="tab in tabs" :key="tab.id" @click="coverRole(tab.role)">切换为“{{tab.text}}”</a>
    <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { selectRole } from '@/service/service'
import { mapMutations } from 'vuex'
export default {
  name: 'ConverRole',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '切换身份',
      role: '',
      tabs: []
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    coverRole: function (converRole) {
      let that = this
      let role = JSON.parse(that.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法加密
      let data = {
        UserName: role.userName,
        Password: role.passWord,
        client_id: 'ro.client',
        client_secret: 'secret',
        scope: converRole + ' offline_access api1',
        Grant_Type: 'password'
      }
      selectRole(data).then(res => {
        if (res.status === 200) {
          swal('', '切换身份成功', 'success').then((value) => {
            that.userToken = 'Bearer ' + res.data.access_token
            localStorage.setItem('refreshToken', res.data.refresh_token)
            let tokenDeadline = that.$myUtil.formatTimeStamp(new Date()) + res.data.expires_in * 1000
            localStorage.setItem('tokenDeadline', tokenDeadline)
            localStorage.setItem('currentRole', converRole)
            that.changeLogin({Authorization: that.userToken})
            that.$router.push('/home')
          })
        } else {
          swal('', '切换身份失败', 'error')
        }
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
            tab = {text: '教务员', id: 1, userId: e.userId, role: e.roleName}
            that.tabs.push(tab)
            break
          case 'schemer':
            tab = {text: '计划员', id: 2, userId: e.userId, role: e.roleName}
            that.tabs.push(tab)
            break
          case 'teacher':
            tab = {text: '教员', id: 3, userId: e.userId, role: e.roleName}
            that.tabs.push(tab)
            break
          case 'student':
            tab = {text: '学员', id: 4, userId: e.userId, role: e.roleName}
            that.tabs.push(tab)
            break
          default:
            console.log('角色请求出错')
            break
        }
      })
    }
  },
  mounted () {
    this.getRole()
    let currentRole = localStorage.getItem('currentRole')
    switch (currentRole) {
      case 'user':
        this.role = '教务员'
        break
      case 'schemer':
        this.role = '计划员'
        break
      case 'teacher':
        this.role = '教员'
        break
      case 'student':
        this.role = '学员'
        break
    }
  }

}
</script>
<style lang="less" scoped>
.item {
  margin-top: 110px;
}
.role_content {
  margin-left: 20px;
  padding-left: 30px;
  width: 750px;
  height: 86px;
  font-family: "FontAwesome Regular", "FontAwesome";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  color: #000000;
  line-height: 86px;
  border: 1px solid rgba(242, 242, 242, 1);
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-left: 0px;
}
.conver_btn {
  display: inline-block;
  margin-top: 20px;
  width: 700px;
  height: 90px;
  background: inherit;
  background-color: rgba(0, 121, 254, 1);
  border: none;
  border-radius: 10px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 32px;
  color: #ffffff;
  line-height: 90px;
}
</style>
