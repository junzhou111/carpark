<template>
	<!-- 车场概况组件 -->
	<view class="ExitRecord">
		<view class="ExitRecord-item">
			<image v-if="item.pic_min" class="ExitRecord-left"
				:src="'https://anweier-acc.oss-cn-chengdu.aliyuncs.com/'+usercode+'/'+'car/scan/min/'+item.pic_min">
			</image>
			<image v-if="!item.pic_min" class="ExitRecord-left" src="@/static/mr.png"></image>
			<view class="ExitRecord-right">
				<view class="right-top">
					<view class="top-left">
						<!-- 车牌 -->
						{{item.carscan}}
					</view>
					<view class="cheweihao">
						<!-- 位置 -->
						{{item.location}}
					</view>

				</view>
				<view class="right-bottom">
					<view class="left-title">
						{{item.time}}
					</view>
					<view class="btnbox">
						{{item.person_id=="0"?"临时车":item.person_id}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "ExitRecord",
		data() {
			return {
				mrimg: '@/static/mr.png',
			};
		},
		props: ['item', 'usercode'],
		onLoad: () => {},
		methods: {

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
					display: flex;
					justify-content: space-between;
					font-weight: 900;
					font-size: 18px;

					.top-left {}

					.cheweihao {
						font-weight: 500;
						font-size: 12px;
					}

				}

				.right-bottom {
					width: 100%;
					display: flex;
					justify-content: space-between;
					position: relative;
					margin-top: 30px;

					.left-title {
						font-size: 12px;
						flex: 1;
						display: flex;
						justify-content: space-between;
						// background-color: #f60;
						padding: 5px;

						.bottom-bottom {
							width: 70px;
						}

					}

					.btnbox {
						width: 50px;
						height: 30px;
						font-size: 14px;
						padding: 5px 0;
						box-sizing: border-box;
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