// pages/home/my-physique/physique.js

import {
	getTestQuestion
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
    selectButton: [
      {
        id: '1',
        select: '没有'
      },
      {
        id: '2',
        select: '很少'
      },
      {
        id: '3',
        select: '有时'
      },
      {
        id: '4',
        select: '经常'
      },
      {
        id: '5',
        select: '总是'
      }
    ]
  },

  // 获取体质测试题目
  fitnessTestQuestions() {
		getTestQuestion({}).then(res => {
			this.setData({
        testList: res.data,
			})
			console.log("体质测试题目",res.data);
		})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fitnessTestQuestions();
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