<template>
	<view class="index">
		<!-- 轮播图 -->
		<swiper class="swiper" previous-margin="30px" next-margin="30px" :indicator-dots="true" :interval="4000"
			autoplay="true" easing-function="easeInOutCubic" :duration="800" circular="true">
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/84/f7/fc/84f7fcc08f21419a860dbedde45fe233.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/55/55/1a/55551aae5ca1c38abfa33a6d5a76febb.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/e2/54/eb/e254ebc4876b2d66bc48af9fb579607f.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/9c/8b/ab/9c8babff05868d2836947aea484bb238.jpg">
				</image>
			</swiper-item>
		</swiper>
		<!-- 分类模块 -->
		<u-scroll-list>
			<view class="scroll-list" style="flex-direction: row;">
				<view class="item-title">
					<view class="scroll-list__goods-item" v-for="(item, index) in menu" :key="index"
						@click="handelinfo(index)">
						<view class="scroll-list__goods-item__image icon iconfont" v-html="item.icon"> </view>
						<view class="scroll-list__goods-item__text bottom-title">{{ item.name }}</view>
					</view>
				</view>
			</view>
		</u-scroll-list>
		<!-- 车场概况 -->
		<!-- 信息模块 -->
		<Overviewpark :datalist="datalist"></Overviewpark>
		<!-- 车流量变化趋势 -->
		<view class="charts-box">
			<view class="charts-column">
				<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
			</view>
		</view>
		<!-- 营收统计 -->
		<view class="charts-box">
			<view class="charts-column">
				<qiun-data-charts type="line" :opts="optss" :chartData="chartDatas" />
			</view>
		</view>
		<!-- 出厂记录 -->
		<ExitRecord v-for="(item,index) in carrecord" :item='item' :usercode='usercodes'></ExitRecord>


	</view>
</template>

<script>
	import Overviewpark from "@/pages/OverViewPark/OverViewPark.vue"
	import ExitRecord from "../../components/ExitRecord/ExitRecord.vue"

	import {
		Carfactoryoverview,
		parkinglot,
		menu
	} from "@/api/index.js";
	export default {
		data() {
			return {
				// 用户code码
				usercodes: '',
				// 跳转路由暂存 
				titlerouters: "",
				// 车位营收数据
				datalist: {},
				//车流量
				Trafficvolumelist: {},
				// 去年的营收统计
				revenued: {},
				//今年的营收统计
				revenueing: {},
				//进出记录
				carrecord: {},
				// 菜单
				menu: [],
				// echarts图表数据      车流量变化趋势
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 15,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},


				// 营收统计
				chartDatas: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				optss: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					dataLabel: false,
					dataPointShape: false,
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2,
						data: [{
							min: 0,
							max: 8000,
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2,
							activeType: "hollow",
							linearType: "custom"
						}
					}
				},
			}
		},
		components: {
			Overviewpark,
			ExitRecord
		},
		onLoad() {
			this.getCarfactoryoverview()
			this.getparkinglot()
			this.getrevenued()
			this.getTrafficvolume()
			this.getrevenueing()
			this.getcarrecord()
			this.getmenu()

			this.usercodes = uni.getStorageSync('usercode');

			console.log(this.usercodes, 'usercode');


		},
		onReady() {
			this.getServerData();
			this.getServerDatas();
		},
		methods: {
			async getmenu() {
				const form = {
					"requestType": "getMenu",
					"data": {
						"rank": "0",
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await menu(form)
				console.log("获取菜单", res.data.data);
				this.menu = res.data.data
			},
			// 路由模块跳转
			handelinfo(index) {
				var titlerouters = this.menu[index].key
				var urls = "/homepages/"
				uni.navigateTo({
					url: urls + titlerouters + "/" + titlerouters
				})
			},
			async getCarfactoryoverview() {
				const form = {
					'requestType': 'GetProInfo',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await Carfactoryoverview(form)
				// console.log("车厂概况", res);
				// console.log(res.data.data[0].code, '用户信息');
				uni.setStorageSync("usercode", res.data.data[0].code)
			},
			async getparkinglot() {
				const form = {
					'requestType': 'getbar',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await parkinglot(form)
				// console.log("车位营收设备流量", res.data.data);
				this.datalist = res.data.data
			},
			async getTrafficvolume() {
				const form = {
					'requestType': 'getCarTrend',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await parkinglot(form)
				// console.log("车流量变化趋势", res.data.data);
				var rafficvo = res.data.data
				var a = []
				for (var i = 0; i <= rafficvo.length - 1; i++) {
					var b = parseInt(rafficvo[i].sum)
					a.push(b)
				}
				this.Trafficvolumelist = a
			},
			async getrevenueing() {
				const form = {
					'requestType': 'getThis',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await parkinglot(form)
				// console.log("今年的营收统计", res.data.data);


				for (var i = 0; i <= res.data.data.length - 1; i++) {
					if (res.data.data[i].allmoney == undefined) {
						res.data.data[i].allmoney = '0'
					}
				}
				var newarr = []
				for (var i = 0; i <= res.data.data.length - 1; i++) {
					var c = parseInt(res.data.data[i].allmoney)
					newarr.push(c)
				}
				this.revenueing = newarr
				// console.log('处理过的今年的营收统计', this.revenueing);
			},
			async getrevenued() {
				const form = {
					'requestType': 'getLast',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await parkinglot(form)
				// console.log("去年的营收统计", res.data.data);

				for (var i = 0; i <= res.data.data.length - 1; i++) {
					if (res.data.data[i].allmoney == undefined) {
						res.data.data[i].allmoney = '0'
					}
				}
				var oldarr = []
				for (var i = 0; i <= res.data.data.length - 1; i++) {
					var d = parseInt(res.data.data[i].allmoney)
					oldarr.push(d)
				}

				this.revenued = oldarr
				// console.log("处理过的去年的营收统计", this.revenued);
			},

			async getcarrecord() {
				const form = {
					'requestType': 'getRecent',
					data: {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await parkinglot(form)
				// console.log('form', form);
				console.log("出入记录", res.data.data);
				this.carrecord = res.data.data[0]
			},




			// 车流量变化趋势
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月",
							"12月"
						],
						series: [{
							name: "车流量变化趋势",
							data: '',
						}],
					};
					res.series[0].data = this.Trafficvolumelist
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},


			// 营收统计
			getServerDatas() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月",
							"12月"
						],
						series: [{
								name: "去年",
								data: ''
							},
							{
								name: "今年",
								data: ''
							}
						]
					};
					res.series[0].data = this.revenued
					res.series[1].data = this.revenueing
					this.chartDatas = JSON.parse(JSON.stringify(res));
				}, 500);
			},







		}
	}
