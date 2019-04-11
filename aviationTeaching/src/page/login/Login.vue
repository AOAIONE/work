<template>
<div class="body-bg">
        <div id="login-container">
                <img src="../../assets/logo.png">
                <div class="login-wrap">
                        <div class="imput_wrap">
                            <div class="img_wrap ax_default">
                                <div class="login_img img_u"></div>
                            </div>
                            <input type="text" class="login_inp"  placeholder='手机号码'/>
                        </div>
                        <div class="imput_wrap border1px">
                            <div class="img_wrap ax_default">
                                <div class="login_img img_p"></div>
                            </div>
                            <input type="text" class="login_inp"  placeholder='登录密码'/>
                        </div>
                        <div class="forget_password">忘记密码</div>
                </div>
                <a href="javascript:;" class="weui-btn weui-btn_plain-primary btn">登录</a>

        </div>
</div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {

    }
  }
}
</script>
<style scoped>
    @import '../../styles/login.less';
</style>
