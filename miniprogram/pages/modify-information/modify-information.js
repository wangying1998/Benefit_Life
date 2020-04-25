import {
	sendDynamic,
} from '../../api/api.js'

// pages/toboo/toboo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  update: function () {
    let value = wx.getStorageSync('userInfo');
    console.log("value",value)
      // 每日宜忌
      let params = {
          nickName: value.nickName,
          avatar: value.avatarUrl
      };
      sendDynamic(params).then(res => {
        this.setData({
          shouldToDo: res,
        })
        console.log("修改本人资料",res);
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