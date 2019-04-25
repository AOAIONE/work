<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="password_content">
                <label>新密码
                    <span style="color:red;">*</span>
                </label>
                <div class="passwprd_right">
                    <input type="text" v-model="password" class="password_input" />
                </div>
            </div>
            <div class="password_content">
                <label>确认密码
                    <span style="color:red;">*</span>
                </label>
                <div class="passwprd_right">
                    <div class="passwprd_right_wrap">
                        <input type="text" v-model="checkPassword" class="password_input" />
                    </div>
                </div>
            </div>
            <p class="operation">
                <a class="user_btn save_btn" @click="changePassword()">保存</a>
                <a class="user_btn cancel_btn" @click="cancel()">取消</a>
            </p>
            <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
        </div>
    </div>
</template>
<script>
import DetailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { changePassword } from '@/service/service'

export default {
  name: 'PasswordModifi',
  components: {
    'detail-title': DetailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '密码修改',
      txtVal: 0,
      password: '',
      checkPassword: ''
    }
  },
  methods: {
    changePassword: function () {
      if ((this.password).trim() === '') {
        swal('', '请输入密码', 'warning')
        return false
      } else if ((this.checkPassword).trim() === '') {
        swal('', '请输入确认密码', 'warning')
        return false
      } else if (this.password !== this.checkPassword) {
        swal('', '两个密码框密码不一致！', 'warning')
        return false
      }
      let data = {
        'password': this.password
      }
      changePassword(data).then(res => {
        debugger
        if (res.data.is_success === true) {
          swal('', '密码修改成功！', 'success').then((value) => {
            this.$router.push('/userIndex')
          })
        } else {
          swal('', '操作失败！', 'error')
        }
      })
    },
    cancel: function () {
      this.$router.push('/userIndex')
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../styles/password-modifi.less";
</style>
