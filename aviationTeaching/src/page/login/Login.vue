<template>
  <div class="body-bg">
    <div id="login-container">
      <img src="../../assets/logo.png">
      <div class="login-wrap">
        <div class="imput_wrap">
          <div class="img_wrap ax_default">
            <div class="login_img img_u"></div>
          </div>
          <input type="text" class="login_inp" v-model="number" placeholder='手机号码' />
        </div>
        <div class="imput_wrap border1px">
          <div class="img_wrap ax_default">
            <div class="login_img img_p"></div>
          </div>
          <input type="password" class="login_inp" v-model="password" placeholder='登录密码' />
        </div>
        <!-- <div class="forget_password">忘记密码</div> -->
      </div>
      <a href="javascript:;" class="weui-btn weui-btn_plain-primary btn" @click="login">登录</a>

    </div>
  </div>
</template>
<script>
import { login } from '@/service/service'
// import CryptoJS from 'crypto-js/crypto-js'

export default {
  name: 'Login',
  data () {
    return {
      number: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let data = {
        user_name: this.number,
        password: this.password

      }
      login(data).then(res => {
        let that = this
        let data = res.data.data
        if (data) {
          let role = that.$myUtil.encrypt(JSON.stringify(data)) // 使用CryptoJS方法加密
          localStorage.setItem('role', role)
          this.$router.push({name: 'SelectRole'})
        } else {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style scoped>
@import "../../styles/login.less";
</style>
