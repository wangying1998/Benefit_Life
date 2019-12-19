// 请求方法
function request(options = {}){
	wx.showLoading();
	return new Promise((resolve, reject)=>{
		wx.cloud.callFunction({
		  name: 'commonApi',
		  data: options
		}).then(res => {
			wx.hideLoading();
			resolve(res.result.data)
		}).catch(err => {
			wx.showToast(err.errMsg)
			console.error(err)
		})
	})
}

module.exports = {
	request
};