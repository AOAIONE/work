<template>
    <div class="courseList_container container">
        <detail-title :title="title"></detail-title>
        <div class="select_bar ax_default">
            <span>课件分类:&nbsp;&nbsp;</span>
            <!-- <select class="select">
                    <option class="select_op" value="全部">全部</option>
                    <option value="课程">课程</option>
                    <option value="测试">测试</option>
                </select> -->
            <div id="mobileSelect2"></div>
        </div>
        <bottom-tabbar></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'

let mobileSelect2 = new MobileSelect({
  trigger: '#trigger2',
  title: '地区选择',
  wheels: [
    {data: [
      {id: '1', value: '附近'},
      {id: '2', value: '上城区'},
      {id: '3', value: '下城区'},
      {id: '4', value: '江干区'},
      {id: '5', value: '拱墅区'},
      {id: '6', value: '西湖区'}
    ]},
    {data: [
      {id: '1', value: '1000米'},
      {id: '2', value: '2000米'},
      {id: '3', value: '3000米'},
      {id: '4', value: '5000米'},
      {id: '5', value: '10000米'}
    ]}
  ],
  callback: function (indexArr, data) {
    console.log(data) // 返回选中的json数据
  }})
export default {
  name: 'CourseList',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {title: '课件目录'}
  }
}
</script>
<style lang="less" scoped>
@import "../styles/course-list.less";
</style>
