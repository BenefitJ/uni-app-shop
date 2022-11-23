<template>
	<view class="">
		<view class="">
			<uni-search-bar v-model="keyVal" @input="inputChange" :radius="50" cancelButton="none" placeholder="请输入搜索内容"
				@clear="clearHistory"></uni-search-bar>
		</view>
		<view class="" v-if="listData.length == 0">
			<view class="search-title">
				<text>搜索历史</text>
				<uni-icons type="trash" @click="clearList()"></uni-icons>
			</view>
			<view class="history-list">
				<text v-for="(item,index) in historyNew" :key="index">{{item}}</text>
			</view>
		</view>
		<view class="" v-else>
			<view class="search-list-item" v-for="(item, index) in listData" :key="index">
				<view class="">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<view class="empty" v-if="listData.length == 0"><text>暂无搜索内容</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '搜索',
				history: [],
				listData: [],
				keyVal: '',
				timer: null
			}
		},
		computed: {
			historyNew() {
				return [...this.history].reverse()
			}
		},
		onLoad() {
			this.history = JSON.parse(uni.getStorageSync('keyVal')) || []
		},
		methods: {
			clearList() {
				this.history = [];
				uni.setStorageSync('keyVal', '[]')
			},
			// 清除输入框
			clearHistory() {
				this.keyVal = '';
				this.listData = []
			},
			// 搜索关键字处理与储存
			setHistory(val) {
				const set = new Set(this.history);
				set.delete(val);
				set.add(val)
				this.history = Array.from(set)
				uni.setStorageSync('keyVal', JSON.stringify(this.history))
			},
			// 搜索框输入值改变事件
			inputChange(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (e != '') {
						this.setHistory(e)
						this.keyVal = e;
						this.getList();
					}
				}, 500)
			},
			// 请求数据
			async getList() {
				let data = await this.$apiRequest('/api/public/v1/goods/qsearch', 'get', {
					query: this.keyVal
				})
				if (data.meta.status === 200) {
					this.listData = data.message;
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

<style scoped lang="scss">
	.search-title {
		padding: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ddd;

		text {
			font-size: 13px;
		}
	}

	.history-list {
		padding: 8px;

		text {
			padding: 3px 6px;
			font-size: 12px;
			color: #fff;
			background-color: #888;
			margin: 0 8px 8px 0;
			display: inline-block;
		}
	}

	.search-list-item {
		padding: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #ddd;

		view {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.empty {
		text-align: center;

		text {
			font-size: 14px;
			color: #666;
		}
	}
</style>
