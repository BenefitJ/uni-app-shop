export default {
	namespaced: true,
	state: {
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
		switchObj: JSON.parse(uni.getStorageSync('switchObj') || '{}')
	},
	mutations: {
		// 加入购物车的方法
		addCart(state, goods) {
			console.log(state.cart, '获取的购物车数据')
			if (state.cart != '[]' && state.cart != '' && state.cart != undefined) {
				const result = state.cart.find((item) => item.goods_id === goods.goods_id)
				if (result) {
					result.goods_count++
				} else {
					state.cart.push(goods)
				}
			} else {
				state.cart.push(goods)
			}

			this.commit('m_cart/saveStorege')
		},
		saveStorege(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updataCart(state, goods) {
			const result = state.cart.find((item) => item.goods_id === goods.goods_id)
			if (result) {
				result.goods_status = goods.goods_status;
			}
			this.commit('m_cart/saveStorege')
		},
		// 更新购物车数量
		updataNumCart(state, goods) {
			const result = state.cart.find((item) => item.goods_id === goods.goods_id)
			if (result) {
				result.goods_count = goods.goods_count;
			}
			this.commit('m_cart/saveStorege')
		},
		// 删除数据
		removeCart(state, goods) {
			const result = state.cart.filter((item) => item.goods_id !== goods.goods_id)
			state.cart = result;
			this.commit('m_cart/saveStorege')
		},
		// 全选
		updataAllState(state, newState){
			state.cart.forEach((item,index)=>item.goods_status = newState)
			this.commit('m_cart/saveStorege')
		},
		setUrl(state, switchObj) {
			state.switchObj = switchObj;
			uni.setStorageSync('switchObj', JSON.stringify(state.switchObj))
		}
	},
	getters: {
		total(state) {
			let num = 0;
			if (state.cart != '[]' && state.cart != '' && state.cart != undefined) {
				state.cart.forEach(item => num += item.goods_count)
			}
			return num;
		},
		cart(state) {
			return state.cart
		},
		checkCount(state) {
			return state.cart.filter(item => item.goods_status).reduce((total, itemChild) => total += itemChild
				.goods_count,0)
		},
		checkALLAmount(state){
			return state.cart.filter(item=>item.goods_status).reduce((total,itemChild)=>total += itemChild.goods_count * itemChild.goods_price,0).toFixed(2)
		}
	},

}
