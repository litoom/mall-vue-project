import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from "./router"
//1.引入toast
import toast from './components/common/toast/index.js'
//导入fastClick
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//2.安装toast插件,本质上是调用toast对象的install方法
Vue.use(toast);

//3.fastclick插件解决移动端口300ms的延迟问题
fastClick.attach(document.body);
//4.使用懒加载插件
Vue.use(VueLazyLoad, {
  // 占位图片
  //js中导入图片使用:require
  loading: require("./assets/img/common/placeholder.png")
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
