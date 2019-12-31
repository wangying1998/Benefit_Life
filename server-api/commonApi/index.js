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
	// 体质测试模块
		case '/test/list':				// 获取体质测试试题列表接口
			return getTestList();
		case '/test/answer':			// 接收答案-计算分数-返回体质类别及特征
			return getPhysicalType(data);
	// 首页接口
		case '/home/slidepic':			// 首页轮播图
			return returnSlides();
		case '/home/homedata':			// 首页 档案中体质类别 + 每日宜忌 + 三餐 + 起居
			return returnHomeData();
		case '/home/article_list':			// 首页 时令好文列表
			return returnArticleList();
	// 个人档案
		case '/profile':
			return returnProfile();
	// 每日宜忌详情
		case '/should_avoid':
			return shouldOrAvoid();

		default:
			break;
	}
}

async function userLogin(data){		// 用户注册/登录
	let db_data = await db.collection('user').where({
		openId: data
	}).get();
	if(db_data.data.length==0){
		let result = {};
		const add = await db.collection('user').add({
			data: {
				nickName: '没错就是我了',
				avatar: 'https://wx4.sinaimg.cn/mw690/006c4YZzgy1g2wewc760rj30u00u0aho.jpg',
				openId: data
			}
		});

		let id = add._id;
		result = await db.collection('user').doc(id).get();
		result.openId = data;
		return result;
	}else{
		return db_data;
	}
}

async function getTestList(){  // 获取体质测试试题列表接口
	return db.collection('physical_test').get();
}

async function getPhysicalType(data){  // 接收答案-计算分数-返回体质类别及特征
	// data = [
	// 	{id: 1, score: 3},
	// 	{id: 2, score: 3},
	// 	{id: 3, score: 2},
	// 	{id: 4, score: 3},
	// 	{id: 5, score: 3},
	// 	{id: 6, score: 3},
	// 	{id: 7, score: 3},
	// 	{id: 8, score: 3},

	// 	{id: 10, score: 3},
	// 	{id: 11, score: 3},
	// 	{id: 12, score: 3},
	// 	{id: 13, score: 2},
	// 	{id: 14, score: 3},
	// 	{id: 16, score: 3},

	// 	{id: 17, score: 3},
	// 	{id: 18, score: 3},
	// 	{id: 19, score: 3},
	// 	{id: 20, score: 2},
	// 	{id: 22, score: 3},
	// 	{id: 23, score: 3},

	// 	{id: 24, score: 3},
	// 	{id: 25, score: 3},
	// 	{id: 26, score: 4},
	// 	{id: 27, score: 3},
	// 	{id: 28, score: 2},
	// 	{id: 29, score: 3},
	// 	{id: 30, score: 3},
	// 	{id: 31, score: 3},

	// 	{id: 32, score: 3},
	// 	{id: 33, score: 3},
	// 	{id: 34, score: 3},
	// 	{id: 35, score: 4},
	// 	{id: 36, score: 2},
	// 	{id: 37, score: 3},
	// 	{id: 38, score: 3},
	// 	{id: 39, score: 2},

	// 	{id: 40, score: 4},
	// 	{id: 41, score: 2},
	// 	{id: 42, score: 3},
	// 	{id: 43, score: 3},
	// 	{id: 44, score: 3},
	// 	{id: 45, score: 3},

	// 	{id: 46, score: 2},
	// 	{id: 47, score: 2},
	// 	{id: 48, score: 3},
	// 	{id: 49, score: 2},
	// 	{id: 50, score: 3},
	// 	{id: 52, score: 2},

	// 	{id: 54, score: 3},
	// 	{id: 55, score: 3},
	// 	{id: 56, score: 3},
	// 	{id: 57, score: 2},
	// 	{id: 58, score: 3},
	// 	{id: 59, score: 2},

	// 	{id: 60, score: 2},
	// 	{id: 61, score: 3},
	// 	{id: 62, score: 3},
	// 	{id: 63, score: 3},
	// 	{id: 64, score: 2},
	// 	{id: 65, score: 2},
	// 	{id: 66, score: 3}
	// ];

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
	data.push({ id: 9,  score: data[1].score });
	data.push({ id: 15, score: data[2].score });
	data.push({ id: 53, score: data[3].score });
	data.push({ id: 51, score: data[7].score });
	data.push({ id: 21, score: data[13].score });

	data.forEach(item => {
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
	}
	
	if(trans.type_a >= 60
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
	}

	if(trans.type_a < 60){
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

	await db.collection('physical_feature').where({
		name: result.main[0]
	}).get().then(res=>{
		result.main_feature = res.data;
	});

	return result;
}

async function returnSlides(){			// 首页轮播图
	// return db.collection('slide-picture').get();
}

async function returnHomeData(){			// 首页 档案中体质类别 + 每日宜忌 + 三餐 + 起居
	let result = {};
		// 个人档案
	await Promise.all([
		// 宜
		db.collection('physical_should').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.should = res.data[index];
		}),
		// 忌
		db.collection('physical_avoid').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.avoid = res.data[index];
		}),
		// 三餐
		db.collection('meals_data').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.meals = res.data[index];
		}),
		// 起居
		db.collection('living_data').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			result.living = res.data[index];
		})
	]);

	return result;
}

async function returnProfile(){					// 个人档案
	let result = {};
	result = {
		avatar: "",
		physical: "平和质"
	}

	return result;
}

async function shouldOrAvoid(){				// 每日宜忌详情
	let result = {};
	// 宜
	await Promise.all([
		db.collection('physical_should').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			let idx = index<0 ? 0 : index;
			result.should = res.data[idx];
		}),
		// 忌
		db.collection('physical_avoid').get().then(res=>{
			let index = Math.floor(Math.random()*res.data.length);
			let idx = index<0 ? 0 : index;
			result.avoid = res.data[idx];
		})
	]);

	return result;
}

async function returnArticleList(){			// 首页 时令好文列表
	
}