<template>
	<view class="box">
		<ayQrcode class="code" ref="qrcode" :modal="modal_qr" :url="urls" @hideQrcode="hideQrcode" :height="300"
			:width="300" />
	</view>
</template>

<script>
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	export default {
		data() {
			return {
				//二维码相关参数
				modal_qr: false,
				urls: '', // 要生成的二维码值
			};
		},
		components: {
			ayQrcode,

		},
		onLoad: function(option) {
			let that = this;
			console.log(option, '二维码页面');
			let form = JSON.parse(decodeURIComponent(option.form))
			console.log(form, 'form');
			uni.request({
				url: "https://link.ynawe.com/SubLink",
				method: "POST",
				data: form,
				header: {
					"Access-Control-Allow-Origin": "*"
				},
				success: (res) => {
					const data = res.data
					console.log(res.data.data.link, 'res');
					this.urls = res.data.data.link
					console.log(this.urls, "urls");
					that.showQrcode(); //一加载生成二维码
				},
				fail: (err) => {
					console.log('请求失败');
				},
				complete: () => {
					uni.hideLoading({
						success: (res) => {}
					})
				}
			})

		},
		methods: {
			// 展示二维码
			showQrcode() {
				let _this = this;
				this.modal_qr = true;
				// uni.showLoading()
				setTimeout(function() {
					// uni.hideLoading()
					_this.$refs.qrcode.crtQrCode()
				}, 50)
			},

			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 20px;

		.code {
			margin: 20px;
		}
	}
</style>