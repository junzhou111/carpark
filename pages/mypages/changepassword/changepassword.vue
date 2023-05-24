<template>
	<view class="login">
		<view class="login-title">
			<view>
				修改密码
			</view>
		</view>
		<view class="login-input">
			<input class="userinput" v-model="username" type="text" placeholder="请输入账号">
			<view class="userinput-andbtn">
				<input class="inp" type="text" v-model="send" placeholder="点击获取验证码">
				<text class="getcode" @click="Sendcode">获取验证码</text>
			</view>
			<input class="passinput" v-model="password" type="password" placeholder="请输入密码">
			<input class="passinput" v-model="againpassword" type="password" placeholder="再次确认密码">
		</view>
		<view class="login-btn">
			<button class="btn" @click="ChangePassword">修改密码</button>
		</view>


	</view>
</template>

<script>
	import {
		ChangePasswordAPI,
		Sendverificationcode
	} from '@/api/index.js'
	export default {
		data() {
			return {
				// 账号
				username: "",
				// 验证吗
				send: "",
				// 密码
				password: '',
				// 再次获取密码
				againpassword: '',
			};
		},
		methods: {
			// 发送验证码
			async Sendcode() {
				if (this.username == '') {
					uni.showToast({
						title: "请输入账号",
						icon: 'none',
						duration: 850
					});
				} else {
					const form = {
						"requestType": "ForgetGetCode",
						data: {
							'sessionid': uni.getStorageSync('sessionid'),
							phone: this.username,
						}
					}
					// const res = await Sendverificationcode(form)
					uni.request({
						url: "http://nat.ynawe.com:10001/CommunityCloud/_comapplet_SignIn",
						method: 'POST',
						data: form,
						success: (res) => {
							console.log(res.data.data.sessionid);
							uni.setStorageSync("sessionid", res.data.data.sessionid)
						},
						complete: (err) => {
							uni.showToast({
								title: err.data.msg,
								icon: 'none',
								duration: 850
							});
						}
					})
				}

			},
			// 修改密码
			async ChangePassword() {
				if (this.username == '') {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.send == '') {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.password == '') {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.againpassword == '') {
					uni.showToast({
						title: '请再次输入密码',
						icon: 'none',
						duration: 850
					});
				} else if (this.password != this.againpassword) {
					uni.showToast({
						title: '两次密码不一样',
						icon: 'none',
						duration: 850
					});
				} else {
					const form = {
						"requestType": "Forget",
						data: {
							'sessionid': uni.getStorageSync('sessionid'),
							phone: this.username,
							code: this.send,
							psd: this.password,
						}
					}
					const res = await ChangePasswordAPI(form)
					console.log("修改密码", res);
					if (res.data.data.status == 0) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				}





			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		height: 100vh;
		background-color: #fff;

		.login-title {
			width: 80%;
			margin: 0 auto;
			font-size: 24px;
			padding: 50px 0;

		}

		.login-input {
			width: 80%;
			margin: 0 auto;

			.userinput {
				height: 50px;
				border-bottom: 1px solid #eee;
			}

			.passinput {
				height: 50px;
				border-bottom: 1px solid #eee;
			}
		}

		.login-btn {
			width: 80%;
			margin: 20px auto;

			.btn {
				background-color: #0055ff;
				color: white;
			}

		}

	}

	.userinput-andbtn {
		display: flex;
		justify-content: space-between;
		height: 50px;
		line-height: 50px;
		border-bottom: #eee solid 1px;

		.inp {
			height: 50px;
			line-height: 50px;
		}

		.getcode {
			border: #eee solid 1px;
			height: 26px;
			line-height: 26px;
			margin: 12px 0 0 0;
			padding: 0 5px;
			background-color: #1aa034;
			border-radius: 3px;
			color: #fff;
		}
	}
</style>