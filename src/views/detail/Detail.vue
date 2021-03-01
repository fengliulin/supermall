<template>
  <div id="detail">

<!--    头部条-->
    <detail-nav-bar/>

<!--   轮播图-->
    <detail-swiper v-bind:top-images="topImages"></detail-swiper>

    <toast/>

    <toast v-bind:message="message" v-bind:show="show"/>

<!--    加入购物车-->
    <add-shopping-cart v-on:addToCart="addToCart"></add-shopping-cart>

<!--     获取vuex里面的数据-->
<!--    <div>{{$store.state.cartList.length}}</div>-->
<!--    <div>-->
<!--      <ul>-->
<!--        <li v-for="item in $store.state.cartList">-->
<!--          {{item}}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail, Goods} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import AddShoppingCart from "@/views/detail/childComps/AddShoppingCart";

import {mapActions} from "vuex"

import Toast from "@/components/common/toast/Toast";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      message: '',
      show: false
    }
  },
  methods:{
    ...mapActions(["addCart"]), // 表示vuex里面的方法
    addToCart() {
      // 获取购物车展示信息
      const product = {}
      product.image =this.topImages[0]
      product.title = "购物车标题"
      product.desc = "描述"
      product.price = "购物车价格"
      product.iid = this.iid

      // 将商品添加到购物车
      // this.$store.cartList.push(product)  // 不要这样

      //调用mutations里面的方法，通过commit
      // this.$store.commit('addCart', product)

      // 调用actions 里面的方法
     /* this.$store.dispatch('addCart', product).then(result => {
        console.log(result) // 返回成功的回掉信息，就是别的传过来的信息  resolve("当前商品数量+1")
      }),*/

      // 添加购物车成功, 让别的方法返回Promise,知道成功还是失败，如果成功执行Toast
      this.addCart(product).then(result => {
      /*  this.show = true
        this.message = result

        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 1500)*/

        this.$toast.showToast(result, 1500)
      }) // 调用 vuex actions 的addCart 方法，本质它也是调用this.$store.dispatch(


    }
  },
  components: {
    DetailSwiper,
    DetailNavBar,
    AddShoppingCart,
    Toast
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
