import {
	baseUrl
} from "../config/index"

export const request = (options) => {
	return new Promise((resolve, reject) => {
		// uni.showLoading({
		// 	title: "加载中"
		// })"/dev-api"
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'post',
			header: {},
			data: options.data || {},
			success: (res) => {
				if (!uni.getStorageSync('sessionid') || res.data.status == 1) {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}


				resolve(res)
			},
			fail: (err) => {
				console.log('请求失败');
				reject(rej)
			},
			complete: () => {
				// console.log("请求结束");
				uni.hideLoading({
					success: (res) => {}
				})
			}

		})
	})
}