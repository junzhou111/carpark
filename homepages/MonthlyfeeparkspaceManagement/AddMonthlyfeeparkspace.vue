<template>
	<view>
		<view>
			添加月费车位
		</view>
		<label class="radio" v-for="(item,index) in radioitem" :key="index">
			<radio :value="item.value" :checked="item.checked" @click="change(index)" /><text>{{item.name}}</text>
		</label>
		<!-- 月费配置 -->
		<view class="checked" v-show="radioitem[0].checked">
			<!-- 缴费几个月 -->
			<input type="text" class="calendarinput" v-model="monthspayment">
			<!-- 车牌 -->
			<input type="text" class="calendarinput" v-model="licenseplate">
			<!-- 车辆类型 -->
			<u-picker :show="cars.show" :columns="cars.list" @cancel="cars.show=false" @close="cars.show = false"
				@confirm="carsclick"></u-picker>
			<view class="calendarinput" @click="cars.show = true">
				<text v-text="cars.value"></text>
				<u-icon size="20" name="arrow-down"></u-icon>
			</view>
			<!-- 车主 -->
			<input type="text" class="calendarinput" v-model="Carowner">
			<!-- 手机号 -->
			<input type="text" class="calendarinput" v-model="phone">
			<!-- 身份证 -->
			<input type="text" class="calendarinput" v-model="ids">
			<!-- 确认按钮 -->
			<button class="confirmbtn" @click="screenbtn">确认</button>

		</view>
		<!-- 灵活配置 -->
		<view class="checked" v-show="radioitem[1].checked">
			<!-- 添加开始时间 -->
			<u-calendar :show="addstartrangeshow" mode="single" @confirm="addstartrangeconfirm" monthNum="50"
				@close="close"></u-calendar>
			<view class="calendarinput" @click="addstartrangeshow = true">
				<text v-text="addstartrangevalue"></text>
				<u-icon size="25" name="calendar"></u-icon>
			</view>
			<!-- 添加结束时间 -->
			<u-calendar :show="addendrangeshow" mode="single" @confirm="addendrangeconfirm" @close="close"></u-calendar>
			<view class="calendarinput" @click="addendrangeshow = true">
				<text v-text="addendrangevalue"> </text>
				<u-icon size="25" name="calendar"></u-icon>
			</view>
			<!-- 车牌 -->
			<input type="text" class="calendarinput" v-model="licenseplate">
			<!-- 车辆类型 -->
			<u-picker :show="cars.show" :columns="cars.list" @cancel="cars.show=false" @close="cars.show = false"
				@confirm="carsclick"></u-picker>
			<view class="calendarinput" @click="cars.show = true">
				<text v-text="cars.value"></text>
				<u-icon size="20" name="arrow-down"></u-icon>
			</view>
			<!-- 车主 -->
			<input type="text" class="calendarinput" v-model="Carowner">
			<!-- 手机号 -->
			<input type="text" class="calendarinput" v-model="phone">
			<!-- 身份证 -->
			<input type="text" class="calendarinput" v-model="ids">
			<!-- 确认按钮 -->
			<button class="confirmbtn" @click="screenbtn">确认</button>

		</view>

	</view>
</template>

