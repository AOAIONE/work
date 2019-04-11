<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class='test'>123
      <div class='test1'>456</div>
    </div>
    <div class='test2'>789</div>
  </div>
</template>

<script>
import { demo } from '@/service/service'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '杨泉耀是我儿子'
    }
  },
  created () {
    // this.$weui.dialog({
    //   title: '提示',
    //   content: '是否领取礼品',
    //   buttons: [{
    //     label: '取消',
    //     type: 'default',
    //     onClick: () => {
    //       alert('您已取消领取礼品！')
    //     }
    //   }, {
    //     label: '确定',
    //     type: 'primary',
    //     onClick: () => {
    //       alert('您已确定领取礼品！')
    //     }
    //   }]
    // })
  },
  mounted () {
    demo('mock').then(response => {
      // this.msg = response.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.test{
  float: left;
  position: relative;
  width: 500px;
  background-color: red;
}
.test2{
  width:200px;
  float: left;
  background-color: yellow;
}
.test1{
  position: relative;
  top:50%;
  left:50%;
  width: 200px;
  margin-left: -100px;
  background-color: black;

}
</style>
