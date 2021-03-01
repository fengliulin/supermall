import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    /**
     *
     * @param state 是上面state的对象
     * @param payload 一个封装json数据的对象
     */
    addCart(context, payload) {

      return new Promise((resolve, reject) => {
        // payload新添加的商品
        let oldProduct = null
        for (const item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item
          }
        }

        // 判断oldProduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit("addCounter", oldProduct)
          resolve("当前商品数量+1")
        } else {
          payload.count = 1  // 给传来的对象添加了一个对象count
          // context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          resolve("添加了新的商品")
        }
      })
    }
  }
})

// 挂载Vue实例上
export default store
