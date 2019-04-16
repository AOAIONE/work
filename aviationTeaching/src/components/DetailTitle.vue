<template>
  <div class="container ax_default">
    <p>
      <a class="title_left" @click="back">&lt;返回</a>
      <span class="title_center">{{title}}</span>
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
  width: 74px;
  white-space: nowrap;
  margin-left: 50px;
}
.title_center {
  margin-left: 200px;
  height: 38px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
}
</style>
