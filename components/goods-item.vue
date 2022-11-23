<template>
	<view class="goods-con">
		<view v-if="isRadio">
			<radio :checked="goodsObj.goods_status" color="#c00000" @click="radioClick(goodsObj)"></radio>
		</view>
		<view class="goods-list">
			<view class="img">
				<image :src="goodsObj.goods_small_logo" mode=""></image>
			</view>
			<view class="goods-info">
				<view class="goods-name">
					{{goodsObj.goods_name}}
				</view>
				<view class="goods-pirce">
					<text>￥{{goodsObj.goods_price}}</text>
					<uni-number-box :min="1" :value="goodsObj.goods_count" v-if="isRadio" @change="numChange"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsObj: {
				type: Object,
				default: {	}
			},
			isRadio:{
				type: Boolean,
				debugger: false
			}
		},
		data() {
			return {}
		},
		methods: {
			radioClick(obj){
				this.$emit('radioChange', {
					goods_id:obj.goods_id,
					goods_status: !obj.goods_status
				})
			},
			numChange(val){
				this.$emit('numChange', {
					goods_id:this.goodsObj.goods_id,
					goods_count: val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-pirce{
		display: flex;
		justify-content: space-between;
	}
	.goods-con{
		display: flex;
	}
	.goods-list {
		padding: 8px;
		display: flex;
		justify-content: flex-start;

		.img {
			image {
				width: 100px;
				height: 100px;
			}

			padding-right: 8px;
		}

		.goods-info {
			display: flex;
			flex-direction: column;

			.goods-name {
				font-size: 14px;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				margin-bottom: 18px;
			}

			.goods-pirce {
				color: #f00;
				font-size: 18px;
				font-weight: bold;
			}
		}
	}
</style>
