<template>
	<!-- 集中值守 -->

	<!-- 复选框 -->
	<!-- 列表 -->
	<!-- 折叠面板-->
	<view class="duty">
		<view class="select">
			<!-- 弹出层 -->
			<u-popup :show="show" @close="close" @open="open" mode="top">
				<scroll-view scroll-y="true">
					<view class="scrollbox">
						<view class="carparklot-item" v-for="(item,ind) in carparkloglist" :key="ind">
							<checkbox-group @change="parklotchange(ind)">
								<label>
									<checkbox :checked="item.type" /><text>{{item.name}}
									</text>
								</label>
							</checkbox-group>
						</view>
						<view>
							<view class="carparklot-item" v-for="(item,inde) in carregionlist" :key="inde">
								<checkbox-group @change="carregionchange(inde)">
									<label>
										<checkbox :checked="item.type" /><text>{{item.name}} </text>
									</label>
								</checkbox-group>
							</view>

						</view>
						<view class="carparklot-item">
							<button class="confirm" @click="confirmbtn">确认</button>
						</view>
					</view>
				</scroll-view>
			</u-popup>
			<u-button class="btn" type="primary" :plain="true" text="选择车场门禁" @click="show = true"></u-button>
		</view>
		<view class="duty-item" v-for="(itemlist,index) in itemlist" :key="index">
			<view class="duty-box-img">
				<!-- <image class="img" src=" " mode="widthFix"></image> -->
				<image class="img" v-if="itemlist.pic_max==0||!itemlist.pic_max" src="@/static/mr.png">
				</image>
				<image class="img" v-else
					:src="'https://anweier-acc.oss-cn-chengdu.aliyuncs.com/'+usercodes+'/'+'car/scan/max/'+itemlist.pic_max">
				</image>
			</view>
			<view class="duty-box-title">
				<view>
					<view class="title-plate">
						{{itemlist.carscan==null?'0':itemlist.carscan}}
					</view>
					<view class="title-price">
						（{{itemlist.money==null?'0':itemlist.money}}元）
					</view>
					<view class="title-colorplate">
						{{itemlist.cartype==0?"未知车牌":itemlist.cartype==1?"蓝牌小汽车":itemlist.cartype==2?'黑牌小汽车':itemlist.cartype==3?'单排黄牌'
					:itemlist.cartype==4?'双排黄牌':itemlist.cartype==5?'警车车牌':itemlist.cartype==6?'武警车牌':itemlist.cartype==7?'个性化车牌'
					:itemlist.cartype==8?'单排军车牌':itemlist.cartype==9?'双排军车牌':itemlist.cartype==10?'使馆车牌':itemlist.cartype==11?'香港车牌'
					:itemlist.cartype==12?'农用车牌':itemlist.cartype==13?'澳门牌':itemlist.cartype==14?'厂内牌':itemlist.cartype==15?'民航牌'
					:itemlist.cartype==16?'领事馆车牌':itemlist.cartype==17?'新能源车牌':itemlist.cartype==18?'应急车牌':itemlist.cartype==null?'00':'暂无'}}
					</view>


				</view>
				<view class="title-time">
					<view class="title">
						{{itemlist.carpark}}
					</view>
					<view class="time">
						{{itemlist.time==null?'0':itemlist.time}}
					</view>

				</view>
				<view class="btns">
					<view class="btn-item" @click="Manualentry(itemlist.id,itemlist)">
						手动录入
					</view>
					<view class="btn-item" @click="numberplate(itemlist.id,itemlist)">
						车牌纠正
					</view>
					<view class="btn-item" @click="Remoteopening(itemlist.id,itemlist)">
						遥控开闸
					</view>
					<view class="btn-item" @click="Manualcapture(itemlist.id,itemlist)">
						手动抓拍
					</view>
					<view class="btn-item" @click="Environmentalcamera(itemlist.id,itemlist)">
						环境相机
					</view>
				</view>
			</view>

		</view>
		<!-- 手动录入 -->
		<u-popup :show="Manualentryshow" @close="Manualentryshow = false" @open="open" mode="top">
			<view class="fromview">
				<!-- carplated -->
				<input v-if="operatetype=='2'" class="calendarinput" type="text" v-model="carplated" placeholder="原车牌"
					disabled>
				<!-- 车牌 -->
				<input v-if="operatetype!='3'" class="calendarinput" type="text" v-model="carplate" placeholder="请输入车牌">
				<!-- 车辆类型 -->
				<u-picker :show="car.show" :columns="car.list" @cancel="car.show=false" @close="car.show = false"
					@confirm="selectClick"></u-picker>
				<view class="calendarinput" @click="car.show = true" v-if="operatetype=='1'">
					<text v-text="car.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 车辆颜色 -->
				<u-action-sheet :actions="color.list" @select="colorClick" :title="color.title" cancelText="取消"
					@close="color.show=false" :show="color.show"></u-action-sheet>
				<view class="calendarinput" @click="color.show=true" v-if="operatetype=='1'">
					<text v-text="color.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 开闸原因 -->
				<input v-if="operatetype=='3'" class="calendarinput" type="text" v-model="Openinggate"
					placeholder="开闸原因">

				<!--  手动录入确认按钮 -->
				<button class="confirmbtn" @click="submit" v-if="operatetype=='1'">提交</button>
				<!--  车牌纠正确认按钮 -->
				<button class="confirmbtn" @click="numberplatesubmit" v-if="operatetype=='2'">提交</button>
				<!--  遥控开闸确认按钮 -->
				<button class="confirmbtn" @click="Remoteopeningsubmit" v-if="operatetype=='3'">提交</button>

			</view>
		</u-popup>
		<view>
			<u-button type="primary" :plain="true" text="返回首页" @click="toindex"></u-button>
		</view>

	</view>
