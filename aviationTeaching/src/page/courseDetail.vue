<template>
    <div class="detail_container container">
        <detail-title :title="title"></detail-title>
        <detail-content v-for="detail in details" :key="detail.id" :detail="detail"></detail-content>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import detailContent from '@/components/DetailContent'

export default {
  name: 'CourseDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent
  },
  data () {
    return {
      title: '19EFE0005',
      details: [
        {key: '课程内容', value: 'FFS 7[B]', id: 1},

        {key: '日期', value: '2019-04-01', id: 2},
        {key: 'rr', value: '2019-04-01', id: 3},
        {key: '日期', value: '2019-04-01', id: 4}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
</style>
