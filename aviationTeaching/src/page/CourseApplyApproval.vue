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
              <div class="table_content table_common" v-for="course in courses" :key="course.kid">
                  <span class="flex1">
                      <a class="linka">{{course.kid}}</a>
                  </span>
                  <span class="flex2">
                      <a class="linka">{{course.title}}</a>
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

export default {
  name: 'courseApplyApproval',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '课件目录',
      courseList: '全部',
      permission: '全部',
      courseLists: [
        {id: '1', value: '周一'},
        {id: '2', value: '周二'},
        {id: '3', value: '周三'}
      ],
      limits: [
        {id: '1', value: '教员'},
        {id: '2', value: '学员'}
      ],
      courses: [
        {kid: '101', title: '启动活门', fabu: '赵槐啊', time: '2018-12-22'},
        {kid: '102', title: '目视', fabu: '测试', time: '2018-12-23'}

      ]
    }
  },
  mounted () {
    let that = this
    let mobileSelect1 = new MobileSelect({
      trigger: '#trigger',
      title: '课件分类',
      wheels: [
        {data: that.courseLists}
      ],
      callback: function (indexArr, data) {
        console.log(data)
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
        console.log(data)
      },
      triggerDisplayData: false
    })
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
