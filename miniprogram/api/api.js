import { request } from '../util/request.js';

export function getTestList (data){  // 获取体质测试列表
	return request({
		url: '/test/answer',
		data
	});
}
