<template>
  <div class=" container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="select_bar ax_default">
        <span>课件分类:&nbsp;</span>
        <!-- <div id="trigger" class="select_wrap">
                  <select onmousedown="javascript:return false;" class="select_common">
                      <option>{{date}}</option>
                  </select>
              </div> -->
      </div>
    <div class="course_content" id="coursesTable"></div>
    </div>
    <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
  </div>
</template>
<script>
// import MobileSelect from 'mobile-select'
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
// import { list, courseTypeList } from '@/service/service'
import Timetables from '../../static/Timetables.min.js'

export default {
  name: 'ClassSchedule',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '课表',
      data: '全部',
      date: '',
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
      day: [10,11,12,13,14,15,16],
      courseList: [['大学英语(Ⅳ)@10203大学1111fsdfs', '大学英语(Ⅳ)@10203大学1111fsdfs', '', '', '', '', '毛概@14208', '毛概@14208', '', '', '', '选修']],
      timetableType: [
        [{name: '8:00'}, 1],
        [{name: '9:00'}, 1],
        [{name: '10:00'}, 1],
        [{name: '11:00'}, 1],
        [{name: '12:00'}, 1],
        [{name: '14:00'}, 1],
        [{name: '15:00'}, 1],
        [{name: '16:00'}, 1],
        [{name: '17:00'}, 1],
        [{name: '18:00'}, 1],
        [{iname: '19:00'}, 1],
        [{name: '20:00'}, 1]
      ]
    }
  },
  methods: {

  },
  mounted () {
    let that = this
    // // this.getCourseList()
    var highlightWeek = new Date().getDay()
    var styles = {
      Gheight: 50,
      leftHandWidth: 50,
      palette: ['#ffd061', '#d7000f']
    }
    // 实例化(初始化课表)
    var Timetable = new Timetables({
      el: '#coursesTable',
      timetables: that.courseList,
      week: that.week,
      day: this.day,
      timetableType: that.timetableType,
      highlightWeek: highlightWeek,
      gridOnClick: function (e) {
        alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节')
        console.log(e)
      },
      styles: styles
    })
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
