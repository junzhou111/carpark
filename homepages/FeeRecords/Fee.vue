<template>
	<view class="pages">
		<view class="page-header">
			<view class="header-title"> 临时车收费记录:</view>
			<view class="header-item" v-if="item.title">
				<view class="item-left">
					凭证号
				</view>
				<view class="item-right">
					{{item.title}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_order_number">
				<view class="item-left">
					支付单号
				</view>
				<view class="item-right">
					{{item.pay_order_number}}
				</view>
			</view>
			<view class="header-item" v-if="item.order_number">
				<view class="item-left">
					订单编号
				</view>
				<view class="item-right small">
					{{item.order_number}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_suorce">
				<view class="item-left">
					支付场景
				</view>
				<view class="item-right">
					{{item.pay_suorce=='0'?'掌上社区app':item.pay_suorce=='1'?'实时扫码付款':item.pay_suorce=='2'?'聚合收款码':'其他自收'}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_type">
				<view class="item-left">
					支付方式
				</view>
				<view class="item-right">
					{{item.pay_type=='0'?'现场当面收款':item.pay_type=='1'?'微信支付':item.pay_type=='2'?'支付宝支付':'其他支付'}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_createtime">
				<view class="item-left">
					创建时间
				</view>
				<view class="item-right">
					{{item.pay_createtime}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_achievetime">
				<view class="item-left">
					支付时间
				</view>
				<view class="item-right">
					{{item.pay_achievetime}}
				</view>
			</view>
			<view class="header-item" v-if="item.pay_state">
				<view class="item-left">
					支付状态
				</view>
				<view class="item-right">
					{{item.pay_state=="0"?'待支付':item.pay_state=="1"?'已支付':item.pay_state=='3'?'支付取消':'未知状态'}}
				</view>
			</view>
			<view class="header-item" v-if="item.money">
				<view class="item-left">
					实收金额
				</view>
				<view class="item-right">
					{{item.money}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			}
		},
		onLoad(item) {
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

	.small {
		font-size: 12px;
	}
</style>