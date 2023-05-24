<template>
	<view class="pages">
		<view class="page-header">
			<view class="header-title">停车详情</view>
			<view class="header-item" v-if="item.carscan">
				<view class="item-left">车牌号</view>
				<view class="item-right">{{item.carscan}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">车型</view>
				<view class="item-right"></view>
			</view>
			<view class="header-item">
				<view class="item-left">车位</view>
				<view class="item-right"></view>
			</view>
			<view class="header-item">
				<view class="item-left">开始日期</view>
				<view class="item-right"> </view>
			</view>
			<view class="header-item">
				<view class="item-left">结束日期</view>
				<view class="item-right"> </view>
			</view>
			<view class="header-item">
				<view class="item-left">联系人</view>
				<view class="item-right"> {{item.name}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">手机号</view>
				<view class="item-right">{{item.phone}} </view>
			</view>
			<view class="header-item">
				<view class="item-left">身份证号</view>
				<view class="item-right"> {{item.idcard}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">状态</view>
				<view class="item-right"> </view>
			</view>
			<view class="header-item">
				<view class="item-left">创建时间</view>
				<view class="item-right"> {{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			};
		},
		onLoad: function(item) {
			this.item = JSON.parse(decodeURIComponent(item.item));
			console.log(this.item);
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.pages {
		.page-header {


			.header-title {
				width: 100%;
				background-color: #fff;
				height: 40px;
				line-height: 40px;
				padding: 0 0 0 15px;
				border-bottom: 1px solid #f1f1f1;
			}

			.header-item {
				display: flex;
				justify-content: space-between;
				height: 40px;
				line-height: 40px;
				padding: 0 15px;
				background-color: #fff;



				.item-left {
					color: #8f8f8f;
				}

				.item-right {
					color: #262626;
				}
			}
		}
	}
</style>