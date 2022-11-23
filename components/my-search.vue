<template>
	<view class="search-box" :style="'top:'+topHeight+'px'">
		<view class="search-content" @click="goSearch">
			<uni-icons type="search"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		props:{
			topHeight:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goSearch(){
				uni.navigateTo({
					url: '/pagesA/product/history'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: #c00000;
		padding: 12px;
		.search-content{
			border-radius: 50px;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 12px 0;
		}
		text{
			color: #666;
			font-size: 26rpx;
		}
	}
</style>