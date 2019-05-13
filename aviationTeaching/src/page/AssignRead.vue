<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="search_bar mar_top ax_default ">
      <input placeholder="请输入关键词,例如: 教员ID、姓名、手机号" class="search_input" v-model="keyword" />
      <a @click="serach()" class="search_btn ">搜索</a>
    </div>
    <div class="table_wrap1 ax_default ">
      <div class="table_title table_common ">
        <span class="flex1 ">课件ID</span>
        <span class="flex2 ">课件标题</span>
        <span class="flex1 ">发布者</span>
        <span class="flex1 ">指派时间</span>
      </div>
      <div class="scall_wrapper" ref="wrapper">
        <div v-if="courses.length!==0" class="warpper_content">
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
        <data-loading :isLoading="isLoading" :notData="notData"></data-loading>
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
  name: 'AssignRead',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'data-loading': dataLoading

  },
  data () {
    return {
      title: '',
      courses: [],
      keyword: '',
      page_index: 1,
      page_count: 15,
      disRepet: false,
      isLoading: false,
      notData: false

    }
  },
  mounted () {
    if (Number(this.$route.query.id) === 5) {
      this.title = '教员指派课件'
    } else {
      this.title = '指定阅读课件'
    }
    this.getCourseList()
  },
  methods: {
    getCourseList: function (disRepet) {
      this.isLoading = true
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
        this.isLoading = false
        if (this.courses.length === 0) {
          this.notData = true
        }
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
