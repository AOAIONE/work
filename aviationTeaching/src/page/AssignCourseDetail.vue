<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">指派课件:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag" @click="assignCourse(detail.id)">指派课件</a>
                    </div>
                </div>
            </div>
        </div>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import courseBaseInfo from '@/components/CourseBaseInfo'
import { detail } from '@/service/service'

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
      detail: {}
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
      })
    },
    assignCourse: function (id) {
      this.$router.push({path: '/selectTeacher', query: {'id': id}})
    }
  },
  mounted () {
    this.getMyCourseDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
