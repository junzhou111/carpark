<template> <!-- 充值记录详情 -->
	<view class="pages">
		<view class="page-header">
			<view class="header-title">充值记录详情</view>
			<view class="header-item">
				<view class="item-left">支付状态</view>
				<view class="item-right">{{obj.pay_state==0?'未支付':obj.pay_state==1?'已支付':'数据错误'}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">订单号</view>
				<view class="item-right">{{obj.pay_order_number=='0'?'-':obj.pay_order_number}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">有效期开始时间</view>
				<view class="item-right">{{obj.start}}</view>
			</view>
			<view class="header-item">
				<view class="item-left">有效期结束时间</view>
				<view class="item-right">{{obj.end}} </view>
			</view>
			<view class="header-item">
				<view class="item-left">支付场景</view>
				<view class="item-right">
					{{obj.pay_suorce==0?'掌上社区':obj.pay_suorce==1?'实时扫描付款':obj.pay_suorce==2?'聚合收款码':obj.pay_suorce==3?'其他自收':'数据错误'}}
				</view>
			</view>
			<view class="header-item">
				<view class="item-left">支付金额</view>
				<view class="item-right">{{obj.money}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},

			};
		},
		onLoad(item) {
			this.obj = JSON.parse(decodeURIComponent(item.items))
			console.log(this.obj, 'obj');
		},
		methods: {
			returnsuperior() {
				uni.navigateBack()
			}
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