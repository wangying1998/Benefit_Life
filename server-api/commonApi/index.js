// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	traceUser: true,
	env: 'test-gb0if'
  // env: 'node-l1lsj'
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	let { OPENID, APPID, UNIONID } = cloud.getWXContext()

	let url = event.url,
		data = event.data;

	console.log('-------------',url, data)
	switch (url){
	// 用户注册/登录
		case '/login':
			return userLogin(OPENID);
	// 更新用户基本信息
		case '/update_baseinfo':
			return updateBaseinfo(data);
	// 体质测试模块
	// 获取体质测试试题接口
		case '/physical/test':
			return getTestList(data);
	// 接收答案-计算分数-返回体质类别及特征
		case '/physical/answer':
			return getPhysicalType(data);
	// 首页接口
		case '/home':			// 首页 档案中体质类别 + 每日宜忌 + 三餐 + 起居
			return returnHomeData(data);
		case '/articles':
			return getAllArticles(data);
		case '/article/detail':
			return getArtDetail(data);
	// 个人档案
		case '/home/physicalinfo':
			return returnPhysicalInfo(data);
	// 每日宜忌详情
		case '/home/should_avoid':
			return shouldOrAvoid(data);

	// 查询动态列表
	case '/square/activity':
		return returnActivity(data);
	case '/square/user/activity':
		return returnMyDynamicList(data);
	// 发布动态
		case '/square/activity/add':
			return addDynamic(data);
	// 删除动态
		case '/square/activity/delete':
			return deleteDynamic(data);
	// 喜欢推文/动态
		case '/like':
			return likeSomthing(data);

	// 调养
		case '/disease/list':
			return returnRecuperate(data);
	// 调养详情
		case '/disease/detail':
			return returnRecuperateDetail(data);
	// 饮食 & 饮食详情
		case '/food/detail':
			return returnFoodList(data);

	// 我的
		case '/my':
			return returnUserInfo(data);
	// 我喜欢的动态/推文
		case '/my/like':
			return returnLikeList(data);
	// 反馈
		case '/feedback':
			return feedback(data);

		default:
			break;
	}
}

async function userLogin(openid){		// 用户注册/登录
	let db_data = await db.collection('user').where({
		openId: openid
	}).get();

	if(db_data.data.length == 0){
		let result = {};
		const user = await db.collection('user').add({		// 完成用户数据初始化
			data: {
				nickName: "",
				avatar: "",
				openId: openid,
				physical: "",
				both: "",
				create_time: new Date(),
				update_time: new Date()
			}
		});

		let id = user._id;
		result = await db.collection('user').doc(id).get();
		result.openId = openid;
		
		return result;
	}else{
		return db_data;
	}
}

async function updateBaseinfo(data){		// 更新用户头像昵称等信息
	return await db.collection('user').doc(data.userId).update({
		data: {
			nickName: data.nickName,
			avatar: data.avatar,
			update_time: new Date()
		}
	});
}

async function getTestList(data){  // 获取体质测试试题接口
	return await db.collection('physical_test').get();
}

