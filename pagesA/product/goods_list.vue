<template>
	<view>
		<view v-if="goodsList.length>0">
			<view v-for="(item,index) in goodsList" :key="index" @click="detail(item)">
				<goodsItem :goodsObj="item"></goodsItem>
			</view>
		</view>
		<view v-else>
			<empty></empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryParams: {
					cid: '', // 分类id
					pagenum: 1, // 页码
					pagesize: 10, // 页面请求条数
				},
				total: 0,
				goodsList: [],
				isLoading: false,
			}
		},
		onLoad(opt) {
			this.queryParams.cid = opt.goodsCon;
			this.getList();
			console.log(opt)
		},
		// 触底加载下一页
		onReachBottom() {
			if (this.queryParams.pagenum * this.queryParams.pagesize > this.total) {
				uni.showToast({
					title: '数据请求完毕',
					icon: 'none'
				})
				return
			}
			if (this.isLoading) return
			this.queryParams.pagenum += 1;
			this.getList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.total = 0;
			this.queryParams.pagenum = 1;
			this.goodsList = [];
			// 重新发起请求
			this.getList();
		},
		methods: {
			// 列表数据请求
			async getList() {
				this.isLoading = true;
				let data = await this.$apiRequest('/api/public/v1/goods/search', 'get', this.queryParams);
				this.isLoading = false;
				uni.stopPullDownRefresh();
				if (data.meta.status === 200) {
					this.goodsList = [...this.goodsList, ...data.message.goods]
					// this.goodsList = data.message.goods;
					this.total = data.message.total;

				} else {
					uni.showToast({
						title: '数据加载失败',
						icon: 'error'
					})
				}
			},
			detail(obj) {
				uni.navigateTo({
					url: '/pagesA/product/goods_detail?goodsId=' + obj.goods_id
				})
			}
		}
	}
</script>

<style>
</style>
