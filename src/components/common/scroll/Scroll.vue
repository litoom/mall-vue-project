<template>
<!-- ref一般绑定给子组件,普通元素也可以绑定ref，获取的是元素-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script scope>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll:null
    };
  },
  mounted() {
    //1.创建BScroll对象
    //document.querySelector('.wrapper')这样获取的不唯一的wrapper不方便使用
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,   //控制非button元素是否可以监听点击事件
      probeType:3   
    });
    //2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      
    })



    //回到顶部
    // this.scroll.scrollTo(0,0);
  },
  methods:{
    //封装一下，方便home组件backClick方法调用
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time);
    }
  }
};
</script>

<style scoped>
</style>
