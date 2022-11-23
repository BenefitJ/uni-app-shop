import {
	mapState,
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBadeg()
	},
	watch: {
		total: {
			handler(newVal) {
				this.setBadeg();
			},
			immediate: true
		}
	},
	methods: {
		setBadeg() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}
