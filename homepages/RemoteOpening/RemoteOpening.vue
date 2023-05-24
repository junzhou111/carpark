<template>
	<!-- 远程开闸 -->
	<view class="box">
		<view class="RemoteOpening">
			<view class="RemoteOpening-left">
				<view class="RemoteOpening-left-header">
					停车场
				</view>
				<view class="RemoteOpening-left-list" v-for="(item,index) in carlist" :key="index"
					@click="gettwo(item.id)">
					{{item.name}}
				</view>
			</view>
			<view class="RemoteOpening-right">
				<view class="RemoteOpening-right-header">
					出入口(出入类型)
				</view>
				<view class="RemoteOpening-right-list" v-for="(item,index) in cartwolist" :key="index">
					<text>{{item.name}}</text>
					<button class="changebtn" @click="changecar(item)">开闸</button>
				</view>
				<view class="RemoteOpening-right-view">
					<view class="region-left">
						<view class="region">
							区域
						</view>
						<view class="region-list" v-for="(item,index) in region" :key="index"
							@click="regionChange(item.id)">
							{{item.name}}
						</view>
					</view>
					<view class="region-right">
						<view class="region-type">
							区域出入口（出入类型）
						</view>
						<view class="region-type-list" v-for="(item,index) in regionlist" :key="index">
							<text>{{item.name}}</text>
							<button class="changebtn" @click="changeregion(item)">开闸</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="carshow" @close="carshow =false" @open="carshow = true" mode="top">
			<u--textarea v-model="inpvalue" placeholder="开闸原因"></u--textarea>
			<button v-if="type==1" @click="opencarlist">车场确认打开</button>
			<button v-if="type==2" @click="openregion">区域确认打开</button>
		</u-popup>
	</view>
</template>
<script>
	import {
		getRemoteopening,
		getswitchs,
		logout
	} from "@/api/index.js"
	export default {
		data() {
			return {
				// 车厂列表
				carlist: [],
				// 获取车场出入口列表
				cartwolist: [],
				// 区域列表
				region: [],
				// 区域出入口列表
				regionlist: [],
				// 开闸原因
				inpvalue: '',
				// 弹窗
				carshow: false,
				// 车场点击出入口item
				carlistitem: {},
				// 区域
				regionlistitem: {},
				// 区域所属车场id
				parkid: '',
				// 车场区域弹窗
				type: 1
			};
		},
		methods: {
			// 获取所有出口的列表
			async getgetRemoteopenlist() {
				const form = {
					"requestType": "GetPark",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
					}
				}
				const res = await getRemoteopening(form)
				console.log("停车场列表", res.data.data);
				this.carlist = res.data.data
				// 车场出入口列表
				this.gettwolist(this.carlist[0].id)
				// 区域列表
				this.getregion(this.carlist[0].id)
			},


			// 获取车场出入口列表
			async gettwolist(id) {
				const form = {
					"requestType": "GetParkChannel",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"park_id": id
					}
				}
				const res = await getRemoteopening(form)
				console.log("获取车场出入口列表", res.data.data);
				this.cartwolist = res.data.data
				if (res.data.data == undefined) {
					this.cartwolist = ''
				}
			},
			// 获取区域列表
			async getregion(id) {
				const form = {
					"requestType": "GetParkArea",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"park_id": id,
					}
				}
				const res = await getRemoteopening(form)
				console.log("区域列表", res.data.data);
				if (res.data.data == undefined) {
					this.region = ''
					this.regionlist = ''
				} else {
					this.region = res.data.data
					this.getregionlist(res.data.data[0].id)
				}
			},
			// 获取区域出入口列表
			async getregionlist(id) {
				const form = {
					"requestType": "GetParkAreaChannel",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"park_area_id": id,
					}
				}
				const res = await getRemoteopening(form)
				console.log(form, "form");
				console.log("区域出入口列表", res.data.data);
				this.regionlist = res.data.data
			},


			//获取车场出入口列表(点击事件)
			gettwo(id) {
				console.log(id, "id");
				// 区域所属车场的id
				this.parkid = id
				this.gettwolist(id)
				this.getregion(id)
			},
			// 点击区域列表切换出入口列表
			regionChange(id) {
				this.getregionlist(id)
				console.log("qinaj", this.regionlist);
			},





			// 车场开关选择器
			changecar(item) {
				this.type = 1
				console.log("item1", item);
				this.carlistitem = item
				this.carshow = true

			},
			// 原因按钮提交
			opencarlist() {
				this.getcarswitch(this.carlistitem)
				this.inpvalue = ''
				this.carshow = false
			},
			// 调用开闸接口
			async getcarswitch(item) {
				console.log(item.park_area_id);
				if (item.park_area_id == undefined) {
					item.park_area_id = 0
				}
				console.log('items', item);
				const form = {
					"requestType": "OpenPark",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"io": item.type, //出入1是出0是入
						"park_id": item.park_id, //车场id
						"park_area_id": item.park_area_id, //车场区域id
						"remark": this.inpvalue, //备注
						"location_type": 0, //挂载位置类型
						"location_id": item.id, //挂载位置id
					}
				}
				const res = await getswitchs(form)
				console.log(form, 'form');
				console.log("车场开关返回的数据", res);
			},


			// 区域开关选择器
			changeregion(item) {
				this.type = 2
				console.log("item", item);
				this.carshow = true
				this.regionlistitem = item
			},
			// 区域原因按钮提交
			openregion() {
				this.getcarswitchregion(this.regionlistitem)
				this.inpvalue = ''
				this.carshow = false
			},
			// 调用开闸接口
			async getcarswitchregion(item) {
				const form = {
					"requestType": "OpenPark",
					"data": {
						'sessionid': uni.getStorageSync('sessionid'),
						"io": item.type, //出入1是出0是入
						"park_id": this.parkid, //车场id
						"park_area_id": item.id, //车场区域id
						"remark": this.inpvalue, //备注
						"location_type": 1, //挂载位置类型
						"location_id": item.id, //挂载位置id
					}
				}
				const res = await getswitchs(form)
				console.log("区域开关返回的数据", res);
			},
		},
		onLoad() {
			this.getgetRemoteopenlist()

		},
	}
