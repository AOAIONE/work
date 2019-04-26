<template>
  <div class="container">
    <div class="buttonGroup ax_default">
      <a class="converButton" :class="{active:unread}" @click="unreadBtn">未读</a>
      <a class="converButton" :class="{active:already}" @click="alreadyBtn">已读</a>
    </div>
    <p class="info_content" v-for="info in news" :key="info.id">
      <span><i class="def_c">•</i> {{info.title}}</span>
      <span>{{info.time}}</span>
    </p>
    <bottom-tabbar :activeStatus="'news'"></bottom-tabbar>
  </div>
</template>
<script>
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'News',
  components: {
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      unread: true,
      already: false,
      news: [
        {id: 1, title: '您的课表有新的变化啦,请及时查看', time: '2019-04-08'},
        {id: 2, title: '您的课表有新的变化啦,请及时查看', time: '2019-04-08'},
        {id: 3, title: '您的课表有新的变化啦,请及时查看', time: '2019-04-08'},
        {id: 4, title: '您的课表有新的变化啦,请及时查看', time: '2019-04-08'}

      ]
    }
  },
  methods: {
    unreadBtn: function () {
      if (!this.unread) {
        this.unread = true
        this.already = false
      }
    },
    alreadyBtn: function () {
      if (!this.already) {
        this.already = true
        this.unread = false
      }
    }
  }
}
</script>
<style scoped>
@import "../styles/news.less";
</style>
