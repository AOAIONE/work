<template>
    <div class="select-container">
      <ul>
        <li class="cell" :class="{mg:tab.isMg}" v-for="tab in tabs" :key="tab.id" @click=toRoute(tab.id)>
          <div class="img_background">
            <div class="img" :class="{mx:tab.isMx}" :style="{'background-image':'url('+tab.img+')','background-repate':'no-repeat','background-size':'cover'}"></div>
            </div>
          <span :class="{lf:tab.isLeft}">{{tab.text}}</span>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: 'SelectRole',
  data () {
    return {
      tabs: [
        {text: '教务员', id: 1, isMg: false, img: require('../assets/user_dean.png')},
        {text: '计划员', id: 2, isMg: true, img: require('../assets/user_planner.png')},
        {text: '教员', id: 3, isMg: true, isLeft: true, img: require('../assets/user_student.png')},
        {text: '学员', id: 4, isMg: true, isLeft: true, isMx: true, img: require('../assets/user_teacher.png')}
      ]
    }
  },
  methods: {
    toRoute: function (id) {
      console.log(id)
    }
  }
}
</script>
<style scoped>
    @import '../styles/select-role.less';
</style>
