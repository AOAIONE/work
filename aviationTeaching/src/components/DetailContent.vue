<template>
    <p class="detail_content ax_default">
        <span>{{detail.key}}:</span>
        <span>&nbsp;&nbsp;{{detail.value}}</span>
    </p>
</template>
<script>
export default {
  name: 'DetailContent',
  props: ['detail']
}
</script>
<style lang="less" scoped>
.detail_content {
  text-align: left;
  padding-left: 50px;
  margin-left: 20px;
  width: 750px;
  height: 86px;
  font-family: "FontAwesome Regular", "FontAwesome";
  font-weight: 410;
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
</style>
