<template>
    <div class="courseList_container container">
        <detail-title :title="title"></detail-title>
        <div class="search_bar ax_default">
            <input placeholder="请输入关键词,例如: 发布者、课件标题" class="search_input" v-model="keyword" />
            <a class="search_btn" @click="serach">搜索</a>
        </div>
        <div class="table_wrap1 ax_default">
            <div class="table_title table_common">
                <span class="flex1">课件ID</span>
                <span class="flex2">课件标题</span>
                <span class="flex1">发布者</span>
                <span class="flex1">指派时间</span>
            </div>
            <div class="scall_wrapper" ref="wrapper">
                <div v-if="courses.length!==0" class="warpper_content">
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
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import dataLoading from '@/components/DataLoading'
import { designatedCourseWareList } from '@/service/service'

export default {
  name: 'TeacherAssignCourse',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'data-loading': dataLoading
  },
  data () {
    return {
      title: '教员指派课件',
      courses: [
      ],
      keyword: '',
      page_index: 1,
      page_count: 15,
      disRepet: false
    }
  },
  mounted () {
    this.getCourseList()
  },
  methods: {
    getCourseList: function (disRepet) {
      let data = {
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      this.disRepet = disRepet
      designatedCourseWareList(data).then(res => {
        let arr = res.data.data
        let arr1 = JSON.parse(JSON.stringify(this.courses))
        if (this.disRepet) {
          arr1 = []
        }
        this.courses = [...arr1, ...arr]
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
              that.getCourseList()
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
      this.getCourseList(true)
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
