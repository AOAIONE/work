<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="courseList_container">  
          <div class="select_bar ax_default">
            <div class="bar_right">
              <span>课件分类:&nbsp;</span>
              <div id="trigger" class="select_wrap">
                  <select onmousedown="javascript:return false;" class="select_common">
                      <option>{{courseList}}</option>
                  </select>
              </div>
            </div>
            <div id="trigger1" class="bar_right">
                <span>课件权限:&nbsp;</span>
                <select onmousedown="javascript:return false;" class="select_common">
                    <option>{{permission}}</option>
                </select>
            </div>
            <div class="search_bar">
              <input placeholder="请输入关键词,例如: 发布者、课件标题" class="search_input" v-model="keyword" />
              <a class="search_btn" @click="getCourseList()">搜索</a>
            </div>
          </div>
          <div class="table_wrap ax_default">
              <div class="table_title table_common">
                  <span class="flex1">课件ID</span>
                  <span class="flex2">课件标题</span>
                  <span class="flex1">添加时间</span>
                  <span class="flex1">操作</span>
              </div>
              <div class="table_content table_common" v-for="course in courses" :key="course.id">
                  <span class="flex1">
                      <a class="linka" @click="toDetail(course.id)">{{course.id}}</a>
                  </span>
                  <span class="flex2">
                      <a class="linka" @click="toDetail(course.id)">{{course.name}}</a>
                  </span>
                  <span class="flex1">
                      {{course.add_time}}
                  </span>
                  <span class="flex1">
                      <a class="course_tag" @click="assignCourse(course.id)"> 指派课件</a>
                  </span>
              </div>
          </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import MobileSelect from 'mobile-select'
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { list, courseTypeList } from '@/service/service'

export default {
  name: 'assignCourse',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '指派课件',
      courseList: '全部',
      permission: '全部',
      courseLists: [],
      limits: [
        {id: '1', value: '共有'},
        {id: '2', value: '私有'},
        {id: '3', value: '所有'}

      ],
      courses: [],
      type_id: 0,
      page_index: 1,
      page_count: 8,
      keyword: '',
      privilege: 'all'
    }
  },
  watch: {
    'type_id': function () {
      this.getCourseList()
    },
    'privilege': function () {
      this.getCourseList()
    }

  },
  methods: {
    getCourseTypeList: function () {
      let that = this
      courseTypeList().then(res => {
        let data = res.data.data
        data.forEach(d => {
          let courseList = {}
          courseList = {'id': d.id, 'value': d.name}
          that.courseLists.push(courseList)
        })
        let mobileSelect1 = new MobileSelect({
          trigger: '#trigger',
          title: '选择课件',
          wheels: [
            {data: that.courseLists}
          ],
          callback: function (indexArr, data) {
            that.courseList = data[0].value
            that.type_id = data[0].id
          },
          triggerDisplayData: false
        })
      })
    },
    getCourseList: function () {
      let that = this
      let data = {
        'type_id': that.type_id,
        'privilege': that.privilege,
        'status': 'all',
        'keyword': that.keyword,
        'page_index': that.page_index,
        'page_count': that.page_count
      }
      list(data).then(res => {
        that.courses = res.data.data
      })
    },
    toDetail: function (id) {
      this.$router.push({path: '/assignCourseDetail', query: {'id': id}})
    },
    assignCourse: function (id) {
      this.$router.push({path: '/selectTeacher', query: {'id': id}})
    }
  },
  mounted () {
    let that = this
    that.getCourseTypeList()
    that.getCourseList()
    let mobileSelect2 = new MobileSelect({
      trigger: '#trigger1',
      title: '课件权限',
      wheels: [
        {data: that.limits}
      ],
      callback: function (indexArr, data) {
        this.permission = data[0].value
        this.privilege = data[0].value
      },
      triggerDisplayData: false
    })
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
