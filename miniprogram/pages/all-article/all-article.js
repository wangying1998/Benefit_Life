// pages/toboo/toboo.js
import {
  getRecoArticle,
  getMyinfo
} from '../../api/api.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RecoArticle: [],
  },
  detailsArticle (e) {
    let query = e.currentTarget.dataset['artid'];
    wx.navigateTo({
      url: `/pages/detail-article/detail-article?artid=${query}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 推荐文章
    let that = this;
    getRecoArticle({}).then(res => {
      this.setData({
        RecoArticle: res.data,
      })
      let lists = res.data;
      var relayArr = [];
      for (var i = 0; i < lists.length; i++) {
        relayArr.push(lists[i].content);
      }
      for (let i = 0; i < relayArr.length; i++) {
        WxParse.wxParse('content' + i, 'html', relayArr[i], that);
        if (i === relayArr.length - 1) {
          WxParse.wxParseTemArray("relayArr", 'content', relayArr.length, that);
        }
      }
      console.log("是啥",relayArr);
      console.log("这里", WxParse.wxParseTemArray("relayArr", 'content', relayArr.length, that))
      console.log("推荐文章", res.data);
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