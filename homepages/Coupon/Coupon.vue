<template>
	<!-- 优惠券 -->
	<view class="Coupon">
		<!-- 弹出筛选层 -->
		<u-popup :show="newaddshow" @close="newaddclose" @open="newaddopen" mode="top">
			<view class="fromview">
				<scroll-view scroll-y="true">
					<view class="scrollbox">
						<!-- 商家名称 -->
						<input v-if="giveCoupontype" class="calendarinput" type="text" v-model="MerchantName"
							@input="changeValue" placeholder="商家名称">
						<scroll-view scroll-y="true">
							<view v-if="giveCoupontype" class="MerchantNamebox">
								<view class="MerchantNamebox-item" v-for="(item,index) in MerchantNamelist" :key="index"
									@click="changeMerchantName(item)">
									<text>{{item.name}}</text>
									<text>{{item.type==0?'业主/车主':item.type==1?'家属':item.type==2?'租户':item.type==3?'工作人员':'APP注册用户'}}</text>
								</view>
							</view>
						</scroll-view>
						<!-- 优惠券类型 -->
						<u-action-sheet :actions="CouponType.list" @select="CouponTypeClick" :title="CouponType.title"
							cancelText="取消" @close="CouponType.show=false" :show="CouponType.show"></u-action-sheet>
						<view class="calendarinput" @click="CouponType.show=true">
							<text v-text="CouponType.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 添加生效时间 -->
						<u-datetime-picker @close="startshow=false" ref="datetimePicker" :show="startshow"
							v-model="startvalue" mode="datetime" @cancel="startshow=false"
							@confirm="startconfirm"></u-datetime-picker>
						<view class="calendarinput" @click="startshow = true">
							<text>{{startvalues}}</text>
							<u-icon size="25" name="calendar"></u-icon>
						</view>
						<!-- 添加失效时间 -->
						<u-datetime-picker @close="endshow=false" ref="enddatetimePicker" :show="endshow"
							v-model="endvalue" mode="datetime" @cancel="endshow=false"
							@confirm="endconfirm"></u-datetime-picker>
						<view class="calendarinput" @click="endshow = true">
							<text>{{endvalues}}</text>
							<u-icon size="25" name="calendar"></u-icon>
						</view>
						<!-- 限制类型 -->
						<u-action-sheet :actions="Restrictiontype.list" @select="RestrictiontypeClick"
							:title="Restrictiontype.title" cancelText="取消" @close="Restrictiontype.show=false"
							:show="Restrictiontype.show"></u-action-sheet>
						<view class="calendarinput" @click="Restrictiontype.show=true">
							<text v-text="Restrictiontype.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 优惠券名称 -->
						<input class="calendarinput" type="text" v-model="CouponName" placeholder="优惠券名称">
						<!-- 优惠值-->
						<input v-if="CouponType.type!=0" class="calendarinput" type="text" v-model="Discountvalue"
							placeholder="优惠值">
						<!-- 是否反复可使用 -->
						<u-action-sheet :actions="recovery.list" @select="recoveryClick" :title="recovery.title"
							cancelText="取消" @close="recovery.show=false" :show="recovery.show"></u-action-sheet>
						<view class="calendarinput" @click="recovery.show=true">
							<text v-text="recovery.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 商家发放有效时长设置 -->
						<u-action-sheet :actions="Effectiveduration.list" @select="EffectivedurationClick"
							:title="Effectiveduration.title" cancelText="取消" @close="Effectiveduration.show=false"
							:show="Effectiveduration.show"></u-action-sheet>
						<view class="calendarinput" @click="Effectiveduration.show=true">
							<text v-text="Effectiveduration.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 固定时间 -->
						<input v-if="Effectiveduration.type==1" class="calendarinput" type="text" v-model="timevalue"
							placeholder="固定时间(小时/单位)">
						<!-- 优惠券数量 -->
						<input class="calendarinput" type="text" v-model="Couponnumber" placeholder="优惠券数量">
						<!-- 确认按钮 -->
						<button v-if="giveCoupontype" class="confirmbtn" @click="confirm">添加确认</button>
						<!-- 编辑确认按钮 -->
						<button v-if="!giveCoupontype" class="confirmbtn" @click="editconfirm">编辑确认</button>

					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399" v-model="searchvalue"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="addcouponbtn">新增</button>
				<button class="bt" @click="search">搜索</button>
				<button class="bt" @click="reset">重置</button>
			</view>
		</view>

		<!-- 发放优惠券弹窗 -->
		<u-popup :show="giveCouponshow" @close="giveCouponshow=false" mode="top">
			<view class="fromview">
				<!-- 车牌-->
				<input class="calendarinput" type="text" v-model="carplate" placeholder="车牌">
				<!-- 生效时间 -->
				<u-datetime-picker @close="giveCouponstartshow=false" ref="giveCoupondatetimePicker"
					:show="giveCouponstartshow" v-model="giveCouponstartvalue" mode="datetime"
					@cancel="giveCouponstartshow=false" @confirm="giveCouponstartconfirm"></u-datetime-picker>
				<view class="calendarinput" @click="giveCouponstartshow = true" v-if="giveCouponstartendshow">
					<text v-text="givestartvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 失效时间 -->
				<u-datetime-picker @close="giveCouponendshow=false" ref="giveCouponenddatetimePicker"
					:show="giveCouponendshow" v-model="giveCouponendvalue" mode="datetime"
					@cancel="giveCouponendshow=false" @confirm="giveCouponendconfirm"></u-datetime-picker>
				<view class="calendarinput" @click="giveCouponendshow = true" v-if="giveCouponstartendshow">
					<text v-text="giveendvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 姓名-->
				<input class="calendarinput" type="text" v-model="uname" placeholder="姓名(非必填)">
				<!-- 手机号-->
				<input class="calendarinput" type="text" v-model="uphone" placeholder="手机号(非必填)">
				<!-- 添加确认按钮 -->
				<button class="confirmbtn" @click="giveCouponconfirm">确认</button>

			</view>
		</u-popup>
		<!-- 优惠券列表 -->
		<view class="CouponList">
			<view class="CouponList-item" v-for="(item,index) in coupondata" :key="index">
				<view class="header">
					<view class="Merchantname">
						商家名称：{{item.p_name}}
					</view>
					<view class="Couponname">
						优惠券名称：{{item.name}}
					</view>

				</view>
				<view class="neck">
					<view class="Couponprice">
						优惠值：{{item.discounts_rules}}
					</view>
					<view class="repeattype">
						是否重复使用：
					</view>
				</view>
				<view class="time">
					<view class="statetime">
						<text>{{item.start_effective_time}}---{{item.end_effective_time}}</text>
					</view>

				</view>
				<view class="allnumber">
					<view class="number">
						发放数量：{{item.amount}}
					</view>
					<view class="invalidnumber">
						无效数量：
					</view>
				</view>
				<view class="attributenumber">
					<view class="Usednumber">
						已使用数量：
					</view>
					<view class="notusednumber">
						未使用数量：
					</view>
				</view>
				<view class="footer">
					<view class="Coupontype">
						优惠券类型：{{item.discounts_type=="0"?'免费':item.discounts_type=="1"?'定值':item.discounts_type=="2"?'打折':'金额充值'}}
					</view>
					<view class="type">
						状态：
					</view>
				</view>
				<view class="btns">
					<text @click="Couponedit(item)">编辑</text>
					<text @click="giveCoupon(item)">发放</text>
					<text @click="giveCouponrecord(item)">发放记录</text>
					<text v-if="item.time_type!=0" @click="changecode(item)">二维码</text>
					<text @click="del(item)">删除</text>
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
		couponlist
	} from "@/api/index.js"
	import {
		debounce
	} from "@/utils/utils.js"
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
				newaddshow: false,
				// 商家名称
				MerchantName: "",
				// 搜索到的商家名称
				MerchantNamelist: [],
				// 商家id
				MerchantNameitem: {},
				// 优惠券类型
				CouponType: {
					title: '优惠券类型',
					list: [{
						name: '免费',
						type: "0"
					}, {
						name: '免费金额',
						type: "1"
					}, {
						name: '打折',
						type: "2"
					}, {
						name: '金额充值',
						type: "3"
					}, ],
					show: false,
					value: '优惠券类型',
					type: ''
				},
				// 添加生效时间
				startshow: false,
				// 添加生效时间value
				startvalue: "生效时间", //时间戳
				startvalues: '生效时间', //时间
				// 添加失效时间
				endshow: false,
				// 添加失效时间value
				endvalue: "失效时间", //时间戳
				endvalues: '失效时间', //时间
				// 限制类型
				Restrictiontype: {
					title: '限制类型',
					list: [{
						name: '不限制发放',
						type: "0"
					}, {
						name: '每日限制发放',
						type: "1"
					}, {
						name: '与发放商家车位相同',
						type: "2"
					}, {
						name: '金额充值',
						type: "3"
					}],
					show: false,
					value: '限制类型',
					type: ''
				},
				// 优惠券名称
				CouponName: "",
				// 优惠值
				Discountvalue: "",
				// 是否反复可使用
				recovery: {
					title: '是否反复可使用',
					list: [{
							name: '否',
							type: "0"
						}, {
							name: '是',
							type: "1"
						}

					],
					show: false,
					value: '是否反复可使用',
					type: ''
				},
				// 商家发放有效时长设置
				Effectiveduration: {
					title: '商家发放有效时长设置',
					list: [{
							name: '商家手动设置',
							type: "0"
						}, {
							name: '固定时长',
							type: "1"
						},
						{
							name: '当天有效',
							type: "2"
						}
					],
					show: false,
					value: '有效时长',
					type: ""
				},
				// 固定小时
				timevalue: '0',
				// 优惠券数量
				Couponnumber: '',
				// 优惠券全部数据
				coupondata: [],
				// 搜索内容
				searchvalue: '',
				// 发放优惠券车牌值
				carplate: '',
				// 生效时间
				giveCouponstartshow: false,
				giveCouponstartvalue: 0,
				givestartvalue: '年/月/日',
				// 失效时间
				giveCouponendshow: false,
				giveCouponendvalue: 0,
				giveendvalue: '年/月/日',
				// 生效时间与失效时间显示与隐藏
				giveCouponstartendshow: false,
				// 姓名
				uname: '',
				// 手机号
				uphone: '',
				// 发放优惠券弹窗
				giveCouponshow: false,
				// 发放优惠券内条的参数
				giveCouponitem: {},
				// 当前是true添加 还是 false编辑
				giveCoupontype: true,
				// 编辑id
				editid: ''


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
			// 	  弹出筛选层
			newaddopen() {
				// console.log('open');
			},
			newaddclose() {
				this.newaddshow = false
				// console.log('close');
			},
			// 优惠券类型
			CouponTypeClick(index) {
				console.log("优惠券类型", index);
				this.CouponType.value = index.name
				this.CouponType.type = index.type
			},
			// 添加生效时间的返回值
			startconfirm(e) {
				console.log("添加生效时间的返回值", e);
				var time = new Date(e.value);
				var years = time.getFullYear(); //getFullYear方法以四位数字返回年份
				var Months = time.getMonth() +
					1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一var d = time.getDate();// getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
				var Dates = time.getDate();
				var Hours = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
				var Minutes = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
				var Seconds = time.getSeconds();
				if (Months <= 9) {
					Months = '0' + Months
				}
				if (Dates <= 9) {
					Dates = '0' + Dates
				}
				if (Hours <= 9) {
					Hours = '0' + Hours
				}
				if (Minutes <= 9) {
					Minutes = '0' + Minutes
				}
				if (Seconds <= 9) {
					Seconds = '0' + Seconds
				}

				console.log("时间", years + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds);
				this.startvalues = years + '-' + Months + '-' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds
				this.startshow = false
			},
			// 添加失效时间的返回值
			endconfirm(e) {
				console.log("添加失效时间的返回值", e);
				// 失效时间戳处理
				var times = new Date(e.value);
				var yy = times.getFullYear(); //getFullYear方法以四位数字返回年份
				var MM = times.getMonth() + 1;
				// getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一var d = time.getDate();
				// getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
				var dd = times.getDate();
				var hh = times.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
				var mm = times.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
				var ss = times.getSeconds();
				if (MM <= 9) {
					MM = '0' + MM
				}
				if (dd <= 9) {
					dd = '0' + dd
				}
				if (hh <= 9) {
					hh = '0' + hh
				}
				if (mm <= 9) {
					mm = '0' + mm
				}
				if (ss <= 9) {
					ss = '0' + ss
				}
				console.log("时间", yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss);
				this.endvalues = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
				console.log(this.endvalues, 'endvalues');
				console.log(this.endvalue, "时间戳");
				this.endshow = false
			},
			// 限制类型
			RestrictiontypeClick(index) {
				console.log("限制类型", index);
				this.Restrictiontype.value = index.name
				this.Restrictiontype.type = index.type
			},
			// 是否反复可使用
			recoveryClick(index) {
				console.log("是否反复可使用", index);
				this.recovery.value = index.name
				this.recovery.type = index.type

			},
			// 商家发放有效时长设置
			EffectivedurationClick(index) {
				console.log("商家发放有效时长设置", index);
				this.Effectiveduration.value = index.name
				this.Effectiveduration.type = index.type
			},
			// 添加商家名称
			changeValue: debounce(function() {
				console.log(this.MerchantName, "MerchantName");
				this.getMerchantName(this.MerchantName)
			}, 1000),
			// 点击商家名称回填input框
			changeMerchantName(item) {
				console.log(item, 'item');
				this.MerchantName = item.name
				this.MerchantNameitem = item
			},
			// 搜索按钮
			search() {
				this.getcouponlist(this.searchvalue)
			},
			// 重置按钮
			reset() {
				this.searchvalue = ''
				// 清空所有内容
				this.MerchantNameitem = ''
				this.MerchantName = ''
				this.MerchantNamelist = []
				this.CouponType.value = '优惠券类型'
				this.CouponType.type = ''
				this.startvalue = '生效时间'
				this.startvalues = '生效时间'
				this.endvalue = '失效时间'
				this.endvalues = '失效时间'
				this.Restrictiontype.value = '限制类型'
				this.Restrictiontype.type = ''
				this.CouponName = ''
				this.Discountvalue = ''
				this.recovery.value = '是否反复可使用'
				this.recovery.type = ''
				this.Effectiveduration.value = '有效时长'
				this.Effectiveduration.type = ''
				this.timevalue = '0'
				this.Couponnumber = ''
				this.getcouponlist()
			},
			// 编辑按钮
			Couponedit(item) {
				console.log(item, 'item编辑按钮');
				this.editid = item.id
				this.newaddshow = true
				this.giveCoupontype = false
				// 优惠券类型
				this.CouponType.type = item.discounts_type
				this.CouponType.value = this.CouponType.list[item.discounts_type].name
				// 将时间格式转化成2023/02/23 00:00:00
				this.startvalues = item.start_effective_time
				var startstrtime = item.start_effective_time.replace(/-/g, "/");
				// 将日期转换为时间戳
				var date1 = new Date(startstrtime).getTime();
				this.startvalue = date1

				this.endvalues = item.end_effective_time
				var endstrtime = item.end_effective_time.replace(/-/g, "/");
				// 将日期转换为时间戳
				var date2 = new Date(endstrtime).getTime();
				this.endvalue = date2
				// 限制类型
				this.Restrictiontype.type = item.type
				this.Restrictiontype.value = this.Restrictiontype.list[item.type].name
				// 优惠券名称
				this.CouponName = item.name
				// 优惠值
				this.Discountvalue = item.discounts_rules
				// 是否反复可使用
				this.recovery.type = item.re_use
				this.recovery.value = this.recovery.list[item.re_use].name
				// 有效时长
				this.Effectiveduration.type = item.time_type
				this.Effectiveduration.value = this.Effectiveduration.list[item.time_type].name
				// 固定小时
				this.timevalue = item.time_value
				// 优惠券数量
				this.Couponnumber = item.amount

			},
			// 编辑确认按钮
			editconfirm() {
				// 调用编辑接口
				this.editapi()
				this.newaddshow = false
				// 清空所有内容
				this.MerchantNameitem = ''
				this.MerchantName = ''
				this.MerchantNamelist = []
				this.CouponType.value = '优惠券类型'
				this.CouponType.type = ''
				this.startvalue = '生效时间'
				this.startvalues = '生效时间'
				this.endvalue = '失效时间'
				this.endvalues = '失效时间'
				this.Restrictiontype.value = '限制类型'
				this.Restrictiontype.type = ''
				this.CouponName = ''
				this.Discountvalue = ''
				this.recovery.value = '是否反复可使用'
				this.recovery.type = ''
				this.Effectiveduration.value = '有效时长'
				this.Effectiveduration.type = ''
				this.timevalue = '0'
				this.Couponnumber = ''
			},
			// 编辑接口
			async editapi() {
				const form = {
					"requestType": "UpCoupons",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"type": this.Restrictiontype.type,
						"value": 0,
						"name": this.CouponName,
						"start_effective_time": this.startvalues,
						"end_effective_time": this.endvalues,
						"time_type": this.Effectiveduration.type,
						"time_value": this.timevalue,
						"discounts_rules": this.Discountvalue,
						"discounts_type": this.CouponType.type,
						"num": this.Couponnumber,
						"re_use": this.recovery.type,
						"id": this.editid,
					}
				}
				const res = await couponlist(form)
				console.log(form, 'form');
				console.log("编辑接口调用", res.data.data);
				this.getcouponlist()
			},
			// 删除按钮
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
					"requestType": "DelCoupons",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"id": this.delModal.item.id
					},
				}
				const res = await couponlist(form)
				console.log("form", form);
				console.log("删除优惠券api", res.data.data);
				uni.hideLoading();
				this.getcouponlist()
			},



			// 静态二维码
			changecode(item) {
				console.log(item, 'item');
				const form = {
					"requestType": "CreateLink",
					"data": {
						// 'sessionid': uni.getStorageSync('sessionid'),
						//二维码请求地址
						"addr": "http://service.acc.ynawe.com/app-apple-page/staticqr-code.html?id:" + item.id,
						"amount": item.amount, //数量
						"s": item.start_effective_time, //时间
						"e": item.end_effective_time, //时间
						"timetype": item.time_type, //时间类型
						"pid": "12" //项目id
					},
				}




				uni.navigateTo({
					url: "./Couponcode?form=" + encodeURIComponent(JSON.stringify(form))
				})
			},
			// 优惠券发放记录
			giveCouponrecord(item) {
				uni.navigateTo({
					url: "./Couponrecord?id=" + item.id
				})
			},
			// 发放优惠券
			giveCoupon(item) {
				this.giveCouponshow = true
				console.log(item, 'item');
				// 优惠券的参数
				this.giveCouponitem = item

				if (item.time_type == 0) {
					this.giveCouponstartendshow = true
				}
				if (item.time_type != 0) {
					this.giveCouponstartendshow = false
				}
			},

			// 发放优惠券生效时间
			giveCouponstartconfirm(e) {
				console.log("发放优惠券生效时间", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.givestartvalue = etime
				this.giveCouponstartvalue = etime
				console.log(this.givestartvalue, 'givestartvalue');
				console.log(this.giveCouponstartvalue, 'giveCouponstartvalue');
				this.giveCouponstartshow = false
			},
			// 发放优惠券失效时间
			giveCouponendconfirm(e) {
				console.log("发放优惠券失效时间", e);
				let etime = this.timedata(e.value)
				console.log(etime, 'etime');
				this.giveendvalue = etime
				this.giveCouponendvalue = etime
				console.log(this.giveendvalue, 'giveendvalue');
				console.log(this.giveCouponendvalue, 'giveCouponendvalue');
				this.giveCouponendshow = false
			},
			// 确认发放优惠券
			giveCouponconfirm() {
				this.giveCouponshow = false
				this.giveCouponapi()
			},
			//发放优惠券api
			async giveCouponapi() {

				const form = {
					"requestType": "SendTickets",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"personname": this.uname, //姓名
						"phone": this.uphone, //电话
						"coupons_id": this.giveCouponitem.id, //优惠卷id
						"num": this.giveCouponitem.amount, //发放数量
						"start_effective_time": this.giveCouponitem.start_effective_time, //起始有效期
						"end_effective_time": this.giveCouponitem.end_effective_time, //结束有效期
						"carno": this.carplate, //车牌
						"start_time": this.givestartvalue, //开始时间
						"end_time": this.giveendvalue, //结束时间
					},
				}
				console.log('form', form);
				const res = await couponlist(form)
				console.log("发放优惠券", res.data.data);
			},

			// 点击添加按钮
			addcouponbtn() {
				this.newaddshow = true
				this.giveCoupontype = true
			},


			// 点击确认按钮添加优惠券
			confirm() {
				this.addcoupon()
				this.newaddshow = false
				// 清空所有内容
				this.MerchantNameitem = ''
				this.MerchantName = ''
				this.MerchantNamelist = []
				this.CouponType.value = '优惠券类型'
				this.CouponType.type = ''
				this.startvalue = '生效时间'
				this.startvalues = '生效时间'
				this.endvalue = '失效时间'
				this.endvalues = '失效时间'
				this.Restrictiontype.value = '限制类型'
				this.Restrictiontype.type = ''
				this.CouponName = ''
				this.Discountvalue = ''
				this.recovery.value = '是否反复可使用'
				this.recovery.type = ''
				this.Effectiveduration.value = '有效时长'
				this.Effectiveduration.type = ''
				this.timevalue = '0'
				this.Couponnumber = ''
			},
			// 调用添加优惠券api
			async addcoupon() {
				const form = {
					"requestType": "AddCoupons",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"person_id": this.MerchantNameitem.id, //商家id
						"type": this.Restrictiontype.type, //类型(0不限制 1限制每天几张 2关联车位 3金额充值)
						"value": 0, //值
						"name": this.CouponName, //优惠券名称
						"start_effective_time": this.startvalues, //时间
						"end_effective_time": this.endvalues, //时间
						"time_type": this.Effectiveduration.type, //时间有效类型(0不限制 1限制有效 2当天有效)
						"time_value": this.timevalue, //值（小时）固定时间
						"discounts_rules": this.Discountvalue, //优惠值
						"discounts_type": this.CouponType.type, //0免费 1定值 免费金额 2打折 3金额充值
						"num": this.Couponnumber,
						"re_use": this.recovery.type, //重复使用(0否 1是)
					},
				}
				const res = await couponlist(form)
				console.log("添加优惠券api", res.data.data);
				console.log("form", form);
				this.getcouponlist()
			},
			// 获取商家名称
			async getMerchantName(MerchantName) {
				const form = {
					"requestType": "GetPerson",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"word": MerchantName
					},
				}
				const res = await couponlist(form)
				console.log("获取商家名称", res.data.data);
				if (res.data.data == undefined) {
					this.MerchantNamelist = ''
				}
				if (res.data.data != undefined) {
					this.MerchantNamelist = res.data.data
				}
			},
			// 获取优惠券列表全部数据
			async getcouponlist(searchvalue) {
				const form = {
					"requestType": "couponsList",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"pgt": "30",
						"word": searchvalue == undefined ? 'all' : searchvalue == "" ? 'all' : searchvalue,
						"ind": 0
					},
				}
				const res = await couponlist(form)
				console.log(form, 'form');
				console.log("优惠券全部列表", res.data.data);
				if (res.data.data == undefined) {
					this.coupondata = ''
				}
				if (res.data.data != undefined) {
					this.coupondata = res.data.data
				}

			},
		},
		onLoad() {
			// this.$refs.datetimePicker.setFormatter(this.formatter)
			// this.$refs.enddatetimePicker.setFormatter(this.formatter)

			this.getcouponlist()
		}

	}
