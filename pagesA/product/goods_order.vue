<template>
	<view class="main">
		<view class="select-address">
			<view class="titlte">地址</view>
			<view class="select-info" @click="openAddress">
				<uni-icons type="location-filled" size="20" color="#666"></uni-icons>
				<view class="select-detail" v-if="addressObj.id != ''">
					{{addressObj.name}} {{addressObj.phone}}<br />
					{{addressObj.address}}
				</view>
				<view class="select-detail" v-else>
					请选择地址
				</view>
			</view>
		</view>
		<view class="list-box">
			<view class="order-title">商品</view>
			<view class="list-item" v-for="(item,index) in cart" :key="index">
				<image class="img" :src="item.goods_small_logo"></image>
				<view class="list-item-con">
					<view class="list-item-info">
						<text class="title">{{item.goods_name}}</text>
						<text class="font-color">￥ {{item.goods_price}}</text>
					</view>
					<view class="list-item-info">
						<text>数量</text>
						<text>X{{item.goods_count}}</text>
					</view>
				</view>
			</view>
			<view class="list-aumout">
				<text>运费</text>
				<text>￥ 0.00</text>
			</view>
			<view class="list-aumout">
				<text>订单总价</text>
				<text class="font-color weight">￥ {{checkALLAmount}}</text>
			</view>
		</view>
		<view class="footer-btn">
			<button class="btn-item" @click="submit" :disabled="isDisabled">付款</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
import goodsItemVue from '../../components/goods-item.vue'
	export default {
		data() {
			return {
				addressObj: {
					id: '',
					name: '',
					phone: ''
				},
				isDisabled: false,
				newCart: []
			}
		},
		onLoad(opt) {
			uni.$on('add', this.add)
			if(this.$utils.isEmpty(opt.goods) != '') {
				this.newCart.push(JSON.parse(opt.goods))
			}
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['checkALLAmount'])
		},
		methods: {
			submit() {
				if (this.addressObj.id == '') {
					uni.showToast({
						title: '请先选择地址',
						icon: 'none'
					})
					return
				}
				let params = {
					address: this.addressObj,
					goods: this.cart
				}
				this.isDisabled = true
				uni.showToast({
					title: '支付成功',
					icon: 'success'
				})
				setTimeout(() => {
					this.isDisabled = false
					uni.reLaunch({
						url: '/pagesA/product/success'
					})
				}, 2000)
			},
			add(e) {
				this.addressObj = {
					...JSON.parse(e.msg)
				}
			},
			openAddress() {
				uni.navigateTo({
					url: '/pagesA/personal/addressList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		padding-bottom: 66px;
	}

	.footer-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 56px;
		z-index: 999;

		.btn-item {
			margin: 0 8px 8px;
			line-height: 48px;
			background-color: #f00;
			color: #fff;
			text-align: center;
			border-radius: 50px;
		}
	}

	.list-box {
		background-color: #fff;
		margin-top: 10px;
		padding: 8px;

		.order-title {
			font-size: 13px;
			font-weight: bold;
			padding: 5px 0;
		}

		.list-item {
			display: flex;
			justify-content: flex-start;

			.img {
				width: 80px;
				height: 80px;
				border-radius: 4px;
			}

			.list-item-con {
				flex: 1;
			}

			.list-item-info {
				padding-left: 8px;
				display: flex;
				justify-content: space-between;
				font-size: 13px;
				line-height: 24px;
				color: #666;

				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}
		}

		.font-color {
			color: #c00;
		}

		.list-aumout {
			padding-top: 5px;
			display: flex;
			justify-content: space-between;
			font-size: 13px;
			line-height: 24px;
			color: #666;

			.weight {
				font-weight: bold;
			}
		}
	}

	.select-address {
		background-color: #fff;
		padding: 8px;

		.title {
			font-size: 13px;
			color: #333;
		}

		.select-info {
			padding: 8px 0;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.select-detail {
				padding-left: 10px;
				font-size: 13px;
				color: #333;
			}
		}
	}
</style>
