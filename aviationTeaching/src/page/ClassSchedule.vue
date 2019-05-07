<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="my-tabs">
        <div class="tabs-bar" v-if="!isClass">
          <div class="tabs-bar-nav">
            <div class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']" @click="changeTab(tab)" :key="tab.index">{{tab.name}}</div>
          </div>
        </div>
        <div class="tabs-content">
          <div class="select_bar ax_default pd20">
            <span>选择月份:&nbsp;</span>
            <!-- <div id="trigger" class="select_wrap">
                      <select onmousedown="javascript:return false;" class="select_common">
                          <option>{{date}}</option>
                      </select>
            </div>-->
            <vue-datepicker-local v-model="time" format="YYYY-MM" />
            <div id="trigger" class="select_wrap">
              <select onmousedown="javascript:return false;" class="select_common">
                <option>{{weekname}}</option>
              </select>
            </div>
          </div>
          <!-- <div class="scall_wrapper" ref="wrapper">
            <div class="warpper_content"> -->
          <div class="course_content">
            <div id="coursesTable">
              <!-- <div class="Courses-head" style="overflow: hidden;"></div>
              <div class="Courses-content">
                <ul class="stage_none"></ul>
              </div>-->
            </div>
            <!-- </div>
            </div> -->
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
import { getSimulator, scheduleList, courseScheduleList } from '@/service/service'
import Timetables from '../../static/timetable.js'

