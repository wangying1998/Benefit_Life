import {
  getArtDetails,
  clickLike,
  disLike
} from '../../api/api.js'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailArt: {},
    content: ''
  },
  getDetail (id) {
    var that = this;
    let param = {
      id: id,
    }
    getArtDetails(param).then(res => {
      this.setData({
        detailArt: res.data[0]
      })
      WxParse.wxParse('content' , 'html', res.data[0].content, this, 5);
    })

    
  },
  // 点赞
  gotoLike: function(e) {
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userInfo']) {
          var that = this;
          var art = that.data.detailArt;
          art.isLike = !art.isLike
          this.setData({
            detailArt: art
          })
          var param = {
            likeId: e.currentTarget.dataset.id,
            class: 0 // 推文
          }
          clickLike(param).then(res => {
          })
        }else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  // 取消点赞
  goDislike: function(e) {
    var that = this;
    var art = that.data.detailArt;
    art.isLike = !art.isLike;
    this.setData({
      detailArt: art
    })
    var param = {
      id: e.currentTarget.dataset['id'],
      class: 0
    }
    disLike(param).then(res => {
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "文章详情"
    })
    this.getDetail(options.artid);
    
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