async function getPhysicalType(data){  // 接收答案-计算分数-返回体质类别及特征  同时更新用户体质类别
	let origin = {  // 原始分
			type_a: 0,    //  平和质
			type_b: 0,    //  气虚质
			type_c: 0,    //  阳虚质
			type_d: 0,    //  阴虚质
			type_e: 0,    //  痰湿质
			type_f: 0,    //  湿热质
			type_g: 0,    //  血瘀质
			type_h: 0,    //  气郁质
			type_i: 0    //  特禀质
		},
	trans = {  // 转化分
		type_a: 0,    //  平和质
		type_b: 0,    //  气虚质
		type_c: 0,    //  阳虚质
		type_d: 0,    //  阴虚质
		type_e: 0,    //  痰湿质
		type_f: 0,    //  湿热质
		type_g: 0,    //  血瘀质
		type_h: 0,    //  气郁质
		type_i: 0    //  特禀质
	},
	result = {    // 得出的体质结果
		main: [],
		both: [],
		tendency: [],
		main_feature: []
	};

	// 将66道题目补全
	data.answer.push({ id: 9,  score: data.answer[1].score });
	data.answer.push({ id: 15, score: data.answer[2].score });
	data.answer.push({ id: 53, score: data.answer[3].score });
	data.answer.push({ id: 51, score: data.answer[7].score });
	data.answer.push({ id: 21, score: data.answer[13].score });

	data.answer.forEach(item => {
		switch(item.id){ 
			case 2: 
			case 3: 
			case 4: 
			case 5: 
			case 7: 
			case 8:
				item.score = 6 - item.score;
				break;
			default: 
				break;
		}

		if(item.id < 9){
			origin.type_a += item.score;
		}else if(item.id < 17){
			origin.type_b += item.score;
		}else if(item.id < 24){
			origin.type_c += item.score;
		}else if(item.id < 32){
			origin.type_d += item.score;
		}else if(item.id < 40){
			origin.type_e += item.score;
		}else if(item.id < 46){
			origin.type_f += item.score;
		}else if(item.id < 53){
			origin.type_g += item.score;
		}else if(item.id < 60){
			origin.type_h += item.score;
		}else if(item.id < 67){
			origin.type_i += item.score;
		}

		trans.type_a = Math.round([(origin.type_a - 8)/(8*4)]*100);
		trans.type_b = Math.round([(origin.type_b - 8)/(8*4)]*100);
		trans.type_c = Math.round([(origin.type_c - 7)/(7*4)]*100);
		trans.type_d = Math.round([(origin.type_d - 8)/(8*4)]*100);
		trans.type_e = Math.round([(origin.type_e - 8)/(8*4)]*100);
		trans.type_f = Math.round([(origin.type_f - 6)/(6*4)]*100);
		trans.type_g = Math.round([(origin.type_g - 7)/(7*4)]*100);
		trans.type_h = Math.round([(origin.type_h - 7)/(7*4)]*100);
		trans.type_i = Math.round([(origin.type_i - 7)/(7*4)]*100);
	});

	if(trans.type_a >= 60
		&& trans.type_b < 30
		&& trans.type_c < 30
		&& trans.type_d < 30
		&& trans.type_e < 30
		&& trans.type_f < 30
		&& trans.type_g < 30
		&& trans.type_h < 30
		&& trans.type_h < 30
	){
		if(result.main.length == 0) result.main.push('平和质');
	}else if(trans.type_a >= 60
		&& trans.type_b < 40
		&& trans.type_c < 40
		&& trans.type_d < 40
		&& trans.type_e < 40
		&& trans.type_f < 40
		&& trans.type_g < 40
		&& trans.type_h < 40
		&& trans.type_h < 40
	){
		if(result.main.length == 0) result.main.push('基本是平和质');
	}else if(trans.type_a < 60){
		if(trans.type_b >= 40){
			if(result.main.length == 0) result.main.push('气虚质');
			else result.both.push('气虚质');
		}else if(30 <= trans.type_b <= 39){
			result.tendency.push('气虚质');
		}
		
		if(trans.type_c >= 40){
			if(result.main.length == 0) result.main.push('阳虚质');
			else result.both.push('阳虚质');
		}else if(30 <= trans.type_c <= 39){
			result.tendency.push('阳虚质');
		}
		
		if(trans.type_d >= 40){
			if(result.main.length == 0) result.main.push('阴虚质');
			else result.both.push('阴虚质');
		}else if(30 <= trans.type_d <= 39){
			result.tendency.push('阴虚质');
		}
		
		if(trans.type_e >= 40){
			if(result.main.length == 0) result.main.push('痰湿质');
			else result.both.push('痰湿质');
		}else if(30 <= trans.type_e <= 39){
			result.tendency.push('痰湿质');
		}
		
		if(trans.type_f >= 40){
			if(result.main.length == 0) result.main.push('湿热质');
			else result.both.push('湿热质');
		}else if(30 <= trans.type_f <= 39){
			result.tendency.push('湿热质');
		}
		
		if(trans.type_g >= 40){
			if(result.main.length == 0) result.main.push('血瘀质');
			else result.both.push('血瘀质');
		}else if(30 <= trans.type_g <= 39){
			result.tendency.push('血瘀质');
		}
		
		if(trans.type_h >= 40){
			if(result.main.length == 0) result.main.push('气郁质');
			else result.both.push('气郁质');
		}else if(30 <= trans.type_h <= 39){
			result.tendency.push('气郁质');
		}
		
		if(trans.type_i >= 40){
			if(result.main.length == 0) result.main.push('特禀质');
			else result.both.push('特禀质');
		}else if(30 <= trans.type_i <= 39){
			result.tendency.push('特禀质');
		}
	}

	await db.collection('user').doc(data.userId).update({		// 更新用户体质
		data: {
			physical: result.main[0],
			both: result.both.join(',')
		}
	});

	await db.collection('physical_feature').where({
		name: result.main[0]
	}).get().then(res=>{
		result.main_feature = res.data;
	});

	return result;
}

