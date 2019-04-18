<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">教员ID:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.id}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">身份证号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.name}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">手机号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.leixing}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课件分配:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.kehao}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">学习进度:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.way}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">学习次数:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">总学习时长:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.ladeTime}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">最近学习时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.ladeTime}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">修改学习状态:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.ladeTime}}
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
  name: 'TeacherDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent
  },
  data () {
    return {
      title: '赵槐',
      detail:
        {id: 1, name: '赵槐', kecheng: '型别等级训练', leixing: '测试', kehao: '赵槐', way: '指定阅读', time: '2018-12-09', ladeTime: '2018-09-08'}
    }
  }
}
</script>
<style lang="less" scoped>
</style>
