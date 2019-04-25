<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">反馈类型:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <label>
                            <input type="radio" name="1" id="" class="a-radio" :checked="opinion.leixing==0?true:false">
                            <span class="b-radio"></span>bug项
                        </label>
                        <label>
                            <input type="radio" name="1" id="" class="a-radio" :checked="opinion.leixing==1?true:false">
                            <span class="b-radio"></span>功能优化
                        </label>
                        <label>
                            <input type="radio" name="1" id="" class="a-radio" :checked="opinion.leixing==2?true:false">
                            <span class="b-radio"></span>建议
                        </label>
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">反馈项:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <input type="text" v-model="opinion.address" class="opinion_input" />
                    </div>
                </div>
            </div>
            <div class="detail_description">
                <label class="content_left">详细描述:</label>
                <textarea v-model="opinion.address" maxlength="300" class="opinion_textarea" />
            </div>
            <div class="detail_description">
                <label class="content_left">上传附件:</label>
                <div class="uploader_box">
                    <input class="uploader_input" type="file" accept="image/*" multiple="">
                </div>
                <span>*仅支持jpeg、gif、png、jpg格式文件</span>
            </div>
            <p class="operation">
                <a class="user_btn save_btn">保存</a>
                <a class="user_btn cancel_btn">取消</a>
            </p>
        </div>
        <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
export default {
  name: 'FeedBack',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar
  },
  data () {
    return {
      title: '系统意见反馈',
      txtVal: 0,
      opinion: {
        leixing: 1,
        sex: 1,
        phone: '15181001161',
        loginName: 'ceshi',
        card: '',
        number: '',
        address: '',
        beizhu: ''
      }
    }
  },
  methods: {
    // 显示Textarea里面的内容字数
    descInput: function () {
      let user = this.user
      this.txtVal = user.beizhu.length
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../styles/feed-back.less";
</style>
