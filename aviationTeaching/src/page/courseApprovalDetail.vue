<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">申请人:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.application_user_name}}
                    </div>
                </div>
            </div>
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
            <div class="item_content" v-if="detail.application_status!=='apply_refused'">
                <label class="content_left">操作:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag" @click="cancelPass">取消通过</a>
                        <a class="course_tag" v-if="detail.application_status!=='apply_passed'" style="background-color:#00bcd4;" @click="pass">通过</a>
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
import { applicationDetail, handleApplication } from '@/service/service'

export default {
  name: 'CourseApprovalDetail',
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
          'application_status': data1.application_status,
          'application_user_name': data1.application_user_name
        }
        that.title = data1.name
      })
    },
    // 取消通过
    cancelPass: function () {
      let that = this
      let data = { 'application_id': this.$route.query.application_id,
        'respond_type': 0}
      handleApplication(data).then(res => {
        if (res.data.is_success) {
          swal('', '取消通过课件申请成功', 'success').then((value) => {
            that.getMyCourseDetail()
          })
        } else {
          swal('', '取消课件通过失败', 'error')
        }
      })
    },
    // 通过
    pass: function () {
      let that = this
      let data = { 'application_id': this.$route.query.application_id,
        'respond_type': 1}
      handleApplication(data).then(res => {
        if (res.data.is_success) {
          swal('', '通过课件申请成功', 'success').then((value) => {
            that.getMyCourseDetail()
          })
        } else {
          swal('', '课件通过失败', 'error')
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
