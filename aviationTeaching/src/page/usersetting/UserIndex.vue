<template>
    <div class="container">
        <div class="mgtop"></div>
        <div class="user_name">张凡</div>
        <p v-for="tag in tags" :key="tag.id" class="user_content ax_default">
            <!-- <router-link>{{tag.title}}</router-link> -->
            {{tag.title}}
        </p>
        <router-view></router-view>

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
        {title: '资料完善', id: 1},
        {title: '密码修改', id: 2},
        {title: '系统意见反馈', id: 3},
        {title: '切换身份', id: 4},
        {title: '解除绑定', id: 5}
      ]
      // routers:[
      //     {''}
      // ]
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/user-index.less";
</style>