</template>

<script>
	import {
		getcarparklog
	} from "@/api/index.js"
	export default {
		data() {
			return {
				// 用户code
				usercodes: "",
				// 弹窗的状态
				show: true,
				// 车场所有出入口
				carparkloglist: [],
				// 区域所有的出入口
				carregionlist: [],

				// 获取到的摄像头数据
				itemlist: [],

				// 手动录入
				// 手动录入弹窗状态
				Manualentryshow: false,
				// 手动录入往后端传的信息
				Manualentrydata: {},
				// 原车牌
				carplated: '',
				// 车牌
				carplate: '',
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
					type: ''
				},
				// 车辆颜色
				color: {
					title: '车辆颜色',
					list: [{
							name: '未知',
							index: '0'
						},
						{
							name: '蓝色',
							index: '1'
						},
						{
							name: '黄色',
							index: '2'
						},
						{
							name: '白色',
							index: '3'
						},
						{
							name: '黑色',
							index: '4'
						},
						{
							name: '绿色',
							index: '5'
						},
					],
					show: false,
					value: '车辆颜色',
					type: 'all'
				},
				// 操作类型1为手动录入2为车牌纠正3遥控开闸
				operatetype: '1',
				// 车牌纠正的id
				numberplateid: '',
				// ids网后端传的值
				ids: '',
				// 开闸原因
				Openinggate: '',
				// 遥控开闸数据
				Remoteopenitem: {},
			};
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			// 手动录入
			Manualentry(id, item) {
				this.operatetype = '1'
				this.Manualentryshow = true
				this.Manualentrydata.io = item.io
				this.Manualentrydata.location_id = item.location_id
				this.Manualentrydata.location_type = item.location_type
				console.log(this.Manualentrydata, 'Manualentrydata');
			},
			// 选择车辆类型返回的信息
			selectClick(index) {
				this.car.value = index.value[0];
				this.car.type = index.indexs[0]
				console.log(index, "index");
				console.log(this.car, 'car');
				this.car.show = false
			},
			// 筛选颜色选择返回数据
			colorClick(index) {
				console.log("车辆颜色", index);
				this.color.value = index.name
				this.color.type = index.index
				console.log(this.color, 'color');
			},
			// 手动录入提交
			async submit() {
				const form = {
					"requestType": "AddCarIo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"io": this.Manualentrydata.io, // 进出类型  //进出类型0进 1出
						"location_type": this.Manualentrydata.location_type, //位置类型
						"location_id": this.Manualentrydata.location_id, //位置ID
						"carscan": this.carplate, //车牌
						"cartype": this.car.type, //车型
						"carcolor": this.color.type, //车身颜色
						"triggertype": 4, //触发方式v
						"release": 1, //是否放行
						"isout": this.Manualentrydata.io, //是否已出场
					}
				}
				const res = await getcarparklog(form)
				console.log("手动录入", res.data.data);
				this.Manualentryshow = false
				this.carplate = ''
				this.car.value = '车辆类型'
				this.car.type = ''
				this.color.value = '车辆颜色'
				this.color.type = ''
				this.getRealTime(this.ids)
			},
			// 车牌纠正
			numberplate(id, item) {
				this.operatetype = '2'
				this.Manualentryshow = true
				console.log(id, item);
				this.carplated = item.carscan
				this.numberplateid = id
			},
			// 车牌纠正确认按钮
			async numberplatesubmit() {
				const form = {
					"requestType": "UpCarScan",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"carscan": this.carplate, //车牌
						"id": this.numberplateid
					}
				}
				const res = await getcarparklog(form)
				console.log("车牌纠正", res.data.data);
				this.Manualentryshow = false
				this.getRealTime(this.ids)
			},
			// 遥控开闸
			Remoteopening(id, item) {
				this.operatetype = '3'
				this.Manualentryshow = true
				console.log('item', item);
				this.Remoteopenitem = item
			},
			// 遥控开闸确认按钮
			async Remoteopeningsubmit() {
				const form = {
					"requestType": "OpenPark",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"io": this.Remoteopenitem.io,
						"park_id": this.Remoteopenitem.park_id, //主车场ID
						"park_area_id": this.Remoteopenitem.park_area_id, //车场区域ID
						"remark": this.Openinggate, //备注
						"location_type": this.Remoteopenitem.location_type, //位置类型（0：车场，1：区域）
						"location_id": this.Remoteopenitem.location_id, //位置ID
					}
				}
				const res = await getcarparklog(form)
				console.log("遥控开闸", res.data.data);
				this.Manualentryshow = false
				this.getRealTime(this.ids)
			},
			// 手动抓拍
			Manualcapture(id, item) {
				console.log('item', item);
				this.Manualcapturesubmit(item)
			},
			// 手动抓拍
			async Manualcapturesubmit(item) {
				const form = {
					"requestType": "HandIdentify",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"location_type": item.location_type,
						"location_id": item.location_id,
					}
				}
				const res = await getcarparklog(form)
				console.log("手动抓拍", res.data.data);
				this.getRealTime(this.ids)
			},
			// 环境相机
			Environmentalcamera(id, item) {
				this.Environmentalcameraapi(item)
			},
			// 环境相机接口
			async Environmentalcameraapi(item) {
				const form = {
					"requestType": "GetCameraIP",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"type": 30,
						"location_type": item.location_type,
						"location_id": item.location_id,
					}
				}
				const res = await getcarparklog(form)
				console.log("环境相机", res.data.data);
				this.getRealTime(this.ids)
			},

			// 点击车场checkbox触发事件
			parklotchange(index) {
				this.carparkloglist[index].type = !this.carparkloglist[index].type
				console.log(this.carparkloglist, '点击获取checkbox状态');
			},
			// 点击区域checkbox触发事件
			carregionchange(index) {
				this.carregionlist[index].type = !this.carregionlist[index].type
				console.log(this.carregionlist, '点击获取checkbox状态');
			},
			// 确认按钮
			confirmbtn() {
				this.show = false
				// 车场数据处理
				var alist = []
				this.carparkloglist.filter((item) => {
					if (item.type == true) {
						alist.push(item.id)
					}
				})
				console.log(alist, 'alist');
				var aids = []
				for (var a = 0; a <= alist.length - 1; a++) {
					aids.push("0:" + alist[a])
				}
				console.log(aids, 'aids');
				var ares = aids.join(";")
				console.log(ares, 'ares');
				// 区域数据处理
				var blist = []
				this.carregionlist.filter((item) => {
					if (item.type == true) {
						blist.push(item.id)
					}
				})
				console.log(blist, 'blist');
				var bids = []
				for (var b = 0; b <= blist.length - 1; b++) {
					bids.push("1:" + blist[b])
				}
				console.log(bids, 'bids');
				// 使用;连接数组中数据
				var bres = bids.join(";")
				console.log(bres, 'bres');
				this.ids = ares + ';' + bres
				console.log(this.ids, "ids");
				this.getRealTime(this.ids)
				console.log(this, 'this1');
				var _that = this
				// 定时器
				var time = setInterval(function() {
					_that.getRealTime(_that.ids)
				}, 2000)
			},
			// 调用摄像头接口
			async getRealTime(ids) {
				const form = {
					"requestType": "RealTime",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"ids": ids,
					}
				}
				const res = await getcarparklog(form)
				console.log("调用摄像头接口", res.data.data);
				this.itemlist = res.data.data
				for (var i = 0; i <= this.itemlist.length - 1; i++) {
					for (var j = 0; j <= this.carparkloglist.length - 1; j++) {
						if (this.itemlist[i].location_id == this.carparkloglist[j].id) {
							this.itemlist[i].carpark = this.carparkloglist[j].name
						}
					}
				}
				console.log('11111', this.itemlist);
			},
			// 获取所有车场出入口列表
			async getcarparkloglist() {
				const form = {
					"requestType": "GetParkChannelAll",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await getcarparklog(form)
				console.log("获取所有车场出入口列表", res.data.data);
				this.carparkloglist = res.data.data
				this.getcarregionlist()
			},
			// 获取所有区域的出入口列表
			async getcarregionlist() {
				const form = {
					"requestType": "GetParkAreaChannelAll",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await getcarparklog(form)
				console.log("获取所有区域出入口列表", res.data.data);
				this.carregionlist = res.data.data
				console.log(this.carparkloglist, "carparkloglist");
				console.log(this.carregionlist, "carregionlist");
				// 给所有的checkbox添加一个type属性
				for (var i = 0; i <= this.carparkloglist.length - 1; i++) {
					this.carparkloglist[i].type = true
				}
				for (var j = 0; j <= this.carregionlist.length - 1; j++) {
					this.carregionlist[j].type = true
				}
				console.log(this.carparkloglist, "carparkloglist");
				console.log(this.carregionlist, 'carregionlist');
			},
		},
		onLoad() {
			this.getcarparkloglist()
			this.usercodes = uni.getStorageSync('usercode');
		},
		onShow() {
			this.itemlist = []
			this.show = true
		},
		onHide() {
			// console.log(time, "time");
			clearInterval(time)
		}
	}
