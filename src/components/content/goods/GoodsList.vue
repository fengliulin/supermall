<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" v-bind:goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  overflow:hidden;
  display: flex;
  flex-wrap: wrap; /* 指定flex元素单行显示还是多行显示 */
  justify-content: space-around;
  padding: 3px;
}
</style>