export default {
  name: 'ClassSchedule',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    VueDatepickerLocal
  },
  data () {
    return {
      title: '',
      limits: [
        { id: '0', value: '第1周' },
        { id: '1', value: '第2周' },
        { id: '2', value: '第3周' },
        { id: '3', value: '第4周' },
        { id: '4', value: '第5周' }
      ],
      weekname: '第1周',
      weekOrder: 0,
      time: new Date(),
      tabIndex: 0,
      tabName: '',
      tabList: [],
      weekDate: [],
      classList: [],
      page: 1,
      count: 5,
      isClass: true
    }
  },
  watch: {
    weekDate (curVal, old) {

      let str = ''
      curVal.forEach((item, i) => {
        str += `<div class="Courses-head-${i}" style="flex:1"><p>${
          item.day
        }</p><p>${item.week}</p></div>`
      })

      if (old.length > 0) {
        let changeParam = {
          week_order: this.weekOrder,
          date: this.$myUtil.dateFormat(this.time, 'yyyy-MM'),
          simulator_name: this.tabName,
          keyword: '',
          page_index: this.page,
          page_count: this.count
        }
        if (this.isClass) {
          this.getCourse(changeParam)
        } else {
          this.getSchedule(changeParam)
        }
      }
    },
    time (c, o) {
      if (o) {
        //切换月份更新日期
        this.setDate(c)

        this.time = c
        this.weekOrder = 0
        this.weekname = '第1周'
      }
    }
  },
  methods: {
    changeTab (tab) {
      this.tabIndex = tab.index
      this.tabName = tab.name
      let changeParam = {
        week_order: this.weekOrder,
        date: this.$myUtil.dateFormat(this.time, 'yyyy-MM'),
        simulator_name: tab.name,
        keyword: '',
        page_index: this.page,
        page_count: this.count
      }
      this.getSchedule(changeParam)
    },
    getSimuData () {
      getSimulator().then(res => {
        let data = res.data.data
        let tabObj = {}
        data.forEach((element, index) => {
          tabObj = { name: element, index: index }
          this.tabList.push(tabObj)
          tabObj = null
        })
        this.tabName = data[0]
        this.getSchedule({
          week_order: this.weekOrder,
          date: this.$myUtil.dateFormat(this.time, 'yyyy-MM'),
          simulator_name: this.tabName,
          keyword: '',
          page_index: this.page,
          page_count: this.count
        })
      })
    },
    // 模拟机课表列表
    getSchedule (param) {
      scheduleList(param).then(res => {
        let list = res.data.data
        if (!res.data && list.length === 0) return
        // 清空
        // document.querySelector(".stage_none").innerHTML = '';
        this.classList = list
        this.init()
      })
    },
    // 课表列表
    getCourse (data) {
      courseScheduleList(data).then(res => {
        let list = res.data.data
        if (!res.data && list.length === 0) return
        // 清空
        // document.querySelector(".stage_none").innerHTML = '';
        let classList1 = JSON.parse(JSON.stringify(this.classList))
        // if (this.disRepet) {
        //   arr1 = []
        // }
        this.classList = [...classList1, ...list]
        // this.classList = list
        this.$nextTick(() => {
          if (!this.scroll) {
            let that = this
            this.scroll = new this.$BScroll(this.$refs.wrapper, {
              pullUpLoad: {
                threshold: -70// 在上拉到超过底部 35px 时，触发 pullingUp 事件
              },
              click: true
            })
            this.scroll.on('pullingUp', (pos) => {
              // 下拉动作
              that.page++
              that.getCourse({
                week_order: 0,
                date: that.$myUtil.dateFormat(that.time, 'yyyy-MM'),
                simulator_name: '',
                keyword: '',
                page_index: that.page,
                page_count: that.count
              })
              // 调取上拉完成函数，这样才能多次上拉加载更多，切记不能在这里直接调用刷新滚动高度
              that.scroll.finishPullUp()
              // 写个异步刷新，这样可以解决浏览器上拉卡顿问题
              setTimeout(() => {
                that.scroll.refresh()
              }, 300)
            })
          } else {
            this.scroll.refresh()
          }
        })
        this.init()
      })
    },
    setDate (date) {
      let week = date.getDay() - 1
      date = this.addDate(date, week * -1)
      this.weekDate = []
      for (var i = 0; i < 7; i++) {
        // cells[i].innerHTML = formatDate(i==0 ? addDate(date,-1) : addDate(date,1));//星期日开始
        this.weekDate.push(
          this.formatDate(i === 0 ? date : this.addDate(date, 1))
        )
      }
    },
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    formatDate (date) {
      let day = date.getDate()
      let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
      return { day: day, week: week }
    },
    getMonthWeek (a, b, c) {
      /**
        * a = d = 当前日期
        * b = 6 - w = 当前周的还有几天过完(不算今天)
        * a + b 的和在除以7 就是当天是当前月份的第几周
        */
      let date = new Date(a, parseInt(b) - 1, c)
      let w = date.getDay()
      let d = date.getDate()
      if (w === 0) {
        w = 7
      }
      var config = {
        getMonth: date.getMonth() + 1,
        getYear: date.getFullYear(),
        getWeek: Math.ceil((d + 6 - w) / 7)
      }
      return config
    },
    init () {
      let that = this
      let Timetable = new Timetables({
        el: '#coursesTable',
        timetables: this.classList,
        weekDate: this.weekDate,
        gridOnClick: function (e) {
          that.$router.push({path: '/classDetail', query: {'id': e.id}})
        },
        styles: {
          Gheight: 115
        }
      })
    }
  },
  mounted () {
    let that = this
    if (Number(this.$route.query.id) === 1) {
      let data = {
        week_order: 0,
        date: this.$myUtil.dateFormat(this.time, 'yyyy-MM'),
        simulator_name: '',
        keyword: '',
        page_index: this.page,
        page_count: this.count
      }
      this.isClass = true
      this.title = '课表'
      this.getCourse(data)
    } else {
      this.isClass = false
      this.title = '模拟机排课表'
      this.getSimuData()
    }

    let curweek = this.getMonthWeek(this.time.getFullYear(), this.time.getMonth() + 1, this.time.getDate()).getWeek
    this.setDate(this.time)
    this.weekOrder = curweek - 1
    this.weekname = `第${curweek}周`
    let mobileSelect1 = new MobileSelect({
      trigger: '#trigger',
      title: '',
      wheels: [{ data: this.limits }],
      callback: function (indexArr, data) {
        that.weekOrder = data[0].id
        that.weekname = data[0].value
        //curweek = that.getMonthWeek(that.time.getFullYear(), that.time.getMonth() + 1, that.time.getDate()).getWeek
        that.setDate(that.addDate(that.time, (Number(data[0].id) + 1 - curweek) * 7))
      },
      triggerDisplayData: false
    })
  }
}
</script>
<style scoped>
@import "../styles/course-common.less";
.Courses-head,
.Courses-content ul {
  display: flex;
  display: -webkit-flex;
  padding: 10px 0;
}
.Courses-head > div {
  flex: 1;
  font-size: 24px;
}
.Courses-content ul {
  position: relative;
  padding: 0;
  border-top: 1px dashed rgb(247, 247, 247);
}
.Courses-content ul li {
  width: calc(100% / 7);
  position: relative;
  background-color: rgb(255, 208, 97);
  color: rgb(255, 255, 255);
}
/* .scall_wrapper {
  height: 1100px;
  overflow: hidden;
  position: relative;
} */
</style>
