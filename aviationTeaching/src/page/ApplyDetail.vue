<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">申请人:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        赵槐
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">申请时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        2017-09-29
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">申请状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        已通过
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">操作:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag">指派课件</a>
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
import courseBaseInfo from '@/components/CourseBaseInfo'

export default {
  name: 'AssignCourseDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'course-base-info': courseBaseInfo
  },
  data () {
    return {
      title: '发动机火警ECAM程序',
      detail:
        {id: 1, title: '发动机火警ECAM程序', kecheng: '型别等级训练', leixing: '测试', fabu: '赵槐', time: '2018-12-09', beizhu: 'ddasdasdasdasdasdas'}
    }
  }
}
</script>
<style lang="less" scoped>
</style>
