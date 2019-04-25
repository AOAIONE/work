<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="search_bar mar_top ax_default ">
      <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" v-model="keyword" />
      <a @click="serach()" class="search_btn ">搜索</a>
    </div>
    <div class="table_wrap ax_default ">
      <div class="table_title table_common ">
        <span class="flex1 ">教员ID</span>
        <span class="flex1 ">姓名</span>
        <span class="flex2 ">身份证</span>
        <span class="flex1 ">课件分配</span>
      </div>
      <div class="table_content table_common " v-for="teacher in teachers " :key="teacher.user_id ">
        <span class="flex1 ">
          <a class="linka " @click="toDetail(teacher)">{{teacher.user_id}}</a>
        </span>
        <span class="flex1 ">
          <a class="linka " @click="toDetail(teacher)">{{teacher.user_name}}</a>
        </span>
        <span class="flex2 ">
          {{teacher.id_card_no}}
        </span>
        <span class="flex1 ">
          <a v-if="teacher.is_designated===0 " class="course_tag1 ">课件分配</a>
          <a v-else class="course_tag ">解除分配</a>
        </span>
      </div>
    </div>
    <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
  </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { teacherList } from '@/service/service'

export default {
  name: 'SelectTeacher',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '选择教员',
      teachers: [],
      keyword: '',
      page_index: 1,
      page_count: 8
    }
  },
  mounted () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList: function () {
      let data = {
        'course_ware_id': this.$route.query.id,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      teacherList(data).then(res => {
        this.teachers = res.data.data
      })
    },
    serach: function () {
      this.getTeacherList()
    },
    toDetail: function (teacher) {
      if (teacher.is_designated === 0) {
        return false
      } else {
        this.$router.push({path: '/teacherDetail', query: {'task_id': teacher.task_id}})
      }
    }
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
