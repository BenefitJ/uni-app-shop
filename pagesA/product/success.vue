<template>
	<view class="success">
		<uni-icons size="100" type="checkbox-filled" color="#1aa034"></uni-icons>
		<text class="font-color">支付成功</text>
		<button class="back" @click="openLink">首页</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			openLink(){
				uni.switchTab({
					 url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success {
		padding: 38% 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		.font-color {
			padding: 20px 0;
			color: #1aa034;
			font-size: 16px;
			font-weight: bold;
		}
		.back{
			width: 200px;
			background-color: #f9f9f9;
		}
	}
</style>