</script>
<style lang="scss">
	.duty {
		background-color: #eee;
		overflow: hidden;

		.select {
			width: 60%;
			margin: 10px auto;


		}


		.duty-item {
			margin: 5px 15px;
			border: #acacac 1px solid;
			border-radius: 5px;
			// overflow: hidden;
			box-sizing: border-box;
			background-color: #fff;

			.duty-box-img {
				// width: 100%;

				.img {
					width: 100%;
				}
			}

			.duty-box-title {
				width: 100%;
				padding: 4px 8px 10px;
				box-sizing: border-box;

				.title-plate {
					font-size: 18px;
					display: inline;
					color: #4169e1;
					font-weight: 900
				}

				.title-price {
					font-size: 18px;
					display: inline;
					color: #ff0000;
					font-weight: 900
				}

				.title-time {
					display: inline;
					margin: 0;
					display: flex;
					justify-content: space-between;
					margin: 5px 0;
				}

				.title-colorplate {
					display: inline-block;
					background-color: royalblue;
					padding: 2px 3px;
					border-radius: 3px;
					color: white;
					margin: 0 10px;
				}

				.btns {
					width: 100%;
					background-color: #0d6efd;
					margin: 5px 0 0 0;
					font-size: 15px;
					display: flex;
					border-radius: 5px;

					.btn-item {
						width: 20%;
						text-align: center;
						color: white;
						padding: 10px 15px;

					}

				}
			}

		}
	}

	.scrollbox {
		.carparklot-item {
			width: 80%;
			margin: 10px auto;
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



	.btn {
		width: 100px;
		position: fixed;
		right: 30px;
		bottom: 70px;
		z-index: 999;
	}
</style>