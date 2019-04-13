<template>
  <div class="video_container">
    <div class="video_content ax_default">
      <div class="video_img_lf">
        <img class="video_img" :src="video.url">
        <a class="playbtn">
          <i class="fa fa-play fa-2x iplay" aria-hidden="true"></i>
        </a>
      </div>
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
  width: 100%;
  height: 180px;
}
.video_img_lf {
  width: 100%;
  height: 180px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
}
.video_info {
  position: relative;
  margin-left: 40px;
  margin-top: 8px;
  word-wrap: break-word;
}
.video_name {
  text-align: left;
}
.video_user {
  text-align: left;
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  color: #999999;
}
.video_date {
  float: right;
  margin-right: 40px;
}
.playbtn {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  text-align: center;
  font-size: 16px;
  opacity: 0.5;
  color: #111111;
  transition: all 0.3s ease-in-out 0s;
}
.iplay {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
