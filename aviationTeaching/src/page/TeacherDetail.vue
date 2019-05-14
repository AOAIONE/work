<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">学员ID:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{designatedUserInfo.user_id}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">身份证号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{designatedUserInfo.id_card_no}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">手机号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{designatedUserInfo.phone_no}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课件分配:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag1" v-if="detail.designated_id===0" @click="courseAssign(detail)">课件分配</a>
                        <a class="course_tag" v-else @click="courseDelAssign">解除分配</a>
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">学习进度:</label>
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
            <div class="item_content" v-if="detail.learning_status==='进行中'">
                <label class="content_left">修改学习状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="course_tag" @click="modifiLearningStatus()" style="backgorund-color:#66cccc;">任务已完成</a>
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
import { studentDetail, delCourseAssign, completeTask, designateStudent } from '@/service/service'

export default {
  name: 'TeacherDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent
  },
  data () {
    return {
      title: '',
      detail: {},
      designatedUserInfo: {}
    }
  },
  methods: {
    getStudentDetail: function () {
      let data = {'taskId': this.$route.query.task_id}
      studentDetail(data).then(res => {
        this.designatedUserInfo = res.data.data.designated_user_info
        this.detail = res.data.data
        this.title = res.data.data.designated_user_info.user_name
      })
    },
    // 解除分配
    courseDelAssign: function () {
      let data = {'taskId': this.$route.query.task_id}
      delCourseAssign(data).then(res => {
        if (res.data.is_success) {
          swal('', '解除分配成功!', 'success').then((value) => {
            this.$router.push({path: '/selectTeacher', query: {'id': this.$route.query.courseWareId}})
          })
        } else {
          swal('', '解除分配失败!', 'error')
        }
      })
    },
    // 课件指派学员
    courseAssign: function (detail) {
      let data = {
        'studentId': this.$route.query.studentId,
        'courseWareId': this.$route.query.courseWareId
      }
      designateStudent(data).then(res => {
        if (res.data.is_success) {
          swal('', '课件分配成功!', 'success').then((value) => {
            this.$router.push({path: '/selectTeacher', query: {'id': this.$route.query.courseWareId}})
          })
        } else {
          swal('', '课件分配失败!', 'error')
        }
      })
    },
    // 更改任务完成状态
    modifiLearningStatus: function () {
      let data = {'taskId': this.$route.query.task_id}
      completeTask(data).then(res => {
        swal('', '任务状态更改成功!', 'success').then((value) => {
          this.getStudentDetail()
        })
      })
    }
  },
  mounted () {
    this.getStudentDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
