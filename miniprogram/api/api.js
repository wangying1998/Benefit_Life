import { request } from '../utils/request.js';
import {
	getSessionData,
  } from '../utils/session';
  var openId = getSessionData('openId');
  var userId = getSessionData('userId');
	
  

// 更新用户信息
export function updateBaseinfo (data){  // 获取体质测试列表
	data.openId =  openId;
	data.userId = userId;
	return request({
		url: '/update_baseinfo',
		data
	});
}


// 获取首页数据
export function getHomeData (data){  // 获取体质测试列表
	data.openId =  openId;
	data.userId = userId;
	return request({
		url: '/home',
		data
	});
}

// 获取个人档案
export function getPhysicalInfo (data){  // 获取体质测试列表
	data.openId =  openId;
	data.userId = userId;
	return request({
		url: '/home/physicalinfo',
		data
	});
}

// 获取体质测试列表
export function getTestList (data){
	data.openId =  openId;
	data.userId = userId;  
	return request({
		url: '/physical/test',
		data
	});
}

// 获取每日宜忌详情
export function getShouldAvoid(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/home/should_avoid",
		data
	})
}

// 获取推文
export function getRecoArticle(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/articles",
		data
	})
}
// 获取推文
export function getArtDetails(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/articles/detail",
		data
	})
}


// 获取体质测试题目
export function getTestQuestion(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/physical/test",
		data
	})
}

// 提交体质测试
export function sendTestAnswer(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/physical/answer",
		data
	})
}

// 获取调养病情
export function getDiseaseList(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/disease/list",
		data
	})
}
// 获取调养详情
export function getDiseaseDetail(data){	
	data.openId =  openId;
	data.userId = userId;
	return request({
		url: "/disease/detail",
		data
	})
}

// 获取动态列表
export function getSquareList(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/square/activity",
		data
	})
}

// 获取我的动态列表
export function getUserSquareList(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/square/user/activity",
		data
	})
}


// 发布动态
export function sendDynamic(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/square/activity/add",
		data
	})
}

// 删除动态
export function deleteDynamic(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/square/activity/delete",
		data
	})
}
// 个人信息
export function getMyinfo(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/my",
		data
	})
}

// 我喜欢的
export function getMyLike(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/my/like",
		data
	})
}

// 点赞/喜欢
export function clickLike(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/like",
		data
	})
}
// 取消点赞
export function disLike(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/dislike",
		data
	})
}
// 反馈
export function Feedback(data){
	data.openId =  openId;
	data.userId = userId;	
	return request({
		url: "/feedback",
		data
	})
}



