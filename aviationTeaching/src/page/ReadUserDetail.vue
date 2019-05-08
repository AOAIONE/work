<template>
    <div class="container">
        <detail-title :title="title"></detail-title>
        <div class="item ax_default">
            <div class="item_content">
                <label class="content_left">用户ID:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.designated_user_info | getId}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">姓名:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.designated_user_info | getName}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">身份类型:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.leixing}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">课程课号:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.kehao}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">阅读方式:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.way}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">查阅总时长:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.time}}
                    </div>
                </div>
            </div>
            <div class="item_content">
                <label class="content_left">最近查阅时间:</label>
                <div class="content_right">
                    <div class="content_right_wrap">
                        {{detail.ladeTime}}
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
import detailContent from '@/components/DetailContent'
import { readStaticDetail } from '@/service/service'

export default {
  name: 'ReadUserDetail',
  components: {
    'detail-title': detailTitle,
    'bottom-tabbar': bottomTabbar,
    'detail-content': detailContent
  },
  data () {
    return {
      title: '',
      detail: {}
    }
  },
  methods: {
    getReadStaticDetail: function () {
      let data = {
        'study_status': '',
        'course_ware_id': this.$route.query.id,
        'user_role': this.$route.query.user_role,
        'user_id': this.$route.query.user_id,
        'keyword': '',
        'page_index': 0,
        'page_count': 0
      }
      readStaticDetail(data).then(res => {
        if (res.data.is_success) {
          this.detail = res.data.data
          this.title = res.data.data.designated_user_info.user_name
        }
      })
    }
  },
  filters: {
    getName: function (value) {
      return value ? value.user_name : ''
    },
    getId: function (value) {
      return value ? value.user_id : ''
    }
  },
  mounted () {
    this.getReadStaticDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