async function getAllArticles(){			// 获取所有推文列表
	return await db.collection('articles').get();
}
async function getArtDetail(data){		// 获取推文详情
	if(data.id){
		result = await db.collection('articles').where({
			_id: data.id
		}).get();

		let like_result = await db.collection('user_like').where({
			likeId: data.id,
			userId: data.userId
		}).get();

		if(like_result.data.length){
			result[0].isLike = true;	// 动态喜欢标识
		}else{
			result[0].isLike = false;	// 动态喜欢标识
		}
	}
	return result;
}
async function returnHomeData(data){			// 首页 档案中体质类别 + 每日宜忌 + 三餐 + 起居
	let result = {};
	let GLOBAL_USER = await db.collection('user').where({
		_id: data.userId
	}).get();
		// 个人档案
	await Promise.all([
		// 轮播图
		db.collection('slides_list').get().then(res=>{
			result.slideList = res.data;
		}),
		// 宜
		db.collection('suggest').where({
			class: 1,
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.should = res.data[index];
		}),
		// 忌
		db.collection('suggest').where({
			class: 0,
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.avoid = res.data[index];
		}),
		// 水果
		db.collection('food').where({
			class: 1,
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.meals = res.data[index, res.data];
		}),
		// 起居
		db.collection('living').where({
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.living = res.data[index];
		}),
		// 推文
		db.collection('articles').get().then(res=>{
			res.articleList = res.data.slice(0,5);
		})
	]);
	return result;
}

async function returnPhysicalInfo(data){
	let GLOBAL_USER = await db.collection('user').where({
		_id: data.userId
	}).get();

	// 个人体质档案 = 体质详情
	let result = db.collection('physical_feature').where({
		name: GLOBAL_USER.data[0].physical
	}).get();

	return result;
}

async function shouldOrAvoid(data){				// 每日宜忌详情
	let result = {};
	let GLOBAL_USER = await db.collection('user').where({
		_id: data.userId
	}).get();
	// 宜
	await Promise.all([
		// 宜
		db.collection('suggest').where({
			class: 1,
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.should = res.data[index];
		}),
		// 忌
		db.collection('suggest').where({
			class: 0,
			physical: GLOBAL_USER.data[0].physical
		}).get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.avoid = res.data[index];
		}),
	]);

	return result;
}

async function returnArticleList(data){			// 首页 时令好文列表
	return await db.collection('article_list').get();
}

async function returnMyDynamicList(data){		// 查询动态列表
	// 根据用户id进行筛选	-- 自己发表的动态
	let result = await db.collection('user').aggregate()
		.lookup({
			from: 'user_activity',
			pipeline: db.command.aggregate.pipeline()
			.match({
				userId: data.userId
			})
			.done(),
			as: 'actList',
		})
		.end()
		.catch(err => console.error(err));
	let temp = [];
	result.list.forEach(ele=>{
		if(ele._id == data.userId){
			temp.push(ele)
		}
	})
	return temp;
}
async function returnActivity(data){
	let result = {};
	if(data.id){
		let like_result = await db.collection('user_like').where({
			likeId: data.id,
			userId: data.userId
		}).get();

		result = await db.collection('user_activity').aggregate()
		.lookup({
			from: 'user',
			localField: 'userId',
			foreignField: '_id',
			as: 'userInfo',
		})
		.end()
		.catch(err => console.error(err))
		let tempArr = [];
		result.list.forEach(ele=>{
			if(ele._id == data.id){
				tempArr.push(ele)
			}
		})
		result = tempArr;

		if(like_result.data.length){
			result[0].isLike = true;	// 动态喜欢标识
		}else{
			result[0].isLike = false;	// 动态喜欢标识
		}
	}else{		// 所有动态
		// result = await db.collection('user_activity').get();
		result = await db.collection('user_activity').aggregate()
		.lookup({
			from: 'user',
			localField: 'userId',
			foreignField: '_id',
			as: 'userInfo',
		})
		.end()
		.catch(err => console.error(err))
		
		let like_result = await db.collection('user_like').get();
		console.log(33333333333333,like_result)
		result.list.forEach(async function(ele){
			ele.isLike = false;
			like_result.data.forEach(item=>{
				if(item.likeId == ele._id && item.userId == data.userId){
					ele.isLike = true;	// 动态喜欢标识
				}
			})
		})
	}
	return result;
}

