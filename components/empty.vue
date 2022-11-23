<template>
	<view class="empty-con">
		<image src="../static/empty.png" mode=""></image>
		<text>暂无数据</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty-con {
		display: flex;
		flex-direction: column;
		align-items: center;
		text {
			color: #666;
			font-size: 13px;
		}
	}
</style>
