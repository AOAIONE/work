<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="courseList_container">
      <div class="select_bar ax_default pdt10">
        <div class="search_bar">
          <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" v-model="keyword" />
          <a @click="serach()" class="search_btn ">搜索</a>
        </div>
      </div>
      <div class="table_wrap1 ax_default ">
        <div class="table_title table_common ">
          <span class="flex1 ">教员ID</span>
          <span class="flex1 ">姓名</span>
          <span class="flex2 ">身份证</span>
          <span class="flex1 ">课件分配</span>
        </div>
        <div class="scall_wrapper" ref="wrapper">
          <div v-if="teachers.length!==0" class="warpper_content">
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
                <a v-if="teacher.is_designated===0 " class="course_tag1" @click="courseAssign(teacher)">课件分配</a>
                <a v-else class="course_tag" @click="courseDelAssign(teacher)">解除分配</a>
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

import { teacherList, designateTeacher, delDesignateTeacher } from '@/service/service'

export default {
  name: 'SelectUser',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'data-loading': dataLoading
  },
  data () {
    return {
      title: '选择教员',
      teachers: [],
      keyword: '',
      page_index: 1,
      page_count: 15,
      disRepet: false
    }
  },
  mounted () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList: function (disRepet) {
      let data = {
        'course_ware_id': this.$route.query.id,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      this.disRepet = disRepet
      teacherList(data).then(res => {
        let arr = res.data.data
        let arr1 = JSON.parse(JSON.stringify(this.teachers))
        if (this.disRepet) {
          arr1 = []
        }
        this.teachers = [...arr1, ...arr]
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
              that.getTeacherList()
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
      this.getTeacherList(true)
    },
    // 跳转到教员详情，已分配的教员才能进入
    toDetail: function (teacher) {
      if (teacher.is_designated === 0) {
        return false
      } else {
        this.$router.push({path: '/userDetail', query: {'task_id': teacher.task_id}})
      }
    },
    // 课件指派教员
    courseAssign: function (teacher) {
      debugger
      let data = {
        'teacherId': teacher.user_id,
        'courseWareId': this.$route.query.id
      }
      designateTeacher(data).then(res => {
        if (res.data.is_success) {
          window.location.reload()
        }
      })
    },
    // 取消指派
    courseDelAssign: function (teacher) {
      let data = {'taskId': teacher.task_id}
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
