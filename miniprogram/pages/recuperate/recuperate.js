// miniprogram/pages/tabs/recuperate/recuperate.js

import {
  getDiseaseList,
} from '../../api/api.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  getDiseaseList() {		// 获取调养数据
    // 返回改成数组
		getDiseaseList({}).then(res => {
			this.setData({
				diseaseList: res,
      })
      console.log("调养数据",res);
		})
		
	},
  gotoRecuDetail: function (e) {
    let query = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: `/pages/detail-recuperate/detail-recuperate?id=${query}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDiseaseList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})