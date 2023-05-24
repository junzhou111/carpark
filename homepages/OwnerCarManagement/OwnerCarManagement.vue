<template>
	<!-- 业主车管理 -->
	<view class="OwnerCarManagement">
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
				<button class="confirmbtn" @click="confirm">确认</button>
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
				<button class="bt" @click="addlist">新增</button>
				<button class="bt" @click="searchbtn">搜索</button>
				<button class="bt" @click="resetbtn">重置</button>
			</view>
		</view>
		<!-- 弹出添加层 -->
		<u-popup :show="editshow" @close="editclose" @open="editopen" mode="top">
			<view class="fromview">
				<!-- 添加业主名 -->
				<u-picker :show="uname.show" :columns="uname.list" @cancel="uname.show=false"
					@close="uname.show = false" @confirm="unameClick"></u-picker>
				<view class="calendarinput" @click="uname.show = true">
					<text v-text="uname.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 添加车牌 -->
				<input type="text" class="calendarinput" v-model="platenumber">
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
				<!-- 添加车牌 -->
				<input type="text" class="calendarinput" v-model="AutoLogos">
				<!-- 添加开始时间 -->
				<!-- <u-calendar :show="addstartrangeshow" mode="single" @confirm="addstartrangeconfirm" monthNum="50"
					@close="close"></u-calendar>
				<view class="calendarinput" @click="addstartrangeshow = true">
					<text v-text="addstartrangevalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view> -->
				<!-- 添加结束时间 -->
				<!-- <u-calendar :show="addendrangeshow" mode="single" @confirm="addendrangeconfirm"
					@close="close"></u-calendar>
				<view class="calendarinput" @click="addendrangeshow = true">
					<text v-text="addendrangevalue"> </text>
					<u-icon size="25" name="calendar"></u-icon>
				</view> -->

				<!-- 日历表单筛选开始时间-->
				<u-datetime-picker :show="addstartshow" v-model="addStartTime" mode="date" @confirm="addstartconfirm"
					@close="addstartshow = false"></u-datetime-picker>
				<view class="calendarinput" @click="addstartshow = true">
					<text v-text="addstartvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>

				<!-- 日历表单 筛选结束时间-->
				<u-datetime-picker :show="addendshow" v-model="addStoptime" mode="date"
					@confirm="addendconfirm"></u-datetime-picker>
				<view class="calendarinput" @click="addendshow = true">
					<text v-text="addendvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 添加备注 -->
				<input type="text" class="calendarinput" v-model="remarks">
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="screenbtn">确认</button>
			</view>
		</u-popup>
		<view class="BlackWhiteList">
			<view class="BlackWhiteList-item" v-for="(item,index) in alllist" :key="index">
				<view class="header">
					<label @click="checkbox(index)">
						<checkbox :checked="item.checkboxs" />
					</label>
					<text class="names">{{item.p_name}}</text>
					<text class="times">电话: {{item.p_phone}}</text>
				</view>
				<view class="item-top">
					<text class="ids">{{item.carlogo}}</text>
					<text class="Vehiclemodel">
						{{item.carty==0?"未知车牌":item.carty==1?"蓝牌小汽车":item.carty==2?'黑牌小汽车':item.carty==3?'单排黄牌'
					:item.carty==4?'双排黄牌':item.carty==5?'警车车牌':item.carty==6?'武警车牌':item.carty==7?'个性化车牌'
					:item.carty==8?'单排军车牌':item.carty==9?'双排军车牌':item.carty==10?'使馆车牌':item.carty==11?'香港车牌'
					:item.carty==12?'农用车牌':item.carty==13?'澳门牌':item.carty==14?'厂内牌':item.carty==15?'民航牌'
					:item.carty==16?'领事馆车牌':item.carty==17?'新能源车牌':'应急车牌'}}</text>
					<text class="phone">{{item.carno}}</text>
				</view>
				<view class="item-center">
					<text class="validity">{{item.start_time}}-----{{item.end_time}}</text>
					<text class="state">{{item.state==0?'禁用':'启用'}}</text>
				</view>
				<view class="item-bottom">
					<!-- "未知","蓝色","黄色","白色","黑色","绿色" -->
					<text
						class="namelist">{{item.carcolor==0?'未知':item.carcolor==1?'蓝色':item.carcolor==2?'黄色':item.carcolor==3?'白色':item.carcolor==4?'黑色':'绿色'}}</text>
					<text class="notes">备注{{item.remarks}}</text>
					<text class="types">录入方: {{item.operator==0?'物业':'业主'}}</text>
				</view>
				<view class="item-btn">
					<button class="editbtn" @click="editbtn(item,index)">编辑</button>
					<button class="editbtn" @click="state(item,index)">{{item.state==1?'禁用':'启用'}}</button>
					<button class=" delbtn" @click="delbtn(item)">删除</button>
				</view>
			</view>
		</view>
		<!-- 底部删除操作栏 -->
		<view class="OwnerCarManagement-footer">
			<view class="left">
				<checkbox :checked="DeleteSelected" @click="DeleteSelectedclick" />
				<text>{{DeleteSelected?"删除选中":'全选'}}</text>
			</view>
			<view class="right">
				<button size="mini" @click="Batchdel">删除</button>
			</view>
		</view>
		<!-- 删除模态框 -->
		<u-modal :show="delModal.show" :title="delModal.title" :content='delModal.content' width='200px'
			showCancelButton='true' @cancel="delModal.show=false" @confirm="confirmdel"></u-modal>
	</view>
