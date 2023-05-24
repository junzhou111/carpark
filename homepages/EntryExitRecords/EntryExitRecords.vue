<template>
	<!-- 出入记录 -->
	<view class="EntryExitRecords">
		<!-- 添加按钮弹出添加窗口 -->
		<u-popup :show="showadd" @close="showadd=false" mode="top" class="EntryExitRecords-from">
			<view class="fromview">
				<!-- 出入场类型 -->
				<u-action-sheet :actions="Accesss.list" @select="AccesssClick" :title="Accesss.title" cancelText="取消"
					@close="Accesss.show=false" :show="Accesss.show"></u-action-sheet>
				<view class="calendarinput" @click="Accesss.show=true">
					<text v-text="Accesss.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 位置 -->
				<u-picker :show="positions.show" :columns="positions.list" @confirm='positionsClick'
					@cancel="positions.show=false"></u-picker>
				<!-- <u-action-sheet :actions="positions.list" @select="positionsClick" :title="positions.title"
					cancelText="取消" @close="positions.show=false" :show="positions.show"></u-action-sheet> -->
				<view class="calendarinput" @click="positions.show=true">
					<text v-text="positions.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 车牌 -->
				<input type="text" class="calendarinput" v-model="addcarplate">
				<!-- 车辆类型 -->
				<u-picker :show="cars.show" :columns="cars.list" @cancel="cars.show=false" @close="cars.show = false"
					@confirm="carsclick"></u-picker>
				<view class="calendarinput" @click="cars.show = true">
					<text v-text="cars.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 车辆颜色 -->
				<u-action-sheet :actions="colors.list" @select="colorsClick" :title="colors.title" cancelText="取消"
					@close="colors.show=false" :show="colors.show"></u-action-sheet>
				<view class="calendarinput" @click="colors.show=true">
					<text v-text="colors.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 触发方式 -->
				<u-action-sheet :actions="trigger.list" @select="triggerClick" :title="trigger.title" cancelText="取消"
					@close="trigger.show=false" :show="trigger.show"></u-action-sheet>
				<view class="calendarinput" @click="trigger.show=true">
					<text v-text="trigger.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 是否放行 -->
				<u-action-sheet :actions="releases.list" @select="releasesClick" :title="releases.title" cancelText="取消"
					@close="releases.show=false" :show="releases.show"></u-action-sheet>
				<view class="calendarinput" @click="releases.show=true">
					<text v-text="releases.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 是否已出场 -->
				<u-action-sheet :actions="comes.list" @select="comesClick" :title="comes.title" cancelText="取消"
					@close="comes.show=false" :show="comes.show"></u-action-sheet>
				<view class="calendarinput" @click="comes.show=true">
					<text v-text="comes.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="addlistbtn">确认</button>
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
				<button class="bt" @click="addlist">添加</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="resetbtn">重置</button>
			</view>
		</view>
		<!-- 弹出层筛选框 -->
		<u-popup :show="show" @close="show=false" mode="top" class="EntryExitRecords-from">
			<view class="fromview">
				<!-- 出入场类型 -->
				<u-action-sheet :actions="Access.list" @select="AccessClick" :title="Access.title" cancelText="取消"
					@close="Access.show=false" :show="Access.show"></u-action-sheet>
				<view class="calendarinput" @click="Access.show=true">
					<text v-text="Access.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 车辆类型 -->
				<u-picker :show="car.show" :columns="car.list" @cancel="car.show=false" @close="car.show = false"
					@confirm="carClick"></u-picker>
				<view class="calendarinput" @click="car.show = true">
					<text v-text="car.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>

				<!-- 车辆颜色 -->
				<u-action-sheet :actions="color.list" @select="colorClick" :title="color.title" cancelText="取消"
					@close="color.show=false" :show="color.show"></u-action-sheet>
				<view class="calendarinput" @click="color.show=true">
					<text v-text="color.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 是否放行 -->
				<u-action-sheet :actions="release.list" @select="releaseClick" :title="release.title" cancelText="取消"
					@close="release.show=false" :show="release.show"></u-action-sheet>
				<view class="calendarinput" @click="release.show=true">
					<text v-text="release.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 是否已出场 -->
				<u-action-sheet :actions="come.list" @select="comeClick" :title="come.title" cancelText="取消"
					@close="come.show=false" :show="come.show"></u-action-sheet>
				<view class="calendarinput" @click="come.show=true">
					<text v-text="come.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 位置 -->
				<u-picker :show="position.show" :columns="position.list" @confirm='positionClick'
					@cancel="position.show=false"></u-picker>
				<!-- <u-action-sheet :actions="position.list" @select="positionClick" :title="position.title" cancelText="取消"
					@close="position.show=false" :show="position.show"></u-action-sheet> -->
				<view class="calendarinput" @click="position.show=true">
					<text v-text="position.value"></text>
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
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="screenbtn">确认</button>
			</view>
		</u-popup>
		<!-- 车辆详情 -->

		<datelist v-for="(item,index) in caralllist" :key="index" :item="item" @infos='infos'></datelist>
	</view>
