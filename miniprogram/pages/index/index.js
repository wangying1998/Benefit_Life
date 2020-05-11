import {
  getHomeData,
  getMyinfo
} from '../../api/api.js'

import {
  calendar
} from '../../api/calendar'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slideList: '', //轮播
    articleList: [], // 时令好文
    living: {}, // 起居
    meals: {},
    userInfo: {},
    RecoArticle: [],
    personalInfo: {}
  },
  getHomeData() {
    // 获取首页数据
    getHomeData({}).then(res => {
      this.setData({
        slideList: res.slideList,
        articleList: res.articleList,
        living: res.living,
        meals: res.meals,
        should: res.suggest.should,
        avoid: res.suggest.avoid,
        suggest: res.suggest,
      })
    })
    getMyinfo({}).then(res => {
      this.setData({
        personalInfo: res.data[0],
      })
    })
  },
  // 点击查看体质测试
  gotoFile() {
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          let info = this.data.personalInfo;
          if(info.physical){
            wx.navigateTo({
              url: '/pages/test-result/test-result',
            })
          }else {
            wx.navigateTo({
              url: '/pages/physique/physique',
            })
          }
        }else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  // 食材
  gotoMeal() {
    wx.navigateTo({
      url: '/pages/meal/meal',
    })
  },
  // 起居
  gotoLiving() {
    wx.navigateTo({
      url: '/pages/living/living',
    })
  },
  // 每日宜忌
  goDailytaboo(e) {
    let query = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: `/pages/daily-taboo/daily-taboo?id=${query}`,
    })
  },
  // 查看更多
  moreArticle() {
    wx.navigateTo({
      url: '/pages/all-article/all-article',
    })
  },
  detailsArticle(e) {
    let query = e.currentTarget.dataset['artid'];
    wx.navigateTo({
      url: `/pages/detail-article/detail-article?artid=${query}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let user = wx.getStorageSync('user');
    // this.setData({
    //   userInfo: user
    // })
    this.setData({
      lunar: calendar.solar2lunar()   // 阴历转换
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
    this.getHomeData();
    let user = wx.getStorageSync('user');
    this.setData({
      userInfo: user
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