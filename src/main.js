import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import '@/assets/normalize.css'

//从elementui中引出Table
import ElementUI, { Table } from 'element-ui'
//注意，这里是处理table宽度报错的问题
const fixElTableErr = (table) => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}

// ！！！！一定要在Vue.use之前执行此函数
fixElTableErr(Table)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
