<template>
  <div class=" container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="my-tabs">
        <div class="tabs-bar">
          <div class="tabs-bar-nav">
            <div class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)" :key="tab.index">
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
            <vue-datepicker-local v-model="time" @confirm="confirm" format="YYYY-MM" />
            <div id="trigger" class="select_wrap">
              <select onmousedown="javascript:return false;" class="select_common">
                <option>{{weekname}}</option>
              </select>
            </div>
          </div>
          <div class="course_content">
            <div id="coursesTable"></div>
          </div>
          </div>
        </div>
      </div>
      
    <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
  </div>
</template>
<script>
import MobileSelect from 'mobile-select'
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import VueDatepickerLocal from 'vue-datepicker-local'
import { getSimulator,scheduleList } from '@/service/service'
import Timetables from '../../static/Timetables.min.js'
import { setTimeout } from 'timers';

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
      limits: [
        {id: '0', value: '第1周'},
        {id: '1', value: '第2周'},
        {id: '2', value: '第3周'},
        {id: '3', value: '第4周'}
      ],
      weekname: '第1周',
      weekOrder: 0,
      time: new Date(),
      tabIndex: 0,
      tabName: '',
      tabList: [],
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //day: [10,11,12,13,14,15,16],
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
      this.tabName = tab.name
      
      let changeParam = {
        week_order: 0,
        date: document.querySelector('.datepicker input').value,
        simulator_name: tab.name,
        keyword: "",
        page_index: 1,
        page_count: 10
      }
      this.getSchedule(changeParam)
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
        this.tabName = data[0]
        this.getSchedule({
          week_order: 0,
            date: document.querySelector('.datepicker input').value,
            simulator_name: this.tabName,
            keyword: "",
            page_index: 1,
            page_count: 10
        })  
      })
    },
    getSchedule (param) {
      scheduleList(param).then(res => {
        let list = res.data.data;
        if(!res.data && list.length == 0) return;
        list.forEach((el,index) => {
         // console.log(el)
          let data = [],
              startObj = [],
              endObj = [],
              nameAry = [],
              totalObj = [],
              schedule = el.week_day_schedule

          for(var key in schedule){
            let start = Math.ceil(schedule[key].start_time.substring(0,schedule[key].start_time.lastIndexOf(':'))), 
                end = Math.ceil(schedule[key].end_time.substring(0,schedule[key].end_time.lastIndexOf(':')))
                

            switch(end){
              case 0: end = 24;break
              case 1: end = 25;break
              case 2: end = 26;break
            }
            // if(key > 0){
            //   if(schedule[key-1].end_time < schedule[key].start_time){
            //       var len = parseInt(schedule[key].start_time - schedule[key-1].end_time);
            //       for(var i=0; i<len; i++){
            //         nameAry.push('');
            //       }
            //   }
            //   else if(schedule[key-1].start_time >= schedule[key].start_time){
            //     startObj = [];
            //     for(var i=0,len1 = start-6; i<len1; i++){
            //       startObj.push('');
            //     }
            //   }
            //   for(var k=0,len2= end-start; k<len2; k++){
            //    nameAry.push(schedule[key].course_no + schedule[key].teacher_name + schedule[key].training_time)
            //   }
            //   return;
            // }
            
            if(start - 6 > 0) {
              for(var i=0,len1 = start-6; i<len1; i++){
                startObj.push('');
              }
            }
           
            if(start >= 6 && end <= 26){
              for(var k=0,len2= end-start; k<len2; k++){
               nameAry.push(schedule[key].course_no + schedule[key].teacher_name + schedule[key].training_time)
              }
            }

            totalObj = startObj.concat(nameAry)
          }

           data = totalObj
           totalObj = [];
          switch(el.week_day){
            case '一': this.courseList[0] = data;break;
            case '二': this.courseList[1] = data;break;
            case '三': this.courseList[2] = data;break;
            case '四': this.courseList[3] = data;break;
            case '五': this.courseList[4] = data;break;
            case '六': this.courseList[5] = data;break;
            case '日': this.courseList[6] = data;break;
            default: this.courseList.push('');break
          }
          data = [];
        })
        console.log(this.courseList)
        this.init()
      })
    },
    init () {
        var highlightWeek = new Date().getDay()
        var styles = {
          Gheight: 50,
          leftHandWidth: 50,
          palette: ['#ffd061']
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
    },
    confirm: function (time) {
      alert(time)
    }
  },
  mounted () {
    let that = this
    this.getSimuData()
    
    let mobileSelect1 = new MobileSelect({
      trigger: '#trigger',
      title: '',
      wheels: [
        {data: this.limits}
      ],
      callback: function (indexArr, data) {
        that.weeklist = data[0].id
        that.weekname = data[0].value

        let changeParam = {
          week_order: this.weekOrder,
          date: document.querySelector('.datepicker input').value,
          simulator_name: this.tabName,
          keyword: "",
          page_index: 1,
          page_count: 10
        }
        that.getSchedule(changeParam)
      },
      triggerDisplayData: false
    })
  }

}
</script>
<style lang="less" scoped>
@import "../styles/course-common.less";
</style>

