import {
    getHomeData,
    getPhysicalInfo,
    getMyinfo
} from '../../api/api.js'
  
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
  
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
      suggest: {},
      should: {}, 
      meals: {},
      userInfo: {},
      shouldToDo: '',
      RecoArticle: [],
      physicalInfo: '',
      personalInfo: {}
    },
    getHomeData() {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
      })
      // 获取首页数据
      getHomeData({}).then(res => {
        this.setData({
          slideList: res.slideList,
          articleList: res.articleList,
          should: res.should,
          living: res.living,
          meals: res.meals,
          suggest: res.suggest
        })
      })
      getMyinfo({}).then(res => {
        this.setData({
          personalInfo: res.data[0],
        })
      })

 
    },
    // // 获取个人档案
    // getPhysicalInfo() {
    //   getPhysicalInfo({}).then(res => {
    //     this.setData({
    //       physicalInfo: res,
    //     })
    //   })
    // },
     // 点击查看体质测试
     gotoFile() {
      var that = this;
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {

            if(that.data.personalInfo.physical) {
              wx.navigateTo({
                url: '/pages/test-result/test-result',
              })
            } else {
              wx.navigateTo({
                url: '/pages/physique/physique',
              })
            }
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          } 
        });
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
    moreArticle () {
      wx.navigateTo({
        url: '/pages/all-article/all-article',
      })
    },
    detailsArticle (e) {
      let query = e.currentTarget.dataset['artid'];
      wx.navigateTo({
        url: `/pages/detail-article/detail-article?artid=${query}`,
      })
    },
    onShow: function () {
      this.getHomeData();
      // this.getPhysicalInfo();
    },
  })