</script>

<style lang="scss">
	.Coupon {
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

		.CouponList {
			padding: 15px;

			.CouponList-item {
				background-color: #fff;
				border-radius: 5px;
				padding: 15px;
				margin-bottom: 15px;

				.header {
					display: flex;
					justify-content: space-between;

					.Merchantname {
						width: 50%;
					}

					.Couponname {
						width: 50%;
					}

				}

				.neck {
					display: flex;
					justify-content: space-between;

					.Couponprice {
						width: 50%;
					}

					.repeattype {
						width: 50%;
					}
				}

				.time {

					.statetime {
						text {
							font-size: 13px;
						}
					}

					.endtime {}
				}

				.allnumber {
					display: flex;
					justify-content: space-between;

					.number {
						width: 50%;
					}

					.invalidnumber {
						width: 50%;
					}
				}

				.attributenumber {
					display: flex;
					justify-content: space-between;

					.Usednumber {
						width: 50%;
					}

					.notusednumber {
						width: 50%;
					}
				}

				.footer {
					display: flex;
					justify-content: space-between;

					.Coupontype {
						width: 50%;
					}

					.type {
						width: 50%;
					}
				}
			}
		}
	}

	.scrollbox {
		height: 60vh;
	}

	.MerchantNamebox {
		height: 100px;
		padding: 0 10px;

		.MerchantNamebox-item {
			height: 30px;
			display: flex;
			justify-content: space-between;

		}
	}

	.btns {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		text {
			background-color: #0d6efd;
			color: #fff;
			padding: 0 5px;
			height: 25px;
			line-height: 25px;
			border-radius: 5px;
		}
	}
</style>