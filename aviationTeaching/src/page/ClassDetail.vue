<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item ax_default">
      <div class="item_content">
        <label class="content_left">课件类容:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.course_task_name}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">日期:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.training_date}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">上课时间:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.training_time}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">课时:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.course_hours}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">训练设施:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.place_name}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">教员:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.teacher_name}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">学员:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.student_names|arr}}
          </div>
        </div>
      </div>
    </div>
    <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { scheduleDetail } from '@/service/service'

export default {
  name: 'ClassDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '',
      detail: {}
    }
  },
  methods: {
    getScheduleDetail: function () {
      let data = {id: this.$route.query.id}
      scheduleDetail(data).then(res => {
        if (res.data.is_success) {
          this.detail = res.data.data
          this.title = res.data.data.course_no
        }
      })
    }
  },
  mounted () {
    this.getScheduleDetail()
  },
  filters: {
    arr (value) {
      if (value) {
        return value.join(' ')
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
