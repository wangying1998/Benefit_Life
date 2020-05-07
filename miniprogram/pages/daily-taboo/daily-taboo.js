// pages/toboo/toboo.js
import {
  getShouldAvoid,
} from '../../api/api.js'

import {
  calendar
} from '../../api/calendar';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldToDo: '',
  },
  getShouldAvoid(id) {
    let param = {
      id: id
    }
    getShouldAvoid(param).then(res => {
      this.setData({
        avoid: res.data[0].avoid,
        should: res.data[0].should
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShouldAvoid(options.id);
    this.setData({
      lunar: calendar.solar2lunar()   // 阴历转换
    })
    console.log(this.data.lunar)
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