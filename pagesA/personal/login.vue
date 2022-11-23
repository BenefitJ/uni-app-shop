<template>
	<view class="login-box">
		<image src="../../static/logo.png" class="img"></image>
		<button type="primary" class="btn" @click="getUserinfo">微信授权登录</button>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		created() {
			console.log(this.getUserinfo());
		},
		computed:{
			...mapState('m_cart', ['switchObj'])
		},
		methods: {
			...mapMutations('m_user', ['saveUserInfo', 'saveToken']),
			...mapState('m_cart', ['setUrl']),
			getUserinfo() {
				let _this = this
				uni.getUserProfile({
					desc: "测试",
					success: function(res) {
						_this.saveUserInfo(res.userInfo)
						_this.getcode()
						console.log(res.userInfo, "登录成功");
					},
					fail: function(err) {
						uni.showToast({
							title: '您拒绝了授权登录',
							icon: 'none'
						})
						console.log(err, "失败");
					}
				})
			},
			getcode() {
				let _this = this
				uni.login({
					provider: 'weixin',
					success: function(res) {
						_this.saveToken(res.code)
						if (_this.switchObj.type == 'switch') {
							uni.switchTab({
								url: _this.switchObj.url
							})
							_this.setUrl(null)
						} else {
							uni.switchTab({
								url: '/pages/personal/personal',
							})
						}
						console.log(res);
					},
					fail: function(err) {
						uni.showToast({
							title: '登录失败',
							icon: 'error'
						})
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		padding: 20% 20px 0 20px;
		display: flex;
		align-items: center;
		flex-direction: column;

		.img {
			width: 30px;
			height: 30px;
			margin-bottom: 30px;
		}

		.btn {
			width: 100%;
		}
	}
</style>
