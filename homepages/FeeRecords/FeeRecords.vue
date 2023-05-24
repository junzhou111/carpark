<template>
	<!-- 临时车收费记录 -->
	<view class="FeeRecords">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="close" @open="open" mode="top">
			<view class="fromview">
				<!-- 支付状态 -->
				<u-action-sheet :actions="state.list" @select="stateClick" :title="state.title" cancelText="取消"
					@close="state.show=false" :show="state.show"></u-action-sheet>
				<view class="calendarinput" @click="state.show=true">
					<text v-text="state.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>

				<!-- 支付来源 -->
				<u-action-sheet :actions="payment.list" @select="paymentClick" :title="payment.title" cancelText="取消"
					@close="payment.show=false" :show="payment.show"></u-action-sheet>
				<view class="calendarinput" @click="payment.show=true">
					<text v-text="payment.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 支付场景 -->
				<u-action-sheet :actions="scene.list" @select="sceneClick" :title="scene.title" cancelText="取消"
					@close="scene.show=false" :show="scene.show"></u-action-sheet>
				<view class="calendarinput" @click="scene.show=true">
					<text v-text="scene.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 表单日历 -->
				<!-- <u-calendar :show="calendarshow" mode="range" @confirm="confirm" @close="close"></u-calendar>
				<view class="calendarinput" @click="calendarshow = true">
					<text v-text="calendarvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view> -->

				<!-- 日历表单筛选开始时间-->
				<u-datetime-picker :show="startshow" v-model="StartTime" mode="date" @confirm="startconfirm"
					@close="startshow = false"></u-datetime-picker>
				<view class="calendarinput" @click="startshow = true">
					<text v-text="startvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>

				<!-- 日历表单 筛选结束时间-->
				<u-datetime-picker :show="endshow" v-model="Stoptime" mode="date"
					@confirm="endconfirm"></u-datetime-picker>
				<view class="calendarinput" @click="endshow = true">
					<text v-text="endvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>

				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="confirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search" v-model="searchvalue"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="show=true">筛选</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="resetbtn">重置</button>
			</view>
		</view>
		<!-- 收款记录列表 -->
		<view class="Record-List">
			<view class="allmoney">总额:{{allmoney}}</view>
			<view class="Record-List-item" v-for="(item,index) in alllist" :key="index" @click="Jumpdetails(item)">
				<view class="item-left">
					<view class="item-left-title">
						{{item.title}}{{index}}
					</view>
					<view class="item-right-money">
						￥{{item.money}}
					</view>
				</view>
				<view class="item-right">

					<view class="item-left-time">
						<text
							class="suorce">{{item.pay_suorce=='0'?'掌上社区app':item.pay_suorce=='1'?'实时扫码付款':item.pay_suorce=='2'?'聚合收款码':'其他自收'}}</text>
						<text class="time">{{item.pay_createtime}}</text>
					</view>
					<view class="item-right-paymented">
						{{item.pay_state=="0"?'待支付':item.pay_state=="1"?'已支付':item.pay_state=='3'?'支付取消':'未知状态'}}
					</view>
				</view>
			</view>
			<u-loadmore v-if="indtype" :status="status" :nomore-text="nomoreText" line="true" />
			<text class="topbtn" @click="goTop"> <u-icon size="18" name="arrow-up"></u-icon></text>
		</view>
	</view>
</template>

