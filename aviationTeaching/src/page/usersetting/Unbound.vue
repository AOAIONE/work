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
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'Unbound',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '切换身份',
      role: '教务员'
    }
  },
  methods: {

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
