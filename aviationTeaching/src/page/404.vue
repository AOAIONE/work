<template>
    <div class="error404">
        <div class="info">
            <h1>404</h1>
            <h2>抱歉，您访问的页面不存在或已被删除！ (｡•ˇ‸ˇ•｡)</h2>
            <div class="menu">
                <a class="btn" @click="toHome">返回首页</a>
                <a class="btn btn_brown" @click="go">返回上一步</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'notFound',
  methods: {
    toHome: function () {
      this.$router.push('/home')
    },
    go: function () {
      this.$router.go(-1)
    }
  }

}
</script>
<style lang="less" scoped>
.error404 {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
  font-family: "Arial, Microsoft YaHei, SimSun";
}
.error404 .info {
  width: 98%;
  padding-left: 1%;
  padding-right: 1%;
  clear: both;
}
.error404 .info h1 {
  margin-top: 70px;
  margin-bottom: 20px;
  font-size: 196px;
  line-height: 105px;
  color: #f35d34;
  text-transform: uppercase;
  font-weight: 700;
}
.error404 .info h2 {
  font-size: 46px;
  line-height: 66px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 40px;
  margin-top: 40px;
}
.error404 .info .menu {
  font-size: 32px;
  line-height: 48px;
  font-weight: 300;
  color: #000000;
  text-transform: uppercase;
  margin: 30px 0;
}
.error404 .info .btn {
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  border: 0px solid;
  border-bottom: 4px solid;
  border-color: #ef6d00;
  padding: 20px 82px;
  border-radius: 10px;
  background: none;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 40px 0 0;
  background-color: #ff8000;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  cursor: pointer;
}
.error404 .info .btn_brown {
  border-color: #7b7b7b;
  background-color: #9f9f9f;
}
</style>
