// miniprogram/pages/tabs/squre/square.js

import {
	getSquareList,
} from '../../api/api.js'
var Time = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareList: {},
    userInfo: {},
    like: {},
  },

  getData() {
    getSquareList({}).then(res => {
			this.setData({
				squareList: res.list,
			})
			console.log("动态",res.list);
		})

  },
  gotoSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 点赞
  gotoLike: function() {
    
  },
  // 去消息通知
  gotoNotice: function() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  // 去发送
  gotoSend: function() {
    wx.navigateTo({
      url: '/pages/send-dynamic/send-dynamic'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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
    this.getData();
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
  })
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