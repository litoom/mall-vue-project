import Vue from "vue";
import VueRouter from "vue-router";

//通过懒加载导入组件
const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Cart = () => import('../views/cart/Cart.vue');
const Profile = () => import('../views/profile/Profile.vue');
const Detail = () => import('../views/detail/Detail.vue')

//1.安装插件
Vue.use(VueRouter);

//2.1 抽出routes
const routes = [
  {
    //重定向
    path: "",
    redirect: "./home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
];

//2.0 创建路由对象router
const router = new VueRouter({
  routes,
  mode: "history"
});

//3.导出路由对象router,并挂在到main.js上
export default router;