</script>

<style lang="scss">
	.u-scroll-list {
		background-color: #fff;
		padding-top: 15px;
		margin-top: 15px;
	}

	.scroll-list {
		@include flex(column);

		.item-title {
			display: inline-block;
			display: flex;
			justify-content: space-between;
		}

		&__goods-item {
			width: 85px;
			// background-color: #fff;

			&__image {
				font-size: 50px;
				margin: 5px 13px;
				border-radius: 4px;
				text-align: center;
			}

			&__text {
				display: inline-block;
				width: 100%;
				text-align: center;
				font-size: 13px;
				margin-top: 5px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				padding: 0 auto;

			}
		}
	}



	.index {
		.swiper {
			width: 100%;

			.swiper-item {
				width: 100%;
				display: flex;
				align-items: center;

				.swiperimg {
					width: 95%;
					height: 150px;
					margin: 0 auto;
					border-radius: 5px;
					overflow: hidden;
				}
			}
		}

		// .assort-list {
		// 	width: 100%;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	flex-wrap: wrap;

		// 	.assort-item {
		// 		width: 25%;

		// 		.item-title {
		// 			width: 100%;
		// 			background-color: #fff;
		// 			display: flex;
		// 			flex-direction: column;
		// 			text-align: center;
		// 			font-size: 13px;
		// 			padding: 10px 6px;
		// 			box-sizing: border-box;

		// 			.icon {
		// 				font-size: 25px;
		// 				margin: 5px 0;
		// 			}
		// .bottom-title {
		// 	white-space: nowrap;
		// 	overflow: hidden;
		// 	text-overflow: ellipsis;
		// }



		// 		}
		// 	}
		// }
	}

	.charts-box {
		width: 100%;
		padding: 0 15px 15px 15px;
		box-sizing: border-box;
		background-color: #eee
	}

	.charts-column {
		background-color: #fff;
		border-radius: 5px;
		padding: 15px 5px 5px 5px;
	}
</style>