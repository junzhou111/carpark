<template>
	<!-- 黑白名单 -->
	<view class="BlackWhiteListManagement">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="show=false" @open="show=true" mode="top">
			<view class="fromview">
				<!-- 黑白名单 -->
				<u-action-sheet :actions="BlackWhiteList.list" @select="BlackWhiteListClick"
					:title="BlackWhiteList.title" cancelText="取消" @close="BlackWhiteList.show=false"
					:show="BlackWhiteList.show"></u-action-sheet>
				<view class="calendarinput" @click="BlackWhiteList.show=true">
					<text v-text="BlackWhiteList.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
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
				<button class="bt" @click="addbtn">新增</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="reset">重置</button>
			</view>
		</view>

		<!-- 添加编辑筛选层 -->
		<u-popup :show="editshow" @close="closeedit" @open="editshow=true" mode="top">
			<view class="fromview">
				<!-- 黑白名单 -->
				<u-action-sheet :actions="BlackWhiteLists.list" @select="BlackWhiteListsClick"
					:title="BlackWhiteLists.title" cancelText="取消" @close="BlackWhiteLists.show=false"
					:show="BlackWhiteLists.show"></u-action-sheet>
				<view class="calendarinput" @click="BlackWhiteLists.show=true">
					<text v-text="BlackWhiteLists.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
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
				<!-- 车牌号 @confirm点击完成 -->
				<view class="calendarinput">
					<input type="text" v-model="car.carbrandvalue" placeholder="车牌">
				</view>
				<!-- 备注 -->
				<view class="calendarinput">
					<input type="text" v-model="notes" placeholder="备注">
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="addconfirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 黑白名单 -->
		<view class="BlackWhiteList">
			<view class="BlackWhiteList-item" v-for="(item,index) in whitelist" :key="index">
				<view class="header">
					<text class="names">{{item.carscan}}</text>
					<text class="times">{{item.time}}</text>
				</view>
				<view class="item-top">
					<text class="ids">备注：{{item.remarks}} </text>
					<text class="phone"></text>
				</view>
				<view class="item-center">

					<text class="validity">{{item.start}}-----{{item.end}}</text>
				</view>
				<view class="item-bottom">
					<text class="namelist">{{item.type==0?"黑名单":"白名单"}}</text>
					<text class="notes"></text>
				</view>
				<view class="item-btn">
					<button class="editbtn" @click="editbtn(index)">编辑</button>
					<button class="delbtn" @click="delbtn(item)">删除</button>
				</view>
			</view>
		</view>
		<!-- 删除模态框 -->
		<u-modal :show="delModal.show" :title="delModal.title" :content='delModal.content' width='200px'
			showCancelButton='true' @cancel="delModal.show=false" @confirm="confirmdel"></u-modal>
	</view>
</template>

