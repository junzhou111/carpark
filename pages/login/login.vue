<template>
	<view class="login">
		<view class="login-title">
			<view>
				您好，
			</view>
			<view>
				欢迎登录智慧社区管理平台
			</view>
		</view>
		<view class="login-input" v-show="ForgotPassword">
			<input class="userinput" v-model="data.username" type="text" placeholder="请输入账号">
			<input class="passinput" v-model="data.password" type="password" placeholder="请输入密码">
		</view>
		<view class="login-input" v-show="!ForgotPassword">
			<input class="userinput" type="text" v-model="Retrievepassword.username" placeholder="请输入账号">
			<view class="userinput-andbtn">
				<input class="inp" type="text" v-model="Retrievepassword.code" placeholder="点击获取验证码">
				<text class="getcode" @click="Sendcode">获取验证码</text>
			</view>
			<input class="passinput" type="password" v-model="Retrievepassword.password" placeholder="请输入密码">
			<input class="passinput" type="password" v-model="Retrievepassword.confirmpassword" placeholder="再次确认密码">
		</view>
		<view class="login-btn">
			<button class="btn" @click="logininfo">{{ForgotPassword?"登录":"修改密码" }}</button>
		</view>
		<view class="login-operate">
			<view class="rememberpassword" v-if="ForgotPassword">
				<checkbox :checked="rememberpasswordcheckbox" @click="rememberpasswordchange" disabled="checkeddisabled"
					style="transform:scale(0.7)" />
				记住密码
			</view>
			<view class="login-footer" @click="handelforgotpassword">
				{{ForgotPassword?"忘记密码":"去登录" }}
			</view>

		</view>

	</view>
</template>

<script>
	import {
		login,
		Sendverificationcode,
		ChangePasswordAPI
	} from '@/api/index.js'
	export default {
		data() {
			return {
				// 判断当前是登录true还是找回密码false
				ForgotPassword: true,
				// 登陆时的input内容

				data: {
					username: '',
					password: '',
				},
				Retrievepassword: {
					username: '',
					code: '',
					password: '',
					confirmpassword: '',
				},
				// 记住密码
				rememberpasswordcheckbox: false,
				// 是否禁用''
				checkeddisabled: false
			};
		},
		onLoad() {
			var datelists = uni.getStorageSync('usernameandpassword')
			// 判断本地有没有usernameandpassword
			if (datelists) {
				this.rememberpasswordcheckbox = true
				this.data.password = uni.getStorageSync('usernameandpassword').password
				this.data.username = uni.getStorageSync('usernameandpassword').username

			} else {
				this.rememberpasswordcheckbox = false
			}
		},
		methods: {
			handelforgotpassword() {
				this.ForgotPassword = !this.ForgotPassword
			},
			// 登录接口的调用
			async logininfo() {
				if (this.ForgotPassword) {
					// 登录
					this.info()
				} else {
					// 修改密码
					this.ChangePassword()
				}
			},

			//登录接口
			info() {
				if (this.data.username == '') {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.data.password == '') {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 850
					});
				} else {
					const form = {
						"requestType": "SignIn",
						data: {
							phone: this.data.username,
							psd: this.data.password,
							isSimulate: 0
						}
					}
					uni.request({
						url: "http://nat.ynawe.com:10001/CommunityCloud/_comapplet_SignIn",
						method: 'POST',
						data: form,
						success: (res) => {
							console.log(res.data.status);
							if (res.data.status == 0) {
								console.log("登陆成功", res);
								// 将账号和密码存到本地
								if (this.rememberpasswordcheckbox == true) {
									// 将账号和密码存到本地
									uni.setStorageSync("usernameandpassword", this.data)
								}
								var titles = res.data.msg
								uni.switchTab({
									url: "/pages/index/index"
								})
								uni.setStorageSync("sessionid", res.data.data.sessionid)
							} else {}
						},
						fail: (err) => {
							console.log(err, "err");
							var title = err.data.msg
							uni.showToast({
								title: title,
								icon: 'none',
								duration: 850
							});
						},
						complete: (err) => {
							console.log(err.data.msg, 'err');
							var title = err.data.msg
							uni.showToast({
								title: title,
								icon: 'none',
								duration: 850
							});
						},

					})
				}

			},
			// 获取验证码
			async Sendcode() {
				if (this.Retrievepassword.username == '') {
					uni.showToast({
						title: "请输入账号",
						icon: 'none',
						duration: 850
					});
				} else {
					const form = {
						"requestType": "ForgetGetCode",
						data: {
							phone: this.Retrievepassword.username,
						}
					}
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
				if (this.Retrievepassword.username == '') {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.Retrievepassword.code == '') {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.Retrievepassword.password == '') {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 850
					});
				} else if (this.Retrievepassword.confirmpassword == '') {
					uni.showToast({
						title: '请再次输入密码',
						icon: 'none',
						duration: 850
					});
				} else if (this.Retrievepassword.password != this.Retrievepassword.confirmpassword) {
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
							phone: this.Retrievepassword.username,
							code: this.Retrievepassword.code,
							psd: this.Retrievepassword.password,
						}
					}
					const res = await ChangePasswordAPI(form)
					console.log("修改密码", res);
					this.ForgotPassword = true
				}

			},
			// 点击记住密码
			rememberpasswordchange() {
				if (this.data.password == '' || this.data.username == '') {
					uni.showToast({
						title: '请输入账号或者密码',
						icon: 'none',
						duration: 850
					});
					this.rememberpasswordcheckbox = false
					this.checkeddisabled = false
					console.log(this.rememberpasswordcheckbox);
				} else {
					this.rememberpasswordcheckbox = !this.rememberpasswordcheckbox
					this.checkeddisabled = true
				}
				if (this.rememberpasswordcheckbox == false) {
					uni.removeStorageSync("usernameandpassword")
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

		.login-operate {
			width: 80%;
			margin: 20px auto;
			display: flex;
			justify-content: space-between;

			.rememberpassword {}

			.login-footer {}
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