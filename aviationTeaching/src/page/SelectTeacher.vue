<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="courseList_container">
            <div class="select_bar ax_default pdt10">
                <div class="search_bar">
                    <input placeholder="请输入关键词,例如: 学员ID、姓名、手机号" class="search_input" v-model="keyword" />
                    <a @click="serach()" class="search_btn ">搜索</a>
                </div>
            </div>
            <div class="table_wrap1 ax_default ">
                <div class="table_title table_common ">
                    <span class="flex1 ">学员ID</span>
                    <span class="flex1 ">姓名</span>
                    <span class="flex2 ">身份证</span>
                    <span class="flex1 ">课件分配</span>
                </div>
                <div class="scall_wrapper" ref="wrapper">
                    <div v-if="students.length!==0" class="warpper_content">
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
                                <a v-if="student.is_designated===0 " class="course_tag1" @click="courseAssign(student)">课件分配</a>
                                <a v-else class="course_tag" @click="courseDelAssign(student)">解除分配</a>
                            </span>
                        </div>
                    </div>
                    <data-loading v-else></data-loading>

                </div>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import dataLoading from '@/components/DataLoading'

import { studentList, designateStudent, delDesignateTeacher } from '@/service/service'

export default {
  name: 'SelectTeacher',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'data-loading': dataLoading

  },
  data () {
    return {
      title: '选择学员',
      students: [],
      keyword: '',
      page_index: 1,
      page_count: 15,
      disRepet: false

    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {
    getStudentList: function (disRepet) {
      let data = {
        'course_ware_id': this.$route.query.id,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      this.disRepet = disRepet
      studentList(data).then(res => {
        let arr = res.data.data
        let arr1 = JSON.parse(JSON.stringify(this.students))
        if (this.disRepet) {
          arr1 = []
        }
        this.students = [...arr1, ...arr]
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
              that.getStudentList()
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
    },
    serach: function () {
      this.getStudentList(true)
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
    courseAssign: function (student) {
      let data = {
        'studentId': student.user_id,
        'courseWareId': this.$route.query.id
      }
      designateStudent(data).then(res => {
        if (res.data.is_success) {
          window.location.reload()
        }
      })
    },
    // 取消指派
    courseDelAssign: function (student) {
      let data = {'taskId': student.task_id}
      delDesignateTeacher(data).then(res => {
        if (res.data.is_success) {
          window.location.reload()
        }
      })
    }
  }

}
</script>
<style lang="less">
@import "../styles/course-common.less";
</style>
