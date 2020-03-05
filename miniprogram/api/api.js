import { request } from '../util/request.js';

export function getHomeData (data){  // 获取体质测试列表
	return request({
		url: '/home',
		data
	});
}

export function getTestList (data){  // 获取体质测试列表
	return request({
		url: '/physical/test',
		data
	});
}

export function updateBaseinfo(data){	// 修改头像等基本信息
	return request({
		url: "/update_baseinfo",
		data
	})
}
