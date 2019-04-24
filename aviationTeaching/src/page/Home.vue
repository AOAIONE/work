<template>
  <div class="home_container">
    <!-- <div class="mgtop"></div> -->
    <h-title :title="title1"></h-title>
    <div class="top_container">
      <h-drectory v-for="drectory in drectorys" :key="drectory.id" :drectory="drectory"></h-drectory>
    </div>
    <h-title :title="title2"></h-title>
    <h-video-chunk v-for="video in videos" :key="video.id" :video="video"></h-video-chunk>
    <h-bottom-tabbar></h-bottom-tabbar>
  </div>
</template>

<script>
import title from '@/components/Title'
import drectory from '@/components/Drectory'
import videoChunk from '@/components/VideoChunk'
import bottomTabbar from '@/components/BottomTabbar'
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
  created () {
    // 首页热门分录安装角色切换
    this.drectoryCut()
  },
  methods: {
    drectoryCut: function () {
      let that = this
      let role = JSON.parse(this.$myUtil.decrypt(localStorage.getItem('role'))) // 使用CryptoJS方法加密
      let drectorys1 = [{text: '课表', id: 1, icon: '&#xe65e;'},
        {text: '课件中心', id: 2, path: '/courseCenter', icon: '&#xe8ab;'},
        {text: '消息通知', id: 3, icon: '&#xe608;'},
        {text: '模拟机排课表', id: 4, icon: '&#xe625;'}]
      let drectorys2 = [{text: '课表', id: 1, icon: '&#xe65e;'},
        {text: '消息通知', id: 3, icon: '&#xe608;'},
        {text: '模拟机排课表', id: 4, icon: '&#xe625;'}]
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
      // roleMapperNames.forEach(e => {
      //   let drectory = {}
      //   switch (e.roleName) {
      //     case 'user':
      //       drectory = {text: '教务员', userId: e.userId, img: require('../assets/user_dean.png'), role: e.roleName}
      //       this.tabs.push(tab)
      //       break
      //     case 'schemer':
      //       tab = {text: '计划员', userId: e.userId, img: require('../assets/user_planner.png'), role: e.roleName}
      //       this.tabs.push(tab)
      //       break
      //     case 'teacher':
      //       tab = {text: '教员', id: 3, isLeft: true, img: require('../assets/user_student.png'), role: e.roleName}
      //       this.tabs.push(tab)
      //       break
      //     case 'student':
      //       tab = {text: '学员', id: 4, isLeft: true, isMx: true, img: require('../assets/user_teacher.png'), role: e.roleName}
      //       this.tabs.push(tab)
      //       break
      //     default:
      //       console.log('角色请求出错')
      //       break
      //   }
      // })
    }
  }

}
</script>
<style lang="less" scoped>
@import "../styles/home.less";
</style>
