<template>
  <div id="home">
    <!--    导航条-->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <tab-control v-show="isTabFixed" class="tab-controll" ref="tabControll1" v-on:tabClick="tabClick_current"
                 :titles="['流行', '新款', '精选']"></tab-control>

    <scroll ref="scroll" class="content"
            v-on:scroll="contentScroll"
            v-bind:probe-type="3"
            v-bind:pull-up-load="true"
            v-on:pullingUp="loadMore">
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
      <home-swiper v-on:SwiperImageLoad="swiperImageLoad" :banners="banners"></home-swiper>

      <!--  轮播图下面一行  -->
      <recommend-view :recommends="recommends"></recommend-view>

      <!--    本周流行-->
      <feature-view></feature-view>

      <!--   this.$emit('tabClick', index)  v-on:tabClick="tabClick_current"  前面的是子组件定义的名字， 后面是当前父组件定义的事件方法-->
      <tab-control ref="tabControll2" v-on:tabClick="tabClick_current" class="tab-controll"
                   :titles="['流行', '新款', '精选']"></tab-control>

      <!-- '流行', '新款', '精选 的详情，点击不同的字，显示不同的内容-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 右下角向上箭头   组件要事件监听，需要添加.native-->
    <back-top v-on:click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

//{} 必须export default 导出的才可以取消
import {getHomeMultidata, getHomeGoods} from "@/network/home";
import Scroll from "@/components/common/scroll/Scroll";

import BackTop from "@/components/content/backTop/BackTop";

//=================================================================
/*
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";
 index.js 文件
 import Swiper from './Swiper'
 import SwiperItem from './SwiperItem'
 export {
  Swiper, SwiperItem
 }
 */
// 那样话，可以直接这样导出使用，不用写两行了
import {Swiper, SwiperItem} from "@/components/common/swiper"
import BScroll from "@better-scroll/core";
//=================================================================


export default {
  name: 'Home',
  components: {
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,

    GoodsList,
    Scroll
  },
  data() {
    /**
     * 为何在大型项目中data需要使用return返回数据呢？
     * 原因：不使用return包裹的数据会在项目的全局可见，会造成变量污染
     * 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。
     */
    return {
      // 异步请求的数据封装到这里
      banners: [],
      recommends: [],
      goods: {
        "pop": {page: 0, list: []},   // 流行
        "new": {page: 0, list: []},  // 新款
        "sell": {page: 0, list: []}   // 精选
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 生命周期
    // 创建完组件发送网络请求
    this.getHomeMultidata()

    // 请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")

    //console.log(this) // 当前这个页面的Vue组件对象
  },
  mounted() {
    // 监听item中图片加载完成, 因为部分dom组件没有加载，所以不再created生命周期用，在mounted生命周期用
    let debounce = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on('itemImageLoad', () => {
      debounce.refresh("参数")
    })
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    // 防抖处理
    /**
     * 延迟回掉
     * @param callback
     * @param delay 延迟多久回调
     */
    debounce(callback, delay) {
      let timer = null;
      return {
        refresh(...args) {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            callback.apply(this, args) // 调用函数，把当前this对象，传递给调用的函数的this
          }, delay)
        }
      }
    },

    swiperImageLoad() {
      // 获取tabControll的offsetTop
      this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop
    },

    // 事件监听相关的方法
    tabClick_current(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControll1.currentIndex = index
      this.$refs.tabControll2.currentIndex = index
    },
    backClick() {
      // 拿到scroll 组件里面的scroll 引用的对象, 调用scrollTo方法
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },

    // 监听滚动
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    // 下拉加载
    loadMore() {
      this.getHomeGoods(this.currentType)

      // 异步图片还没加载完， 后来加载完了，撑大了，需要刷新以下，重新计算高度，就可以了
      this.$refs.scroll.refresh()
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(result => {
        // console.log(result)
        this.banners = result.data.banner.list; // 回掉函数执行完，需要把结果保存到变量里使用，不保存函数结束变量都清空了
        this.recommends = result.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(result => {
        // console.log(result)

        // console.log(result.data.list)

        // result.data.list 获取的数组， ... 相当于一个一个拿出来，push到另一个数组里
        // 如果没有... 会把获取的数组，直接放到另一个数组里，相当于整体放进去
        this.goods[type].list.push(...result.data.list)
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>

#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}

/* 这只根据到达top多少开始固定元素，离开就失效 */
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  z-index: 10;
}

</style>
