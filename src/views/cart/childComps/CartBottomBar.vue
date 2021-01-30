<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:￥{{ totalPrice }}</div>
    <div class="caclulate" @click="calcClick">结算:{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          // price是Deatil的product定义的属性
          return item.price * item.count + preValue;
        }, 0)
        .toFixed(2);
    },
    // 选中商品的个数
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      //判断购物车是否有没有选中的商品,方法一：也需要判空
      //   return  !(this.$store.state.cartList.filter(item=>!item.checked).length)
      // 判断购物车是否有没有选中的商品,方法二：需要判空
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        return !this.$store.state.cartList.find((item) => !item.checked);
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //商品改为全部不选中的状态
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      }else {
        //商品改为全部选中的状态
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick(){
      if(this.checkLength === 0){
        this.$toast.show('请选择购买的商品',1500);
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 84px;
}
.check-content {
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-left: 5px;
  width: 80px;
}
.check-button {
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
.price {
  margin-top: 12px;
  margin-left: 15px;
  font-size: 18px;
  flex: 1;
}
.caclulate {
  width: 120px;
  background-color: skyblue;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: #fff;
}
</style>
