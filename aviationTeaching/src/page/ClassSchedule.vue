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
      courseList: [['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208', '', '', '', '选修'],
        ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', '', '', '', '', ''],
        ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验', '', '', '', ''],
        ['', '', '', '', '电装实习@11301', '电装实习@11301', '', '', '', '大学体育', '大学体育', ''],
        ['', '', '数据结构与算法分析', '数据结构与算法分析', '', '', '', '', '信号与系统', '信号与系统', '', ''] ],
      timetableType: [
        [{index: '1', name: '8:30'}, 1],
        [{index: '2', name: '9:30'}, 1],
        [{index: '3', name: '10:30'}, 1],
        [{index: '4', name: '11:30'}, 1],
        [{index: '5', name: '12:30'}, 1],
        [{index: '6', name: '14:30'}, 1],
        [{index: '7', name: '15:30'}, 1],
        [{index: '8', name: '16:30'}, 1],
        [{index: '9', name: '17:30'}, 1],
        [{index: '10', name: '18:30'}, 1],
        [{index: '11', name: '19:30'}, 1],
        [{index: '12', name: '20:30'}, 1]
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
      palette: ['#ffd061', '#ffd061']
    }
    // 实例化(初始化课表)
    var Timetable = new Timetables({
      el: '#coursesTable',
      timetables: that.courseList,
      week: that.week,
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
