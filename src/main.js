import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from "./router"
//1.引入toast
import toast from './components/common/toast/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//2.安装toast插件,本质上是调用toast对象的install方法
Vue.use(toast);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
