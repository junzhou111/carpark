<template>
	<view class="ExitRecord">
		<!-- 车场概况组件 -->
		<view class="ExitRecord-item" @click="info(item.id)">
			<view class="ExitRecord-right">
				<view class="right-top">
					<view class="top-left">
						{{item.carscan}}
					</view>
					<view class="top-right">
						{{item.person_id=="0"?"临时车":item.person_id}}
					</view>
				</view>
				<view class="right-bottom">
					<view class="left-title">
						<view class="bottom-top">
							<view class="time">
								{{item.time}}
							</view>
						</view>
						<view class="bottom-bottom">
							<view class="cartypeimg">
								{{item.io=="0"?'进场':'出场'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "datelist",
		data() {
			return {
				mrimg: '@/static/mr.png'
			};
		},
		props: ['item'],
		methods: {
			info(id) {
				this.$emit('infos', id)
			}
		}
	}
</script>
<style lang="scss">
	.ExitRecord {
		width: 100%;
		padding: 0 15px 15px 15px;
		box-sizing: border-box;
		background-color: #eee;

		.ExitRecord-item {
			width: 100%;
			background-color: #fff;
			border-radius: 5px;
			overflow: hidden;
			display: flex;
			padding: 10px;
			box-sizing: border-box;


			.ExitRecord-left {
				width: 120px;
				height: 86px;
				margin: 5px 10px 5px 5px;

			}

			.ExitRecord-right {
				// background-color: red;
				flex: 1;
				padding: 5px;
				display: flex;
				flex-direction: column;

				.right-top {
					// background-color: blue;
					display: flex;
					justify-content: space-between;
					font-weight: 900;
					font-size: 18px;

					.top-left {}

					.cheweihao {
						font-weight: 500;
						font-size: 12px;
					}

					.top-right {
						font-weight: 500;
						font-size: 12px;
						padding: 6px 0;
						color: #a3a3a3;
					}
				}

				.right-bottom {
					width: 100%;
					display: flex;
					justify-content: space-between;
					position: relative;

					.left-title {
						font-size: 12px;
						flex: 1;
						display: flex;
						justify-content: space-between;
						// background-color: #f60;
						// padding: 5px;

						.bottom-bottom {
							color: #1296db;
						}

					}

					.btnbox {
						width: 50px;
						height: 30px;
					}

					.right-btn {
						margin: 0;
						padding: 0;
						width: 50px;
						height: 30px;
						font-size: 12px;
						position: absolute;
						right: 0;
						bottom: 5px;
						background-color: #198754;
						color: #fff;
					}
				}
			}
		}
	}
</style>