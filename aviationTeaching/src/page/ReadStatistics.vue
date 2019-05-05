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
                <a class="search_btn" @click="getReadStaticList(true)">搜索</a>
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
            <div class="scall_wrapper" ref="wrapper">
                <div class="warpper_content">
                    <div class="table_content table_common" v-for="user in users" :key="user.kid">
                        <span class="flex1">
                            <a class="linka" @click="toRoute">{{user.kid}}</a>
                        </span>
                        <span class="flex1">
                            <a class="linka" @click="toRoute">{{user.name}}</a>
                        </span>
                        <span class="flex1">
                            {{user.leixing}}
                        </span>
                        <span class="flex1">
                            {{user.way}}
                        </span>
                        <span class="flex1">
                            {{user.time}}
                        </span>
                    </div>
                </div>
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
      users: [

      ],
      page_index: 1,
      page_count: 15,
      keyword: '',
      study_status: 2,
      disRepet: false

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
        that.courseList = data.value
      },
      triggerDisplayData: false
    })
    this.getReadStaticList()
  },
  methods: {
    getReadStaticList: function (disRepet) {
      let data = {
        'study_status': this.study_status,
        'course_ware_id': this.$route.query.id,
        'user_role': '',
        'user_id': 0,
        'keyword': this.keyword,
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      this.disRepet = disRepet
      readStaticList(data).then(res => {
        if (res.is_success) {
          let arr = res.data.data
          let arr1 = JSON.parse(JSON.stringify(this.users))
          if (this.disRepet) {
            arr1 = []
          }
          this.users = [...arr1, ...arr]
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
                that.getReadStaticList()
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
        }
      })
    },
    toRoute: function () {
      this.$router.push({path: '/readUserDetail', query: {'id': this.$route.query.id}})
    }
  }

}
</script>
<style lang="less">
@import "../styles/read-statistics.less";
</style>