<script>
	import {
		getTemporaryvehicle
	} from "@/api/index.js"
	export default {
		data() {
			return {
				status: "nomore",
				nomoreText: '实在没有了',
				// 分页上拉加载页数
				ind: '0',
				// 页数是否继续加，
				indtype: false,
				// 搜索
				searchvalue: '',
				//  弹出筛选层  
				show: false,
				// 支付状态
				state: {
					title: '支付状态',
					list: [{
						name: '待支付',
						type: "0"
					}, {
						name: '已支付',
						type: "1"
					}, {
						name: '支付取消',
						type: "2"
					}, {
						name: '未知状态',
						type: "3"
					}],
					show: false,
					value: '支付状态',
					type: 'all'
				},
				// 支付方式
				payment: {
					title: '支付方式',
					list: [{
							name: '现场当面收款',
							type: "0"
						},
						{
							name: '微信支付',
							type: "1"
						},
						{
							name: '支付宝支付',
							type: "2"
						},
						{
							name: '其他支付',
							type: "3"
						}
					],
					show: false,
					value: '支付方式',
					type: 'all',
				},
				// 支付场景   scene
				scene: {
					title: '支付场景',
					list: [{
							name: '掌上社区app',
							type: "0"
						},
						{
							name: '实时扫码付款',
							type: "1"
						}, {
							name: '聚合收款码',
							type: "2"
						}, {
							name: '其他自收',
							type: "3"
						}
					],
					show: false,
					value: '支付场景',
					type: 'all'
				},
				// 筛选开始时间
				startshow: false,
				// 开始时间
				StartTime: 'all',
				startvalue: '年/月/日',
				// 筛选结束时间
				endshow: false,
				// 结束时间
				Stoptime: 'all',
				endvalue: '年/月/日',
				//总金额
				allmoney: "",
				// 所有数据
				alllist: []

			};
		},
		methods: {
			timedata(timestamp) {
				var time = new Date(timestamp)
				var y = time.getFullYear(); //返回年份
				var M = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var m = time.getMinutes();
				var s = time.getSeconds();
				if (M <= 9) {
					M = '0' + M
				}
				if (d <= 9) {
					d = '0' + d
				}

				if (h <= 9) {
					h = '0' + h
				}
				if (m <= 9) {
					m = '0' + m
				}
				if (s <= 9) {
					s = '0' + s
				}
				var times = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
				return times
			},
			// 搜索按钮
			searchbtn() {
				this.ind = 0
				this.alllist = []
				this.indtype = false
				this.getalllist()
				this.getallmoney()
			},
			// 	  弹出筛选层 
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			// 支付状态
			stateClick(index) {
				console.log("支付状态返回的数据", index);
				this.state.value = index.name
				this.state.type = index.type
			},
			// 支付方式
			paymentClick(index) {
				console.log("支付方式返回的数据", index);
				this.payment.value = index.name
				this.payment.type = index.type
			},
			// 支付场景
			sceneClick(index) {
				console.log("支付场景返回的数据", index);
				this.scene.value = index.name
				this.scene.type = index.type
			},
			// 点击确认时间范围返回值
			startconfirm(e) {
				console.log("开始日历组件返回值", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.StartTime = etime
				this.startvalue = etime
				console.log(this.StartTime, 'StartTime');
				console.log(this.startvalue, 'startvalue');
				this.startshow = false
			},
			endconfirm(e) {
				console.log("结束日历组件返回值", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.Stoptime = etime
				this.endvalue = etime
				console.log(this.Stoptime, 'Stoptime');
				console.log(this.endvalue, 'endvalue');
				this.endshow = false
			},
			// 点击按钮开始筛选
			confirmbtn() {
				this.ind = 0
				this.alllist = []
				this.indtype = false
				this.getalllist()
				this.show = false
				this.getallmoney()
			},
			// 点击重置按钮
			resetbtn() {
				this.ind = 0
				this.alllist = []
				this.indtype = false
				this.state.value = '支付状态'
				this.state.type = 'all'
				this.payment.value = '支付方式'
				this.payment.type = 'all'
				this.scene.value = '支付场景'
				this.scene.type = 'all'
				this.StartTime = 'all'
				this.Stoptime = 'all'
				this.startvalue = "年/月/日"
				this.endvalue = "年/月/日"
				this.searchvalue = ''
				this.getalllist()
				this.getallmoney()
			},
			// 跳转详情
			Jumpdetails(item) {
				console.log(item, 'item');
				item = encodeURIComponent(JSON.stringify(item));
				console.log(item);
				uni.navigateTo({
					url: './Fee?item=' + item
				})
			},
			// 总金额接口
			async getallmoney() {
				if (this.searchvalue == '') {
					var word = 'all'
				} else if (this.searchvalue != '') {
					word = this.searchvalue
				}
				if (this.startvalue == '年/月/日') {
					var startsvalue = 'all'
				} else {
					startsvalue = this.startvalue
				}
				if (this.endvalue == '年/月/日') {
					var endsvalue = 'all'
				} else {
					endsvalue = this.endvalue
				}
				const form = {
					"requestType": "GetCarTempPaylistIndex",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"pgt": "30",
						"word": word,
						"paytype": this.payment.type,
						"paystate": this.state.type,
						"date1": startsvalue,
						"date2": endsvalue,
						"pay_suorce": this.scene.type
					},
				}
				const res = await getTemporaryvehicle(form)
				console.log("总金额", res.data.data);
				if (res.data.data.allmoney == undefined) {
					this.allmoney = ''
				}
				if (res.data.data.allmoney != undefined) {
					this.allmoney = res.data.data.allmoney
				}
			},
			//所有数据
			async getalllist() {
				if (this.searchvalue == '') {
					var word = 'all'
				} else if (this.searchvalue != '') {
					word = this.searchvalue
				}

				if (this.startvalue == '年/月/日') {
					var startsvalue = 'all'
				} else {
					startsvalue = this.startvalue
				}
				if (this.endvalue == '年/月/日') {
					var endsvalue = 'all'
				} else {
					endsvalue = this.endvalue
				}
				const form = {
					"requestType": "GetCarTempPaylist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"ind": this.ind,
						"pgt": "15",
						"word": word,
						"stk": "all",
						"stt": "all",
						"paytype": this.payment.type,
						"paystate": this.state.type,
						"date1": startsvalue,
						"date2": endsvalue,
						"pay_suorce": this.scene.type
					},
				}
				const res = await getTemporaryvehicle(form)
				console.log("所有数据", res.data.data);
				// console.log("form", form);
				if (res.data.data == undefined) {
					if (this.alllist != '') {
						this.alllist = this.alllist
						this.indtype = true
					}
					if (this.alllist == '') {
						this.alllist = ''
					}
				}
				if (res.data.data != undefined) {
					if (this.indtype == false) {
						for (var i = 0; i <= res.data.data.length - 1; i++) {
							this.alllist.push(res.data.data[i])
						}
					}
				}

				// if (res.data.data == undefined) {
				// 	if (this.alllist != '') {
				// 		this.alllist = this.alllist
				// 		this.indtype = true
				// 	}
				// 	if (this.alllist == '') {
				// 		this.alllist = ''
				// 	}

				// } else {
				// 	this.alllist = res.data.data
				// 	if (this.ind != 0) {
				// 		for (var i = 0; i <= res.data.data.length - 1; i++) {
				// 			this.alllist.push(res.data.data[i])
				// 		}
				// 	}

				// 	console.log(this.alllist, '11111111111');
				// }
			},
			//回到最顶部 
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0
				})
			}


		},
		// 触底事件
		onReachBottom() {
			console.log("触底事件");
			if (this.indtype == false) {
				this.ind = parseInt(this.ind) + parseInt(1)
				this.getalllist()
			}
			console.log(this.ind);
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.ind = 0
			this.indtype = false
			this.alllist = []
			this.getallmoney()
			this.getalllist()
			uni.stopPullDownRefresh()
		},
		onLoad() {
			this.getallmoney()
			this.getalllist()
		},
	}
