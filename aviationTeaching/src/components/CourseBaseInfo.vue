<template>
    <div class="course_base">
        <div class="item_content">
            <label class="content_left">课件ID:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.id}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">课件标题:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.name}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">适用课程:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.corresponding_course}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">课件类型:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.privilege}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">发布者:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.publisher_name}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">发布时间:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.add_time}}
                </div>
            </div>
        </div>
        <div class="item_content">
            <label class="content_left">备注:</label>
            <div class="content_right">
                <div class="content_right_wrap">
                    {{courseBase.note}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'CourseBaseInfo',
  props: ['courseBase']
}
</script>
<style lang="less">
</style>
