<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <!-- 让Detail详情页面不保持缓存,exclude写的内容时组件的name -->
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
