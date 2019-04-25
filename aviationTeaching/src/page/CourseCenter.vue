<template>
  <div class="container">
    <c-title :title="title1"></c-title>
    <c-drectory v-for="drectory in drectorys" :key="drectory.id" :drectory="drectory"></c-drectory>
    <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
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
      drectorys: []
    }
  },
  created () {
    // 课件中心目录切换
    this.drectoryCut()
  },
  methods: {
    drectoryCut: function () {
      let drectorys1 = [{text: '课件目录', id: 1, path: '/courseList', icon: '&#xe8ab;'},
        {text: '我的课件', id: 2, path: '/myCourse', icon: '&#xe61e;'},
        {text: '指派课件', id: 3, path: '/assignCourse', icon: '&#xe61f;'},
        {text: '我申请的课件', id: 4, path: '/myApplyCourse', icon: '&#xe620;'},
        {text: '课件申请批复', id: 5, path: '/courseApplyApproval', icon: '&#xe621;'}
      ]
      let drectorys2 = [{text: '课件目录', id: 1, path: '/courseList', icon: '&#xe8ab;'},
        {text: '我的课件', id: 2, path: '/myCourse', icon: '&#xe61e;'},
        {text: '指派课件', id: 3, path: '/assignCourse', icon: '&#xe61f;'},
        {text: '指定阅读课件', id: 4, path: '/assignRead', icon: '&#xe622;'},
        {text: '我申请的课件', id: 5, path: '/myApplyCourse', icon: '&#xe620;'},
        {text: '课件申请批复', id: 6, path: '/courseApplyApproval', icon: '&#xe621;'}
      ]
      let drectorys3 = [{text: '课件目录', id: 1, path: '/courseList', icon: '&#xe8ab;'},
        {text: '我申请的课件', id: 4, path: '/myApplyCourse', icon: '&#xe620;'},
        {text: '教员指派课件', id: 5, path: '/teacherAssignCourse', icon: '&#xe61f;'}]
      let currentRole = localStorage.getItem('currentRole')
      switch (currentRole) {
        case 'user':
          this.drectorys = drectorys1
          break
        case 'teacher':
          this.drectorys = drectorys2
          break
        case 'student':
          this.drectorys = drectorys3
          break
      }
    }
  }
}
</script>
<style lang="less">
</style>
