<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">反馈类型:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <label>
                            <input type="radio" name="1" id='1' class="a-radio" @click="radioSelect('bug项')">
                            <span class="b-radio"></span>bug项
                        </label>
                        <label>
                            <input type="radio" name="1" id='2' class="a-radio" @click="radioSelect('功能优化')">
                            <span class="b-radio"></span>功能优化
                        </label>
                        <label>
                            <input type="radio" name="1" id='3' class="a-radio" @click="radioSelect('建议')">
                            <span class="b-radio"></span>建议
                        </label>
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">反馈项:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        <input type="text" v-model="opinion.title" class="opinion_input" />
                    </div>
                </div>
            </div>
            <div class="detail_description">
                <label class="content_left">详细描述:</label>
                <textarea v-model="opinion.nei_rong" maxlength="300" class="opinion_textarea" />
            </div>
            <div class="detail_description">
                <label class="content_left">上传附件:</label>
                <div class="uploader_box">
                    <input class="uploader_input" type="file" accept="image/*" multiple="">
                </div>
                <span>*仅支持jpeg、gif、png、jpg格式文件</span>
            </div>
            <p class="operation">
                <a class="user_btn save_btn" @click="saveOption">保存</a>
                <a class="user_btn cancel_btn" @click="cancel">取消</a>
            </p>
        </div>
        <bottom-tabbar :activeStatus="'user'"></bottom-tabbar>
    </div>
</template>
<script>
import detailTitle from '@/components/DetailTitle'
import bottomTabbar from '@/components/BottomTabbar'
import { feedBack } from '@/service/service'
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
      checkValue: '',
      opinion: {
        title: '',
        nei_rong: '',
        type_name: '',
        files: [
        ]
      }
    }
  },
  methods: {
    radioSelect: function (value) {
      this.checkValue = value
    },
    // 显示Textarea里面的内容字数
    descInput: function () {
      let user = this.user
      this.txtVal = user.beizhu.length
    },
    // 意见提交
    saveOption: function () {
      let data = {
        'title': this.opinion.title,
        'nei_rong': this.opinion.nei_rong,
        'type_name': this.checkValue,
        'files': [
          '222'
        ]
      }
    //   feedBack(data).then(res => {
    //   })
    },
    cancel: function () {
      this.$router.push('/userIndex')
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../styles/feed-back.less";
</style>
