<template>
	<view>
		<view class="title">新增收获地址</view>
		<view class="form">
			<view class="form-con">
				<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" labelWidth="80px">

					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="formData.name" placeholder="请输入姓名"></uni-easyinput>
					</uni-forms-item>

					<uni-forms-item label="电话" required name="phone">
						<uni-easyinput v-model="formData.phone" placeholder="请输入电话"></uni-easyinput>
					</uni-forms-item>

					<uni-forms-item label="地址" required name="address">
						<view class="address-tip">
							<uni-easyinput v-model="formData.address" placeholder="请输入地址"></uni-easyinput>
							<uni-icons type="location-filled" size="20" @click="chooseAddress"></uni-icons>
						</view>
					</uni-forms-item>

				</uni-forms>
			</view>
		</view>
		<view>
			<button class="btn-item" @click="submit()" :disabled="isDisabled">保存</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: '电话不能为空'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '地址不能为空'
						}]
					}
				},
				formData: {},
				isDisabled: false
			}
		},
		onLoad(opt) {
			if (this.$utils.isEmpty(opt.objData) !== '') {
				let objData = JSON.parse(opt.objData) || {}
				this.formData = {
					...objData
				}
			}
		},
		methods: {
			...mapMutations('m_user', ['addAddress', 'editAddress']),
			submit() {
				this.$refs['valiForm'].validate().then(res => {
					this.isDisabled = true
					if (this.$utils.isEmpty(this.formData.id) !== '') {
						this.editAddress(this.formData)
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})
					} else {
						this.$set(this.formData, 'id', Math.floor(Math.random() * 100 + 1))
						this.addAddress(this.formData)
						uni.showToast({
							title: '新增成功',
							icon: 'success'
						})
					}
					setTimeout(() => {
						uni.navigateBack({
							url: '/pagesA/personal/addressList'
						})
						this.isDisabled = false
					}, 1000)
				}).catch(err => {
					console.log('表单错误信息', err);
				})
			},
			chooseAddress() {
				let _this = this;
				uni.chooseLocation({
					success: function(res) {
						_this.$set(_this.formData, 'address', res.address)
						console.log(res, "获取成功");
					},
					fail: function(err) {
						uni.showToast({
							title: '地址获取失败',
							icon: 'error'
						})
						console.log(err, '获取失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 8px;

		.form-con {
			background-color: #fff;
			padding: 8px;

			.address-tip {
				display: flex;
				align-items: baseline;
			}
		}
	}

	.title {
		font-size: 14px;
		color: #666;
		padding: 8px;
	}

	.btn-item {
		margin: 8px;
		line-height: 48px;
		background-color: #f00;
		color: #fff;
		text-align: center;
		border-radius: 50px;
	}
</style>
