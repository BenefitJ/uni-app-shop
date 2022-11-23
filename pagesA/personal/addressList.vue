<template>
	<view class="content">
		<view v-if="addressList.length>0">
			<view class="address-list" v-for="(item, index) in addressList" :key="index">
				<view @click="selectAddress(item)">
					{{item.name}} {{item.phone}}<br />
					{{item.address}}
				</view>
				<view class="address-btn">
					<label @click="isCheck(item.id)">
						<radio :checked="item.isCheck" color="#c00000" style="transform: scale(0.8);">默认</radio>
					</label>
					<view class="btn">
						<view @click="edit(item)"><text class="iconfont icon-bianjishuru"></text>编辑</view>
						<view @click="deleteFun(item)"><text class="iconfont icon-shanchu"></text>删除</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty></empty>
		</view>
		<view class="footer-btn">
			<view class="btn-item" @click="openAdd">添加地址</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState('m_user', ['addressList'])
		},
		onLoad() {

		},
		methods: {
			...mapMutations('m_user', ['removeAddress', 'setAddress']),
			edit(obj) {
				uni.navigateTo({
					url: '/pagesA/personal/addressAdd?objData=' + JSON.stringify(obj)
				})
			},
			isCheck(id) {
				this.setAddress(id)
			},
			deleteFun(obj) {
				this.removeAddress(obj)
			},
			openAdd() {
				uni.navigateTo({
					url: '/pagesA/personal/addressAdd'
				})
			},
			selectAddress(obj) {
				uni.$emit('add', {
					msg: JSON.stringify(obj)
				});
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.content {
		padding: 8px 8px 64px;

		.address-list {
			background-color: #fff;
			padding: 8px;
			border-radius: 4px;
			font-size: 13px;
			color: #333;
			line-height: 28px;
			margin-bottom: 8px;
		}

		.address-btn {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #eee;
			margin-top: 5px;

			.btn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 13px;
				color: #666;

				view {
					padding-left: 8px;
				}
			}
		}
	}
</style>
