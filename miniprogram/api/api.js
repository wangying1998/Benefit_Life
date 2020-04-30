import { request } from '../utils/request.js';

// 获取轮播列表
export function getHomeData (data){  // 获取体质测试列表

	return request({
		url: '/home',
		data
	});
}
// 获取个人档案
export function getPhysicalInfo (data){  // 获取体质测试列表
	return request({
		url: '/home/physicalinfo',
		data
	});
}

// 获取体质测试列表
export function getTestList (data){  
	return request({
		url: '/physical/test',
		data
	});
}

// 修改头像等基本信息
export function updateBaseinfo(data){	
	return request({
		url: "/update_baseinfo",
		data
	})
}
// 获取每日宜忌详情
export function getShouldAvoid(data){	
	return request({
		url: "/home/should_avoid",
		data
	})
}

// 获取推文
export function getRecoArticle(data){	
	return request({
		url: "/articles",
		data
	})
}

// 获取体质测试题目
export function getTestQuestion(data){	
	return request({
		url: "/physical/test",
		data
	})
}

// 提交体质测试
export function sendTestAnswer(data){	
	return request({
		url: "/physical/answer",
		data
	})
}

// 获取调养病情
export function getDiseaseList(data){	
	return request({
		url: "/disease/list",
		data
	})
}
// 获取调养详情
export function getDiseaseDetail(data){	
	return request({
		url: "/disease/detail",
		data
	})
}

// 获取动态列表
export function getSquareList(data){	
	return request({
		url: "/square/activity",
		data
	})
}

// 发布动态
export function sendDynamic(data){	
	return request({
		url: "/square/activity/add",
		data
	})
}

// 删除动态
export function deleteDynamic(data){	
	return request({
		url: "/square/activity/delete",
		data
	})
}




