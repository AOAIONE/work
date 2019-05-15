<template>
  <div class="container">
    <div class="user_name">{{title}}</div>
    <div class="user_head">
      <img :src="userPic">
    </div>
    <p v-for="tag in tags" :key="tag.id" class="user_content ax_default" @click="toRoute(tag.path)">
      <span class="iconfont user_icon" v-html="tag.icon"></span>{{tag.title}}
    </p>
    <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
  </div>
</template>
<script>
import bottomTabbar from '@/components/BottomTabbar'
import { myInfo } from '@/service/service'

export default {
  name: 'UserIndex',
  components: {
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '',
      tags: [
        {title: '资料完善', id: 1, path: '/dataComplete', icon: '&#xe79c;'},
        {title: '密码修改', id: 2, path: '/passwordModifi', icon: '&#xe62d;'},
        {title: '系统意见反馈', id: 3, path: '/feedBack', icon: '&#xe6ae;'},
        {title: '切换身份', id: 4, path: '/converRole', icon: '&#xe60b;'},
        {title: '解除绑定', id: 5, path: '/unbound', icon: '&#xe67f;'}
      ],
      userPic: ''
    }
  },
  methods: {
    toRoute: function (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    let that = this
    myInfo().then(res => {
      this.userPic = res.data.data.avatar_url
    })
    let currentRole = localStorage.getItem('currentRole')
    let roles = JSON.parse(this.$myUtil.decrypt(localStorage.getItem('role'))).roleMapperNames // 使用CryptoJS方法解密
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].roleName === currentRole) {
        that.title = roles[i].userName
        break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../styles/user-index.less";
</style>