<script>
	import {
		Obtainlist
	} from "@/api/index.js"
	export default {
		data() {
			return {
				// 删除模态框
				delModal: {
					show: false,
					title: '提示',
					content: '您确定要删除么？',
					item: {}
				},
				// 搜索
				searchvalue: "",
				//  弹出筛选层
				show: false,
				// 黑白名单
				BlackWhiteList: {
					title: '黑白名单',
					list: [{
							name: '黑名单',
							type: "0"
						},
						{
							name: '白名单',
							type: "1"
						}
					],
					show: false,
					value: '黑白名单',
					type: "all"
				},
				// 弹出添加层
				editshow: false,
				BlackWhiteLists: {
					title: '黑白名单',
					list: [{
							name: '黑名单',
							type: "0"
						},
						{
							name: '白名单',
							type: "1"
						}
					],
					show: false,
					value: '黑白名单',
					type: "all"
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


				// 车牌弹出层
				car: {
					carbrandvalue: '',
				},
				// 备注
				notes: '',
				// 黑白名单全部数据
				whitelist: [],
				// 编辑列表暂存
				editlist: {},

				// 判断当前是添加还是编辑
				// 0=添加  1=编辑
				types: 0
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
			// 筛选黑白名单
			BlackWhiteListClick(index) {
				console.log("黑白名单返回的数据", index);
				this.BlackWhiteList.value = index.name
				this.BlackWhiteList.type = index.type
			},
			// 点击确认开始筛选
			confirmbtn() {
				this.getconfirmlist()
				this.show = false
			},
			// 筛选后的全部数据
			async getconfirmlist() {
				const form = {
					"requestType": "GetCarWhitelist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'ind': -1,
						'ty': this.BlackWhiteList.type,
						'pgt': -1,
						'word': "all",
						'stk': "all",
						'stt': "all"
					},
				}
				const res = await Obtainlist(form)
				console.log("筛选黑白名单管理", res.data.data);
				this.whitelist = res.data.data
			},
			closeedit() {
				this.editshow = false
				this.car.carbrandvalue = ''
				this.BlackWhiteLists.type = 'all'
				this.startrangevalue = '生效时间'
				this.endrangevalue = "失效时间"
				this.notes = ""
			},
			// 点击添加按钮
			addbtn() {
				this.editshow = true
				// 将弹窗的状态改为添加
				this.types = 0
			},
			// 添加黑白名单返回的数据
			BlackWhiteListsClick(index) {
				console.log("添加黑白名单返回的数据", index);
				this.BlackWhiteLists.value = index.name
				this.BlackWhiteLists.type = index.type
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
			// 点击确认添加黑白名单
			addconfirmbtn() {
				// 当types为0时为添加
				if (this.types == 0) {
					// 调用添加接口
					this.getaddlist()
					// 将弹窗内容清空
					this.car.carbrandvalue = ''
					this.BlackWhiteLists.type = 'all'
					this.BlackWhiteLists.value = "黑白名单"
					this.startvalue = '年/月/日'
					this.endvalue = "年/月/日"
					this.notes = ""
					this.editshow = false
					// 当types == 1 为编辑
				} else if (this.types == 1) {
					// 调用编辑接口
					this.editfunction()
					// 将弹窗内容清空
					this.car.carbrandvalue = ''
					this.BlackWhiteLists.type = 'all'
					this.BlackWhiteLists.value = "黑白名单"
					this.startvalue = '年/月/日'
					this.endvalue = "年/月/日"
					this.notes = ""
					this.editshow = false
				}
			},
			// 添加接口
			async getaddlist() {
				const form = {
					"requestType": "AddCarWhitelist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"carscan": this.car.carbrandvalue, //车牌
						"ty": this.BlackWhiteLists.type,
						"start": this.startvalue, //有效时间（起）
						"end": this.endvalue, //有效时间（止）
						"remarks": this.notes, //备注
					}
				}
				const res = await Obtainlist(form)
				console.log("添加黑白名单", res.data.data);
				// 调用重新渲染
				this.getlist()
			},
			// 编辑功能回显数据
			editbtn(index) {
				// 当前按钮为添加
				this.types = 1
				this.editlist = this.whitelist[index]
				console.log(this.editlist, "editlist");
				this.editshow = true
				this.car.carbrandvalue = this.editlist.carscan //车牌
				if (this.editlist.type == 0) { //黑白名单类型
					this.BlackWhiteLists.value = "黑名单"
					this.BlackWhiteLists.type = 0
				} else if (this.editlist.type == 1) {
					this.BlackWhiteLists.value = "白名单"
					this.BlackWhiteLists.type = 1
				}
				this.startvalue = this.editlist.start //开始时间
				this.endvalue = this.editlist.end //结束时间
				this.notes = this.editlist.remarks //备注
			},
			// 点击确认按钮调用编辑接口修改数据
			async editfunction() {
				this.editshow = false
				const form = {
					"requestType": "UpCarWhitelist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"carscan": this.car.carbrandvalue,
						"ty": this.BlackWhiteLists.type,
						"start": this.startvalue,
						"end": this.endvalue,
						"remarks": this.notes,
						"id": this.editlist.id
					},
				}
				const res = await Obtainlist(form)
				console.log("编辑接口调用", res);
				console.log("form", form);
				// 调用重新渲染
				this.getlist()
			},
			// 删除按钮
			delbtn(item) {
				this.delModal.show = true
				this.delModal.item = item
			},
			async confirmdel() {
				uni.showLoading({
					title: '正在删除...'
				});
				this.delModal.show = false
				const form = {
					"requestType": "DelCarWhitelist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": this.delModal.item.id,
					},
				}
				const res = await Obtainlist(form)
				console.log("黑白名单管理", res.data.data);
				uni.hideLoading();
				this.getlist()
			},






			// 重置按钮、
			reset() {
				this.BlackWhiteList.value = "黑白名单"
				this.BlackWhiteList.type = "all"
				this.searchvalue = ''
				this.getlist()
			},
			// 搜索按钮
			searchbtn() {
				this.getlist()
			},
			// 打开黑白名单页面加载全部数据
			async getlist() {
				if (this.searchvalue == '') {
					var word = 'all'
				}
				if (this.searchvalue != '') {
					word = this.searchvalue
				}


				const form = {
					"requestType": "GetCarWhitelist",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'ind': -1,
						'ty': "all",
						'pgt': -1,
						'word': word,
						'stk': "all",
						'stt': "all"
					},
				}
				const res = await Obtainlist(form)
				console.log("黑白名单管理", res.data.data);
				console.log(form, 'form');
				if (res.data.data == undefined) {
					this.whitelist = ''
				} else if (res.data.data != undefined) {
					this.whitelist = res.data.data
				}
			},
		},
		onLoad() {
			this.getlist()
		},
	}
</script>

<style lang="scss">
	.BlackWhiteListManagement {
		width: 100%;
		background-color: #eee;
		height: 100%;
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

		.BlackWhiteList {
			.BlackWhiteList-item {
				margin: 15px;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 5px;

				background-color: #fff;

				.header {
					display: flex;
					justify-content: space-between;

					.names {
						font-weight: 900;
						font-size: 20px;
					}

					.times {
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}
				}

				.item-top {
					display: flex;
					justify-content: space-between;

					.ids {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}

					.phone {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}
				}

				.item-center {
					.validity {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}

				}

				.item-bottom {
					display: flex;
					justify-content: space-between;

					.namelist {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						width: 50px;
					}

					.notes {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.item-btn {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.editbtn {
						margin: 0;
						width: 48%;
					}

					.delbtn {
						margin: 0;
						width: 48%;
					}
				}
			}
		}
	}
</style>