<template>
  <div class=" container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="my-tabs">
        <div class="tabs-bar">
          <div class="tabs-bar-nav">
            <div class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)">
              {{tab.name}}
            </div>
          </div>
        </div>
        <div class="tabs-content">
          <div class="select_bar ax_default pd20">
            <span>选择月份:&nbsp;</span>
            <!-- <div id="trigger" class="select_wrap">
                      <select onmousedown="javascript:return false;" class="select_common">
                          <option>{{date}}</option>
                      </select>
                  </div> -->
                  <vue-datepicker-local v-model="time" format="YYYY-MM" />
          </div>
          <div class="course_content" id="coursesTable"></div>
          </div>
        </div>
      </div>
      
    <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
  </div>
</template>
<script>
// import MobileSelect from 'mobile-select'
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import VueDatepickerLocal from 'vue-datepicker-local'
import { getSimulator,scheduleList } from '@/service/service'
import Timetables from '../../static/Timetables.min.js'

export default {
  name: 'ClassSchedule',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    VueDatepickerLocal
  },
  data () {
    return {
      title: '课表',
      data: '全部',
      date: '',
      time: new Date(),
      tabIndex: 0,
      tabList: [],
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      day: [10,11,12,13,14,15,16],
      courseList: [[],[],[],[],[],[],[]],
      timetableType: [
        [{name: '6:00'}, 1],
        [{name: '7:00'}, 1],
        [{name: '8:00'}, 1],
        [{name: '9:00'}, 1],
        [{name: '10:00'}, 1],
        [{name: '11:00'}, 1],
        [{name: '12:00'}, 1],
        [{name: '13:00'}, 1],
        [{name: '14:00'}, 1],
        [{name: '15:00'}, 1],
        [{name: '16:00'}, 1],
        [{name: '17:00'}, 1],
        [{name: '18:00'}, 1],
        [{name: '19:00'}, 1],
        [{name: '20:00'}, 1],
        [{name: '21:00'}, 1],
        [{name: '22:00'}, 1],
        [{name: '23:00'}, 1],
        [{name: '00:00'}, 1],
        [{name: '01:00'}, 1],
        [{name: '02:00'}, 1]
      ]
    }
  },
  computed: {},
  methods: {
    changeTab (tab) {
      this.tabIndex = tab.index
      this.currentContent = tab.component
    },
    getSimuData () {
      getSimulator().then(res => {
        let data = res.data.data,
            tabObj = {};
        data.forEach((element,index) => {
          tabObj = {name: element, index: index}
          this.tabList.push(tabObj)
          tabObj = null
        });
      })
    },
    getSchedule () {
      let param = {
        week_order: 0,
        date: '2019-04',
        simulator_name: 'FFS#4',
        keyword: "",
        page_index: 1,
        page_count: 10
      }
      scheduleList(param).then(res => {
        let list = res.data.data;
        if(!res.data && list.length == 0) return;
        //list.forEach((el,index) => {
         // console.log(el)
        let data = []

          for(var item of list[0].week_day_schedule){
            let start = Math.ceil(item.start_time.substring(0,item.start_time.lastIndexOf(':'))), 
                end = Math.ceil(item.end_time.substring(0,item.end_time.lastIndexOf(':'))),
                startObj = [],
                endObj = [],
                nameAry = [],
                totalObj = []

            switch(end){
              case 0: end = 24;break
              case 1: end = 25;break
              case 2: end = 26;break
            }

            if(start - 6 > 0) {
              for(var i=0,len=start - 6; i<len; i++){
                startObj.push('');
              }
            }
            // if(26 - end > 0){
            //   for(var j=0,len=26 - end; j<len; j++){
            //     endObj.push('');
            //   }
            // }
            if(start > 6 && end < 26){
              for(var k=0,len=end - start; k<len; k++){
               nameAry.push(item.course_no + item.teacher_name + item.training_time)
              }
            }
            

          totalObj = startObj.concat(nameAry)

           data = totalObj
           totalObj = [];
          }
          switch(list[0].week_day){
            case '一': this.courseList[0] = data;break;
            case '二': this.courseList[1] = data;break;
            case '三': this.courseList[2] = data;break;
            case '四': this.courseList[3] = data;break;
            case '五': this.courseList[4] = data;break;
            case '六': this.courseList[5] = data;break;
            case '日': this.courseList[6] = data;break;
            default: this.courseList.push({});break
          }
          data = [];
          this.init()
        })
      //})
    },
    init () {
      console.log(this.courseList)
        var highlightWeek = new Date().getDay()
        var styles = {
          Gheight: 50,
          leftHandWidth: 50,
          palette: ['#ffd061', '#d7000f']
        }
          // 实例化(初始化课表)
        var Timetable = new Timetables({
          el: '#coursesTable',
          timetables: this.courseList,
          week: this.week,
          day: this.day,
          timetableType: this.timetableType,
          highlightWeek: highlightWeek,
          gridOnClick: function (e) {
            alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节')
            console.log(e)
          },
          styles: styles
        })
    }
  },
  mounted () {
    let that = this
    this.getSimuData()
    this.getSchedule()  
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>

