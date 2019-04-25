<template>
    <div class="tabbar_container">
        <a href="javascript:;" @click="toRoute('/home')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe601;</span>
            </p>
            <p>
                <span class="item_bottom">
                    首页
                </span>
            </p>
        </a>
        <a href="javascript:;" @click="toRoute('/classSchedule')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe65e;</span>
            </p>
            <p>
                <span class="item_bottom">
                    课表
                </span>
            </p>
        </a>
        <a href="javascript:;" v-if="showCourseCenter" @click="toRoute('/courseCenter')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe8ab;</span>
            </p>
            <p>
                <span class="item_bottom">课件</span>
            </p>
        </a>
        <a href="javascript:;" v-if="showMessage" @click="toRoute('')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe608;</span>
                <span class="item_badge ax_default">
                    <span class="badge_wrap">
                        <span class="badge">8</span>
                    </span>
                </span>
            </p>
            <p>
                <span class="item_bottom">信息</span>
            </p>
        </a>
        <a href="javascript:;" @click="toRoute('/userIndex')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe603;</span>
            </p>
            <p>
                <span class="item_bottom">我的</span>
            </p>
        </a>
    </div>
</template>
<script>
export default {
  name: 'BottomTabbar',
  data () {
    return {
      showCourseCenter: true,
      showMessage: true
    }
  },
  methods: {
    toRoute: function (path) {
      this.$router.push(path)
    },
    showMenu: function () {
      if (localStorage.getItem('currentRole') === 'schemer') {
        this.showCourseCenter = false
        this.showMessage = false
      }
    }
  },
  mounted () {
    this.showMenu()
  }
}
</script>

<style lang="less" scoped>
.tabbar_container {
  box-shadow: 0 20px 6px rgba(0, 0, 0, 0.07);
  position: fixed;
  display: flex;
  z-index: 4;
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
}
.tabbar__item {
  width: 150px;
  height: 120px;
  flex: 1;
  font-size: 0;
}
.item_wrap {
  position: absolute;
  left: 0px;
  top: 24px;
  width: 150px;
  word-wrap: break-word;
}
.item_top {
  font-size: 48px;
}
.item_bottom {
  font-size: 24px;
}
.item_badge {
  position: absolute;
  left: 524px;
  top: 12px;
  width: 50px;
  height: 40px;
  font-family: "微软雅黑 Regular", "微软雅黑";
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  color: #ffffff;
  display: inline-block;
}
.badge_wrap {
  display: inline-block;
  width: 45px;
  height: 35px;
  background: inherit;
  background-color: rgba(249, 94, 90, 1);
  border: none;
  border-radius: 26px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: "微软雅黑 Regular", "微软雅黑";
  font-weight: 400;
  font-style: normal;
  font-size: 22px;
  color: #ffffff;
}
.badge {
  position: absolute;
  left: 0px;
  top: 2px;
  width: 50px;
  word-wrap: break-word;
}
</style>
