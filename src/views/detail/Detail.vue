<template>
  <div id="detail">

<!--    头部条-->
    <detail-nav-bar/>

<!--   轮播图-->
    <detail-swiper v-bind:top-images="topImages"></detail-swiper>

<!--    加入购物车-->
    <add-shopping-cart v-on:addToCart="addToCart"></add-shopping-cart>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail, Goods} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import AddShoppingCart from "@/views/detail/childComps/AddShoppingCart";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null
    }
  },
  methods:{
    addToCart() {
      // 获取购物车展示信息
      const product = {}
      product.image =this.topImages[0]
      product.title = "购物车标题"
      product.desc = "描述"
      product.price = "购物车价格"
      product.iid = this.iid

      // 将商品添加到购物车
    }
  },
  components: {
    DetailSwiper,
    DetailNavBar,
    AddShoppingCart
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(result => {
      let data = result.result
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  }
}
</script>

<style scoped>

</style>
