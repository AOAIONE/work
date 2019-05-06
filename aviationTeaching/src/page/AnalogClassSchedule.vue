<template>
    <div class="container">
        <div class="mgtop"></div>
        <div class="dateTitle ax_default">
            <div class="left">
                <vue-date-picker-local v-model="time" format="YYYY-MM"></vue-date-picker-local>
            </div>
            <div id="trigger" class="right">
                <select onmousedown="javascript:return false;" class="select_common">
                    <option>{{nowWeek}}</option>
                </select>
            </div>
        </div>
        <div class="class_content">
            <div class="content_title" v-for="week in week" :key="week.id">
                <div class="title_content">
                    <span>{{week.id}}</span>
                    <span>{{week.value}}</span>
                </div>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
    </div>
</template>
<script>
import MobileSelect from 'mobile-select'
import bottomTabbar from '@/components/BottomTabbar'
import VueDatepickerLocal from 'vue-datepicker-local'
import { scheduleList } from '@/service/service'

export default {
  name: 'AnalogClassSchedule',
  components: {
    'bottom-tabbar': bottomTabbar,
    'vue-date-picker-local': VueDatepickerLocal
  },
  data () {
    return {
      time: new Date(),
      weeks: [
        {id: '1', value: '第1周'},
        {id: '2', value: '第2周'},
        {id: '3', value: '第3周'},
        {id: '4', value: '第4周'}
      ],
      week: [
        {id: '1', value: '周一'},
        {id: '2', value: '周二'},
        {id: '3', value: '周三'},
        {id: '4', value: '周四'},
        {id: '5', value: '周五'},
        {id: '6', value: '周六'},
        {id: '7', value: '周日'}
      ],
      classDetails: [
        {title: '19EFE00', name: '徐松明', time: '06:00-12:00'},
        {title: '19EFE00', name: '徐松明', time: '06:00-12:00'},
        {title: '19EFE00', name: '徐松明', time: '06:00-12:00'}

      ],
      nowWeek: '第一周',
      page_index: 1,
      page_count: 20,
      is_need_cross: 0,
      week_order: 1
    }
  },
  mounted () {
    let that = this
    that.getScheduleList()
    let mobileSelect = new MobileSelect({
      trigger: '#trigger',
      title: '选择',
      wheels: [
        {data: that.weeks}
      ],
      callback: function (indexArr, data) {
        that.week_order = data[0].id
        // that.permission = data[0].value
        // that.privilege = data[0].id
      },
      triggerDisplayData: false
    })
  },
  methods: {
    getScheduleList: function () {
      let data = {
        'week_order': this.week_order,
        'date': this.$myUtil.dateFormat(this.time),
        'simulator_name': '',
        'is_need_cross': this.is_need_cross,
        'keyword': '',
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      scheduleList(data).then(res => {
        debugger
      })
    }
  },
  watch: {

  }
}
</script>

<style scoped>
/* @import "../styles/course-common.less"; */
.mgtop {
  height: 70px;
  background-color: rgba(255, 255, 255, 1);
}
.dateTitle {
  width: 750px;
  height: 100px;
  font-weight: 700;
  line-height: 100px;
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  border-top: 1px solid rgba(242, 242, 242, 1);
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  color: #333;
}
.dateTitle .left {
  display: inline-block;
  width: 200px;
  margin-left: 60px;
}
.dateTitle .right {
  display: inline-block;
  margin-left: 60px;
  height: 44px;
  line-height: 44px;
}
.select_common {
  display: inline-block;
  height: 44px;
  line-height: 44px;
  border: 1px solid #f2f2f2;
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  background-color: #fff;
  font-size: 26px;
  text-decoration: none;
  color: #000000;
  appearance: none;
  padding-left: 10px;
  border-radius: 10px;
}
.right select {
  width: 180px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAH0lEQVR42mNgoDnQ13f7TwiTpIkkm0hyHkl+YhhQAABcfyjsqSyTLgAAAABJRU5ErkJggg==")
    no-repeat scroll right center transparent;
}
.right select::-ms-expand {
  display: none;
}
.class_content {
  width: 750px;
  display: flex;
  border-top: 1px solid #f2f2f2;
}
.content_title {
  width: 108px;
  height: 72px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 1);
  border-right: 1px solid #f2f2f2;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  color: #cccccc;
  line-height: 30px;
  padding-top: 5px;
}
.title_content {
  flex: 1;
}
.title_content span {
  display: block;
}
</style>