async function addDynamic(data){		// 发布动态
	return await db.collection('user_activity').add({
		data: {
			userId: data.userId,
			content: data.content,
			imgs: data.imgs || [],
			likeCount: 0,
			create_time: new Date()
		}
	});
}

async function deleteDynamic(data){		// 删除动态
	return await db.collection('user_activity').doc(data.id).remove();
}

async function returnRecuperate(data){		// 调养
	let result = {};
	// 呼吸
	result.breath = await db.collection('disease').where({
		class: 1
	}).get();
	result.breath.class = '呼吸';

	// 常见问题
	result.common_question = await db.collection('disease').where({
		class: 2
	}).get();
	result.common_question.class = '常见问题';
	// 头面五官
	result.face = await db.collection('disease').where({
		class: 3
	}).get();
	result.face.class = '头面五官';
	// 女性保养
	result.woman = await db.collection('disease').where({
		class: 4
	}).get();
	result.woman.class = '女性保养';
	// 小儿（1~3岁）
	result.child = await db.collection('disease').where({
		class: 5
	}).get();
	result.child.class = '小儿（1~3岁）';
	// 救急
	result.aid = await db.collection('disease').where({
		class: 6
	}).get();
	result.aid.class = '救急';

	return result;
}

async function returnRecuperateDetail(data){		// 调养详情
	return await db.collection('disease').where({
		_id: data.id
	}).get();
}

async function returnFoodList(data){		// 饮食 & 详情
	return await db.collection('food').where({
		_id: data.id
	}).get();
}

async function returnUserInfo(data){		// 我的
	return db.collection('user').where({
		_id: data.userId
	}).get();
}

async function likeSomthing(data){
	return await db.collection('user_like').add({
		data: {
			...data,
			create_time: new Date()
		}
	});
}

async function returnLikeList(data){		// 我喜欢的动态/推文
	let result = {
		article: [],
		activity: []
	};
	// 动态
	// result.article = await db.collection('user_like').where({
	// 	userId: data.userId,
	// 	class: 1
	// }).get();
	// // 文章
	// result.activity = await db.collection('user_like').where({
	// 	userId: data.userId,
	// 	class: 0
	// }).get();
	// return result;

	let art_like = await db.collection('user_like').aggregate()
		.lookup({
			from: 'articles',
			localField: 'likeId',
			foreignField: '_id',
			as: 'article',
		}).lookup({
			from: 'user',
			localField: 'userId',
			foreignField: '_id',
			as: 'userInfo'
		})
		.end()
		.catch(err => console.error(err));
		if(art_like.list && art_like.list.length){
			art_like.list.forEach(ele => {
				if(ele.article.length){
					if(ele.userId == data.userId){
						result.article.push(ele)
					}
				}
			});
		}
	let act_like = await db.collection('user_like').aggregate()
		.lookup({
			from: 'user_activity',
			localField: 'likeId',
			foreignField: '_id',
			as: 'activity',
		}).lookup({
			from: 'user',
			localField: 'userId',
			foreignField: '_id',
			as: 'userInfo'
		})
		.end()
		.catch(err => console.error(err));
		if(act_like.list && act_like.list.length){
			act_like.list.forEach(ele => {
				if(ele.activity.length){
					if(ele.userId == data.userId){
						result.activity.push(ele)
					}
				}
			});
		}

		return result;
}

async function feedback(data){		// 反馈
	return await db.collection('feedback').add({
		data
	})
}