<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="select_bar ax_default">
            <span>结业状态:&nbsp;</span>
            <div id="trigger" class="select_wrap">
                <select onmousedown="javascript:return false;" class="select_common">
                    <option>{{courseList}}</option>
                </select>
            </div>
            <div class="bar_right">
                <input placeholder="请输入课程代码、课程课号" class="search_input" />
                <a class="search_btn">搜索</a>
            </div>
        </div>
        <div class="table_wrap ax_default">
            <div class="table_title table_common">
                <span class="flex1">用户ID</span>
                <span class="flex1">姓名</span>
                <span class="flex1">身份类型</span>
                <span class="flex1">阅读方式</span>
                <span class="flex1">查阅总时长</span>

            </div>
            <div class="table_content table_common" v-for="course in courses" :key="course.kid">
                <span class="flex1">
                    <a class="linka">{{course.kid}}</a>
                </span>
                <span class="flex1">
                    <a class="linka">{{course.name}}</a>
                </span>
                <span class="flex1">
                    {{course.leixing}}
                </span>
                <span class="flex1">
                    {{course.way}}
                </span>
                <span class="flex1">
                    {{course.time}}
                </span>
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
  name: 'ReadStatistics',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '课件目录测试消息哦你信不信我能跨行',
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
        {kid: '101', name: '赵槐', leixing: '测试', way: '指定阅读', time: '2018-12-22'},
        {kid: '102', name: '偏偏', leixing: '飞机', way: '申请阅读', time: '2018-12-23'}

      ]
    }
  },
  mounted () {
    let that = this
    let mobileSelect1 = new MobileSelect({
      trigger: '#trigger',
      title: '选择课件',
      wheels: [
        {data: that.courseLists}
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
@import "../styles/read-statistics.less";
</style>
