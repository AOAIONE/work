<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="useritem ax_default">
            <div class="item_content">
                <label class="content_left">姓名:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{user.name}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">性别:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <label>
                            <input type="radio" name="1" id="" class="a-radio" :checked="user.sex===1?true:false">
                            <span class="b-radio"></span>男
                        </label>
                        <label>
                            <input type="radio" name="1" id="" class="a-radio" :checked="user.sex===0?true:false">
                            <span class="b-radio"></span>女
                        </label>

                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">手机号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{user.phone}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">登录名:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{user.loginName}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">身份证号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <input type="text" v-model="user.card" placeholder="请输入身份证号" class="userPageInput" />
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">座机号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <input type="text" v-model="user.card" placeholder="请输入座机号" class="userPageInput" />
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">联系地址:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <input type="text" v-model="user.address" placeholder="请输入联系地址" class="userPageInput" />
                    </div>
                </div>
            </div>
            <div class="user_comment">
                <p>备注:</p>
                <textarea placeholder="请输入" maxlength="500" @input="descInput" v-model="user.beizhu" />
                <span>{{txtVal}}/500</span>
            </div>
        </div>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import DetailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'DataComplete',
  components: {
    'detail-title': DetailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '资料完善',
      txtVal: 0,
      user: {
        name: '赵槐',
        sex: 1,
        phone: '15181001161',
        loginName: 'ceshi',
        card: '',
        number: '',
        address: '',
        beizhu: ''
      },
      methods: {
        descInput: function () {
          debugger
          let user = this.user
          this.txtVal = user.beizhu.length
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.useritem {
  margin-top: 110px;
}
</style>
