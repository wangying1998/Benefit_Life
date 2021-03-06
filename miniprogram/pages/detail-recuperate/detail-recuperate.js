
import {
  getDiseaseDetail
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diseaseDetail: {}
  },
  getDiseaseDetail(id) {		// 获取调养数据
    let param = {
      id: id
    }
    // var that = this;
		getDiseaseDetail(param).then(res => {
			this.setData({
				diseaseDetail: res,
      })
      console.log("调养详情",res);
      wx.setNavigationBarTitle({
        title: res.data[0].name//页面标题为路由参数
      })
    })
    
		
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getDiseaseDetail(options.id);
    
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