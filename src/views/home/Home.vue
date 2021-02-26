<template>
  <div id="home" class="wrapper">

<!--    导航条-->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>

<!--  父组件把 "banners" 父组件的变量传递给子组件的变量，子组件用以下的接收
props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
-->
<!--    轮播图-->
    <HomeSwiper :banners="banners"></HomeSwiper>

<!--  轮播图下面一行  -->
    <recommend-view :recommends="recommends"></recommend-view>

  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";

//{} 必须export default 导出的才可以取消
import {getHomeMultidata} from "@/network/home";

//=================================================================
/*
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
*/
/* index.js 文件
 import Swiper from './Swiper'
 import SwiperItem from './SwiperItem'
 export {
  Swiper, SwiperItem
 }
 */
// 那样话，可以直接这样导出使用，不用写两行了
import {Swiper, SwiperItem} from "@/components/common/swiper"
//=================================================================


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  }, data() {
    /**
     * 为何在大型项目中data需要使用return返回数据呢？
     * 原因：不使用return包裹的数据会在项目的全局可见，会造成变量污染
     * 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。
     */
    return {
      // 异步请求的数据封装到这里
      banners: [],
      recommends: []
    }
  }, created() { // 生命周期
    // 创建完组件发送网络请求
    getHomeMultidata().then(result => {
      console.log(result)
      this.banners = result.data.banner.list; // 回掉函数执行完，需要把结果保存到变量里使用，不保存函数结束变量都清空了
      this.recommends = result.data.recommend.list

    })

    console.log(this) // 当前这个页面的Vue组件对象
  }
}
</script>

<style scoped>

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}

</style>
