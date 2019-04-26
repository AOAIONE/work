<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
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
            <div class="item_content">
                <label class="content_left">操作:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag" @click="cancelApply">取消申请</a>
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
import { applicationDetail, cancelApplication } from '@/service/service'

export default {
  name: 'MyApplyCourseDetailUnderway',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'course-base-info': courseBaseInfo
  },
  data () {
    return {
      title: '',
      detail: {}
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
        that.title = data1.name
      })
    },
    // 取消申请
    cancelApply: function () {
      let data = {'applicationId': this.$route.query.application_id}
      cancelApplication(data).then(res => {
        if (res.data.is_success) {
          swal('', '取消申请成功', 'success').then((value) => {
            this.$router.push('/myApplyCourse')
          })
        } else {
          swal('', '取消申请失败', 'error')
        }
      })
    }
  },
  mounted () {
    this.getMyCourseDetail()
  }
}
</script>
<style lang="less" scoped>
.course_tag {
  text-align: center;
  display: inline-block;
  background-color: #ffcd00;
  border-radius: 20px;
  width: 130px;
  height: 42px;
  line-height: 42px;
  color: #000000;
}
</style>
