<template>
    <div class="container pdbottom">
        <detail-title :title="title"></detail-title>
        <div class="item video_wrap">
            <!-- <img :src="detail.img"> -->
            <iframe id="iframe" class="ifr" src="http://demo-scal.ccar142.com//upload/data/kejian/jiaowu/6/%E7%89%B9%E6%83%85%E7%A8%8B%E5%BA%8F/index.htm" frameborder="0"></iframe>
        </div>
        <div class="myitem ax_default">
            <course-base-info :courseBase="detail"></course-base-info>
            <div class="item_content">
                <label class="content_left">直排时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.fabu}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">学习次数:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.beizhu}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">总学习时长:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.beizhu}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">最近学习时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.beizhu}}
                    </div>
                </div>
            </div>
        </div>
        <bottom-tabbar :activeStatus="'course'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import courseBaseInfo from '@/components/CourseBaseInfo'

export default {
  name: 'AssignReadDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'course-base-info': courseBaseInfo

  },
  data () {
    return {
      title: '发动机火警ECAM程序',
      detail:
        {id: 1, title: '发动机火警ECAM程序', kecheng: '型别等级训练', leixing: '测试', fabu: '赵槐', time: '2018-12-09', beizhu: 'ddasdasdasdasdasdas', img: 'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg'}
    }
  }
}
</script>
<style lang="less" scoped>
.myitem {
  margin-top: 70px;
}
.ifr {
  width: 100%;
  height: 100%;
}
.video_wrap {
  width: 100%;
  height: 408px;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>
