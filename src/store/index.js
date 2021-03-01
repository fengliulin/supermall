import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {

  }
})

// 挂载Vue实例上
export default store
