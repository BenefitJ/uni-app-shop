<template>
	<view class="">
		<swiper swiper class="swiper" indicator-color="#FFFFFF" indicator-active-color="#c00000" indicator-dots
			autoplay="true">
			<swiper-item v-for="(item,index) in detail.pics" :key="index">
				<image :src="item.pics_big_url"></image>
			</swiper-item>
		</swiper>

		<view class="goods-detail">
			<view class="price">
				￥{{detail.goods_price}}
			</view>
			<view class="goods-detail-title">
				<view class="title">
					标题
				</view>
				<view class="goods-star">
					<uni-icons type="star" :size="18" color="#666666"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<view class="goods-info">
			<!-- <view v-html="detail.goods_introduce"></view> -->
			<rich-text :nodes="detail.goods_introduce"></rich-text>
		</view>

		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="option" @click="onclick" @buttonClick="butClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				goodsId: '',
				detail: {},
				option: [{
						icon: 'star',
						text: '收藏',

					},
					{
						icon: 'cart',
						text: '购物车',
						info: this.total
					},
				]
			}
		},
		onLoad(opt) {
			this.goodsId = opt.goodsId;
			this.getDetail();
			this.option[1].info = this.total;
		},
		computed: {
			...mapGetters('m_cart', ['total'])
		},
		watch: {
			total: {
				handler(newVal) {
					let result = this.option.find(item => item.text == '购物车')
					if (result) {
						result.info = newVal;
					}
				}
			}
		},
		methods: {
			...mapMutations('m_cart', ['addCart']),
			// 购物车点击
			butClick(e) {
				if (e.index == 0) {
					const goods = {
						goods_id: this.detail.goods_id,
						goods_name: this.detail.goods_name,
						goods_price: this.detail.goods_price,
						goods_count: 1,
						goods_small_logo: this.detail.goods_small_logo,
						goods_status: true
					}
					this.addCart(goods);
				} else if (e.index == 1) {
					const goods = {
						goods_id: this.detail.goods_id,
						goods_name: this.detail.goods_name,
						goods_price: this.detail.goods_price,
						goods_count: 1,
						goods_small_logo: this.detail.goods_small_logo,
						goods_status: true
					}
					uni.navigateTo({
						url:'/pagesA/product/goods_order?goods=' + JSON.stringify(goods)
					})
				}
			},
			onclick(e) {
				if (e.index == 1) {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
				console.log(e, '收藏点击')
			},
			// 详情数据请求
			async getDetail() {
				let data = await this.$apiRequest('/api/public/v1/goods/detail', 'get', {
					goods_id: this.goodsId
				});
				if (data.meta.status === 200) {
					this.detail = data.message
				} else {
					uni.showToast({
						title: '数据加载失败',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 320px;

		image {
			height: 320px;
			width: 100%;
		}
	}

	.goods-detail {
		padding: 8px;
	}

	.price {
		color: #f00;
		font-size: 14px;
		font-weight: bold;
		padding: 8px 0;
	}

	.goods-detail-title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			font-size: 13px;
			color: #333;
		}

		.goods-star {
			display: flex;
			flex-direction: column;

			text {
				font-size: 12px;
				color: #666;
			}
		}
	}

	.yf {
		padding: 8px 0;
		color: #666;
		font-size: 12px;
	}

	.goods-info {
		padding: 8px;

		img {
			display: block;
		}
	}

	.goods-nav {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
