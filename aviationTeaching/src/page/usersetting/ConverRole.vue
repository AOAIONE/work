<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item role_content ax_default ">您当前的身份是“{{role}}”</div>
        <a class="conver_btn">切换为“计划员”</a>
        <a class="conver_btn">切换为“教员”</a>
        <a class="conver_btn">切换为”学员“</a>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'ConverRole',
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
