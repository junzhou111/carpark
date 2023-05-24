<template>
	<!-- 场内车辆管理 -->
	<view class="sitemanagement">
		<!-- 弹出层筛选框 -->
		<u-popup :show="show" @close="show = false" @open="open" mode="top">
			<view class="fromview">
				<!-- 日历表单筛选开始时间-->
				<u-datetime-picker :show="startshow" v-model="StartTime" mode="date" @confirm="startconfirm"
					@close="startshow = false"></u-datetime-picker>
				<!-- <u-calendar :show="calendarshow" mode="range" @confirm="confirm"
					@close="calendarshow = false"></u-calendar> -->
				<view class="calendarinput" @click="startshow = true">
					<text v-text="startvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>

				<!-- 日历表单 筛选结束时间-->
				<u-datetime-picker :show="endshow" v-model="Stoptime" mode="date"
					@confirm="endconfirm"></u-datetime-picker>
				<!-- 	<u-calendar :show="calendarshow" mode="range" @confirm="confirm"
						@close="calendarshow = false"></u-calendar> -->
				<view class="calendarinput" @click="endshow = true">
					<text v-text="endvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 车辆类型 -->
				<u-picker :show="car.show" :columns="car.list" @cancel="car.show=false" @close="car.show = false"
					@confirm="selectClick"></u-picker>
				<!-- <u-action-sheet :actions="car.list" @select="selectClick" :title="car.title" cancelText="取消"
					@close="car.show=false" :show="car.show">
				</u-action-sheet> -->
				<view class="calendarinput" @click="car.show = true">
					<text v-text="car.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 位置 -->
				<u-picker :show="position.show" :columns="position.list" @cancel="position.show=false"
					@close="position.show = false" @confirm="selectposition"></u-picker>
				<view class="calendarinput" @click="position.show = true">
					<text v-text="position.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="confirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search" v-model="searchinput"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="screen">筛选</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="resettbtn">重置</button>
			</view>
		</view>

		<!-- 车辆信息 -->

		<view class="cardetails">
			<view class="cardetails-item" v-for="(item , index) in carinformation" :key="index">
				<image class="cardetailsimg" v-if="item.pic_min!=0"
					:src="'https://anweier-acc.oss-cn-chengdu.aliyuncs.com/'+usercodes+'/'+'car/scan/min/'+item.pic_min"
					mode="width" @click="info(item)"></image>
				<image class="cardetailsimg" v-if="item.pic_min==0" src="@/static/mr.png" mode="width"
					@click="info(item)"></image>
				<view class="cardetails-message">
					<view class="cardetails-title">
						{{item.carscan}}
					</view>
					<view>
						<text class="cardetails-type">
							{{item.cartype==0?"未知车牌":item.cartype==1?"蓝牌小汽车":item.cartype==2?'黑牌小汽车':item.cartype==3?'单排黄牌'
							:item.cartype==4?'双排黄牌':item.cartype==5?'警车车牌':item.cartype==6?'武警车牌':item.cartype==7?'个性化车牌'
							:item.cartype==8?'单排军车牌':item.cartype==9?'双排军车牌':item.cartype==10?'使馆车牌':item.cartype==11?'香港车牌'
							:item.cartype==12?'农用车牌':item.cartype==13?'澳门牌':item.cartype==14?'厂内牌':item.cartype==15?'民航牌'
							:item.cartype==16?'领事馆车牌':item.cartype==17?'新能源车牌':'应急车牌'}}
						</text>
					</view>
					<view class="cardetails-time">
						<text class="time">{{item.time}}</text>

					</view>

					<view class="cardetails-icon">
						<button class="cardetails-delete" @click="delitem(item)">删除</button>
						<button class="cardetails-remove" @click="Removebtn(item)">移出</button>
					</view>
					<view class="cardetails-btn">
						<input class="cardetails-inp" type="text" v-model="item.newcarscan" placeholder="纠正后车牌">
						<view class="cardetails-click" @click="correct(item)">
							纠正
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 删除模态框 -->
		<u-modal :show="delModal.show" :title="delModal.title" :content='delModal.content' width='200px'
			showCancelButton='true' @cancel="delModal.show=false" @confirm="confirmdel"></u-modal>
		<!-- 移出模态框 -->
		<u-modal :show="RemoveModal.show" :title="RemoveModal.title" :content='RemoveModal.content' width='200px'
			showCancelButton='true' @cancel="RemoveModal.show=false" @confirm="confirmRemove"></u-modal>

	</view>
</template>

