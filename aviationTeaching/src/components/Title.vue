<template>
  <div class="title ax_default">
    <div class="title_content">
      <p>
        <span>{{title.text}}</span>
        <span v-if="title.show" class="title_right_1 iconfont" @click="toRouter">更多 &#xe600;</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Title',
  data () {
    return {

    }
  },
  props: ['title'],
  methods: {
    toRouter: function () {
      this.$router.push('/courseList')
    }

  }
}
</script>
<style lang="less" scoped>
.title {
  width: 750px;
  height: 88px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  line-height: 88px;
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(242, 242, 242, 1);
}
.title_content {
  padding-left: 40px;
  color: #d7000f;
  word-wrap: break-word;
}
.title_right_1 {
  float: right;
  margin-right: 30px;
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  color: #999999;
}
</style>
