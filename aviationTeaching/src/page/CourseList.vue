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
          <span class="flex1">发布者</span>
          <span class="flex1">添加时间</span>
        </div>
        <div class="scall_wrapper" ref="wrapper">
          <div class="warpper_content">
            <div class="table_content table_common" v-for="course in courses" :key="course.id">
              <span class="flex1">
                <a class="linka" @click="toDetail(course.id)">{{course.id}}</a>
              </span>
              <span class="flex2">
                <a class="linka" @click="toDetail(course.id)">{{course.name}}</a>
              </span>
              <span class="flex1">
                {{course.publisher_name}}
              </span>
              <span class="flex1">
                {{course.add_time}}
              </span>
            </div>
          </div>
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
  name: 'CourseList',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '课件目录',
      courseList: '全部',
      permission: '全部',
      courseLists: [],
      // data: [],
      limits: [
        {id: '1', value: '共有'},
        {id: '2', value: '私有'},
        {id: '3', value: '所有'}

      ],
      courses: [],
      type_id: 0,
      page_index: 1,
      page_count: 15,
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
    toDetail: function (id) {
      this.$router.push({path: '/courseCenterDetail', query: {'id': id}})
    },
    getCourseList: function () {
      let data = {
        'type_id': this.type_id,
        'privilege': this.privilege,
        'status': 'all',
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      list(data).then(res => {
        let arr = res.data.data
        let arr1 = JSON.parse(JSON.stringify(this.courses))
        this.courses = [...arr1, ...arr]
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
        that.permission = data[0].value
        that.privilege = data[0].value
      },
      triggerDisplayData: false
    })
  }

}
</script>
<style scoped>
@import "../styles/course-common.less";
</style>
