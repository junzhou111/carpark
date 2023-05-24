<template>
	<view class="pages">
		<view class="page-header">
			<view class="header-title">停车详情</view>
			<view class="header-item" v-if="item.carscan">
				<view class="item-left">车牌</view>
				<view class="item-right">{{item.carscan}}</view>
			</view>
			<view class="header-item" v-if="item.io">
				<view class="item-left">进出类型</view>
				<view class="item-right">{{item.io==0?'进':item.io==1?'出':'暂无数据'}}</view>
			</view>
			<view class="header-item" v-if="item.location">
				<view class="item-left">位置id</view>
				<view class="item-right">{{item.location}}</view>
			</view>
			<view class="header-item" v-if="item.time">
				<view class="item-left">入场/出场时间</view>
				<view class="item-right">{{item.time}}</view>
			</view>
			<view class="header-item" v-if="item.location_type">
				<view class="item-left">位置类型</view>
				<view class="item-right">{{item.location_type==0?'车场':item.location_type==1?'区域':'暂无数据'}}</view>
			</view>
			<view class="header-item" v-if="item.person_id">
				<view class="item-left">用户名称</view>
				<view class="item-right">{{item.person_id}}</view>
			</view>

			<view class="header-item" v-if="item.cartype">
				<view class="item-left">车型</view>
				<view class="item-right">{{item.cartype}}</view>
			</view>
			<view class="header-item" v-if="item.carcolor">
				<view class="item-left">车身颜色</view>
				<view class="item-right">{{item.carcolor}}</view>
			</view>
			<view class="header-item" v-if="item.order_number">
				<view class="item-left">支付单号</view>
				<view class="item-right small">{{item.order_number}}</view>
			</view>
			<view class="header-item" v-if="item.freetime">
				<view class="item-left">免费时常</view>
				<view class="item-right">{{item.freetime}}</view>
			</view>
			<view class="header-item" v-if="item.triggertype">
				<view class="item-left">触发方式</view>
				<view class="item-right">{{item.triggertype}}</view>
			</view>
			<view class="header-item" v-if="item.release">
				<view class="item-left">是否放行</view>
				<view class="item-right">{{item.release}}</view>
			</view>
			<view class="header-item" v-if="item.isout">
				<view class="item-left">是否已出场</view>
				<view class="item-right">{{item.isout}}</view>
			</view>
			<view class="header-item" v-if="item.feetype">
				<view class="item-left">计费形式</view>
				<view class="item-right">
					{{item.feetype==0?'业主车':item.feetype==1?'月费车':item.feetype==2?'临时车':item.feetype==3?'业主转临时':item.feetype==4?'无牌车':'数据错误'}}
				</view>
			</view>

		</view>
		<view class="page-footer">
			<view class="plateimg">
				<view class="footer-title">车牌图片</view>
				<view class="footer-item">
					<image class="cardetailsimg" v-if="item.pic_min==0||!item.pic_min" src="@/static/mr.png"
						mode="width"></image>
					<image class="cardetailsimg" v-else
						:src="'https://anweier-acc.oss-cn-chengdu.aliyuncs.com/'+usercodes+'/'+'car/scan/min/'+item.pic_min"
						mode="width"></image>

				</view>
			</view>
			<view class="vehicleimg">
				<view class="footer-title">车辆图片</view>
				<view class="footer-item">
					<image class="cardetailsimg" v-if="item.pic_max==0||!item.pic_max" src="@/static/mr.png"
						mode="width"></image>
					<image class="cardetailsimg" v-else
						:src="'https://anweier-acc.oss-cn-chengdu.aliyuncs.com/'+usercodes+'/'+'car/scan/max/'+item.pic_max"
						mode="width"></image>

				</view>
			</view>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				item: {},
				usercodes: '',
			};
		},
		onLoad: function(item) {
			this.item = JSON.parse(decodeURIComponent(item.item));
			console.log(this.item);
			this.usercodes = uni.getStorageSync("usercode")

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

		.page-footer {
			margin-top: 15px;
			margin-bottom: 15px;
			background-color: #fff;

			.footer-title {
				width: 100%;
				background-color: #fff;
				height: 40px;
				line-height: 40px;
				padding: 0 0 0 15px;
				border-bottom: 1px solid #f1f1f1;
			}

			.footer-item {
				width: 100%;
				height: 200px;

				.cardetailsimg {
					width: 100%;
					height: 100%;
					padding: 0 15px 15px 15px;
					box-sizing: border-box;
				}
			}
		}
	}

	.small {
		font-size: 12px;
	}
</style>