</template>

<script>
	import {
		exitrecords,
		logout,
		Vehiclemanagement
	} from "@/api/index.js"

	import datelist from "./datelist.vue"
	export default {
		data() {
			return {
				// 搜索
				searchvalue: '',
				// 出入场数据
				Access: {
					title: '出入场类型',
					list: [{
							name: '出场',
							type: "1"
						},
						{
							name: '入场',
							type: "0"
						},
						{
							name: '场内缴费',
							type: "2"
						}
					],
					type: 'all',
					show: false,
					value: '出入场类型',
				},
				// 车辆类型
				car: {
					title: '车辆类型',
					list: [
						["未知车牌", "蓝牌小汽车", "黑牌小汽车", "单排黄牌", "双排黄牌", "警车车牌", "武警车牌", "个性化车牌", "单排军车牌", "双排军车牌", "使馆车牌",
							"香港车牌", "农用车牌", "澳门牌", "厂内牌", "民航牌", "领事馆车牌", "新能源车牌", "应急车牌"
						]
					],
					show: false,
					value: '车辆类型',
					type: 'all'
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
				// 是否放行
				release: {
					title: '是否放行',
					list: [{
							name: '是',
							type: "1"
						},
						{
							name: '否',
							type: "0"
						},
						{
							name: '异常',
							type: "2"
						}
					],
					type: 'all',
					show: false,
					value: '是否放行'
				},
				// 筛选是否出场
				come: {
					title: '是否已出场',
					list: [{
							name: '是',
							type: "1"
						},
						{
							name: '否',
							type: "0"
						},
						{
							name: '异常',
							type: "2"
						}
					],
					type: "all",
					show: false,
					value: '是否已出场'
				},
				//筛选位置
				position: {
					title: '位置',
					list: [
						[]
					],
					lists: [],
					show: false,
					value: '位置',
					type: 'all',
					id: 'all'
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
				// 弹出层
				show: false,
				// 来往车辆全部信息
				caralllist: [],
				// 添加
				showadd: false,
				// 进出类型
				Accesss: {
					title: '进出类型',
					list: [{
							name: '出场',
							type: "1"
						},
						{
							name: '入场',
							type: "0"
						}
					],
					show: false,
					type: "",
					value: '进出类型',
				},
				// 添加位置信息
				positions: {
					title: '位置',
					list: [
						[]
					],
					lists: [],
					show: false,
					value: '位置',
					type: '',
					id: ''
				},
				// 添加车牌
				addcarplate: "请添加车牌",
				// 添加车辆类型
				cars: {
					title: '车辆类型',
					list: [
						["未知车牌", "蓝牌小汽车", "黑牌小汽车", "单排黄牌", "双排黄牌", "警车车牌", "武警车牌", "个性化车牌", "单排军车牌", "双排军车牌", "使馆车牌",
							"香港车牌", "农用车牌", "澳门牌", "厂内牌", "民航牌", "领事馆车牌", "新能源车牌", "应急车牌"
						]
					],
					show: false,
					value: '车辆类型',
					index: 'all',
					type: ''
				},
				// 添加车辆颜色
				colors: {
					title: '车辆颜色',
					// "未知","蓝色","黄色","白色","黑色","绿色"
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
					type: ''
				},
				// 添加触发方式
				trigger: {
					title: '触发方式',
					// "视频触发","地感触发","手动触发","手动抓图","手工录入"
					list: [{
							name: '视频触发',
							index: '0'
						},
						{
							name: '地感触发',
							index: '1'
						}, {
							name: '手动触发',
							index: '2'
						}, {
							name: '手动抓图',
							index: '3'
						}, {
							name: '手工录入',
							index: '4'
						}
					],
					show: false,
					value: '触发方式',
					type: ''
				},
				// 添加是否放行
				releases: {
					title: '是否放行',
					list: [{
							name: '是',
							type: "1"
						},
						{
							name: '否',
							type: "0"
						},
					],
					show: false,
					value: '是否放行',
					type: ''
				},
				// 添加是否出厂
				comes: {
					title: '是否已出场',
					list: [{
							name: '是',
							type: "1"
						},
						{
							name: '否',
							type: "0"
						}
					],
					show: false,
					value: '是否已出场',
					type: ''
				},


			};
		},
		components: {
			datelist
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
			// 筛选出入场类型返回的信息
			AccessClick(index) {
				console.log("出入场类型返回的信息", index);
				this.Access.value = index.name
				this.Access.type = index.type
				console.log(this.Access.type);
			},

			// 筛选车辆类型返回的数据
			carClick(index) {
				console.log("车辆类型返回的数据", index);
				this.car.value = index.value[0]
				this.car.type = index.indexs[0]
				this.car.show = false
			},
			// 筛选颜色选择返回数据
			colorClick(index) {
				console.log("车辆颜色", index);
				this.color.value = index.name
				this.color.type = index.index
			},
			// 筛选是否放行
			releaseClick(index) {
				console.log("是否放行", index);
				this.release.value = index.name
				this.release.type = index.type
			},
			// 筛选是否已出场
			comeClick(index) {
				console.log("是否已出场", index);
				this.come.value = index.name
				this.come.type = index.type
				console.log(this.come.type);
			},

			// 筛选位置
			positionClick(index) {
				console.log("位置", index);
				this.position.value = index.value[0]
				this.position.type = this.position.lists[index.indexs[0]].type
				this.position.id = this.position.lists[index.indexs[0]].id
				console.log("this.position.type", this.position.type);
				console.log("this.position.id", this.position.id);
				this.position.show = false
			},
			// 点击筛选开始时间范围返回值
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
			// 点击筛选结束时间范围返回值
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
			// 筛选按钮点击确认开始筛选
			screenbtn() {
				this.screenapi()
				this.show = false
			},
			// 筛选接口调用
			async screenapi() {
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
						'io': this.Access.type,
						'person_id': "all",
						'cartype': this.car.type,
						'carcolor': this.color.type,
						'release': this.release.type,
						'isout': this.come.type,
						'location_type': this.position.type,
						'location_id': this.position.id,
						'word': "all",
						'stk': "all",
						'date1': startsvalue,
						'date2': endsvalue,
						'stt': "all",
						'ind': "0",
						'pgt': "30"
					},
				}
				const res = await exitrecords(form)
				console.log("筛选过后的数据", res.data.data);
				if (res.data.data == undefined) {
					this.caralllist = ''
				} else {
					this.caralllist = res.data.data
				}
				console.log(form, "form");
			},
			// 添加按钮
			addlist() {
				this.showadd = true
			},
			// 添加出入类型
			AccesssClick(index) {
				console.log("添加出入场类型返回的信息", index);
				this.Accesss.value = index.name
				this.Accesss.type = index.type
			},
			// 添加位置
			positionsClick(index) {
				console.log("位置", index);
				this.positions.value = index.value[0]
				this.positions.type = this.positions.lists[index.indexs[0]].type
				this.positions.id = this.positions.lists[index.indexs[0]].id
				this.positions.show = false
			},
			// 添加车辆类型
			carsclick(index) {
				console.log("车辆类型", index);
				this.cars.value = index.value[0]
				this.cars.type = index.indexs[0]
				this.cars.show = false
				console.log(index.indexs[0]);
			},
			// 添加颜色选择返回数据
			colorsClick(index) {
				console.log("车辆颜色", index);
				this.colors.value = index.name
				this.colors.type = index.index
			},
			// 添加车辆触发方式
			triggerClick(index) {
				console.log("触发方式", index);
				this.trigger.value = index.name
				this.trigger.type = index.index
			},
			// 添加是否放行
			releasesClick(index) {
				console.log("是否放行", index);
				this.releases.value = index.name
				this.releases.type = index.type
			},
			// 添加是否已出场
			comesClick(index) {
				console.log("是否已出场", index);
				this.comes.value = index.name
				this.comes.type = index.type
			},
			// 点击确认按钮添加
			addlistbtn() {
				this.addlistapi()
				this.Accesss.typa = ''
				this.Accesss.value = '进出类型'
				this.positions.type = ''
				this.positions.value = '位置'
				this.positions.is = ''
				this.addcarplate = '请添加车牌'
				this.cars.value = '车辆类型'
				this.cars.type = ''
				this.colors.value = '车辆颜色'
				this.colors.type = ''
				this.trigger.value = '触发方式'
				this.trigger.type = ''
				this.releases.value = '是否放行'
				this.releases.type = ''
				this.comes.value = '是否已出场'
				this.comes.type = ''

				this.showadd = false
				this.getexitrecords()
			},
			// 调用添加api
			async addlistapi() {
				const form = {
					"requestType": "AddCarIo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						io: this.Accesss.type,
						location_type: this.positions.type,
						location_id: this.positions.id,
						carscan: this.addcarplate,
						cartype: this.cars.type,
						carcolor: this.colors.type,
						triggertype: this.trigger.type,
						release: this.releases.type,
						isout: this.comes.type,

					}
				}
				const res = await exitrecords(form)
				console.log("form", form);
				console.log("点击确认按钮添加数据", res.data.data);
				// 调用获取列表方法刷新页面
				this.getexitrecords()
			},
			// 搜索功能
			searchbtn() {
				this.getexitrecords()
			},

			// 点击重置按钮触发事件
			resetbtn() {
				// 将出入场置空
				this.Access.type = 'all'
				this.Access.value = "出入场类型"
				// 出入场类型
				this.car.value = "车辆类型"
				this.car.type = "all"
				// 车辆颜色
				this.color.value = "车辆颜色"
				this.color.type = "all"
				// 是否放行
				this.release.value = "是否放手"
				this.release.type = "all"
				// 是否已出场
				this.come.value = "是否已出场"
				this.come.type = "all"
				// 位置
				this.position.value = "位置"
				this.position.type = "all"
				// 日历表单 
				this.startvalue = "年/月/日"
				this.endvalue = "年/月/日"
				this.StartTime = "all"
				this.Stoptime = "all"
				// 搜索内容
				this.searchvalue = ''
				this.getexitrecords()
			},
			// 点击跳转详情
			async infos(id) {
				const form = {
					"requestType": "GetCarIoInfo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'id': id,
					},
				}
				const res = await exitrecords(form)
				console.log("点击获取详情", res.data.data[0]);
				var iteminfo = res.data.data[0]
				var item = encodeURIComponent(JSON.stringify(iteminfo));
				uni.navigateTo({
					url: "../allinfo/allinfo?item=" + item
				})
			},
			// 打开当前页面渲染全部数据
			async getexitrecords() {
				if (this.searchvalue == '') {
					var word = 'all'
				} else if (this.searchvalue != '') {
					word = this.searchvalue
				}
				const form = {
					"requestType": "GetCarIo",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'io': "all",
						'person_id': "all",
						'cartype': "all",
						'carcolor': "all",
						'release': "all",
						'isout': "all",
						'location_type': "all",
						'location_id': "all",
						'word': word,
						'stk': "all",
						'date1': "all",
						'date2': "all",
						'stt': "all",
						'ind': "0",
						'pgt': "30"
					},
				}
				const res = await exitrecords(form)
				console.log("来往车辆全部信息", res.data.data);
				this.caralllist = res.data.data
				console.log("11111", this.caralllist);
			},
			// 获取区域出入口信息
			async getposition() {
				const form = {
					"requestType": "GetParkAreaChannelAll",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await Vehiclemanagement(form)
				console.log("获取区域出入口位置信息", res.data.data);
				console.log(res.data.data.length - 1, "arr.length-1");
				for (var i = 0; i <= res.data.data.length - 1; i++) {
					this.positions.list[0].push(res.data.data[i].name)
					this.position.list[0].push(res.data.data[i].name)

					this.positions.lists.push(res.data.data[i])
					this.position.lists.push(res.data.data[i])
				}
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
				console.log("获取车场出入口位置信息,1是出0是进", res.data.data);
				console.log(res.data.data.length - 1, "arr.length-1");
				for (var i = 0; i <= res.data.data.length - 1; i++) {
					this.positions.list[0].push(res.data.data[i].name)
					this.position.list[0].push(res.data.data[i].name)

					this.positions.lists.push(res.data.data[i])
					this.position.lists.push(res.data.data[i])
				}
			},


		},
		onLoad() {
			this.getexitrecords()
			this.getposition()
			this.getVehiclemanagement()
		},
	}
</script>

<style lang="scss">
	.EntryExitRecords {
		margin: 0;
		padding: 0;
		background-color: #eee;

		.inputbox {
			margin: 15px 15px 15px 15px;
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

		.btn-box {
			width: 90%;
			margin: 20px auto;
			display: flex;
			justify-content: space-evenly;

			.centerbtn {
				width: 20px;
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
</style>