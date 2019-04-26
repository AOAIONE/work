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
                    <input placeholder="请输入关键词,例如: 课件标题" class="search_input" v-model="keyword" />
                    <a class="search_btn" @click="search">搜索</a>
                </div>
            </div>
            <div class="table_wrap ax_default">
                <div class="table_title table_common">
                    <span class="flex1">课件ID</span>
                    <span class="flex2">课件标题</span>
                    <span class="flex1">申请状态</span>
                    <span class="flex1">申请时间</span>
                </div>
                <div class="table_content table_common" v-for="course in courses" :key="course.application_id">
                    <span class="flex1">
                        <a class="linka" @click="toDetail(course.application_status,course.application_id)">{{course.id}}</a>
                    </span>
                    <span class="flex2">
                        <a class="linka" @click="toDetail(course.application_status,course.application_id)">{{course.name}}</a>
                    </span>
                    <span class="flex1" v-if="course.application_status==='apply_checking'" style="color:#FF9900;">
                        {{course.application_status|statusConver}}
                    </span>
                    <span class="flex1" v-else-if="course.application_status==='apply_refused'" style="color:#009966;">
                        {{course.application_status|statusConver}}
                    </span>
                    <span class="flex1" v-else>
                        {{course.application_status|statusConver}}
                    </span>
                    <span class="flex1">
                        {{course.application_time}}
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
import { courseTypeList, MyApplyCourseList } from '@/service/service'

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
      page_count: 18,
      keyword: '',
      privilege: '',
      status: 'all'
    }
  },
  watch: {
    'type_id': function () {
      this.getApplyCourseList()
    },
    'privilege': function () {
      this.getApplyCourseList()
    }
  },
  filters: {
    statusConver: function (value) {
      if (!value) return ''
      let newValue
      switch (value) {
        case 'apply_checking':
          newValue = '申请中'
          break
        case 'apply_passed':
          newValue = '已通过'
          break
        default:
          newValue = '未通过'
      }
      return newValue
    }
  },
  methods: {
    getApplyCourseTypeList: function () {
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
      })
    },
    getApplyCourseList: function () {
      let that = this
      let data = {
        'type_id': that.type_id,
        'privilege': '',
        'status': that.status,
        'keyword': that.keyword,
        'page_index': that.page_index,
        'page_count': that.page_count }
      MyApplyCourseList(data).then(res => {
        that.courses = res.data.data
      })
    },
    search: function () {
      this.getApplyCourseList()
    },
    toDetail: function (value, id) {
      let toPath = ''
      if (value === 'apply_checking') {
        toPath = 'MyApplyCourseDetailUnderway'
      } else if (value === 'apply_refused') {
        toPath = 'MyApplyCourseDetailNotPass'
      } else {
        toPath = 'MyApplyCourseDetailPass'
      }
      this.$router.push({path: toPath, query: {'application_id': id}})
    }
  },
  mounted () {
    let that = this
    this.getApplyCourseTypeList()
    this.getApplyCourseList()
    let mobileSelect2 = new MobileSelect({
      trigger: '#trigger1',
      title: '申请状态',
      wheels: [
        {data: that.limits}
      ],
      callback: function (indexArr, data) {
        that.permission = data[0].value
        switch (data[0].id) {
          case '1':
            that.status = 'applying'
            break
          case '2':
            that.status = 'passed'
            break
          default:
            that.status = 'refused'
            break
        }
        that.privilege = data[0].value
      },
      triggerDisplayData: false
    })
  }
}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
