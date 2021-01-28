import Vue from "vue";
import Vuex from "vuex"

//1.安装插件
Vue.use(Vuex);

//2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的事件比较单一一点,有判断逻辑的函数尽量放在actions里面
    // addCart(state, payload) {
    // let oldProduct = null;
    // //payload是新添加的商品
    // for (let item of state.cartList) {
    //   //如果原来的cartList有这个新添加的商品对象
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    //或者
    //   //1.查找之前数组中是否有该商品
    //   let oldProduct = state.cartList.find((item)=>item.iid === payload.iid
    //   );
    //   //2.判断oldProduct
    //   if (oldProduct) {
    //     oldProduct.count +=1;
    //   } else {
    //     payload.count = 1;
    //     state.cartList.push(payload);
    //   }
    // }
    // 如果这个商品已存在，则在给商品的数量加1
    addCounter(state,payload){
      payload.count += 1;
    },
    //如果这个商品之前没有在购物车里，则把这个商添加进去
    addToCart(state,payload){
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find((item) => item.iid === payload.iid
      );
      //2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit('addCounter',oldProduct)
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit("addToCart",payload);
      }
    }
  },
  // 可以把getters转化为计算属性
  getters:{
    //购物车商品的数量
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  }
})

//3.挂载在Vue实例上,在main.js上挂载
export default store;
