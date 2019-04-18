<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">用户ID:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.id}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">姓名:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.name}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">身份类型:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.leixing}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课程课号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.kehao}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">阅读方式:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.way}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">查阅总时长:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">最近查阅时间:</label>
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
  name: 'ReadUserDetail',
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
