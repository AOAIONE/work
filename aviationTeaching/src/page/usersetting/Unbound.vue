<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item unbound_content ax_default ">
      <span> 是否确认解除绑定</span>
    </div>
    <p class="operation">
      <a class="user_btn save_btn" @click="delBondWechat">确定</a>
      <a class="user_btn cancel_btn" @click="cancel">取消</a>
    </p>
    <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { delBondWechat } from '@/service/service'

export default {
  name: 'Unbound',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '解除微信绑定'
    }
  },
  methods: {
    // 解除微信绑定
    delBondWechat: function () {
      delBondWechat().then(res => {
        if (res.data.is_success === true) {
          swal('', '解除微信绑定成功', 'success').then((value) => {
            this.$router.push('/userIndex')
          })
        } else {
          swal('', '解除微信绑定失败', 'success').then((value) => {
          })
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
.item {
  margin-top: 110px;
}
.unbound_content {
  width: 740px;
  height: 118px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 6px;
  font-family: "微软雅黑 Regular", "微软雅黑";
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  text-align: left;
  margin-left: 10px;
  position: relative;
}
.unbound_content span {
  position: absolute;
  bottom: 70px;
  left: 10px;
}
</style>
