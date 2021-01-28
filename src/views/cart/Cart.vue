<template>
  <div class="cart">
    <!-- 导航栏 -->
   <nav-bar class="nav-bar">
     <div slot="center">
       <!-- 购物车（{{cartLength}}） -->
       购物车（{{length}}）
     </div>
   </nav-bar>

   <!-- 购物车列表显示 -->
    <cart-list>
    </cart-list>

   <!-- 底部汇总结算 -->
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import {mapGetters} from 'vuex';

import CartList from './childComps/CartList'
export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
  },
  computed:{
    // 把vuex的getters转换未computed，可以直接使用{{}}
    // cartLength(){   //购物车商品的数量,如果经常用这个属性，可以封装为getters
      // return this.$store.getters.cartLength;
      //方法一：
      // ...mapGetters(["cartLength"])
      // 方法二：可以改名
      ...mapGetters({
        length:"cartLength",
      })
    }
}
</script>

<style scoped>
.nav-bar {
  background-color: pink;
  color: #fff;
  font-size: 20px;
}
</style>
