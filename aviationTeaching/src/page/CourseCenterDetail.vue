<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">阅读权限:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <a class="btn">立即申请</a>
                        <a class="albtn" v-if="true">已申请</a>
                    </div>
                </div>
            </div>
        </div>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import courseBaseInfo from '@/components/CourseBaseInfo'

export default {
  name: 'CourseCenterDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'course-base-info': courseBaseInfo
  },
  data () {
    return {
      title: '发动机火警ECAM程序',
      detail:
        {id: 1, title: '发动机火警ECAM程序', kecheng: '型别等级训练', leixing: '测试', fabu: '赵槐', time: '2018-12-09', beizhu: 'ddasdasdasdasdasdas'}
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  display: inline-block;
  width: 142px;
  height: 52px;
  font-family: "微软雅黑";
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  text-align: center;
  color: #0079fe;
  line-height: 52px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 121, 254, 1);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 60px;
}
.albtn {
  display: inline-block;
  width: 120px;
  height: 42px;
  font-family: "微软雅黑";
  font-weight: 410;
  font-style: normal;
  font-size: 24px;
  text-align: center;
  color: #0079fe;
  line-height: 42px;
  box-sizing: border-box;
  background-color: rgba(201, 201, 201, 1);
  border-radius: 60px;
}
</style>
