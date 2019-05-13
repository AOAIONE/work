<template>
  <div class="drectory_container">
    <div class="content" @click="toRoute(drectory.path,drectory.id)">
      <p class="content_ico">
        <span class="ico_text iconfont" v-html="drectory.icon"></span>
      </p>
      <p class="content_title">
        <span class="title_text">{{drectory.text}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Drectory',
  props: ['drectory'],
  methods: {
    toRoute: function (path, id) {
      this.$router.push({path: path, query: {'id': id}})
    }
  }
}
</script>
<style lang="less" scoped>
.drectory_container {
  float: left;
  width: calc(100% / 3);
  height: 230px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  border-left: 0;
  margin-top: -1px;
  font-family: "FontAwesome Regular", "FontAwesome";
  font-weight: 410;
  font-style: normal;
}
.drectory_container:nth-of-type(3n) {
  border-right: 0;
}
// .drectory_container:nth-of-type(3) ~ .drectory_container {
//   border-bottom: 0;
// }
.content {
  margin-top: 64px;
  word-wrap: break-word;
}
.content_ico span {
  font-size: 56px;
  line-height: 64px;
}
.content_title {
  margin-top: 10px;
}
.ico_text {
  // font-family: "FontAwesome Regular", "FontAwesome";
  // color: #cccccc;
  // font-size: 64px;
}
.title_text {
  font-family: "微软雅黑";
  color: #666666;
  font-size: 24px;
}
</style>