</template>

<script>
	import {
		getcarmanage
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
				//搜索
				searchvalue: "",
				//  弹出筛选层
				show: false,
				// 新增弹出层
				editshow: false,
				// // 筛选开始时间
				// startrangeshow: false,
				// startrangevalue: '开始时间',
				// // 筛选结束时间
				// endrangeshow: false,
				// endrangevalue: '结束时间',
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
				// 删除选中checked
				DeleteSelected: false,
				// 存放所有的数据
				alllist: [],
				// 存放业主名
				uname: {
					title: '业主名',
					list: [
						[]
					],
					show: false,
					value: '业主名',
					index: 'all',
					type: ''
				},
				// 添加业主原始数据
				unamelist: [],
				// 添加车牌号
				platenumber: '车牌号',
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
				// 添加车标
				AutoLogos: '车标',
				// // 添加开始时间
				// addstartrangeshow: false,
				// addstartrangevalue: '开始时间',
				// // 添加结束时间
				// addendrangeshow: false,
				// addendrangevalue: '结束时间',


				// 筛选开始时间
				addstartshow: false,
				// 开始时间
				addStartTime: 'all',
				addstartvalue: '年/月/日',
				// 筛选结束时间
				addendshow: false,
				// 结束时间
				addStoptime: 'all',
				addendvalue: '年/月/日',


				// 备注
				remarks: '备注',
				// 判断当前是编辑还是添加0为添加1为编辑
				typebtn: "0",

				// 修改时的id、
				itemid: ''
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
				// if (h <= 9) {
				// 	h = '0' + h
				// }
				// if (m <= 9) {
				// 	m = '0' + m
				// }
				// if (s <= 9) {
				// 	s = '0' + s
				// }
				// var times = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
				var times = y + '-' + M + '-' + d
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
			//弹出添加筛选层
			editopen() {
				// console.log('open');
			},
			editclose() {
				this.editshow = false
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
			// 筛选按钮点击事件
			confirm() {
				this.confirmapi()
				// this.endrangevalue = '结束时间'
				// this.startrangevalue = '开始时间'
				this.show = false
			},
			// 点击筛选调用接口
			async confirmapi() {
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
					"requestType": "GetCarOwnerList",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"word": "all",
						"stk": "all",
						"stt": "all",
						"ind": 0,
						"date1": startsvalue,
						"date2": endsvalue,
						"state": "all",
						"pgt": "30",
					}
				}
				const res = await getcarmanage(form)
				console.log("筛选过之后业主车管理的数据", res.data.data);
				if (res.data.data == undefined) {
					this.alllist = ""
				} else {
					this.alllist = res.data.data
				}
				console.log(form, "form");
			},
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////添加
			// 点击添加按钮
			addlist() {
				this.editshow = true
				this.typebtn = "0"
				// 将内容清空
				this.uname.value = '业主名'
				this.uname.type = ""
				this.platenumber = "车牌号"
				this.cars.value = "车辆类型"
				this.cars.type = ""
				this.colors.value = "车辆颜色"
				this.colors.type = ''
				this.AutoLogos = "车标"
				this.addstartvalue = "年/月/日"
				this.addendvalue = "年/月/日"
				this.remarks = "备注"
			},
			// 添加业主名
			unameClick(index) {
				console.log("添加业主名", index);
				console.log("业主名下标", index.indexs[0]);
				// 获取所选业主下标
				var uindex = index.indexs[0]
				// 添加业主所需要传给后端的数据
				console.log("this.unamelist[uindex].id", this.unamelist[uindex].id);
				this.uname.type = this.unamelist[uindex].id
				this.uname.value = this.uname.list[0][index.indexs[0]]
				this.uname.show = false
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
				console.log("yanse", this.colors.type);
			},
			// 点击确认时间范围返回值
			addstartconfirm(e) {
				console.log("开始日历组件返回值", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.addStartTime = etime
				this.addstartvalue = etime
				console.log(this.addStartTime, 'addStartTime');
				console.log(this.addstartvalue, 'addstartvalue');
				this.addstartshow = false
			},
			addendconfirm(e) {
				console.log("结束日历组件返回值", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.addStoptime = etime
				this.addendvalue = etime
				console.log(this.addStoptime, 'addStoptime');
				console.log(this.addendvalue, 'addendvalue');
				this.addendshow = false
			},
			// 确认添加按钮
			screenbtn() {
				if (this.typebtn == "0") {
					this.getadduserlist()
				} else if (this.typebtn == "1") {
					// 执行编辑接口
					this.getedituserlist()
				}
				// 将内容清空
				this.uname.value = '业主名'
				this.uname.type = ""
				this.platenumber = "车牌号"
				this.cars.value = "车辆类型"
				this.cars.type = ""
				this.colors.value = "车辆颜色"
				this.colors.type = ''
				this.AutoLogos = "车标"
				this.addstartvalue = "年/月/日"
				this.addendvalue = "年/月/日"
				this.remarks = "备注"
				this.editshow = false
			},
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////编辑
			// 点击编辑按钮
			editbtn(item, index) {
				this.typebtn = "1"
				console.log(item, index, "编辑");
				this.editshow = true
				this.uname.value = item.p_name
				this.uname.type = item.person_id
				this.platenumber = item.carno
				this.cars.value = this.cars.list[0][item.carty]
				this.cars.type = item.carty
				this.colors.value = this.colors.list[item.carcolor].name
				this.colors.type = item.carcolor
				this.AutoLogos = item.carlogo
				this.addstartvalue = item.start_time
				this.addendvalue = item.end_time
				this.remarks = item.remarks
				this.itemid = item.id
				console.log("this.uname.value", this.uname.value, item.p_name);
			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////状态激活或者禁用
			// 点击切换禁用或者启用
			state(item, index) {
				console.log(index, item);
				item.id
				item.state
				this.getstateuserlist(item.id, item.state)
			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////单个删除
			// 点击删除按钮
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
					"requestType": "DelCarOwner",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": this.delModal.item.id,
					}
				}
				const res = await getcarmanage(form)
				console.log("删除form", form);
				uni.hideLoading();
				this.getalllist()
			},
			// 调用删除api
			async getdeluserlist() {

			},
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////批量删除
			// 批量删除
			checkbox(index) {
				console.log(index);
				this.alllist[index].checkboxs = !this.alllist[index].checkboxs
				console.log(this.alllist, "this.alllist");
				// 选中
				var Selected = 0
				for (var i = 0; i <= this.alllist.length - 1; i++) {
					if (this.alllist[i].checkboxs == true) {
						Selected = Selected + 1
					}
				}
				console.log("Selected", Selected);
				if (Selected == this.alllist.length) {
					this.DeleteSelected = true
				}
				if (Selected != this.alllist.length) {
					this.DeleteSelected = false
				}


			},
			// // 全选按钮
			// batchdelbtn() {

			// },
			// 点击删除选中按钮
			Batchdel() {
				var truelist = []
				for (var i = 0; i <= this.alllist.length - 1; i++) {
					if (this.alllist[i].checkboxs == true) {
						truelist.push(this.alllist[i].id)
					}
				}
				console.log(truelist, "truelist");
				console.log(truelist.toString(), "111");

				this.batchdelapi(truelist.toString())
			},
			// 调用批量删除接口；
			async batchdelapi(truelist) {
				const form = {
					"requestType": "BatchDelCarOwner", //批量删除
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"ids": truelist
					}
				}
				const res = await getcarmanage(form)
				console.log('批量删除', res);
				this.getalllist()
				for (var i = 0; i <= this.alllist.length - 1; i++) {
					this.alllist[i].checkboxs = false
				}
				this.DeleteSelected = false
			},
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////重置
			// 重置按钮
			resetbtn() {
				this.startvalue = "年/月/日"
				this.endvalue = "年/月/日"
				this.searchvalue = ''
				this.getalllist()
			},
			// 点击单选框checked触发点击事件
			DeleteSelectedclick() {
				this.DeleteSelected = !this.DeleteSelected
				for (var i = 0; i <= this.alllist.length - 1; i++) {
					this.alllist[i].checkboxs = this.DeleteSelected
				}

				console.log(this.DeleteSelected);
			},
			// 搜索
			searchbtn() {
				this.getalllist()
			},
			// 获取所有的数据
			async getalllist() {
				if (this.searchvalue == '') {
					var word = 'all'
				} else if (this.searchvalue != '') {
					word = this.searchvalue
				}
				const form = {
					"requestType": "GetCarOwnerList",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"word": word,
						"stk": "all",
						"stt": "all",
						"ind": 0,
						"date1": "all",
						"date2": "all",
						"state": "all",
						"pgt": "30",
					}
				}
				const res = await getcarmanage(form)
				console.log("业主车管理所有的数据", res.data.data);
				if (res.data.data == undefined) {
					this.alllist = ''
				} else if (res.data.data != undefined) {
					this.alllist = res.data.data
					for (var i = 0; i <= this.alllist.length - 1; i++) {
						this.alllist[i].checkboxs = false
					}
					console.log("111", this.alllist);
				}
			},
			// 获取所有业主
			async getunamelist() {
				const form = {
					"requestType": "GetPersonList",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await getcarmanage(form)
				console.log("获取所有的业主", res.data.data);
				console.log(form, 'form');
				this.unamelist = res.data.data
				for (var i = 0; i < res.data.data.length - 1; i++) {
					this.uname.list[0].push(res.data.data[i].name)
				}
				console.log("this.uanme", this.uname.list);
			},
			// 调用添加api
			async getadduserlist() {
				const form = {
					"requestType": "AddCarOwner",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"person_id": this.uname.type,
						"carno": this.platenumber,
						"carty": this.cars.type,
						"carcolor": this.colors.type,
						"carlogo": this.AutoLogos,
						"remarks": this.remarks,
						"start_time": this.addstartvalue,
						"end_time": this.addendvalue
					}
				}
				const res = await getcarmanage(form)
				console.log('addform', form);
				console.log("添加api", res.data.data);
				this.getalllist()
			},
			// 调用编辑api
			async getedituserlist() {
				const form = {
					"requestType": "UpCarOwner",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": this.itemid,
						"carno": this.platenumber,
						"carty": this.cars.type,
						"carcolor": this.colors.type,
						"carlogo": this.AutoLogos,
						"remarks": this.remarks,
						"start_time": this.addstartvalue,
						"end_time": this.addendvalue,
					}
				}
				const res = await getcarmanage(form)
				console.log("编辑form", form);
				this.getalllist()
			},
			// 调用禁用api
			async getstateuserlist(id, state) {
				const form = {
					"requestType": "UpCarOwnerState",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"state": state == 0 ? '1' : '0',
						"id": id,
					}
				}
				const res = await getcarmanage(form)
				console.log("禁用form", form);
				this.getalllist()
			},
		},
		onLoad() {
			this.getalllist()
			this.getunamelist()
		},
	}
</script>

<style lang="scss">
	.OwnerCarManagement {
		width: 100%;
		background-color: #eee;
		padding-bottom: 70px;

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

					.check {
						display: inline-block;
						width: 100px;
						height: 30px;
						line-height: 30px;
					}

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

					.Vehiclemodel {
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
					display: flex;
					justify-content: space-between;
					font-size: 15px;
					height: 30px;
					line-height: 30px;

					.validity {
						display: inline-block;
					}

					.state {
						display: inline-block;
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

					.types {
						display: inline-block;
						height: 30px;
						line-height: 30px;
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

		.OwnerCarManagement-footer {
			width: 100%;
			height: 50px;
			padding: 0 15px 0 15px;
			line-height: 50px;
			background-color: #fff;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;

			.right {
				margin-top: 10px;
			}
		}
	}
</style>