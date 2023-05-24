// 接口列表
import {
	request
} from "../utils/request.js"
// // 登录接口
// export const login = (data) => {
// 	return request({
// 		url: '_comapplet_SignIn',
// 		method: 'POST',
// 		data
// 	})
// }

// 退出登录
export const logout = (data) => {
	return request({
		url: '_comapplet_SignIn',
		method: 'POST',
		data
	})
}

// 获取验证码
export const Sendverificationcode = (data) => {
	return request({
		url: '_comapplet_SignIn',
		method: 'POST',
		data
	})
}

// 修改密码
export const ChangePasswordAPI = (data) => {
	return request({
		url: '_comapplet_SignIn',
		method: 'POST',
		data
	})
}

// 车厂概况
export const Carfactoryoverview = (data) => {
	return request({
		url: '_comapplet_Set',
		method: 'POST',
		data
	})
}

// 车位  营收  设备 流量//  去年的营收统计//车流量变化趋势//今年的营收统计/、进出记录
export const parkinglot = (data) => {
	return request({
		url: '_comapplet_Park',
		method: 'POST',
		data
	})
}

// 菜单栏
export const menu = (data) => {
	return request({
		url: '_comapplet_Menu',
		method: 'POST',
		data
	})
}

// 集中值守
export const Centralizedduty = (data) => {
	return request({
		url: '_comapplet_Set',
		method: 'POST',
		data
	})
}

export const getcarparklog = (data) => {
	return request({
		url: '_comapplet_Camera',
		method: 'POST',
		data
	})
}






// 场内车辆管理
export const Vehiclemanagement = (data) => {
	return request({
		url: '_comapplet_Org',
		method: 'POST',
		data
	})
}


// 场内车辆管理所有的数据      删除数据
export const carlist = (data) => {
	return request({
		url: '_comapplet_CarList',
		method: 'POST',
		data
	})
}

// 出入记录
export const exitrecords = (data) => {
	return request({
		url: '_comapplet_CarList',
		method: 'POST',
		data
	})
}
// 临时车收费记录
export const getTemporaryvehicle = (data) => {
	return request({
		url: '_comapplet_CarTemp',
		method: 'POST',
		data
	})
}



// 黑白名单管理
export const Obtainlist = (data) => {
	return request({
		url: '_comapplet_CarTemp',
		method: 'POST',
		data
	})
}

// 优惠券管理
export const couponlist = (data) => {
	return request({
		url: '_comapplet_Coupons',
		method: 'POST',
		data
	})
}


// 业主车管理
export const getcarmanage = (data) => {
	return request({
		url: '_comapplet_CarOwner',
		method: 'POST',
		data
	})
}

// 月费车位管理
export const getMonthlycar = (data) => {
	return request({
		url: '_comapplet_CarMfee',
		method: 'POST',
		data
	})
}
// 添加月费车位
export const getaddMonthlycar = (data) => {
	return request({
		url: '_comapplet_Org',
		method: 'POST',
		data
	})
}
// 获取月费价格
export const getMonthlycarPrice = (data) => {
	return request({
		url: '_comapplet_Car',
		method: 'POST',
		data
	})
}
// 远程开闸
export const getRemoteopening = (data) => {
	return request({
		url: '_comapplet_Org',
		method: 'POST',
		data
	})
}
// switch状态
export const getswitchs = (data) => {
	return request({
		url: '_comapplet_Car',
		method: 'POST',
		data
	})
}