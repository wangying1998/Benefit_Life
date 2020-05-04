// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  getUserSquareList,
  deleteDynamic
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
    getUserSquareList({}).then(res => {
			this.setData({
        squareList: res[0].actList,
        myInfo: res[0],
      })
      // wx.setNavigationBarTitle({
      //   title: res.data[0].name//页面标题为路由参数
      // })
			console.log("我的动态",res);
		})

  },
  goDelete() {
    deleteDynamic({}).then(res => {
			this.setData({
				squareList: res,
			})
			console.log("删除动态",res);
		})
  },
  // 点赞
  gotoLike: function(e) {
    var param = {
      likeId: e.currentTarget.dataset['id'],
      class: 1
    }
    clickLick(param).then(res => {
      // this.setData({
      // 	squareList: res,
      // })
      console.log("点赞",res);
    })
    
  },
  // 取消点赞
  goDislike: function(e) {

    console.log("取消点赞1",e,e.currentTarget.dataset.id)
    var param = {
      id: e.currentTarget.dataset['id'],
      class: 1
    }
    disLick(param).then(res => {
      console.log("取消点赞",res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
   
  //   this.getData(options.id);

    
  // },

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
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province //所在省
        var city = userInfo.city //所在市
        var country = userInfo.country //所在国家
      }
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