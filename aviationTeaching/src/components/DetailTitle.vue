<template>
  <div class="container ax_default">
    <p>
      <a class="title_left" @click="back"><i class="iconfont">&#xe616;</i>返回</a>
      <div class="title_center">{{title}}</div>
    </p>
  </div>

</template>
<script>

export default {
  name: 'DetailTitle',
  props: ['title'],
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 100;
  width: 750px;
  height: 100px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  border-bottom: 1px solid rgba(242, 242, 242, 1);
  line-height: 100px;
  background-color: rgba(255, 255, 255, 1);
}
.title_left {
  position: absolute;
  left: 2%;
  white-space: nowrap;
  font-size: 28px;
}
.title_left i{
  font-size: 30px;
  margin-right: 4px;
}
.title_center {
  height: 38px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  text-align: center;
}
</style>
