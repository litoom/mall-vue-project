<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="goodsItem.show.img" alt="" @load="imageLoad" /> -->
    <img :src="showImage" alt="" @load="imageLoad" />
    <!-- @load="imageLoad" 当img图片加载完成之后调用imageLoad方法 -->
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      // console.log('@load="imageLoad"');
      //向事件总线发射itemImageLoad事件
      this.$bus.$emit("itemImageLoad");
      //下面的情况是：详情页推荐页面使用的GoodsListItem组件，当GoodsListItem页面图片加载完之后，会通过bus总线通知到Home组件，Home组件会刷新高度，但此时Home组件不需要刷新；解决方案一：↓
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit("itemImageLoad");
      // } else if (this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit("DetailImageLoad")
      // }   
    },
    itemClick() {
      console.log("在这里跳转到详情页噢");
      // this.$router.push('/detail')
      // 动态路由传递参数
      this.$router.push("/detail/" + this.goodsItem.iid);
    },

  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /* padding:5px; */
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: red;
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
/* 收藏前面的小图标 */
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
