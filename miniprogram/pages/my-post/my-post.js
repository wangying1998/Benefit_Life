// miniprogram/pages/tabs/squre/square.js

import {
	getSquareList,
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareList: {},
    userInfo: {},
  },

  getData() {
    getSquareList({}).then(res => {
			this.setData({
				squareList: res,
			})
			console.log("动态",res);
		})

  },
  gotoSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  gotoLike: function() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  gotoNotice: function() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  gotoSend: function() {
    wx.navigateTo({
      url: '/pages/send-dynamic/send-dynamic'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
  })
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