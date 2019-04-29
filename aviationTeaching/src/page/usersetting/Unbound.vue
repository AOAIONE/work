<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item unbound_content ax_default ">
      <p> 是否确认解除绑定</p>
    </div>
    <p class="operation">
      <a class="user_btn save_btn">确定</a>
      <a class="user_btn cancel_btn">取消</a>
    </p>
    <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { bondWechat } from '@/service/service'

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
    delBondWechar: function () {
      bondWechat().then(res => {
        if (res.data === 'success') {
          swal('', '解除微信绑定成功', 'success').then((value) => {
            this.$router.push('/userIndex')
          })
        } else {
          swal('', '解除微信绑定失败', 'success').then((value) => {
          })
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
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
}
.unbound_content p {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
