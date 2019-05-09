<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="video_wrap">
      <my-player :video="video"></my-player>
    </div>
    <div class="ax_default">
      <course-base-info :courseBase="detail"></course-base-info>
      <div class="item_content">
        <label class="content_left">阅读统计:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            <a class="btn" @click="toRoute(detail.id)">查看阅读统计</a>
          </div>
        </div>
      </div>
    </div>
    <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import detailContent from '@/components/DetailContent'
import courseBaseInfo from '@/components/CourseBaseInfo'
import myPlayer from '@/components/MyPlayer'

import { detail } from '@/service/service'

export default {
  name: 'MyCourseDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent,
    'course-base-info': courseBaseInfo,
    'my-player': myPlayer
  },
  data () {
    return {
      title: '',
      detail: {},
      video: {
        'videoUrl': 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        'state': true,
        'poster': 'http://pic3.nipic.com/20090527/1242397_102231006_2.jpg'
      }
    }
  },
  methods: {
    getMyCourseDetail: function () {
      let that = this
      let data = {'id': this.$route.query.id}
      detail(data).then(res => {
        let data1 = res.data.data
        that.detail = {
          'id': data1.id,
          'name': data1.name,
          'corresponding_course': Array.isArray(data1.corresponding_course) ? data1.corresponding_course.join() : '',
          'privilege': data1.privilege,
          'publisher_name': data1.publisher_name,
          'add_time': data1.add_time,
          'note': data1.note
        }
        that.title = data1.name
        that.permissions = data1.read_permission_status
      })
    },
    toRoute: function (id) {
      this.$router.push({path: '/ReadStatistics', query: {'id': id}})
    }
  },
  mounted () {
    this.getMyCourseDetail()
  }
}
</script>
<style lang="less" scoped>
.myitem {
  margin-top: 70px;
}
.ifr {
  width: 100%;
  height: 100%;
}
.btn {
  display: inline-block;
  width: 170px;
  height: 52px;
  color: #000000;
  font-family: "微软雅黑";
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  text-align: center;
  line-height: 52px;
  box-sizing: border-box;
  background-color: #fecd02;
  border-radius: 10px;
}
.video_wrap {
  width: 750px;
  height: 408px;
  margin-top: 100px;
  -webkit-overflow-scrolling: touch;
  // position: relative;
  // overflow-y: scroll;
  // overflow: hidden;
}
</style>
