import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "./components/common/toast"

import FastClick from 'fastclick'

// 安装toast插件
Vue.use(toast) // 插件会调用对象.install


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 结局移动端300毫秒延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
