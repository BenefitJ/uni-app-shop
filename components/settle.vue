<template>
	<view class="settle-box">
		<label @click="changeAll">
			<radio color="#c00000" :checked="isALL"></radio><text>全选</text>
		</label>
		<view class="amoun-box">
			合计：<text class="price">￥{{checkALLAmount}}</text>
		</view>
		<view class="btn" @click="openLink">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('m_user', ['token']),
			...mapGetters('m_cart', ['total', 'checkCount', 'checkALLAmount']),
			isALL() {
				return this.total == this.checkCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updataAllState', 'setUrl']),
			changeAll() {
				this.updataAllState(!this.isALL)
			},
			openLink() {
				let _this = this
				if (_this.token == '') {
					uni.showModal({
						title: '提示',
						content: '是否跳转登录',
						success: function() {
							let option = {
								type: 'switch',
								url: '/pages/cart/cart'
							}
							_this.setUrl(option)
							uni.navigateTo({
								url: '/pagesA/personal/login'
							})
							console.log('登陆');
						},
						fail: function() {
							console.log('不登陆');
						}
					})
					return
				} else {
					_this.$emit('openLink')
				}
			}
		}
	}
</script>

<style lang="scss">
	.settle-box {
		border-top: 1px solid #dfdfdf;
		position: fixed;
		background-color: #fff;
		bottom: var(--window-bottom);
		width: 100%;
		left: 0;
		line-height: 48px;
		padding-left: 8px;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.amoun-box {
			font-size: 13px;
		}

		.price {
			font-size: 13px;
			color: #f00;
			font-weight: bold;
		}

		.btn {
			background-color: #f00;
			color: #fff;
			font-size: 14px;
			width: 100px;
			text-align: center;
		}
	}
</style>
