import { getSessionData } from './session';

// 请求方法
function request(options){
	wx.showLoading();
	return new Promise((resolve, reject)=>{
		const {
			data = {}
		} = options;

		const { userId, openId } = getSessionData();
		
		if(userId && openId){
			Object.assign(data, { userId, openId });
		}else{
			wx.hideLoading()
		}

		wx.cloud.callFunction({
			name: 'commonApi',
			data: options
		}).then(res => {
			wx.hideLoading();
			resolve(res.result)
		}).catch(err => {
			wx.showToast(err.errMsg)
			console.error(err)
		})
	})
}

module.exports = {
	request
};