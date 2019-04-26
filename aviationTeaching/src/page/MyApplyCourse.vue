<template>
    <div class="courseList_container container">
        <detail-title :title="title"></detail-title>
        <div class="top_container">
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
                <span>申请状态:&nbsp;</span>
                <select onmousedown="javascript:return false;" class="select_common">
                    <option>{{permission}}</option>
                </select>
            </div>
            <div class="search_bar">
              <input placeholder="请输入关键词,例如: 发布者、课件标题" class="search_input" />
              <a class="search_btn">搜索</a>
            </div>
          </div>
          <div class="table_wrap ax_default">
              <div class="table_title table_common">
                  <span class="flex1">课件ID</span>
                  <span class="flex2">课件标题</span>
                  <span class="flex1">申请状态</span>
                  <span class="flex1">申请时间</span>
              </div>
              <div class="table_content table_common" v-for="course in courses" :key="course.id">
                  <span class="flex1">
                      <a class="linka">{{course.id}}</a>
                  </span>
                  <span class="flex2">
                      <a class="linka">{{course.name}}</a>
                  </span>
                  <span class="flex1">
                      {{course.fabu}}
                  </span>
                  <span class="flex1">
                      {{course.time}}
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
import { courseTypeList, applyCourseList } from '@/service/service'

export default {
  name: 'MyApplyCourse',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '我申请的课件',
      courseList: '全部',
      permission: '全部',
      courseLists: [],
      limits: [
        {id: '1', value: '申请中'},
        {id: '2', value: '已通过'},
        {id: '3', value: '未通过'}

      ],
      courses: [],
      type_id: 0,
      page_index: 1,
      page_count: 8,
      keyword: '',
      privilege: 'all',
      status: ''
    }
  },
  methods: {
    getApplyCourseList: function () {
      let that = this
      courseTypeList().then(res => {
        let data = res.data.data
        data.forEach(d => {
          let courseList = {}
          courseList = {'id': d.id, 'value': d.name}
          that.courseLists.push(courseList)
        })
      })
      let data = {
        'type_id': that.type_id,
        'privilege': that.privilege,
        'status': that.status,
        'keyword': that.keyword,
        'page_index': that.page_index,
        'page_count': that.page_count
      }
      applyCourseList(data).then(res => {
        that.courses = res.data.data
        let mobileSelect1 = new MobileSelect({
          trigger: '#trigger',
          title: '课件分类',
          wheels: [
            {data: that.courseLists}
          ],
          callback: function (indexArr, data) {
            that.courseList = data[0].value
            that.type_id = data[0].id
          },
          triggerDisplayData: false
        })
        let mobileSelect2 = new MobileSelect({
          trigger: '#trigger1',
          title: '申请状态',
          wheels: [
            {data: that.limits}
          ],
          callback: function (indexArr, data) {
            that.permission = data[0].value
            that.privilege = data[0].value
          },
          triggerDisplayData: false
        })
      })
    }
  },
  mounted () {
    this.getApplyCourseList()
  }
}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
