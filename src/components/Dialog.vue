<template>
  <el-dialog
    :model-value="isShow"
    :title="title"
    :width="width"
    :show-close="isShwoClose"
    :top="top"
    :draggable="true"
    :close-on-click-modal="false"
    @close="close"
    class="custome-dialog"
  >
    <div class="dialog-body">
      <slot></slot>
    </div>
    <template v-if="(buttons && buttons.length > 0) || isShowCancel">
      <div class="dialog-footer">
        <el-button link v-if="isShowCancel" @click="close">取消</el-button>
        <el-button v-for="(btn,index) in buttons" :key="index" :type="btn.type" @click="btn.click">{{btn.text}}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';

const props = defineProps({
  isShow: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: '标题'
  },
  isShwoClose: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '30%'
  },
  top: {
     type: String,
      default: '50px'
  },
  buttons: {
    type: Array,
  },
  isShowCancel: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits();
const close = () => {
  emit('close');
};


</script>

<style lang='scss'>
// style上不能添加scoped,不然该组件的样式传到不到子组件中
.custome-dialog {

  .el-dialog__body {
    padding: 0;
  }

  .dialog-body {
    min-height: 100px;
    max-height: calc(100vh - 200px);
    padding: 15px;
    border-top: 1px solid #ddd;
    border-bottom:1px solid #ddd;
    overflow: auto;
  }

  .dialog-footer {
    text-align: right;
    padding: 10px 20px;
  }
}

.el-dialog__body {
  padding: 0;
}
</style>
