<template>
  <div>
    <div class="header" v-show="isShowHeader">
      <!-- logo -->
      <div class="header-content" :style="{width: proxy.globalInfo.bodyWidth + 'px'}">
        <router-link to="/" class="logo a-link">
          <span v-for="(item, index) in logonInfo" :style="{color: item.color}" :key="index">{{item.letter}}</span>
        </router-link>    
      <!-- 板块信息 -->
      <div class="menu-panel"></div>
      <!-- 登录注册及用户信息 -->
      <div class="userinfo-panel">
        <el-button type="primary">
          发帖<span class="iconfont icon-add"></span>
        </el-button>
        <el-button type="primary" class="search-btn">
          搜索<span class="iconfont icon-search"></span>
        </el-button>

        <el-button-group :style="{'margin-left': '5px'}">
          <el-button type="primary" plain @click="loginAndRegister(0)">登录</el-button>
          <el-button type="primary" plain @click="loginAndRegister(1)">注册</el-button>
        </el-button-group>
      </div>
  <!-- <Dialog :isShow="dialogStatus" :buttons="buttons" @close="dialogStatus = false">
    <div style="height:1500px">这是里内容</div> 
  </Dialog> -->
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>

    <!-- 登录,注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const {proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const logonInfo = ref([
  {
    letter: 'E',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'a',
    color: 'rgb(251, 54, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
  {
    letter: 'y',
    color: 'rgb(50, 133, 255)'
  },
  {
    letter: 'b',
    color: 'rgb(37, 178, 78)'
  },
  {
    letter: 'b',
    color: 'rgb(253, 50, 36)'
  },
  {
    letter: 's',
    color: 'rgb(255, 186, 2)'
  },
]);

const isShowHeader = ref(true);

const SCROLL_DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN'
}

const getScrollTop = () => {
  const scrollTop = document.documentElement.scrollTop ||
  document.body.scrollTop ||
  window.pageYOffset
  return scrollTop;
};

const initScroll = () => {
  let initScrollTop = getScrollTop();
  let currentScrollDirection = SCROLL_DIRECTION.DOWN;

  window.addEventListener('scroll', () => {
    const currentScrollTop = getScrollTop();
    if (currentScrollTop > initScrollTop) { // 向下滚动
      currentScrollDirection = SCROLL_DIRECTION.DOWN;
    } else { // 向上滚动
      currentScrollDirection = SCROLL_DIRECTION.UP;
    }
    initScrollTop = currentScrollTop;
    if (currentScrollDirection === SCROLL_DIRECTION.DOWN && currentScrollTop > 200) {
      isShowHeader.value = false;
    } else {
      isShowHeader.value = true;
    }
  })
};



// const dialogStatus = ref(true);

// const buttons = [
//   {
//     text: '确定',
//     type: 'primary'
//   }
// ]
const loginAndRegisterRef = ref();
const loginAndRegister = (type) => {
  loginAndRegisterRef.value.showPanel(type);
}

onMounted(() => {
  initScroll();
});

</script>

<style lang="scss" scoped>
.header {
  // background: red;
  display: flex;
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0 #ddd;

  .header-content {
    height: 80px;
    display: flex;
    align-items: center;
    margin: 0 auto;

    .logo {
      text-decoration: none;
      font-size: 30px;
    }
  }

  .menu-panel {
    flex: 1;
  }
  .userinfo-panel {
    text-align: right;
    width: 300px;
    display: flex;
    align-items: center;

    .search-btn {
      margin-left: 5px;
    }
  }
  
}
</style>
