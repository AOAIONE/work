<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="search_bar mar_top ax_default ">
            <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" v-model="keyword" />
            <a @click="serach()" class="search_btn ">搜索</a>
        </div>
        <div class="table_wrap ax_default ">
            <div class="table_title table_common ">
                <span class="flex1 ">学员ID</span>
                <span class="flex1 ">姓名</span>
                <span class="flex2 ">身份证</span>
                <span class="flex1 ">课件分配</span>
            </div>
            <div class="table_content table_common " v-for="student in students " :key="student.user_id ">
                <span class="flex1 ">
                    <a class="linka " @click="toDetail(student)">{{student.user_id}}</a>
                </span>
                <span class="flex1 ">
                    <a class="linka " @click="toDetail(student)">{{student.user_name}}</a>
                </span>
                <span class="flex2 ">
                    {{student.id_card_no}}
                </span>
                <span class="flex1 ">
                    <a v-if="student.is_designated===0 " class="course_tag1" @click="courseAssign(student.user_id)">课件分配</a>
                    <a v-else class="course_tag" @click="courseDelAssign(student.task_id)">解除分配</a>
                </span>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { studentList, designateStudent, delDesignateTeacher } from '@/service/service'

export default {
  name: 'SelectTeacher',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '选择学员',
      students: [],
      keyword: '',
      page_index: 1,
      page_count: 8
    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {
    getStudentList: function () {
      let data = {
        'course_ware_id': this.$route.query.id,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      studentList(data).then(res => {
        this.students = res.data.data
      })
    },
    serach: function () {
      this.getStudentList()
    },
    // 跳转到学员详情，已分配的学员才能进入
    toDetail: function (student) {
      if (student.is_designated === 0) {
        return false
      } else {
        this.$router.push({path: '/teacherDetail', query: {'task_id': student.task_id}})
      }
    },
    // 课件指派学员
    courseAssign: function (studentId) {
      let data = {
        'studentId': studentId,
        'courseWareId': this.$route.query.id
      }
      designateStudent(data).then(res => {
        if (res.data.is_success) {
          this.getStudentList()
        }
      })
    },
    // 取消指派
    courseDelAssign: function (taskId) {
      let data = {'taskId': taskId}
      delDesignateTeacher(data).then(res => {
        if (res.data.is_success) {
          this.getStudentList()
        }
      })
    }
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
