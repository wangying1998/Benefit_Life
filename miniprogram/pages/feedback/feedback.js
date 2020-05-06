import {
	Feedback
} from '../../api/api.js'

// pages/toboo/toboo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
  },
  
  input:function(e){
    this.setData({
      content:e.detail.value
    })
  },
  sumbitFeedback() {
    Feedback({}).then(res => {
      // 目前是没成功的状态，发布动态不成功
      wx.navigateBack();
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }, 
})