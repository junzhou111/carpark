<template>
	<!-- 月费车位管理 -->
	<view class="MonthlyfeeparkspaceManagement">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="close" @open="open" mode="top">
			<view class="fromview">
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
				<button class="confirmbtn" @click="screenbtn">确认</button>
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
				<button class="bt" @click="addlistbtn">新增</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="resetbtn">重置</button>
			</view>
		</view>

		<!-- 添加弹出层 -->
		<u-popup :show="editshow" @close="editclose" @open="editopen" mode="top">
			<view class="fromviews">
				<scroll-view scroll-y="true">
					<view class="RemoteOpening">
						<view class="RemoteOpening-headerleft">
							<view class="parks">
								停车场
							</view>
							<view class="parkslist" :class="{'actives':index==active}" v-for="(item,index) in Park"
								:key="index" @click="changeparks(index)">
								<text>{{item.name}}</text> <u-icon name="plus"
									@click.stop="addchangeparks(0,item.id)"></u-icon>
							</view>
							<view class="parkinglot">
								车场车位
							</view>
							<view class="parkinglotlist" v-for="(item,index) in parklot" :key="index">
								<text>{{item.name}}</text><u-icon name="plus"
									@click.stop="addchangeparks(item.id,item.park_area_id)"></u-icon>
							</view>
						</view>
						<view class="RemoteOpening-headerright">
							<view class="regions">
								区域
							</view>
							<view class="regionslist" :class="{'actives':index==regionactive}"
								v-for="(item,index) in region" :key="index" @click="changeregion(index)">
								<text> {{item.name}} </text><u-icon name="plus"
									@click.stop="addchangepark(0,item.id)"></u-icon>
							</view>
							<view class="regionsparklot">
								区域车位
							</view>
							<view class="regionsparklotlist" v-for="(item,index) in regiondata" :key="index">
								<text>{{item.name}}</text><u-icon name="plus"
									@click.stop="addchangepark(item.id,item.park_id)"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>



				<!-- 确认按钮 -->
				<button class="confirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 续费弹出层 -->
		<u-popup :show="renewshow" @close="renewshow=false" @open="renewshow=true" mode="top">
			<view class="fromview">
				<!-- 续几个月费 -->
				<input type="text" class="calendarinput" v-model="renewinp">
				<!-- 续费开始时间 -->
				<u-datetime-picker :show="renewstarttimeshow" v-model="renewStartTime" mode="date"
					@confirm="renewstarttimeconfirm" @close="renewstarttimeshow = false"></u-datetime-picker>
				<view class="calendarinput" @click="renewstarttimeshow = true">
					<text v-text="renewstarttime"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 续费结束时间 -->
				<u-calendar mode="single"></u-calendar>
				<view class="calendarinput">
					<text v-text="renewendtime"> </text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="confirmrenew">确认</button>
			</view>
		</u-popup>
		<!-- 修改车牌弹出层 -->
		<u-popup :show="plateshow" @close="plateshow=false" @open="plateshow=true" mode="top">
			<view class="fromview">
				<!-- 车牌 -->
				<input type="text" class="calendarinput" v-model="licenseplate">
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="confirmreworkplate">确认</button>
			</view>
		</u-popup>
		<!-- 充值记录 -->
		<u-popup :show="infoshow" mode="center" @close="infoclose" @open="infoopen">
			<scroll-view scroll-y="true">
				<view class="infoitemlist">
					<view class="infoitem" v-for="(item,index) in lifolist" :key="index" @click="changeclickinfo(item)">
						<view class="topinfo">
							<view class="infotime">
								{{item.start}}
							</view>
							<view class="infomoney">
								{{item.money}}
							</view>
						</view>
						<view class="bottominfo">
							<view class="infoway">
								{{item.pay_suorce==0?'掌上社区':item.pay_suorce==1?'实事扫码付款':item.pay_suorce==2?'聚合收款码':item.pay_suorce==3?'其他自收':'-'}}
							</view>
							<view class="infostate">
								{{item.pay_state==0?'待支付':item.pay_state==1?'已支付 ':item.pay_state==2?'支付取消':item.pay_state==3?'未知状态':'-'}}
							</view>
						</view>

					</view>
				</view>
			</scroll-view>
		</u-popup>
		<!-- 全部数据 -->
		<view class="MonthlyfeeparkList">
			<view class="Monthlyfeeparklist-item" v-for="(item,index) in Monthlylist" :key="index">
				<view @click="changeinfo(item)">
					<view class="itemheader">
						<view class="platenumber">
							{{item.carscan}}
						</view>
						<view class="create">
							{{item.time}}
						</view>
					</view>
					<view class="item-information">
						<view class="contacts">
							{{item.name}}
						</view>
						<view class="phone">
							{{item.phone}}
						</view>
						<view class="ID">
							{{item.idcard}}
						</view>
					</view>
					<view class="time">
						<view class="start-time">
							{{item.start}}-----{{item.end}}
							<!-- <text class="end-time"> 结束时间 </text> -->
						</view>

					</view>
					<view class="item-state">
						<view class="park">
							{{item.space}}
						</view>
						<view class="state">
							{{item.state=='0'?'禁用':'启用'}}
						</view>
					</view>
				</view>
				<view class="btns">
					<text @click="edittypebtn(item)">编辑</text>
					<text @click="del(item)">删除</text>
					<text @click="Recharge(item.id)">充值记录</text>
					<text @click="renew(item.id)">续费</text>
					<text @click="reworkplate(item.id)">车牌修改</text>
					<text @click="parkingtype(item.state,item.id)">{{item.state=='1'?'禁用':'启用'}}</text>
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
		getMonthlycar,
		getaddMonthlycar,
	} from "@/api/index.js"
	import {
		stat
	} from "fs";
	import search from "../../uni_modules/uview-ui/libs/config/props/search";
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
				//  弹出筛选层
				show: false,
				// 新增弹出层
				editshow: false,
				// 修改车牌弹出层
				plateshow: false,
				// 修改车牌的值
				licenseplate: '车牌',
				// 修改车牌的id
				licenseplateid: '',
				// 续费弹出框状态
				renewshow: false,
				// 续费inp
				renewinp: '续几个月',
				// 续费开始时间
				renewStartTime: '',
				renewstarttime: '开始时间',
				renewstarttimeshow: false,
				// 续费结束时间
				renewendtime: '结束时间',
				// 续费的id
				renewid: '',
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



				// 全部数据
				Monthlylist: [],
				// 添加月费列表所有车场
				Park: [],
				// 添加所有车场内车位
				parklot: [],
				// 添加区域列表
				region: [],
				// 添加区域车位
				regiondata: [],
				// 高亮、
				active: 0,
				// 区域高亮
				regionactive: 0,
				// 充值记录状态
				infoshow: false,

				// 搜索内容
				searchvalue: '',
				// 充值记录全部数据
				lifolist: []


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
			//弹出筛选层
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
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
			async screenbtn() {
				this.getlist()
				this.show = false
			},
			// 续费开始时间
			renewstarttimeconfirm(e) {
				console.log("续费开始时间的返回值", e);
				this.renewstarttimeshow = false
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				etime = etime.slice(0, 10)
				console.log(etime, 'etime');
				this.renewstarttime = etime
				this.renewStartTime = etime
				// 续几个月
				this.renewinp
				let month = etime.slice(5, 7)
				let year = etime.slice(0, 4)
				let newmonth = parseInt(month) + parseInt(this.renewinp)
				let newyear = parseInt(year) + parseInt(newmonth / 12)
				if (newmonth > 12) {
					newmonth = newmonth % 12
				}
				if (newmonth <= 9) {
					newmonth = "0" + newmonth
				}
				let sun = etime.slice(8, 10)
				this.renewendtime = newyear + "-" + newmonth + "-" + sun
			},

			//弹出添加层
			editopen() {
				// console.log('open');
			},
			editclose() {
				this.editshow = false
				// console.log('close');
			},
			// 点击新增按钮
			addlistbtn() {
				this.editshow = true
				let Parkindex = 0
				this.getaddlist(Parkindex)
			},
			// 高亮
			changeparks(index) {
				this.getaddlist(index)
				this.active = index
				this.regionactive = 0
			},
			// 点击添加车场车位
			addchangeparks(space_id, parent_id) {
				// 区分是1车厂还是0区域
				var cartype = 1
				uni.navigateTo({
					url: "./AddMonthlyfeeparkspace?space_id=" + space_id + "&parent_id=" + parent_id + "&type=" +
						cartype
				})

			},

			// 点击添加区域车位
			addchangepark(space_id, parent_id) {
				// 区分是1车厂还是0区域
				var cartype = 0
				uni.navigateTo({
					url: "./AddMonthlyfeeparkspace?space_id=" + space_id + "&parent_id=" + parent_id + "&type=" +
						cartype
				})
			},
			// 点击区域切换高亮
			changeregion(index) {
				this.regionactive = index
			},

			// 搜索按钮
			searchbtn() {
				this.getlist()

			},

			//重置按钮
			resetbtn() {
				this.startvalue = '年/月/日'
				this.endvalue = '年/月/日'
				this.searchvalue = ''
				this.getlist()
			},


			// 点击编辑按钮
			edittypebtn(item) {
				var item = JSON.stringify(item);
				console.log(item);
				uni.navigateTo({
					url: "./AddMonthlyfeeparkspace?edittype=" + true + "&item=" + item
				})
			},

			// 点击删除按钮
			async del(item) {
				this.delModal.show = true
				this.delModal.item = item
			},
			// 点击模态框确认删除
			async confirmdel() {
				uni.showLoading({
					title: '正在删除...'
				});
				this.delModal.show = false
				const form = {
					"requestType": "DelCarMfee",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": this.delModal.item.id,
						"ty": 1
					},
				}
				const res = await getMonthlycar(form)
				console.log("form", form);
				console.log("点击删除", res);
				uni.hideLoading();
				this.getlist()
			},



			// 充值记录弹窗
			infoopen() {
				// console.log('open');
			},
			// 充值记录弹窗
			infoclose() {
				this.infoshow = false
				// console.log('close');
			},
			// 点击充值记录按钮
			async Recharge(id) {
				this.infoshow = true
				const form = {
					"requestType": "GetCarMfeeRenewal",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"car_mfee_id": id,

					},
				}
				const res = await getMonthlycar(form)
				console.log("form", form);
				console.log("点击充值记录按钮", res);
				this.lifolist = res.data.data
			},
			// 点击充值记录item
			changeclickinfo(item) {
				var items = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: './Rechargeinfo?items=' + items
				})
			},
			// 续费功能
			async renew(id) {
				this.renewshow = true
				this.renewid = id
			},
			// 确认续费按钮
			async confirmrenew() {
				if (this.renewstarttime == '开始时间') {
					var timestamp = Date.parse(new Date());
					console.log(timestamp); // 1622427159000
					var newtime = this.timedata(timestamp)

					newtime = newtime.slice(0, 10)
					console.log(newtime, 'newtime');
					// v-text
					this.renewstarttime = newtime
					// 双
					this.renewStartTime = newtime
					// 续几个月
					this.renewinp
					let month = newtime.slice(5, 7)
					let year = newtime.slice(0, 4)
					let newmonth = parseInt(month) + parseInt(this.renewinp)
					let newyear = parseInt(year) + parseInt(newmonth / 12)
					if (newmonth > 12) {
						newmonth = newmonth % 12
					}
					if (newmonth <= 9) {
						newmonth = "0" + newmonth
					}
					let sun = newtime.slice(8, 10)
					this.renewendtime = newyear + "-" + newmonth + "-" + sun
				}
				const form = {
					"requestType": "AddCarMfeeRenewal",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"car_mfee_id": this.renewid,
						"start": this.renewstarttime,
						"restart": "2023-05-24 00:00:00",
						"end": this.renewendtime,
						"money": 200
					},
				}
				const res = await getMonthlycar(form)
				console.log("确认续费", res.data.data);
				this.renewshow = false 
				this.renewinp = '续几个月'
				this.renewstarttime = '开始时间'
				this.renewendtime = '结束时间'




				this.getlist()
			},
			// 车牌修改
			reworkplate(id) {
				this.plateshow = true
				this.licenseplateid = id
				this.getplate(id)

			},
			// 修改车牌的内条数据
			async getplate(id) {
				const form = {
					"requestType": "GetCarMfeeInfo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": id
					},
				}
				const res = await getMonthlycar(form)
				console.log("修改车牌内条数据", res.data.data[0].carscan);
				this.licenseplate = res.data.data[0].carscan
			},
			// 确认修改车牌
			async confirmreworkplate() {
				const form = {
					"requestType": "UpCarMfeeCarScan",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"carscan": this.licenseplate,
						"id": this.licenseplateid
					},
				}
				const res = await getMonthlycar(form)
				console.log("修改车牌", res.data.data);
				this.plateshow = false
				this.getlist()
			},
			// 禁用
			async parkingtype(state, id) {
				let a
				if (state == 0) {
					a = 1
				}
				if (state == 1) {
					a = 0
				}
				const form = {
					"requestType": "UpCarMfeeState",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"state": a,
						"id": id
					},
				}
				const res = await getMonthlycar(form)
				console.log("form", form);
				console.log("点击禁用启用按钮", res);
				this.getlist()
			},

			// 点击跳转详情
			changeinfo(item) {
				this.getinfo(item.id)
			},
			// 新增月费车位区域数据
			async getinfo(id) {
				const form = {
					"requestType": "GetCarMfeeInfo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": id,
					},
				}
				const res = await getMonthlycar(form)
				console.log("月费车位详情页", res.data.data[0]);
				var item = res.data.data[0]
				item = encodeURIComponent(JSON.stringify(item));
				uni.navigateTo({
					url: "./Monthlyfeeparkspace?item=" + item
				})
			},

			// 获取全部数据
			async getlist() {

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


				if (this.searchvalue == '') {
					var searchdata = 'all'
				}
				if (this.searchvalue != '') {
					searchdata = this.searchvalue
				}
				const form = {
					"requestType": "GetCarMfee",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'word': searchdata,
						'stk': "all",
						'stt': "all",
						'ind': 0,
						'date1': startsvalue,
						'date2': endsvalue,
						'pgt': "30"
					},
				}
				const res = await getMonthlycar(form)
				console.log('form', form);
				console.log("月费车位管理", res.data.data);
				if (res.data.data == undefined) {
					this.Monthlylist = ''
				} else if (res.data.data != undefined) {
					this.Monthlylist = res.data.data
				}
			},
			// 新增月费车位所有车场列表
			async getaddlist(Parkindex) {
				const form = {
					"requestType": "GetPark",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位所有车场", res.data.data);
				if (res.data.data == undefined) {
					this.Park = ''
				} else if (res.data.data != undefined) {
					this.Park = res.data.data
					var parkid = res.data.data[Parkindex].id
					console.log("parkid", parkid);
					// 车厂内所有车位
					this.getaddparklist(parkid)
					// 区域列表
					this.getaddregionlist(parkid)
				}


			},
			// 新增月费车位所有车场内车位
			async getaddparklist(parkid) {
				const form = {
					"requestType": "GetParkAreaSpace",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"ismainpark": 1,
						"park_area_id": parkid
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位所有车场内车位", res.data.data);
				if (res.data.data == undefined) {
					this.parklot = ''
				} else if (res.data.data != undefined) {
					this.parklot = res.data.data
				}
			},
			// 新增月费车位区域列表
			async getaddregionlist(parkid) {
				const form = {
					"requestType": "GetParkArea",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"park_id": parkid
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位区域列表", res.data.data);
				if (res.data.data == undefined) {
					this.region = ''
				} else if (res.data.data != undefined) {
					this.region = res.data.data
					var regionid = res.data.data[0].id
					// 区域内所有车位
					this.getaddregiondata(regionid)
				}

			},
			// 新增月费车位区域数据
			async getaddregiondata(regionid) {
				const form = {
					"requestType": "GetParkAreaSpace",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"ismainpark": 0,
						"park_area_id": regionid
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位区域数据", res.data.data);
				if (res.data.data == undefined) {
					this.regiondata = ''
				} else if (res.data.data != undefined) {
					this.regiondata = res.data.data
				}
			},
		},
		onLoad() {
			this.getlist()
		},
	}
</script>

<style lang="scss">
	.MonthlyfeeparkspaceManagement {
		background-color: #eee;

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

		.MonthlyfeeparkList {
			padding-bottom: 30px;

			.Monthlyfeeparklist-item {
				margin: 15px;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 5px;
				background-color: #fff;

				.itemheader {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.platenumber {
						font-size: 25px;
					}

					.create {}
				}

				.item-information {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.contacts {
						font-size: 15px;
					}

					.phone {
						font-size: 15px;
						color: #55aaff;
					}

					.ID {
						font-size: 15px;
					}
				}

				.time {
					height: 25px;
					line-height: 25px;
					font-size: 13px;

					.start-time {}

					.end-time {}
				}

				.item-state {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.park {}

					.state {}
				}

				.btns {
					display: flex;
					justify-content: space-between;

					text {
						display: inline-block;
						background-color: #55aaff;
						color: #fff;
						padding: 2px 3px;
						border-radius: 5px;
						margin: 5px 0 0 0;
					}
				}
			}
		}
	}

	.fromviews {
		width: 100%;
	}

	.RemoteOpening {
		width: 80%;
		height: 60vh;
		display: flex;
		justify-content: space-between;

		.RemoteOpening-headerleft {
			width: 50%;

			.parks {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.parkslist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;
				display: flex;
				justify-content: space-between;

			}

			.parkinglot {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;


			}

			.parkinglotlist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;
				display: flex;
				justify-content: space-between;


			}
		}

		.RemoteOpening-headerright {
			width: 50%;

			.regions {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.regionslist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;
				display: flex;
				justify-content: space-between;

			}

			.regionsparklot {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.regionsparklotlist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;
				display: flex;
				justify-content: space-between;

			}
		}

	}

	.actives {
		background-color: #0055ff !important;
		color: white;
	}

	.infoitemlist {
		width: 300px;
		height: 500px;
		padding: 15px;
		box-sizing: border-box;

		.infoitem {
			// background-color: #eee;
			border-bottom: #eee solid 1px;
			height: 50px;
			padding: 10px 0;

			.topinfo {
				display: flex;
				justify-content: space-between;
				height: 25px;
			}

			.bottominfo {
				display: flex;
				justify-content: space-between;
				height: 25px;
			}
		}
	}
</style>