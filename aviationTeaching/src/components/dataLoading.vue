<template>
    <div v-if="isLoading" class="notData">数据加载中<img src="../assets/loading.gif">
    </div>
    <div v-else-if="notData" class="notData">------没有数据------
    </div>
</template>
<style tyle="less" scoped>
</style>
<script>
export default {
  name: 'DataLoading',
  props: ['isLoading', 'notData'],
  mounted () {

  }
}
</script>
