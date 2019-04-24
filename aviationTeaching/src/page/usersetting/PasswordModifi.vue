<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="password_content">
                <label>新密码:</label>
                <div class="passwprd_right">
                    <input type="text" v-model="password" class="password_input" />
                </div>
            </div>
            <div class="password_content">
                <label>再次输入密码:</label>
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
            <bottom-tabbar></bottom-tabbar>
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
      let data = {

      }
      changePassword(data).then(res => {

      })
    },
    cancel: function () {
      this.$router.go(-1)
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../styles/password-modifi.less";
</style>
