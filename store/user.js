export default {
	namespaced: true,
	state: {
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		token: uni.getStorageSync('token') || '',
		addressList: JSON.parse(uni.getStorageSync('addressList') || '[]'),
	},
	mutations: {
		// 存储用户信息
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		saveToken(state, token) {
			state.token = token
			uni.setStorageSync('token', token)
		},
		addAddress(state, address) {
			state.addressList.push(address)
			uni.setStorageSync('addressList', JSON.stringify(state.addressList))
		},
		removeAddress(state, address) {
			state.addressList = state.addressList.filter(item => item.id !== address.id)
			uni.setStorageSync('addressList', JSON.stringify(state.addressList))
		},
		setAddress(state, id) {
			state.addressList.forEach((item, index) => {
				if (item.id == id) {
					item.isCheck = true
				} else {
					item.isCheck = false
				}
			})
			uni.setStorageSync('addressList', JSON.stringify(state.addressList))
		},
		editAddress(state,address) {
			const result = state.addressList.filter(item=>item.id != address.id);
			result.push(address)
			state.addressList = result;
			uni.setStorageSync('addressList', JSON.stringify(state.addressList))
		}
	},
	getters: {

	},

}
