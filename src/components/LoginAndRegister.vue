<template>
  <div class="login-register">
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="400px"
      :showCancel="false"
      @close="dialogConfig.show = false"
    >
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <!--邮箱输入框-->
        <el-form-item prop="email">
          <el-input
            clearable
            size="large"
            placeholder="请输入邮箱"
            v-model="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <!--邮箱输入框-->
        <el-form-item prop="checkEmailCode">
          <div class="check-email-code-panel">
            <el-input
              clearable
              size="large"
              placeholder="请输入验证码"
              v-model="formData.checkEmailCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <el-button type="primary" size="large">获取验证码</el-button>
          </div>
        </el-form-item>
        <!--昵称输入框-->
        <el-form-item prop="nickName">
          <el-input
            clearable
            size="large"
            placeholder="请输入昵称"
            v-model="formData.nickName"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <!--密码输入框-->
        <el-form-item prop="password">
          <el-input
            clearable
            size="large"
            placeholder="请输入密码"
            v-model="formData.password"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <!--确定密码输入框-->
        <el-form-item prop="confirmPassword">
          <el-input
            clearable
            size="large"
            placeholder="请再次输入密码"
            v-model="formData.confirmPassword"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <!--验证码输入框-->
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              clearable
              size="large"
              placeholder="请输入验证码"
              v-model="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              class="check-code"
              @click="changeCheckCode(0)"
            />
          </div>
        </el-form-item>
        <!-- 记住我 -->
        <el-form-item>
          <div class="remeber-me">
            <el-checkbox v-model="formData.remeberMe"> 记住我 </el-checkbox>
          </div>
          <div class="note">
            <a href="javascript:void(0)" class="a-link">忘记密码?</a>
            <a href="javascript:void(0)" class="a-link">没有账号?</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
  checkCode: "/api/checkCode",
};
// 验证码
const checkCodeUrl = ref(api.checkCode);

const changeCheckCode = (type) => {
  checkCodeUrl.value = `${
    api.checkCode
  }?type=${type}&time=${new Date().getTime()}`;
};
// 0: 注册 1:登录 2:找回密码
const opType = ref();
const showPanel = (type) => {
  opType.value = type;
};
defineExpose({ showPanel });

const dialogConfig = reactive({
  show: true,
  title: "标题",
  buttons: [
    {
      type: "danger",
      text: "确定",
      click: (e) => {
        submitForm();
      },
    },
  ],
});

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};
</script>

<style lang="scss" scoped>
.login-register {
  .check-code-panel {
    display: flex;
    .check-code {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .remeber-me {
    width: 100%;
  }

  .note {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .login-btn {
    width: 100%;
  }

  .check-email-code-panel {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
