<template>
    <div class="container pdbottom">
        <detail-title :title="title"></detail-title>
        <div class="video_wrap">
            <my-player :video="video"></my-player>
        </div>
        <div class="ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">指派时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.designated_time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.learning_status}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">学习次数:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.learning_count}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">总学习时长:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.total_learning_time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">最近学习时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.last_learning_time}}
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

import { designatedCourseWareDetail } from '@/service/service'

export default {
  name: 'AssignReadDetail',
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
        'poster': 'http://pic3.nipic.com/20090527/1242397_102231006_2.jpg',
        'taskId': ''
      }
    }
  },
  methods: {
    getMyCourseDetail: function () {
      let that = this
      let data = {'id': this.$route.query.designated_id}
      designatedCourseWareDetail(data).then(res => {
        let data1 = res.data.data
        that.detail = {
          'id': data1.id,
          'name': data1.name,
          'corresponding_course': Array.isArray(data1.corresponding_course) ? data1.corresponding_course.join() : '',
          'privilege': data1.privilege,
          'publisher_name': data1.publisher_name,
          'add_time': data1.add_time,
          'note': data1.note,
          'designated_time': data1.designated_time,
          'learning_status': data1.learning_status,
          'learning_count': data1.learning_count,
          'total_learning_time': data1.total_learning_time,
          'last_learning_time': data1.last_learning_time
        }
        that.title = data1.name
        that.video.taskId = this.$route.query.designated_id
      })
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
