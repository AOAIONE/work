<template>
  <div class="video_container">
    <div class="video_content ax_default">
      <img :src="video.url" class="video_img">
      <div class="video_info">
        <p class="video_name">
          <span>{{video.title}}</span>
        </p>
        <p class="video_user">
          <span> {{video.name}}</span>
          <span class="video_date">{{video.date}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoChunk',
  data () {
    return {

    }
  },
  props: ['video']
}
</script>
<style lang="less" scoped>
.video_content {
  background-color: #f5f5f585;
  width: 320px;
  height: 300px;
  float: left;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  margin-left: 40px;
  margin-top: 30px;
}
.video_img {
  width: 250px;
  height: 180px;
}
.video_info {
  margin-left: 40px;
  margin-top: 8px;
  word-wrap: break-word;
}
.video_name {
  text-align: left;
}
.video_user {
  text-align: left;
  margin-top: 20px;
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  color: #999999;
}
.video_date {
  float: right;
  margin-right: 40px;
}
</style>
