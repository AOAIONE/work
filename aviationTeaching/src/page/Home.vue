<template>
  <div class="home_container">
    <h-title :title="title1"></h-title>
    <div class="top_container">
      <h-drectory v-for="drectory in drectorys" :key="drectory.id" :drectory="drectory"></h-drectory>
    </div>
    <h-title :title="title2"></h-title>
    <div class="video_wrap_container">
      <h-video-chunk v-for="video in videos" :key="video.id" :video="video"></h-video-chunk>
    </div>
    <h-bottom-tabbar :activeStatus="'home'"></h-bottom-tabbar>
  </div>
</template>

<script>
import title from '@/components/Title'
import drectory from '@/components/Drectory'
import videoChunk from '@/components/VideoChunk'
import bottomTabbar from '@/components/BottomTabbar'
import { hotList, bondWechat } from '@/service/service'

export default {
  name: 'Home',
  components: {
    'h-title': title,
    'h-drectory': drectory,
    'h-video-chunk': videoChunk,
    'h-bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title1: {text: '热门分录', show: false},
      title2: {text: '热门课件', show: true},
      drectorys: [],
      page_index: 1,
      page_count: 8,
      videos: [
        {url: 'http://pic3.nipic.com/20090527/1242397_102231006_2.jpg', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'},
        {url: '', title: '123', name: '赵槐', date: '2019-02-03'}
      ]
    }
  },
  mounted () {
    // 首页热门分录装角色切换
    this.drectoryCut()
    this.getHotList()
    this.getOpenId()
  },
  methods: {
    drectoryCut: function () {
      // 按照权限动态生成tab卡
      let that = this
      let role = JSON.parse(this.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法加密
      let drectorys1 = [{text: '课表', id: 1, path: '/classSchedule', icon: '&#xe639;'},
        {text: '课件中心', id: 2, path: '/courseCenter', icon: '&#xe63b;'},
        {text: '消息通知', id: 3, path: '/news', icon: '&#xe608;'},
        {text: '模拟机排课表', id: 4, path: '/analogClassSchedule', icon: '&#xe625;'}]
      let drectorys2 = [{text: '课表', id: 1, path: '/classSchedule', icon: '&#xe65e;'},
        {text: '消息通知', id: 3, path: '/news', icon: '&#xe608;'},
        {text: '模拟机排课表', id: 4, path: '/analogClassSchedule', icon: '&#xe625;'}]
      let currentRole = localStorage.getItem('currentRole')
      switch (currentRole) {
        case 'user':
          that.drectorys = drectorys1
          break
        case 'schemer':
          that.drectorys = drectorys2
          break
        case 'teacher':
          that.drectorys = drectorys1
          break
        case 'student':
          that.drectorys = drectorys1
          break
      }
    },
    getHotList: function () {
      let data = {
        'page_index': this.page_index,
        'page_count': this.page_count
      }
      hotList(data).then(res => {
        if (res.data.data.is_success) {

        }
      })
    },
    getOpenId: function () {
      let openId = window.location.href.split('=')[1]
      bondWechat({'openId': openId}).then(res => {
        if (res.data === 'success') {
          localStorage.setItem('openId', openId)
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
@import "../styles/home.less";
</style>
