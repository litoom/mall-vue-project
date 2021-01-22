<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item">
    </goods-list-item>
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';

export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default() {
        return []
      }
    }
  },
  components:{
    GoodsListItem
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
