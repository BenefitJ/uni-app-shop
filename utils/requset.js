const baseUrl = 'https://api-hmugo-web.itheima.net'

function apiRequest(url, method, params, showLoading) {
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中...',
				icon: 'loading'
			})
		}
		uni.request({
			url: baseUrl + url,
			method: method,
			data: params,
			header: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			success: function(res) {
				if (res.statusCode === 200) {
					resolve(res.data)
				}
				console.log(res, '调用成功')
				uni.hideLoading();
			},
			fail: function(err) {
				reject(err)
				console.log(res, '调用失败');
				uni.hideLoading();
			}
		})
	})
}

module.exports = apiRequest
