<template>
    <div class="tabbar_container">
        <a href="javascript:;" :class="{activeMenu:activeStatus==='home'}" @click="toRoute('/home')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe601;</span>
            </p>
            <p>
                <span class="item_bottom">
                    首页
                </span>
            </p>
        </a>
        <a href="javascript:;" :class="{activeMenu:activeStatus==='table'}" @click="toRoute('/classSchedule',1)" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe65e;</span>
            </p>
            <p>
                <span class="item_bottom">
                    课表
                </span>
            </p>
        </a>
        <a href="javascript:;" v-if="showCourseCenter" :class="{activeMenu:activeStatus==='course'}" @click="toRoute('/courseCenter')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe602;</span>
            </p>
            <p>
                <span class="item_bottom">课件</span>
            </p>
        </a>
        <a href="javascript:;" v-if="showMessage" :class="{activeMenu:activeStatus==='news'}" @click="toRoute('/news')" class="tabbar__item">
            <p class="item_top">
                <span class="iconfont">&#xe611;</span>
                <span class="item_badge ax_default">
                    <span class="badge_wrap">
                        <!-- <span class="badge">8</span> -->
                    </span>
                </span>
            </p>
            <p>
                <span class="item_bottom">信息</span>
            </p>
        </a>
        <a href="javascript:;" :class="{activeMenu:activeStatus==='user'}" @click="toRoute('/userIndex')" class="tabbar__item">
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
  props: ['activeStatus'],
  data () {
    return {
      showCourseCenter: true,
      showMessage: true
    }
  },
  methods: {
    toRoute: function (path, id) {
      if (!id) {
        this.$router.push(path)
      } else {
        this.$router.push({path: path, query: {id: Number(id)}})
      }
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
    this.localPath = window.location.hash.split('/')[1]
  },
  watch: {
    'localPath': function (value) {
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar_container {
  box-shadow: 0px 0 14px 0 #e2e2e2;
  position: absolute;
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
  margin-top: 10px;
}
.item_top span.iconfont {
  font-size: 42px;
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
  position: absolute;
  background-color: rgba(249, 94, 90, 1);
  left: 8px;
  top: 2px;
  padding: 0 10px;
  border: none;
  border-radius: 26px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  word-wrap: break-word;
  font-family: "微软雅黑 Regular", "微软雅黑";
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
}
.activeMenu {
  //   color: #0079fe;
  color: #d7000f;
}
</style>
