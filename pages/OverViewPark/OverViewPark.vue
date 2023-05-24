<template>
	<!-- 首页 -->
	<view class="overviewpark">
		<!-- 信息模块 -->
		<view class="overviewpark-box">
			<view class="overviewpark-box-header">
				<view class="box-header-title">
					车位
				</view>
				<view class="box-header-number">
					{{datalist[0].sum==undefined?'00':datalist[0].sum}}/{{datalist[1].sum==undefined?'00':datalist[1].sum}}
				</view>
			</view>
			<view class="overviewpark-box-header">
				<view class="box-header-title">
					今日营收
				</view>
				<view class="box-header-number">
					￥{{datalist[2].allmoney==undefined?'00.00':datalist[2].allmoney}}
				</view>
			</view>
			<view class="overviewpark-box-header">
				<view class="box-header-title">
					车场设备
				</view>
				<view class="box-header-number">
					{{datalist[3].sum==undefined?'00':datalist[3].sum}}/{{datalist[4].sum==undefined?'00':datalist[4].sum}}
				</view>
			</view>
			<view class="overviewpark-box-header">
				<view class="box-header-title">
					今日流量
				</view>
				<view class="box-header-number">
					{{datalist[5].sum==undefined?'00':datalist[5].sum}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 去年的营收统计
				revenuedlist: this.revenued,
			}
		},
		props: ["datalist"],
		components: {},

		methods: {}
	};
</script>

<style lang="scss">
	.overviewpark {
		width: 100%;
		background-color: #eee;

		.overviewpark-box {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 15px 15px 0 15px;

			.overviewpark-box-header {
				width: 48%;
				height: 100px;
				background-color: #fff;
				border-radius: 5px;
				margin-bottom: 15px;
				padding: 15px 10px;
				box-sizing: border-box;
				font-weight: 900;

				.box-header-title {
					font-size: 20px;
					margin-bottom: 20px;
				}

				.box-header-number {}
			}
		}
	}
</style>