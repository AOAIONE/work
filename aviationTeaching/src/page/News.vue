<template>
  <div class="container">
    <div class="buttonGroup ax_default">
      <a class="converButton" :class="{active:unread}" @click="unreadBtn">未读</a>
      <a class="converButton" :class="{active:already}" @click="alreadyBtn">已读</a>
    </div>
    <div class="scall_wrapper" ref="wrapper">
      <div class="warpper_content">
        <p class="info_content" v-for="info in news" :key="info.message_id" @click="setMessageRead(info.user_message_id)">
          <span>
            <i class="def_c" v-if="unread">•</i> {{info.message_content}}</span>
          <span class="info_content_right">{{info.add_time}}</span>
        </p>
      </div>
    </div>
    <bottom-tabbar :activeStatus="'news'"></bottom-tabbar>
  </div>
</template>
<script>
import bottomTabbar from '@/components/BottomTabbar'
import {messageList, messageRead} from '@/service/service'
export default {
  name: 'News',
  components: {
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      unread: true,
      already: false,
      isRead: '',
      news: [],
      page_index: 1,
      page_count: 15
    }
  },
  methods: {
    unreadBtn: function () {
      this.news = []
      this.isRead = 'not_yet'
      if (!this.unread) {
        this.unread = true
        this.already = false
      }
      this.getMessageList()
    },
    alreadyBtn: function () {
      this.news = []
      this.isRead = 'yet'
      if (!this.already) {
        this.already = true
        this.unread = false
      }
      this.getMessageList()
    },
    getMessageList: function () {
      let data = {
        'is_read': this.isRead,
        'keyword': '',
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      messageList(data).then(res => {
        if (res.status === 200) {
          let news = res.data.data
          let arr1 = JSON.parse(JSON.stringify(this.news))
          this.news = [...arr1, ...news]
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
                that.getMessageList()
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
        } else {
          swal('', '消息列表获取失败', 'error')
        }
      })
    },
    setMessageRead: function (id) {
      let data = {
        'userMessageId': id
      }
      messageRead(data).then(res => {
        if (!res.data.is_success) {
          swal('', '操作失败', 'error')
        }else {
          this.getMessageList()
        }
      })
    }
  },
  mounted () {
    this.isRead = 'not_yet'
    this.getMessageList()
  }
}
</script>
<style scoped>
@import "../styles/news.less";
</style>
