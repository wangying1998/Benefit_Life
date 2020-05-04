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
        console.log("首页数据",res);
        // console.log("tuijianwenzhang ",this.data.articleList);
      })
      getMyinfo({}).then(res => {
        // this.setData({
        //   : res,
        // })
        console.log("首页个人信息", res);
      })

 
    },
    // 获取个人档案
    getPhysicalInfo() {
      getPhysicalInfo({}).then(res => {
        this.setData({
          physicalInfo: res,
        })
        console.log("个人档案", res);
      })
    },
    // 点击查看体质测试
    gotoFile() {
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              url: '/pages/physique/physique',
            })
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
          } 
        });
    },
    gotoMeal() {
      wx.navigateTo({
        url: '/pages/meal/meal',
      })
    },
    gotoLiving() {
      wx.navigateTo({
        url: '/pages/living/living',
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
      this.getPhysicalInfo();
    },
  })