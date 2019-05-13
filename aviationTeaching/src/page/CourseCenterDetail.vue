<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item ax_default">
      <course-base-info :courseBase="detail"></course-base-info>
      <div class="item_content">
        <label class="content_left">阅读权限:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            <a class="btn" v-if="permissions==='allow_apply'" @click="applyCourse">立即申请</a>
            <a class="albtn" v-if="permissions==='apply_passed'">申请通过</a>
            <a class="albtn" v-if="permissions==='designated'">指定阅读</a>
            <a class="albtn" v-if="permissions==='apply_checking'">申请审核中</a>
            <a class="albtn" v-if="permissions==='mine'">我的课件</a>
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
import { detail, applyCourse } from '@/service/service'

export default {
  name: 'CourseCenterDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'course-base-info': courseBaseInfo
  },
  data () {
    return {
      title: '',
      detail: {},
      permissions: ''
    }
  },
  mounted () {
    this.getCourseCenterDetail()
  },
  methods: {
    getCourseCenterDetail: function () {
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
    applyCourse: function () {
      let data = {id: this.$route.query.id}
      applyCourse(data).then(res => {
        if (res.data.is_success) {
          swal('', '课件申请成功', 'success').then((value) => {
            this.getCourseCenterDetail()
          })
        } else {
          swal('', '课件申请失败', 'error')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  display: inline-block;
  width: 142px;
  height: 52px;
  font-family: "微软雅黑";
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  text-align: center;
  color: #0079fe;
  line-height: 52px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 121, 254, 1);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 60px;
}
.albtn {
  display: inline-block;
  width: 120px;
  height: 42px;
  font-family: "微软雅黑";
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  text-align: center;
  color: #0079fe;
  line-height: 42px;
  box-sizing: border-box;
  background-color: rgba(201, 201, 201, 1);
  border-radius: 60px;
}
</style>
