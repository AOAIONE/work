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
                    <input class="uploader_input" id="upFile" type="file" :accept="accept" multiple="" @change="showPic">
                </div>
                <img v-if="videopic" :src="videopic" class="uploader_box">
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
import { upLoadFile, feedBack } from '@/service/service'
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
      videopic: '',
      opinion: {
        title: '',
        nei_rong: '',
        type_name: '',
        files: [
        ]
      },
      accept: 'image/gif, image/jpeg, image/png, image/jpg'

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
        'files': this.files
      }
      feedBack(data).then(res => {
        if (res.data.is_success) {
          swal('', res.data.data, 'success').then((value) => {
            this.$router.push('/userIndex')
          })
        } else {
          swal('', '意见提交失败', 'error')
        }
      })
    },
    cancel: function () {
      this.$router.push('/userIndex')
    },
    showPic: function () {
      let files = document.getElementById('upFile').files
      let file = files.length > 0 ? files[0] : ''
      if (!file) {
        return
      }
      let time = this.$myUtil.dateFormat(new Date(), 'yyyy-MM-dd')
      let userId = localStorage.getItem('currentRoleId')
      if (this.accept.indexOf(file.type) === -1) {
        swal('', '请选择我们支持的图片格式！', 'warning')
        return
      }
      if (file.size > 3145728) {
        swal('', '请选择3M以内的图片！', 'warning')
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      let data = new FormData()
      data.append('file1', file)
      data.append('dirpath', 'feedback/' + userId + '/' + time)
      upLoadFile(data).then(res => {
        if (res.status === 200) {
          this.videopic = reader.result
          this.opinion.files.push(res.data)
        } else {
          swal('', '图片上传失败', 'error')
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../styles/feed-back.less";
</style>
