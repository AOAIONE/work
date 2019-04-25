<template>
  <div class="container">
    <detail-title :title="title"></detail-title>
    <div class="item ax_default">
      <div class="item_content">
        <label class="content_left">课件类容:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.content}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">日期:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.time}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">上课时间:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.uptime}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">课时:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.date}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">训练设施:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.time}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">教员:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.jiaoyuan}}
          </div>
        </div>
      </div>
      <div class="item_content">
        <label class="content_left">学员:</label>
        <div class="content_right">
          <div class="content_right_wrap">
            {{detail.xueyuan}}
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

export default {
  name: 'ClassDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '19EFE0005',
      detail: {id: '1', content: 'FFS 7[B]', time: '2019-04-01', uptime: '06:00——12:00', date: '6', jiaoyuan: '徐聪明', xueyuan: '张三 李四 王五'}

    }
  }
}
</script>
<style lang="less" scoped>
</style>
