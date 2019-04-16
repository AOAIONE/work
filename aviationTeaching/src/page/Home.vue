<template>
    <div class="home_container">
        <!-- <div class="mgtop"></div> -->
        <h-title :title="title1"></h-title>
        <div class="top_container">
            <h-drectory v-for="drectory in drectorys" :key="drectory.id" :text="drectory"></h-drectory>
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
      drectorys: [
        {text: '课表', id: 1},
        {text: '课件中心', id: 2},
        {text: '消息通知', id: 3},
        {text: '模拟机排课表', id: 4}
      ],
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
  }

}
</script>
<style lang="less" scoped>
@import "../styles/home.less";
</style>