</script>

<style lang="scss">
	.FeeRecords {
		width: 100%;
		height: 100%;
		background-color: #eee;
		padding: 0 0 20px 0;
		box-sizing: border-box;


		.inputbox {
			margin: 15px;
			padding: 20px;
			background-color: #fff;
			box-sizing: border-box;
			border-radius: 5px;

			.input {
				width: 100%;
			}

			.inputbtn {
				display: flex;
				justify-content: space-between;

				.bt {
					margin: 20px 0 0;
				}
			}
		}



		.fromview {
			margin: 0 auto;
			width: 250px;

			.calendarinput {
				width: 250px;
				height: 40px;
				line-height: 18px;
				margin: 10px 10px 10px 0;
				padding: 10px;
				box-sizing: border-box;
				border: 1px solid #eee;
				display: flex;
				justify-content: space-between;
			}

			.confirmbtn {
				margin: 0 0 20px 0;
			}

		}

		.Record-List {
			background-color: #fff;
			margin: 0 15px 15px 15px;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 5px;

			.Record-List-item {
				width: 100%;
				// background-color: red;
				border-bottom: #eee 1px solid;
				padding: 10px;
				box-sizing: border-box;


				.item-left {
					display: flex;
					justify-content: space-between;

					.item-left-title {
						font-size: 17px;
					}

					.item-right-money {
						font-size: 18px;
						color: red;
					}

				}

				.item-right {
					display: flex;
					justify-content: space-between;

					.item-left-time {
						height: 20px;
						line-height: 30px;
					}

					.item-right-paymented {
						text-align: right;
						height: 20px;
						line-height: 20px;
						padding: 2px 5px;
						font-size: 13px;
						background-color: #ff0000;
						border-radius: 3px;
						color: #fff;
					}
				}
			}
		}
	}

	.allmoney {
		background-color: #eee;
		padding: 8px 10px;
		margin-bottom: 10px;
		border-radius: 5px;
	}

	.suorce {
		display: inline-block;
		font-size: 14px;
		color: #7d7d7d;
		width: 80px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.time {
		display: inline-block;
		width: 110px;
		font-size: 13px;
		color: #7d7d7d;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.u-loadmore {
		margin-top: 25px !important;
	}

	.topbtn {
		display: inline-block;
		width: 30px;
		height: 30px;
		background-color: #eee !important;
		position: fixed;
		bottom: 50px;
		right: 30px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;


		.u-icon {
			display: inline-block;

		}
	}
</style>