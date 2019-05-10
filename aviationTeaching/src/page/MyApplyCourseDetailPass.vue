<template>
    <div class="container pdbottom">
        <detail-title :title="title"></detail-title>
        <div class="video_wrap">
            <my-player :video="video"></my-player>
        </div>
        <div class="ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">申请时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.application_time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">申请状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.application_status|statusConver}}
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

import { applicationDetail } from '@/service/service'

export default {
  name: 'MyApplyCourseDetailPass',
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
        videoUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        state: true,
        poster: 'http://pic3.nipic.com/20090527/1242397_102231006_2.jpg',
        course_id: ''
      }
    }
  },
  filters: {
    statusConver: function (value) {
      if (!value) return ''
      let newValue
      switch (value) {
        case 'apply_checking':
          newValue = '申请中'
          break
        case 'apply_passed':
          newValue = '已通过'
          break
        default:
          newValue = '未通过'
      }
      return newValue
    }
  },
  methods: {
    getMyCourseDetail: function () {
      let that = this
      let data = {'applicationId': this.$route.query.application_id}
      applicationDetail(data).then(res => {
        let data1 = res.data.data
        that.detail = {
          'id': data1.id,
          'name': data1.name,
          'corresponding_course': Array.isArray(data1.corresponding_course) ? data1.corresponding_course.join() : '',
          'privilege': data1.privilege,
          'publisher_name': data1.publisher_name,
          'add_time': data1.add_time,
          'note': data1.note,
          'application_time': data1.application_time,
          'application_status': data1.application_status
        }
        that.task_id = data1.id
        that.title = data1.name
        this.video.course_id = data1.id
      })
    }
  },
  mounted () {
    this.getMyCourseDetail()
  },
  beforeRouteLeave (to, from, next) {
    if (window.myPlay) {
      clearInterval(window.myPlay)
      window.myPlay = null
    }
    next()
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
