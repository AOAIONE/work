<template>
    <div class="detail_container">
        <detail-title :title="title"></detail-title>
        <bottom-tabbar></bottom-tabbar>
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
      title: '19EFE0005'
    }
  }
}
</script>
<style lang="less" scoped>
</style>
