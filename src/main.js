import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//引入cookies
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Dialog from '@/components/Dialog.vue';
import LoginAndRegister from '@/components/LoginAndRegister.vue';


import '@/assets/base.scss'
import '@/assets/icon/iconfont.css'

const app = createApp(App)


app.use(router)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;

app.config.globalProperties.globalInfo = {
  bodyWidth: 1300
}

// 定义全局组件
app.component('Dialog', Dialog);
app.component('LoginAndRegister', LoginAndRegister);
app.mount('#app')
