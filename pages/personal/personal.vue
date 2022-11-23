<template>
	<view>
		<view class="avtor-box">
			<view class="avtor-con" v-if="token==''">
				<image src="../../static/logo.png" mode=""></image>
				<view @click="openLogin()">
					<text class="text-color">请登录</text>
				</view>
			</view>
			<view class="avtor-con" v-else>
				<image :src="userInfo.avatarUrl" mode=""></image>
				<view>
					<text class="text-color">{{userInfo.nickName}}</text>
				</view>
			</view>
			<uni-icons type="right" size="16" color="#666666"></uni-icons>
		</view>
		<view class="order-box">
			<view class="order-title">
				<text>我的订单</text>
				<view>
					<text class="more">更多</text>
					<uni-icons type="right" size="16" color="#666666"></uni-icons>
				</view>
			</view>
			<view class="order-grid">
				<view class="order-grid-item">
					<text class="iconfont icon-weibiaoti2fuzhi04"></text>
					<text>待付款</text>
				</view>
				<view class="order-grid-item">
					<text class="iconfont icon-daishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-grid-item">
					<text class="iconfont icon-31daipingjia"></text>
					<text>待评价</text>
				</view>
				<view class="order-grid-item">
					<text class="iconfont icon-tuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
		</view>

		<view class="personal-list">
			<uni-list>
				<uni-list-item showArrow>
					<template v-slot:header>
						<text class="iconfont icon-quan"></text>
					</template>
					<template v-slot:body>
						<text class="font-color">
							我的优惠卷
						</text>
					</template>
				</uni-list-item>
				<uni-list-item showArrow>
					<template v-slot:header>
						<text class="iconfont icon-wodeshoucang"></text>
					</template>
					<template v-slot:body>
						<text class="font-color">
							我的收藏
						</text>
					</template>
				</uni-list-item>
				<uni-list-item showArrow>
					<template v-slot:header>
						<text class="iconfont icon-wodepingjia"></text>
					</template>
					<template v-slot:body>
						<text class="font-color">
							我的评价
						</text>
					</template>
				</uni-list-item>
				<uni-list-item showArrow @click.native="openAddress">
					<template v-slot:header>
						<text class="iconfont icon-dizhi1"></text>
					</template>
					<template v-slot:body>
						<text class="font-color">
							收货地址
						</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>

	</view>
</template>

<script>
	import badgMix from '@/mixins/tabbar-badg.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins:[badgMix],
		data() {
			return {

			}
		},
		onLoad() {
			 console.log(this.userInfo, 111111);
		},
		computed: {
			...mapState('m_user', ['token', 'userInfo']),
		},
		methods: {
			...mapMutations('m_user', ['getUserinfo']),
			openAddress(){
				uni.navigateTo({
					url:'/pagesA/personal/addressList'
				})
			},
			openLogin() {
				uni.navigateTo({
					url: '/pagesA/personal/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personal-list {
		background-color: #fff;
		margin-top: 8px;

		.iconfont {
			color: #666;
			font-size: 22px;
		}

		.font-color {
			font-size: 13px;
			color: #555;
			padding-left: 3px;
		}
	}

	.order-box {
		background-color: #fff;
		padding: 8px 8px 0;

		.order-title {
			padding: 8px 0;
			color: #333;
			font-size: 13px;
			display: flex;
			justify-content: space-between;

			.more {
				color: #666;
				font-size: 12px;
			}
		}

		.order-grid {
			display: flex;
			align-items: center;
			flex: 1;
			padding-bottom: 12px;
			border-bottom: 1px solid #ddd;

			.order-grid-item {
				display: flex;
				width: 25%;
				align-items: center;
				flex-direction: column;

				.iconfont {
					color: #c00000;
					font-size: 30px;
				}

				text {
					color: #333;
					font-size: 13px;
				}
			}
		}
	}

	.avtor-box {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;

		.avtor-con {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			image {
				width: 90px;
				height: 90px;
				border-radius: 90px;
				margin-right: 8px;
			}

			.text-color {
				color: #333;
				font-size: 13px;
			}
		}
	}
</style>
