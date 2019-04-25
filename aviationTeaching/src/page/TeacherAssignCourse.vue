<template>
    <div class="courseList_container container">
        <detail-title :title="title"></detail-title>
        <div class="mar_top search_bar ax_default">
            <input placeholder="请输入关键词,例如: 发布者、课件标题" class="search_input" />
            <a class="search_btn">搜索</a>
        </div>
        <div class="table_wrap ax_default">
            <div class="table_title table_common">
                <span class="flex1">课件ID</span>
                <span class="flex2">课件标题</span>
                <span class="flex1">添加时间</span>
                <span class="flex1">课件类型</span>
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
                    <a class="course_tag">{{course.leixing}}</a>
                </span>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'

export default {
  name: 'TeacherAssignCourse',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '教员指派课件',
      courses: [
        {kid: '101', title: '启动活门', fabu: '赵槐啊', time: '2018-12-22', leixing: '指定课件'},
        {kid: '102', title: '目视', fabu: '测试', time: '2018-12-23', leixing: '指定课件'}

      ]
    }
  },
  mounted () {
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
