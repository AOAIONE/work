<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="search_bar mar_top ax_default ">
            <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" v-model="keyword" />
            <a @click="serach()" class="search_btn ">搜索</a>
        </div>
        <div class="table_wrap ax_default ">
            <div class="table_title table_common ">
                <span class="flex1 ">课件ID</span>
                <span class="flex2 ">课件标题</span>
                <span class="flex1 ">发布者</span>
                <span class="flex1 ">指派时间</span>
            </div>
            <div class="table_content table_common " v-for="course in courses " :key="course.user_id ">
                <span class="flex1 ">
                    <a class="linka " @click="toDetail(course.designated_id)">{{course.id}}</a>
                </span>
                <span class="flex2 ">
                    <a class="linka " @click="toDetail(course.designated_id)">{{course.name}}</a>
                </span>
                <span class="flex1 ">
                    {{course.publisher_name}}
                </span>
                <span class="flex1 ">
                    {{course.designated_time}}

                </span>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { designatedCourseWareList } from '@/service/service'

export default {
  name: 'AssignRead',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '指定阅读课件',
      courses: [],
      keyword: '',
      page_index: 1,
      page_count: 8
    }
  },
  mounted () {
    this.getCourseList()
  },
  methods: {
    getCourseList: function () {
      let data = {
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      designatedCourseWareList(data).then(res => {
        this.courses = res.data.data
      })
    },
    serach: function () {
      this.getCourseList()
    },
    // 跳转到教员详情，已分配的教员才能进入
    toDetail: function (id) {
      this.$router.push({path: '/assignReadDetail', query: {'designated_id': id}})
    }
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