</script>

<style lang="scss">
	.RemoteOpening {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.RemoteOpening-left {
			width: 25%;

			.RemoteOpening-left-header {
				background-color: #0d6efd;
				color: white;
				margin: 5px;
				height: 30px;
				line-height: 30px;
				padding: 0 0 0 10px;
				border-radius: 5px 5px 0 0;
			}

			.RemoteOpening-left-list {
				margin: 5px;
				height: 30px;
				line-height: 30px;
				padding: 0 0 0 10px;
				border-radius: 5px 5px 0 0;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;

			}
		}

		.RemoteOpening-right {
			flex: 1;

			.RemoteOpening-right-header {
				background-color: #0d6efd;
				color: white;
				margin: 5px;
				height: 30px;
				line-height: 30px;
				padding: 0 0 0 10px;
				border-radius: 5px 5px 0 0;
			}

			.RemoteOpening-right-list {
				margin: 5px;
				height: 30px;
				line-height: 30px;
				padding: 0 0 0 10px;
				border-radius: 5px 5px 0 0;
				display: flex;
				justify-content: space-between;
			}
		}

		.RemoteOpening-right-view {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.region-left {
				width: 30%;

				.region {
					background-color: #0d6efd;
					color: white;
					margin: 5px;
					height: 30px;
					line-height: 30px;
					padding: 0 0 0 10px;
					border-radius: 5px 5px 0 0;
				}

				.region-list {
					margin: 5px;
					height: 30px;
					line-height: 30px;
					padding: 0 0 0 10px;
					border-radius: 5px 5px 0 0;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.region-right {
				flex: 1;

				.region-type {
					background-color: #0d6efd;
					color: white;
					margin: 5px;
					height: 30px;
					line-height: 30px;
					padding: 0 0 0 10px;
					border-radius: 5px 5px 0 0;
				}

				.region-type-list {
					margin: 5px;
					height: 30px;
					line-height: 30px;
					padding: 0 0 0 10px;
					border-radius: 5px 5px 0 0;
					display: flex;
					justify-content: space-between;
				}
			}

		}
	}

	.changebtn {
		width: 60px;
		height: 30px;
		line-height: 30px;
		font-size: 15px;
		background-color: #0d6efd;
		color: #fff;
		float: right;
		margin: 0;
		padding: 0;
	}
</style>