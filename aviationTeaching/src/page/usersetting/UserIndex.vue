<template>
  <div class="container">
    <div class="mgtop"></div>
    <div class="user_name">张凡</div>
    <p v-for="tag in tags" :key="tag.id" class="user_content ax_default" @click="toRoute(tag.path)">
      <!-- <router-link>{{tag.title}}</router-link> -->
      {{tag.title}}
    </p>

    <bottom-tabbar></bottom-tabbar>
  </div>
</template>
<script>
import bottomTabbar from '@/components/BottomTabbar'

export default {
  name: 'UserIndex',
  components: {
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '张凡',
      tags: [
        {title: '资料完善', id: 1, path: '/dataComplete'},
        {title: '密码修改', id: 2, path: '/passwordModifi'},
        {title: '系统意见反馈', id: 3, path: '/feedBack'},
        {title: '切换身份', id: 4, path: '/converRole'},
        {title: '解除绑定', id: 5, path: '/unbound'}
      ]
      // routers:[
      //     {''}
      // ]
    }
  },
  methods: {
    toRoute: function (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/user-index.less";
</style>
