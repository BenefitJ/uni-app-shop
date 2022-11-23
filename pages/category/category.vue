<template>
	<view>
		<!-- 搜索框 -->
		<!-- #ifdef MP-WEIXIN -->
		<my-search @goSearch="goSearch"></my-search>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<my-search :topHeight="44" @goSearch="goSearch"></my-search>
		<!-- #endif -->
		<view class="cate-box">
			<!-- 左部列表分类栏 -->
			<scroll-view class="cate-left" scroll-y="true" :style="'height:'+wh">
				<view class="cate-left-meun" v-for="(item,index) in leftMenu" :key="index" @click="leftMenuFun(index)"
					:class="index == active ? 'activeClass' : '' ">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右边列表选择栏 -->
			<scroll-view class="cate-right" scroll-y="true" :style="'height:'+wh" :scroll-top="scrollTop">
				<view class="cate-list" v-for="(item,index) in cateList" :key="index">
					<view class="title">
						<view></view><text>{{item.cat_name}}</text>
						<view></view>
					</view>

					<view class="cate-list-con">
						<view class="cate-list-item" v-for="(itemChildren, indexChildren) in item.children"
							:key="indexChildren" @click="detail(itemChildren)">
							<image :src="itemChildren.cat_icon" mode=""></image>
							<text>{{itemChildren.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgMix from '@/mixins/tabbar-badg.js'
	export default {
		mixins:[badgMix],
		data() {
			return {
				leftMenu: [], // 左边的菜单
				cateList: [], //右边菜单
				active: 0,
				wh: 0,
				scrollTop: 0
			}
		},
		onLoad() {
			const sysinfo = uni.getSystemInfoSync();
			this.wh = sysinfo.windowHeight - 51;
		},
		onShow() {
			this.getCate();
		},
		methods: {
			getCate() {
				this.$apiRequest('/api/public/v1/categories', 'get').then(res => {
					if (res.meta.status === 200) {
						this.leftMenu = res.message;
						this.cateList = this.leftMenu[0].children;

					} else {
						uni.showToast({
							title: '数据加载失败',
							icon: 'error'
						})
					}
				})
			},
			// 左边菜单点击切换事件
			leftMenuFun(index) {
				this.active = index;
				this.cateList = this.leftMenu[index].children;
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			detail(obj) {
				uni.navigateTo({
					url: '/pagesA/product/goods_list?goodsCon=' + obj.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate-box {
		display: flex;
		height: 90vh;

		.cate-left {
			background-color: #f6f6f6;
			flex: 1.5;
			// height: 600px;

			.cate-left-meun {
				font-size: 13px;
				line-height: 26px;
				padding: 8px;
			}

			.activeClass {
				background-color: #fff;
			}
		}

		.cate-right {
			// height: 600px;
			flex: 5;

			.title {
				text-align: center;
				font-size: 13px;
				color: #333;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 8px 0;

				text {
					padding: 0 8px;
				}

				view {
					width: 50px;
					height: 2px;
					border-radius: 1px;
					background: linear-gradient(90deg, rgba(98, 98, 98, 0) 0%, #fd8989 100%);
				}

				view:nth-of-type(2) {
					background: linear-gradient(-90deg, rgba(98, 98, 98, 0) 0%, #fd8989 100%);
				}
			}

			.cate-list-con {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				align-items: center;

				.cate-list-item {
					width: 33%;
					padding: 10px 0;
					text-align: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						display: block;
						color: #333;
						font-size: 13px;
					}
				}
			}
		}
	}
</style>
