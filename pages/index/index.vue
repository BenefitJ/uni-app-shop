<template>
	<view class="main">
		<!-- 搜索框 -->
		<my-search @goSearch="goSearch"></my-search>
		<!-- 轮播图 -->
		<swiper swiper class="swiper" indicator-color="#FFFFFF" indicator-active-color="#c00000" indicator-dots
			autoplay="true">
			<swiper-item v-for="(item,index) in bannerList" :key="index" @click="bannerDetail(item.goods_id)">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="category">
			<view class="category-item" v-for="(item,index) in iconIndexNav" :key="index" @click="cateLink">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 列表 -->
		<view class="" v-for="(item,index) in picFloor" :key="index">
			<view class="title">
				<image :src="item.floor_title.image_src" mode=""></image>
			</view>
			<view class="list-box">
				<view class="list-box-left" @click="cateLink()">
					<image :src="item.product_list[0].image_src" mode=""></image>
				</view>
				<view class="list-box-right" @click="cateLink()">
					<image :src="item.product_list[1].image_src" mode=""></image>
					<image :src="item.product_list[2].image_src" mode=""></image>
					<image :src="item.product_list[3].image_src" mode=""></image>
					<image :src="item.product_list[4].image_src" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgMix from '@/mixins/tabbar-badg.js'
	export default {
		mixins: [badgMix],
		data() {
			return {
				bannerList: [],
				iconIndexNav: [],
				picFloor: []
			}
		},
		onLoad() {
			this.getBanner();
			this.getIconIndexNav();
			this.getPicFloor()
		},
		methods: {
			bannerDetail(id) {
				uni.navigateTo({
					url: '/pagesA/product/goods_detail?goodsId=' + id
				})
			},
			goSearch() {

			},
			// 轮播图数据获取
			getBanner() {
				this.$apiRequest('/api/public/v1/home/swiperdata', 'get', {}, true).then(res => {
					if (res.meta.status === 200) {
						this.bannerList = res.message;
					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'error'
						})
					}
				})
			},
			// 分类导航图标获取
			getIconIndexNav() {
				this.$apiRequest('/api/public/v1/home/catitems', 'get', {}, true).then(res => {
					if (res.meta.status === 200) {
						this.iconIndexNav = res.message;
					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'error'
						})
					}
				})
			},
			getPicFloor() {
				this.$apiRequest('/api/public/v1/home/floordata', 'get', {}, true).then(res => {
					if (res.meta.status === 200) {
						this.picFloor = res.message;
					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'error'
						})
					}
				})
			},
			cateLink() {
				uni.switchTab({
					url: '/pages/category/category'
				})
			},
		}
	}
</script>

<style lang="scss">
	.main {
		.swiper {
			height: 200px;

			image {
				height: 200px;
				width: 100%;
			}
		}
	}

	.category {
		display: flex;
		padding: 12px;

		.category-item {
			width: 25%;

			image {
				width: 100%;
				height: 160rpx;
			}
		}
	}

	.title {
		padding: 8px;

		image {
			height: 30px;
		}
	}

	.list-box {
		padding: 8px;
		display: flex;

		image {
			width: 100%;
		}

		.list-box-left {
			flex: 1;

			image {
				height: 240px;
			}
		}

		.list-box-right {
			flex: 2;
			display: flex;
			flex-wrap: wrap;
			flex-wrap: row;
			height: 240px;

			image {
				margin-left: 8px;
				margin-bottom: 8px;
				width: 45%;
				height: 48.5%;
			}
		}
	}
</style>
