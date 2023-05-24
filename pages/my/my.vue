<template>
	<view class="my">
		<view class="my-headers">
			<view class="my-box">
				<view class="header">
					<view class="userimg">
					</view>
					<!-- <image class="userimg" src=" " mode="widthFix"></image> -->
					<view class="usertitle">
						<view class="username">
							用户名
						</view>
						<view class="user">
							账号3306299233
						</view>

					</view>
				</view>
			</view>
			<view class="my-header">
			</view>
		</view>
		<view class="my-function-box">
			<view class="my-function" v-for="(item , index) in datalist" :key="index" @click="handelmypages(index)">
				<view class="function-left">
					<u-icon class="left-icon" :name="item.icon"></u-icon>
					{{item.name}}
				</view>
				<view class="function-right">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="my-footer" @click="Logout">
			退出登录
		</view>

	</view>
</template>

<script>
	import {
		logout,
		menu
	} from '@/api/index.js'
	export default {
		data() {
			return {
				pagesdata: '',
				datalist: []
			};
		},
		onLoad() {
			this.getmenulist()
		},
		methods: {
			// 点击跳转
			handelmypages(index) {
				this.pagesdata = this.datalist[index].key
				// 如果跳转优惠券
				if (this.pagesdata == "Coupon") {
					uni.navigateTo({
						url: "/pages/homepages/" + this.pagesdata + "/" + this.pagesdata
					})
				} else {
					var urls = "/pages/mypages/"
					uni.navigateTo({
						url: urls + this.pagesdata + "/" + this.pagesdata
					})
				}
			},
			//退出登录
			async Logout() {
				const form = {
					"requestType": "Exit",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await logout(form)
				console.log("退出登录", res);
				if (res.data.status == 0) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
					// 清除本地的cookie
					uni.removeStorageSync('sessionid')
					uni.removeStorageSync('usercode')
				}
			},
			// 获取menu列表
			async getmenulist() {
				const form = {
					"requestType": "menu",
					"data": {
						"rank": "1",
					}
				}
				const res = await menu(form)
				console.log("获取菜单2", res.data.data);
				this.datalist = res.data.data
			},
		}

	}
</script>
<style lang="scss">
	.my {
		width: 100%;
		background-color: #eee;
		height: 100vh;

		.my-headers {
			background-color: #fff;
			height: 165px;

			.my-box {
				width: 100%;
				height: 100px;
				background-color: #1296db;

				.header {
					padding: 20px;
					display: flex;
					justify-content: space-between;

					.userimg {
						width: 80px;
						height: 80px;
						background-color: #a8a8a8;
						border-radius: 50%;
					}

					.usertitle {
						flex: 1;

						view {
							padding: 10px 20px;
							color: white;
						}
					}
				}
			}

			.my-header {
				width: 100%;
				height: 50px;
				background-color: #1296db;
				border-radius: 0 0 200px 200px;
				margin-bottom: 10px;
			}

		}



		.my-function-box {
			border-top: 5px solid #eee;
			background-color: #fff;

			.my-function {
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: space-between;
				padding: 10px 20px;
				box-sizing: border-box;
				border-bottom: #eee 1px solid;

				.function-left {
					flex: 1;
					display: flex;
					align-items: center;

					.left-icon {
						margin-right: 10px;
					}
				}

				.function-right {
					width: 20px;
				}
			}
		}

		.my-footer {
			width: 100%;
			text-align: center;
			height: 60px;
			line-height: 60px;
			background-color: #fff;
			color: #1296db;
			margin-top: 30px;

		}

	}
</style>