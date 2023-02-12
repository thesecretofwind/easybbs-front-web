<template>
  <el-dialog
    model-value="isShow"
    :title="title"
    :width="width"
    :show-close="isShwoClose"
    :top="top"
    :draggable="true"
    :close-on-click-modal="false"
    custom-class="custome-dialog"
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
    default: ''
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
})

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
