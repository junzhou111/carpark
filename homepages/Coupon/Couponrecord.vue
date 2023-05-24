<template>
	<!-- 优惠券发放记录 -->
	<view class="Couponrecordpage">
		<view class="input">
			<input class="calendarinput" type="text" v-model="searchvalue" @input="changeValue" placeholder="搜索">
		</view>
		<view class="Couponrecordlist" v-if="giveCouponrecordlist">
			<!-- v-for="(item,indes) in Couponrecordlist" :key="index" -->
			<view class="Couponrecordlist-item" v-for="(item,index) in giveCouponrecordlist" :key="index">
				<view class="header">
					<view class="name">
						姓名：{{item.name}}
					</view>
					<view class="phone">
						手机号：{{item.phone}}
					</view>
					<view class="carplate">
						车牌：{{item.carno}}
					</view>
				</view>
				<view class="time">
					<view class="starttime">
						有效时间启：{{item.start_time}}
					</view>
					<view class="endtime">
						有效时间止：{{item.end_time}}
					</view>
				</view>
				<view class="type">
					<view class="givetime">
						发放时间：{{item.time}}
					</view>
					<view class="use">
						是否使用：{{item.status==0?'否':item.status==1?'是':item.status==2?'作废':'状态未知'}}
					</view>
				</view>

			</view>
		</view>
		<u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/car.png" v-else>
		</u-empty>
	</view>
</template>

<script>
	import {
		couponlist
	} from "@/api/index.js"
	import {
		debounce
	} from "@/utils/utils.js"
	export default {
		data() {
			return {
				searchvalue: '',
				Optionid: '',
				// 优惠券发放记录全部数据
				giveCouponrecordlist: []
			};
		},
		onLoad: function(option) {
			console.log(option.id);
			this.Optionid = option.id
			this.getgiveCouponrecordlist(option.id, this.searchvalue)
		},
		methods: {
			// 搜索触发的事件
			changeValue: debounce(function() {
				console.log(this.MerchantName, "MerchantName");
				// 搜索接口
				this.getgiveCouponrecordlist(this.Optionid, this.searchvalue)
			}, 1000),
			// 发放记录全部数据
			async getgiveCouponrecordlist(id, searchvalue) {
				if (searchvalue == '') {
					searchvalue = 'all'
				}
				const form = {
					"requestType": "CouponsRecord",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": id,
						"word": searchvalue,
						"ind": 0,
						"pgt": "30"
					},
				}
				console.log('form', form);
				const res = await couponlist(form)
				console.log("优惠券发放记录", res.data.data);
				if (res.data.data == undefined) {
					this.giveCouponrecordlist = ''
				}
				if (res.data.data != undefined) {
					this.giveCouponrecordlist = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.Couponrecordpage {
		background-color: #eee;
		overflow: hidden;

		.input {
			background-color: #fff;
			margin: 15px;
			border-radius: 5px;

			.calendarinput {
				padding: 10px;
			}
		}


		.Couponrecordlist {
			padding: 15px;

			.Couponrecordlist-item {
				background-color: #fff;
				border-radius: 5px;
				padding: 10px;
				margin-bottom: 15px;

				.header {
					display: flex;
					justify-content: space-between;

					.name {}

					.phone {}

					.carplate {}
				}

				.time {
					display: flex;
					justify-content: space-between;

					.starttime {}

					.endtime {}
				}

				.type {
					display: flex;
					justify-content: space-between;

					.givetime {}

					.use {}
				}
			}
		}
	}
</style>