<script>
	import {
		Vehiclemanagement,
		carlist,
		Carfactoryoverview
	} from "@/api/index.js";
	export default {
		data() {
			return {
				// 用户code码
				usercodes: '',
				// 删除模态框
				delModal: {
					show: false,
					title: '提示',
					content: '您确定要删除么？',
					item: {}
				},
				// 移出模态框
				RemoveModal: {
					show: false,
					title: '提示',
					content: '您确定要移出么？',
					item: {}
				},
				// 弹出层状态
				show: false,
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
				//  车辆类型
				car: {
					title: '车辆类型',
					list: [
						["未知车牌", "蓝牌小汽车", "黑牌小汽车", "单排黄牌", "双排黄牌", "警车车牌", "武警车牌", "个性化车牌", "单排军车牌", "双排军车牌", "使馆车牌",
							"香港车牌", "农用车牌", "澳门牌", "厂内牌", "民航牌", "领事馆车牌", "新能源车牌", "应急车牌"
						]
					],
					show: false,
					value: '车辆类型',
					index: 'all'
				},
				// 位置数据
				position: {
					title: '位置',
					list: [
						[]
					],
					show: false,
					value: "位置",
					location_type: 'all',
					location_id: 'all'
				},
				// 车场位置数据0
				Parking: [],
				// 区域位置数据1
				region: [],
				// 车辆信息
				carinformation: [],
				// 用户信息、
				userinfo: '',
				// 搜索框
				searchinput: '',
			};
		},
		onLoad() {
			this.getcarlist()
			this.getCarfactoryoverview()
			this.usercodes = uni.getStorageSync('usercode');
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
			// 查询全部数据
			async getcarlist() {
				if (this.searchinput == '') {
					var wordvalue = 'all'
				}
				if (this.searchinput != '') {
					var wordvalue = this.searchinput
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

					"requestType": "GetCarIo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"io": "0", //出入
						"person_id": "all", //人员数
						"cartype": this.car.index, //车型
						"carcolor": "all", //车身颜射
						"release": 1, //是否放行
						"isout": 0, //是否出场
						"location_type": this.position.location_type, //0：车场出入口 1：车场出入口 10：小区门 11：楼栋门 12：单元门
						"location_id": this.position.location_id, //停车场id
						"word": wordvalue, //搜索
						"stk": "all",
						"stt": "all",
						"ind": 0,
						"pgt": "30", //每页条数
						"date1": startsvalue, //日期
						"date2": endsvalue, //日期
					},
				}
				const res = await carlist(form)
				console.log(form, 'form');
				console.log("获取全部车辆信息", res.data.data);
				if (res.data.data == undefined) {
					this.carinformation = ''
				}
				if (res.data.data != undefined) {
					this.carinformation = res.data.data
					for (var i = 0; i <= this.carinformation.length - 1; i++) {
						this.carinformation[i].newcarscan = this.carinformation[i].carscan
					}
				}

			},
			// 点击筛选按钮
			screen() {
				this.show = true
				this.getVehiclemanagement()
				this.getposition()
			},
			// 弹出层
			open() {
				// console.log('open');
			},
			// 获取车场出入口位置信息
			async getVehiclemanagement() {
				const form = {
					"requestType": "GetParkChannelAll",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await Vehiclemanagement(form)
				console.log("获取车场出入口位置信息", res.data.data);
				this.Parking = res.data.data
				let arr = res.data.data
				for (var i = 0; i <= arr.length - 1; i++) {
					// console.log(arr[i].name, 'arr');
					this.position.list[0].push(arr[i].name)
				}
				console.log("position.list", this.position.list);
				console.log("Parking", this.Parking);
			},

			// 获取区域出入口位置信息
			async getposition() {
				const form = {
					"requestType": "GetParkAreaChannelAll",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await Vehiclemanagement(form)
				console.log("获取区域出入口位置信息", res.data.data);
				this.region = res.data.data
				let arrs = res.data.data
				for (var i = 0; i <= arrs.length - 1; i++) {
					// console.log(arrs[i].name, 'arrs');
					this.position.list[0].push(arrs[i].name)
				}
				console.log("position.list", this.position.list);
				console.log("region", this.region);
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
			// 选择车辆类型返回的信息
			selectClick(index) {
				this.car.value = index.value[0];
				this.car.index = index.indexs[0]
				console.log(index, "index");
				console.log(this.car.index);
				this.car.show = false
			},
			// 点击确定返回位置信息
			selectposition(index) {
				console.log("返回位置信息", index.value[0]);
				this.position.value = index.value[0]
				console.log(this.Parking.length);
				for (var i = 0; i < this.Parking.length; i++) {
					// console.log("this.Parking[i] ", this.Parking[i]);
					// console.log("this.Parking[i].name", this.Parking[i].name);
					if (this.Parking[i].name == index.value[0]) {
						this.position.location_type = '0'
					}
				}
				for (var j = 0; j < this.region.length; j++) {
					if (this.region[j].name == index.value[0]) {
						this.position.location_type = '1'
					}
				}
				console.log("location_type", this.position.location_type);
				this.Parking.forEach((item) => {
					if (item.name == index.value[0]) {
						this.position.location_id = item.id
					}
				})
				this.region.forEach((item) => {
					if (item.name == index.value[0]) {
						this.position.location_id = item.id
					}
				})
				console.log('id', this.position.location_id);
				this.position.show = false
			},
			// 点击确认按查询
			confirmbtn() {
				this.getcarlist()
				this.show = false
			},
			// 点击搜索按钮
			searchbtn() {
				this.getcarlist(this.searchinput)
			},
			// 点击重置
			resettbtn() {
				this.StartTime = "all"
				this.startvalue = '年/月/日'
				this.Stoptime = 'all'
				this.endvalue = '年/月/日'
				this.position.location_type = "all"
				this.position.location_id = "all"
				this.position.value = '位置'
				this.car.index = "all"
				this.car.value = '车辆类型'
				this.searchinput = ''
				this.getcarlist()
			},
			// 点击删除
			delitem(item) {
				this.delModal.show = true
				console.log(item, 'delitem');
				this.delModal.item = item
				console.log(this.delModal);
			},
			// 点击模态框确认删除
			async confirmdel() {

				this.delModal.show = false
				const form = {
					"requestType": "DelCarIo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						id: this.delModal.item.id,
						lid: this.delModal.item.lid,
					},
				}
				const res = await carlist(form)
				console.log("删除车辆信息", res);
				uni.showLoading({
					title: '正在删除...'
				});
				var that = this
				setTimeout(() => {
					that.getcarlist()
					uni.hideLoading();
				}, 2000);
			},


			// 移出
			Removebtn(item) {
				this.RemoveModal.show = true
				this.RemoveModal.item = item
			},
			// 模态框确认移出按钮
			async confirmRemove() {
				this.RemoveModal.show = false
				const form = {
					"requestType": "IsOut",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						id: this.RemoveModal.item.id,
						lid: this.RemoveModal.item.lid,
					},
				}
				const res = await carlist(form)
				console.log("移出车辆信息", res);
				uni.showLoading({
					title: '正在移出...'
				});
				var that = this
				setTimeout(() => {
					that.getcarlist()
					uni.hideLoading();
				}, 2000);
			},

			// 纠正车牌
			async correct(item) {
				console.log(item, '纠正车牌');
				const form = {
					"requestType": "UpCarScan",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'carscan': item.newcarscan, //车牌
						'id': item.id, //车场id
						'lid': item.lid, //项目本地id
					},
				}
				const res = await carlist(form)
				console.log("纠正车牌", res.data.data);
				uni.showLoading({
					title: '纠正中...'
				});
				var that = this
				setTimeout(() => {
					that.getcarlist()
					uni.hideLoading();
				}, 2000);
			},
			// 点击详情
			async info(item) {
				console.log(item.id);
				this.infos(item.id)


			},
			// 获取详情信息
			async infos(id) {
				const form = {
					"requestType": "GetCarIoInfo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'id': id,
					},
				}
				const res = await carlist(form)
				console.log("点击获取详情", res.data.data);
				var iteminfo = res.data.data[0]
				var item = encodeURIComponent(JSON.stringify(iteminfo));
				uni.navigateTo({
					url: "../allinfo/allinfo?item=" + item
				})
			},





			// 获取用户信息
			async getCarfactoryoverview() {
				const form = {
					"requestType": "GetProInfo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					},
				}
				const res = await Carfactoryoverview(form)
				console.log("获取用户信息", res.data.data[0].code);

				this.userinfo = res.data.data[0].code
			},
		}
	}
