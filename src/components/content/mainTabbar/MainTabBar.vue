<template>
  <tab-bar>
    <!-- 因为不是变量，path="/home"所以不用加: -->
    <tab-bar-item path="/home" activeColor="red">
      <img src="../../../assets/img/tabbar/user.svg" alt="" slot="item-icon" />
      <img slot="item-icon-active" src="../../../assets/img/tabbar/a.svg" alt="" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="red">
      <img src="../../../assets/img/tabbar/balance.svg" alt="" slot="item-icon" />
      <img slot="item-icon-active" src="../../../assets/img/tabbar/a.svg" alt="" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img src="../../../assets/img/tabbar/email.svg" alt="" slot="item-icon" />
      <img slot="item-icon-active" src="../../../assets/img/tabbar/a.svg" alt="" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="red">
      <img src="../../../assets/img/tabbar/setting.svg" alt="" slot="item-icon" />
      <img slot="item-icon-active" src="../../../assets/img/tabbar/a.svg" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar.vue";
import TabBarItem from "../../common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>
