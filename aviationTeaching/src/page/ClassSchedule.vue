<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="my-tabs">
        <div class="tabs-bar">
          <div class="tabs-bar-nav">
            <div
              class="tabs-tab"
              v-for="tab in tabList"
              :class="[tabIndex == tab.index ? 'tabs-active' : '']"
              @click="changeTab(tab)"
              :key="tab.index"
            >{{tab.name}}</div>
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
            <vue-datepicker-local v-model="time" format="YYYY-MM"/>
            <div id="trigger" class="select_wrap">
              <select onmousedown="javascript:return false;" class="select_common">
                <option>{{weekname}}</option>
              </select>
            </div>
          </div>
          <div class="course_content">
            <div id="coursesTable">
              <!-- <div class="Courses-head" style="overflow: hidden;"></div>
              <div class="Courses-content">
                <ul class="stage_none"></ul>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <bottom-tabbar :activeStatus="'table'"></bottom-tabbar>
  </div>
</template>
<script>
import MobileSelect from "mobile-select";
import detailTitle from "@/components/DetailTitle";
import bottomTabbar from "@/components/BottomTabbar";
import VueDatepickerLocal from "vue-datepicker-local";
import { getSimulator, scheduleList } from "@/service/service";
import Timetables from "../../static/timetable.js";
import { setTimeout } from "timers";

export default {
  name: "ClassSchedule",
  components: {
    "detail-title": detailTitle,
    "bottom-tabbar": bottomTabbar,
    VueDatepickerLocal
  },
  data() {
    return {
      title: "课表",
      limits: [
        { id: "0", value: "第1周" },
        { id: "1", value: "第2周" },
        { id: "2", value: "第3周" },
        { id: "3", value: "第4周" }
      ],
      weekname: "第1周",
      weekOrder: 0,
      time: new Date(),
      tabIndex: 0,
      tabName: "",
      tabList: [],
      weekDate: [],
      classList: [],
      page: 1,
      count: 10
    };
  },
  watch: {
    weekDate(curVal, old) {
      let str = "";
      curVal.forEach((item, i) => {
        str += `<div class="Courses-head-${i}" style="flex:1"><p>${
          item.day
        }</p><p>${item.week}</p></div>`;
      });
      //document.querySelector(".Courses-head").innerHTML = str;
      if (old.length > 0) {
        let changeParam = {
          week_order: this.weekOrder,
          date: this.$myUtil.dateFormat(this.time),
          simulator_name: this.tabName,
          keyword: "",
          page_index: this.page,
          page_count: this.count
        };

        this.getSchedule(changeParam);
      }
    },
    time(c, o) {
      if (o) {
        let changeParam = {
          week_order: 0,
          date: this.$myUtil.dateFormat(c),
          simulator_name: this.tabName,
          keyword: "",
          page_index: this.page,
          page_count: this.count
        };

        this.getSchedule(changeParam);
      }
    }
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
      this.tabName = tab.name;

      let changeParam = {
        week_order: 0,
        date: this.$myUtil.dateFormat(this.time),
        simulator_name: tab.name,
        keyword: "",
        page_index: this.page,
        page_count: this.count
      };
      this.getSchedule(changeParam);
    },
    getSimuData() {
      getSimulator().then(res => {
        let data = res.data.data,
          tabObj = {};
        data.forEach((element, index) => {
          tabObj = { name: element, index: index };
          this.tabList.push(tabObj);
          tabObj = null;
        });
        this.tabName = data[0];
        this.getSchedule({
          week_order: 0,
          date: this.$myUtil.dateFormat(this.time),
          simulator_name: this.tabName,
          keyword: "",
          page_index: this.page,
          page_count: this.page
        });
      });
    },
    getSchedule(param) {
      scheduleList(param).then(res => {
        let list = res.data.data;
        if (!res.data && list.length == 0) return;
        //清空
        //document.querySelector(".stage_none").innerHTML = '';
        this.classList = list;
        this.init()
      });
    },
    setDate(date) {
      var week = date.getDay() - 1,
        date = this.addDate(date, week * -1),
        currentFirstDate = new Date(date);
      this.weekDate = [];

      for (var i = 0; i < 7; i++) {
        // cells[i].innerHTML = formatDate(i==0 ? date : addDate(date,1));    星期一开始
        //cells[i].innerHTML = formatDate(i==0 ? addDate(date,-1) : addDate(date,1));//星期日开始
        this.weekDate.push(
          this.formatDate(i == 0 ? date : this.addDate(date, 1))
        );
      }
    },
    addDate(date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    formatDate(date) {
      var day = date.getDate();
      var week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
        date.getDay()
      ];

      return { day: day, week: week };
    },
    init() {
      var Timetable = new Timetables({
          el: '#coursesTable',
          timetables: this.classList,
          weekDate: this.weekDate,
          gridOnClick: function (e) {
            alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
            console.log(e)
          },
          styles: {
             Gheight: 110
          }
      });
    }
  },
  mounted() {
    let that = this;
    this.getSimuData();
    this.setDate(new Date());

    let mobileSelect1 = new MobileSelect({
      trigger: "#trigger",
      title: "",
      wheels: [{ data: this.limits }],
      callback: function(indexArr, data) {
        that.weekOrder = data[0].id;
        that.weekname = data[0].value;

        that.setDate(that.addDate(new Date(), that.weekOrder * 7));
      },
      triggerDisplayData: false
    });
  }
};
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
</style>