</script>

<style lang="scss">
	.sitemanagement {
		width: 100%;
		background-color: #eee;
		padding: 0 0 20px 0;
		box-sizing: border-box;


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

		.cardetails {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 15px 15px 15px;
			box-sizing: border-box;

			.cardetails-item {
				width: 48%;
				border: 1px solid #eee;
				border-radius: 5px;
				background-color: #fff;
				overflow: hidden;
				margin-bottom: 10px;

				.cardetailsimg {
					width: 100%;
					height: 80px;
				}

				.cardetails-message {
					width: 100%;
					padding: 5px 10px 10px 10px;
					box-sizing: border-box;

					.cardetails-title {
						font-size: 18px;


					}

					.cardetails-type {
						font-size: 12px;
						color: red;
					}

					.cardetails-time {
						font-size: 12px;
						padding: 5px 0;

						.time {}
					}

					.cardetails-icon {
						display: flex;
						justify-content: space-between;

						.cardetails-delete {
							height: 30px;
							line-height: 30px;
							background-color: red;
							color: #fff;
						}

						.cardetails-remove {
							height: 30px;
							line-height: 30px;
							background-color: green;
							color: #fff;
						}
					}

					.cardetails-btn {
						width: 100%;
						height: 30px;
						border: 1px solid #c7c7c7;
						margin-top: 5px;
						display: flex;
						justify-content: space-between;
						border-radius: 5px;
						overflow: hidden;

						.cardetails-inp {
							height: 30px;
							line-height: 30px;
							padding: 0 0 0 10px;
						}

						.cardetails-click {
							width: 70px;
							text-align: center;
							background-color: #198754;
							color: white;
							height: 30px;
							line-height: 30px;
						}
					}
				}
			}
		}


	}
</style>