<template>
  <div class="title ax_default">
    <div class="title_content">
      <p>
        <span>{{title.text}}</span>
        <span v-if="title.show" class="title_right_1 iconfont" @cliack="to">更多 &#xe600;</span>
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
    to: function () {

    }

  }
}
</script>
<style lang="less" scoped>
.title {
  width: 750px;
  height: 100px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  line-height: 56px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(242, 242, 242, 1);
}
.title_content {
  margin-left: 40px;
  margin-top: 22px;
  width: 710px;
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
