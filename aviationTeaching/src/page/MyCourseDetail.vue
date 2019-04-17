<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class=""></div>
        <div class="ax_default">
            <div class="item_content">
                <label class="content_left">课件ID:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.id}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课件标题:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.title}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">适用课程:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.kecheng}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课件类型:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.leixing}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">发布者:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.fabu}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">发布时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">备注:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.beizhu}}
                    </div>
                </div>
            </div>
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
import detailContent from '@/components/DetailContent'

export default {
  name: 'MyCourseDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent
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
