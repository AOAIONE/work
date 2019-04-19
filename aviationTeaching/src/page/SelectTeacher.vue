<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="search_bar mar_top ax_default ">
            <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" />
            <a class="search_btn">搜索</a>
        </div>
        <div class="table_wrap ax_default">
            <div class="table_title table_common">
                <span class="flex1">课件ID</span>
                <span class="flex1">姓名</span>
                <span class="flex2">身份证</span>
                <span class="flex1">课件分配</span>
            </div>
            <div class="table_content table_common" v-for="course in courses" :key="course.kid">
                <span class="flex1">
                    <a class="linka">{{course.kid}}</a>
                </span>
                <span class="flex1">
                    <a class="linka">{{course.title}}</a>
                </span>
                <span class="flex2">
                    {{course.类型}}
                </span>
                <span class="flex1">
                    {{course.time}}
                </span>
            </div>
        </div>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'

export default {
  name: 'SelectTeacher',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '选择教员',
      courses: [
        {kid: '101', title: '启动活门', 类型: '测试', time: '课件分配'},
        {kid: '102', title: '目视', 类型: '510824199505024012', time: '2018-12-23'}

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
