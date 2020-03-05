// miniprogram/pages/home/home.js
import {
	getHomeData,
	updateBaseinfo
} from '../../../api/api.js'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		slideList: [],
	},

	getHomeData() {		// 获取轮播列表
		getHomeData({}).then(res => {
			console.log(111111111,res)
		})
	},
	updateBaseinfo(){
		let params = {
			nickName: '没错就是我了',
			avatar: "头像"
		};
		updateBaseinfo(params).then(res=>{
			console.log(22222222,res)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getHomeData();
		this.updateBaseinfo();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
