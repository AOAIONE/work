<template>
  <div class="container">
    <c-title :title="title1"></c-title>
    <c-drectory v-for="drectory in drectorys" :key="drectory.id" :drectory="drectory"></c-drectory>
    <bottom-tabbar></bottom-tabbar>
  </div>
</template>
<script>
import title from '@/components/Title'
import drectory from '@/components/Drectory'
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'CourseCenter',
  components: {
    'c-title': title,
    'c-drectory': drectory,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title1: {text: '课件中心', show: false},
      drectorys: [
        {text: '课件目录', id: 1},
        {text: '我的课件', id: 2},
        {text: '指派课件', id: 3},
        {text: '我申请的课件', id: 4},
        {text: '课件申请批复', id: 5}
      ]
    }
  }
}
</script>
<style lang="less">
</style>
