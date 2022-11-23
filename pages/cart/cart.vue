<template>
	<view class="cart-box">
		<view v-if="cart.length>0">
			<view class="cart-title">
				<uni-icons type="cart"></uni-icons><text>购物车</text>
			</view>
			<view class="">
				<view class="cart-list" v-for="(item, index) in cart" :key="index">
					<uni-swipe-action>
						<uni-swipe-action-item :right-options="options" @click="swiptDetelt(item)">
							<goodsItem :goodsObj="item" :isRadio="isRadio" @radioChange="radioChange"
								@numChange="numChange"></goodsItem>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
			<settle @openLink="openLink"></settle>
		</view>
		<view v-else>
			<empty></empty>
		</view>
	</view>
</template>

<script>
	import settle from '@/components/settle.vue'
	import {
		mapGetters,
		mapMutations,
	} from 'vuex'
	export default {
		components: {
			settle
		},
		data() {
			return {
				isRadio: true,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			}
		},
		computed: {
			...mapGetters('m_cart', ['total', 'cart'])
		},
		onShow() {
			this.setBadeg()
		},
		methods: {
			...mapMutations('m_cart', ['updataCart', 'updataNumCart', 'removeCart']),
			swiptDetelt(obj) {
				this.removeCart(obj)
			},
			numChange(e) {
				this.updataNumCart(e)
			},
			radioChange(e) {
				this.updataCart(e)
			},
			// 调用setTabBarBadge设置角标
			setBadeg() {
				uni.setTabBarBadge({
					index: 2,
					text: this.total + ''
				})
			},
			openLink() {
				uni.navigateTo({
					url: '/pagesA/product/goods_order'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-box {
		padding: 8px 8px 51px;

		.cart-title {
			height: 35px;
			line-height: 35px;
			border-bottom: 1px solid #f8f8f8;

			text {
				color: #333;
				font-size: 14px;
			}
		}
	}
</style>
