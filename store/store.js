import Vue from 'vue'
import Vuex from 'vuex'

// 引入模块
import moduleCart from './cart.js'
import moduleUser from './user.js'

Vue.use(Vuex)

// 创建实例对象
const store = new Vuex.Store({
	modules: {
		m_cart: moduleCart,
		m_user: moduleUser
	}
})
export default store
