<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="select_bar item ax_default">
            <span>结业状态:&nbsp;</span>
            <div id="trigger" class="select_wrap">
                <select onmousedown="javascript:return false;" class="select_common">
                    <option>{{courseList}}</option>
                </select>
            </div>
            <div class="bar_right">
                <input placeholder="请输入课程代码、课程课号" v-model="keyword" class="search_input" />
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
import { readStaticList } from '@/service/service'

export default {
  name: 'ReadStatistics',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '测试消息',
      courseList: '全部',
      courseLists: [
        {id: '1', value: '已结业'},
        {id: '2', value: '未结业'}
      ],
      courses: [

      ],
      page_index: 1,
      page_count: 15,
      keyword: '',
      study_status: 2
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
        that.study_status = data.id
      },
      triggerDisplayData: false
    })
    this.getReadStaticList()
  },
  methods: {
    getReadStaticList: function () {
      let data = {
        'study_status': 0,
        'course_ware_id': 0,
        'user_role': 'string',
        'user_id': 0,
        'keyword': '',
        'page_index': 0,
        'page_count': 0
      }
    }
  }

}
</script>
<style lang="less">
@import "../styles/read-statistics.less";
</style>