<script>
	import {
		getMonthlycar,
		getMonthlycarPrice
	} from "@/api/index.js"
	export default {
		data() {
			return {
				radioitem: [{
					value: 'Monthlyfee',
					name: '月费配置',
					checked: true
				}, {
					value: 'flexible',
					name: '灵活配置',
					checked: false
				}],
				// 缴费几个月
				monthspayment: '缴费几个月',
				// 车牌
				licenseplate: '车牌',
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
				// 车主
				Carowner: '车主',
				// 手机号
				phone: '手机号',
				// 身份证
				ids: "身份证",

				// 添加开始时间
				addstartrangeshow: false,
				addstartrangevalue: '开始时间',
				// 添加结束时间
				addendrangeshow: false,
				addendrangevalue: '结束时间',
				// 车场id   0为车场id为车场下的停车位
				spaceId: '',
				// 用于分别是哪个车场的车位
				parentId: '',


				// 车位的价格
				spacePrice: {},
				// 区分是1车厂还是0区域
				cartype: '',
				// 选中车位价格（每月多少钱）
				Price: '',
				// 每个天平均多少钱
				moonPrice: '',
				// 月费车所需的价格
				money: '',

				// 当前是true编辑还是添加  无参数为添加
				edittype: '',
				// 修改的id
				edit: ''
			}
		},
		onLoad: function(id) {
			console.log("space_id, parent_id", id);

			this.spaceId = id.space_id
			this.parentId = id.parent_id
			this.cartype = id.type
			console.log(this.spaceId, "spaceId");
			console.log(this.parentId, "parentId");
			console.log(this.cartype, "cartype");
			// 当  edittype 为true是当前是编辑模式
			if (id.edittype == "true") {
				this.edittype = id.edittype
				var iditem = JSON.parse(id.item);
				this.edit = iditem.id
				console.log(iditem, "iditem");
				this.licenseplate = iditem.carscan
				this.cars.type = iditem.carty
				this.cars.value = this.cars.list[0][iditem.carty]
				this.Carowner = iditem.name
				this.phone = iditem.phone
				this.ids = iditem.idcard
				this.addstartrangevalue = iditem.start
				this.addendrangevalue = iditem.end

				this.spaceId = iditem.space_id
				this.parentId = iditem.space_parent_id
				this.cartype = iditem.space_type
			}




			this.getcarPrice()
		},
		methods: {
			change(index) {
				console.log('index', index);
				if (index == 0) {
					this.radioitem[0].checked = true
					this.radioitem[1].checked = false
					console.log('ra1', this.radioitem);
				}
				if (index == 1) {
					this.radioitem[1].checked = true
					this.radioitem[0].checked = false
					console.log('ra2', this.radioitem);
				}
			},
			// 添加车辆类型
			carsclick(index) {
				console.log("车辆类型", index);
				this.cars.value = index.value[0]
				this.cars.type = index.indexs[0]
				this.cars.show = false
				console.log(index.indexs[0]);
			},
			// 添加开始时间
			addstartrangeconfirm(e) {
				console.log("添加开始时间", e[0]);
				this.addstartrangeshow = false
				this.addstartrangevalue = e[0]
			},
			// 添加结束时间
			addendrangeconfirm(e) {
				console.log("添加结束时间", e[0]);
				this.addendrangeshow = false
				this.addendrangevalue = e[0]
			},
			// 获取当前时间
			currentTime() {
				var date = new Date();
				var year = date.getFullYear(); //月份从0~11，所以加一
				let month = date.getMonth();
				var dateArr = [
					date.getMonth() + 1,
					date.getDate()
				];
				//如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
				for (var i = 0; i < dateArr.length; i++) {
					if (dateArr[i] >= 1 && dateArr[i] <= 9) {
						dateArr[i] = "0" + dateArr[i];
					}
				}
				var strDate = year + "/" + dateArr[0] + "/" + dateArr[1];
				var moon = (parseInt(dateArr[0]) + parseInt(this.monthspayment)) % 12
				var years = parseInt((parseInt(dateArr[0]) + parseInt(this.monthspayment)) / 12)
				// console.log(moon, "moon")
				if (moon < 9) {
					moon = "0" + moon
				}
				if (moon == 0) {
					moon = 12
				}
				var endDate = (year + years) + "/" + moon + "/" + dateArr[1];
				// console.log("strDate", strDate);
				// console.log("endDate", endDate);
				this.addstartrangevalue = strDate
				this.addendrangevalue = endDate
			},

			// 计算天数
			getDifferTime() {
				let startTime = new Date(Date.parse(this.addstartrangevalue.replace(/-/g, "/"))).getTime();
				let endTime = new Date(Date.parse(this.addendrangevalue.replace(/-/g, "/"))).getTime();
				let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
				return dates;
			},

			// 点击添加按钮添加数据
			screenbtn() {
				console.log(this.edittype, "edittype");
				// 将所有的价格数据转成数组
				console.log("11", JSON.parse(this.spacePrice));
				var pricedata = JSON.parse(this.spacePrice)
				var spacetype = this.cartype == 1 ? 'm' : ''
				var data = this.cars.type + "_" + spacetype + this.parentId + "_" + "price"
				console.log(data, "data");
				// 在所有价格中找data的价格
				for (var key in pricedata) {
					console.log('key', key, data);
					if (key == data) {
						console.log(pricedata[key], "spacePrice每个月多少钱");
						this.Price = pricedata[key]
						this.moonPrice = this.Price / 30
						console.log(this.moonPrice, "moonPrice每天多少钱");

						// 如果当前是灵活配置
						if (this.radioitem[1].checked == true) {
							// 计算天数
							var datatime = this.getDifferTime()
							console.log('datatime 两个日期相隔天数', datatime);
							// 计算两个日期所需要的钱
							this.money = datatime * this.moonPrice
							this.money = Math.floor(this.money * 100) / 100;
							console.log(this.money, "算两个日期所需要的钱");
							if (this.edittype == '') {
								this.addcarMfees()
							}
							if (this.edittype == "true") {
								this.editapi()
							}
						}
						// 如果是月费配置
						if (this.radioitem[0].checked == true) {
							// 当前时间
							this.currentTime()
							// 每个月多少钱*几个月
							this.money = this.Price * this.monthspayment
							this.money = Math.floor(this.money * 100) / 100;
							console.log(this.money, "算两个日期所需要的钱");
							if (this.edittype == '') {
								this.addcarMfees()
							}
							if (this.edittype == "true") {
								this.editapi()
							}

						}
						uni.navigateTo({
							url: "./MonthlyfeeparkspaceManagement"
						})
						return
					}
				}
			},
			// 获取车位价格
			async getcarPrice() {
				const form = {
					"requestType": "GetCarPars",
					"data": {}
				}
				const res = await getMonthlycarPrice(form)
				console.log("获取车位价格", res.data.data[0].mfee_price_rule);
				this.spacePrice = res.data.data[0].mfee_price_rule
			},
			// 修改接口
			async editapi() {
				const form = {
					"requestType": "UpCarMfee",
					"data": {
						"space_type": this.cartype, //车位类型
						"space_id": this.spaceId, //车位id
						"carscan": this.licenseplate, //车牌
						"start": this.addstartrangevalue, //有效时间（起）
						"end": this.addendrangevalue, //有效时间（止）
						"id": this.edit,
						"space_parent_id": this.parentId, //车位所属区域
						"phone": this.phone, //电话号
						"name": this.Carowner, //名字
						"idcard": this.ids, //身份证号
						"carty": this.cars.type, //车型
						"money": this.money, //费用
					}
				}
				const res = await getMonthlycar(form)
				console.log("form", form);
				console.log("修改月费车位", res.data.data);
			},







			// 添加月费车位
			async addcarMfees() {
				const form = {
					"requestType": "AddCarMfee",
					"data": {
						"space_type": this.cartype, //车位类型
						"space_id": this.spaceId, //车位id
						"carscan": this.licenseplate, //车牌
						"start": this.addstartrangevalue, //有效时间（起）
						"end": this.addendrangevalue, //有效时间（止）
						"carty": this.cars.type, //车型
						"phone": this.phone, //电话号
						"name": this.Carowner, //名字
						"idcard": this.ids, //身份证号
						"money": this.money, //费用
						"space_parent_id": this.parentId, //车位所属区域
						"ty": 1, //名单类型 0黑 1白
					}
				}
				const res = await getMonthlycar(form)
				console.log("form", form);
				console.log("添加月费车位", res.data.data);
			},
		}
	}
</script>

<style lang="scss">
	.checked {
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