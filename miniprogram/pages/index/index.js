import {
    getHomeData,
    getShouldAvoid,
    getRecoArticle,
    getPhysicalInfo
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
      // isHide: false,
      slideList: '',
      userInfo: {},
      shouldToDo: '',
      RecoArticle: [],
      physicalInfo: '',
    },
    // globalData: {
    //   userInfo: null
    // },
    getHomeData() {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
      })
      // 获取轮播列表
      getHomeData({}).then(res => {
        this.setData({
          slideList: res.slideList,
        })
        console.log(33333, this.slideList);
      })
      // 推荐文章
      let that = this;
      getRecoArticle({}).then(res => {
        this.setData({
          RecoArticle: res.data,
        })
        let lists = res.data;
        var relayArr = [];
        for (var i = 0; i < lists.length; i++) {
          relayArr.push(lists[i].content);
        }
        for (let i = 0; i < relayArr.length; i++) {
          WxParse.wxParse('content' + i, 'html', relayArr[i], that);
          if (i === relayArr.length - 1) {
            WxParse.wxParseTemArray("relayArr", 'content', relayArr.length, that);
          }
        }
        console.log(relayArr);
        console.log("这里", WxParse.wxParseTemArray("relayArr", 'content', relayArr.length, that))
        console.log("推荐文章", res.data);
      })
      // 每日宜忌
      getShouldAvoid({}).then(res => {
        this.setData({
          shouldToDo: res,
        })
        console.log("适宜", res);
      })
    },
    // 获取个人档案
    // 获取的时候字段表明曾经是否测试过？
    // 无测试结果到测试页面，有测试则出现结果？？？？
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
  
    onShow: function () {
      this.getHomeData();
      this.getPhysicalInfo();
    },
  })