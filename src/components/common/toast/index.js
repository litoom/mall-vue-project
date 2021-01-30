import Toast from './Toast.vue';

const obj = {};

obj.install = function (Vue) {
  // Vue是默认传入的参数
  console.log('执行了obj的install函数', Vue);

  //把Toast组件的Dom元素添加到body上面,这种方式不可行的
  // console.log(Toast.$el);
  // document.body.appendChild(Toast.$el);

  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  //3.将组件对象,手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  //这里的1-4步骤是为了把元素挂载到我们页面内，取代我们前面重复的每个页面import components 等
  Vue.prototype.$toast = toast;
}

export default obj;
