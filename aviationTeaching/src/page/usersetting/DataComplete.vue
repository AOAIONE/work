<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="useritem ax_default">
            <div class="item_content">
                <label class="content_left">姓名:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{user.user_name}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">性别:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <label>
                            <input type="radio" name="1" @click="getReadioVal('男')" class="a-radio" :checked="user.sex==='男'?true:false">
                            <span class="b-radio"></span>男
                        </label>
                        <label>
                            <input type="radio" name="1" @click="getReadioVal('女')" class="a-radio" :checked="user.sex==='女'?true:false">
                            <span class="b-radio "></span>女
                        </label>

                    </div>
                </div>
            </div>
            <div class="item_content ">
                <label class="content_left ">手机号:</label>
                <div class="content_right ">
                    <div class="content_right_wrap ">
                        <input type="text " v-model="user.phone_no " placeholder="请输入身份证号 " class="userPageInput " />
                    </div>
                </div>
            </div>
            <div class="item_content ">
                <label class="content_left ">登录名:</label>
                <div class="content_right ">
                    <div class="content_right_wrap ">
                        {{user.login_account}}
                    </div>
                </div>
            </div>
            <div class="item_content ">
                <label class="content_left ">身份证号:</label>
                <div class="content_right ">
                    <div class="content_right_wrap ">
                        <input type="text " v-model="user.id_card_no " placeholder="请输入身份证号 " class="userPageInput " />
                    </div>
                </div>
            </div>
            <div class="item_content ">
                <label class="content_left ">座机号:</label>
                <div class="content_right ">
                    <div class="content_right_wrap ">
                        <input type="text " v-model="user.tel_no " placeholder="请输入座机号 " class="userPageInput " />
                    </div>
                </div>
            </div>
            <div class="item_content ">
                <label class="content_left ">联系地址:</label>
                <div class="content_right ">
                    <div class="content_right_wrap ">
                        <input type="text " v-model="user.address " placeholder="请输入联系地址 " class="userPageInput " />
                    </div>
                </div>
            </div>
            <div class="user_comment ">
                <p>备注:</p>
                <textarea placeholder="请输入 " maxlength="300 " @input="descInput " v-model="user.note " />
                <span>{{txtVal}}/300</span>
            </div>
            <p class="operation ">
                <a @click="changeUser " class="user_btn save_btn ">保存</a>
                <a @click="cancel" class="user_btn cancel_btn ">取消</a>
            </p>
        </div>
        <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
    </div>
</template>
<script>
import DetailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import {getInfo, changeInfo} from '@/service/service'

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
      user: {},
      sex: ''
    }
  },
  methods: {
    // 显示Textarea里面的内容字数
    descInput: function () {
      let user = this.user
      this.txtVal = user.note.length
    },
    // 获取用户基本信息
    getUserInfo: function () {
      getInfo().then(res => {
        if (res.data.is_success) {
          this.user = res.data.data
        }
      })
    },
    getReadioVal: function (sex) {
      this.user.sex = sex
    },
    // 更改用户信息
    changeUser: function () {
      let data = {
        'phone_no': this.user.phone_no,
        'tel_no': this.user.tel_no,
        'address': this.user.address,
        'note': this.user.note,
        'sex': this.user.sex,
        'id_card_no': this.user.id_card_no
      }
      changeInfo(data).then(res => {
        if (res.data.is_success) {
          swal('', '个人信息完善成功！', 'success').then((value) => {
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
  },
  mounted () {
    this.getUserInfo()
  }

}
</script>
<style lang="less" scoped>
.useritem {
  margin-top: 110px;
}
.user_comment {
  padding:20px 30px 40px 30px;
  width: 750px;
  text-align: left;
  font-family: "FontAwesome Regular", "FontAwesome";
  font-weight: 410;
  font-style: normal;
  font-size: 28px;
  color: #000000;
  background: inherit;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
}

.user_comment textarea {
  width: 100%;
  margin-top: 10px;
  min-height: 200px;
  font-size: 14px;
  outline: none;
  border: 1px solid rgba(242, 242, 242, 1);
  padding: 10px;
  box-sizing: border-box;
}
.user_comment span {
  position: absolute;
  right: 30px;
  bottom: 0;
  color: #d5d5d5;
}
</style>
