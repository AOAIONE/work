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
              <div class="Courses-head" style="overflow: hidden;">
                <div class="Courses-head-1">
                  <p></p>
                  <p>周一</p>
                </div>
                <div class="Courses-head-2">
                  <p></p>
                  <p>周二</p>
                </div>
                <div class="Courses-head-3">
                  <p></p>
                  <p>周三</p>
                </div>
                <div class="Courses-head-4">
                  <p></p>
                  <p>周四</p>
                </div>
                <div class="Courses-head-5">
                  <p></p>
                  <p>周五</p>
                </div>
                <div class="Courses-head-6">
                  <p></p>
                  <p>周六</p>
                </div>
                <div class="Courses-head-7">
                  <p></p>
                  <p>周日</p>
                </div>
              </div>
              <div class="Courses-content">
                <ul class="stage_none">
                  
                </ul>
              </div>
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
import Timetables from "../../static/Timetables.min.js";
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
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //day: [10,11,12,13,14,15,16],
      page: 1,
      count: 10
    };
  },
  watch: {

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
          date: document.querySelector(".datepicker input").value,
          simulator_name: this.tabName,
          keyword: "",
          page_index: 1,
          page_count: 10
        });
      });
    },
    getSchedule(param) {
      scheduleList(param).then(res => {
        let list = res.data.data;
        if (!res.data && list.length == 0) return;
        
        list.forEach((el, index) => {
          // console.log(el)
          let data = [],
            startObj = [],
            endObj = [],
            nameAry = [],
            totalObj = [],
            schedule = el.week_day_schedule,
            frag = document.createDocumentFragment(),
            Lileft = 0,
            width = 100/7,
            week = 1;

            switch (el.week_day) {
              case "一":
                week = 0;
                break;
              case "二":
                week = 1;
                break;
              case "三":
                 week = 2;
                break;
              case "四":
                 week = 3;
                break;
              case "五":
                 week = 4;
                break;
              case "六":
                 week = 5;
                break;
              case "日":
                 week = 6;
                break;
              default:
                 week = null;
                break;
            }
          for(var key in schedule) {
            var courseItem = document.createElement('li')
            courseItem.style.position = 'absolute'
            courseItem.style.left = width * week + '%';
            console.log(frag.childElementCount)
            courseItem.style.top = frag.childElementCount * 110 + 'px';
            courseItem.style.width = 100 / 7 + '%'
            courseItem.style.height ='110px'
            courseItem.style.boxSizing = 'border-box'
            courseItem.style.backgroundColor = '#f05261'
            courseItem.style.color = '#fff'
            courseItem.style.border = '1px solid #ffa3ab'
            courseItem.style.borderRadius = '3px'
            courseItem.setAttribute("id", schedule[key].id)

            var courseType = document.createElement('p')
            courseType.innerText = schedule[key].course_no
            courseType.style.wordWrap = 'break-word'

            var courseInfo = document.createElement('p')
            courseInfo.innerText = schedule[key].teacher_name + schedule[key].training_time

            courseItem.appendChild(courseType)
            courseItem.appendChild(courseInfo)
            frag.appendChild(courseItem)
          }
          console.log(frag)
          document.querySelector('.stage_none').appendChild(frag)
        });
        console.log(this.courseList);
        //this.init();
      });
    }
  },
  mounted() {
    let that = this;
    this.getSimuData();

    let mobileSelect1 = new MobileSelect({
      trigger: "#trigger",
      title: "",
      wheels: [{ data: this.limits }],
      callback: function(indexArr, data) {
        that.weeklist = data[0].id;
        that.weekname = data[0].value;

        let changeParam = {
          week_order: that.weekOrder,
          date: that.$myUtil.dateFormat(that.time),
          simulator_name: that.tabName,
          keyword: "",
          page_index: this.page,
          page_count: this.count
        };
        that.getSchedule(changeParam);
      },
      triggerDisplayData: false
    });
  }
};
</script>
<style lang="less" scoped>
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

