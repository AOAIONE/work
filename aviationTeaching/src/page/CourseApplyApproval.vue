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
            <option>{{privilege}}</option>
          </select>
        </div>
        <div class="search_bar">
          <input placeholder="请输入关键词,例如: 发布者、课件标题" class="search_input" v-model="keyword" />
          <a class="search_btn" @click="getCourseList(true)">搜索</a>
        </div>
      </div>
      <div class="table_wrap ax_default">
        <div class="table_title table_common">
          <span class="flex1">课件ID</span>
          <span class="flex2">课件标题</span>
          <span class="flex1">申请状态</span>
          <span class="flex1">申请人</span>
        </div>
        <div class="scall_wrapper" ref="wrapper">
          <div v-if="courses.length!==0" class="warpper_content">
            <div class="table_content table_common" v-for="course in courses" :key="course.application_id">
              <span class="flex1">
                <a class="linka" @click="toDetail(course.application_id)">{{course.id}}</a>
              </span>
              <span class="flex2">
                <a class="linka" @click="toDetail(course.application_id)">{{course.name}}</a>
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
                {{course.application_user_name}}
              </span>
            </div>
          </div>
          <data-loading :isLoading="isLoading" :notData="notData"></data-loading>
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
import dataLoading from '@/components/DataLoading'

import { applyCourseList, courseTypeList } from '@/service/service'

export default {
  name: 'CourseApplyApproval',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'data-loading': dataLoading
  },
  data () {
    return {
      title: '课件申请批复',
      courseList: '全部',
      privilege: '全部',
      courseLists: [
        {id: 'all', value: '全部'}
      ],
      limits: [
        {id: '4', value: '全部'},
        {id: '1', value: '申请中'},
        {id: '2', value: '已通过'},
        {id: '3', value: '未通过'}
      ],
      courses: [],
      type_id: 0,
      page_index: 1,
      page_count: 15,
      keyword: '',
      status: 'all',
      disRepet: false,
      isLoading: false,
      notData: false
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
  watch: {
    'type_id': function () {
      this.getCourseList(true)
    },
    'status': function () {
      this.getCourseList(true)
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
          title: '课件分类',
          wheels: [
            {data: that.courseLists}
          ],
          callback: function (indexArr, data) {
            if (data[0].id === 'all') {
              that.courseList = '全部'
              that.type_id = 0
            } else {
              that.courseList = data[0].value
              that.type_id = data[0].id
            }
          },
          triggerDisplayData: false
        })
      })
    },
    toDetail: function (id) {
      this.$router.push({path: '/courseApprovalDetail', query: {'application_id': id}})
    },
    getCourseList: function (disRepet) {
      this.isLoading = true
      let data = {
        'type_id': this.type_id,
        'privilege': this.privilege,
        'status': this.status,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      this.disRepet = disRepet
      applyCourseList(data).then(res => {
        let arr = res.data.data
        let arr1 = JSON.parse(JSON.stringify(this.courses))
        if (this.disRepet) {
          arr1 = []
        }
        this.courses = [...arr1, ...arr]
        this.isLoading = false
        if (this.courses.length === 0) {
          this.notData = true
        } else {
          this.notData = false
        }
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
              that.page_index++
              that.getCourseList()
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
      })
    }

  },
  mounted () {
    this.getCourseTypeList()
    this.getCourseList()
    let that = this
    let mobileSelect2 = new MobileSelect({
      trigger: '#trigger1',
      title: '课件权限',
      wheels: [
        {data: that.limits}
      ],
      callback: function (indexArr, data) {
        switch (data[0].id) {
          case '1':
            that.status = 'applying'
            break
          case '2':
            that.status = 'passed'
            break
          case '3':
            that.status = 'refused'
            break
          default:
            that.status = 'all'
            break
        }
        that.privilege = data[0].value
      },
      triggerDisplayData: false
    })
  }

}
</script>
<style lang="less" scoped>
@import "../styles/course-common.less";
</style>
