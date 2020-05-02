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
    globalData: {
      userInfo: null
    },
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
      wx.navigateTo({
        url: '/pages/physique/physique',
      })
    },
  
    onLoad: function () {
      // var that = this;
      // // 查看是否授权
      // // 获取用户信息
      // wx.getSetting({
      //     success: function(res) {
      //         if (res.authSetting['scope.userInfo']) {
      //             wx.getUserInfo({
      //                 success: function(res) {
      //                     // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
      //                     // 根据自己的需求有其他操作再补充
      //                     // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
      //                     wx.login({
      //                         success: res => {
      //                             // 获取到用户的 code 之后：res.code
      //                             console.log("用户的code:" + res.code);
      //                             console.log(res);
      //                             // 可以传给后台，再经过解析获取用户的 openid
      //                             // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
      //                             // wx.request({
      //                             //     // 自行补上自己的 APPID 和 SECRET
      //                             //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
      //                             //     success: res => {
      //                             //         // 获取到用户的 openid
      //                             //         console.log("用户的openid:" + res.data.openid);
      //                             //     }
      //                             // });
      //                         }
      //                     });
      //                     // 本地存储个人信息
      //                     wx.setStorage({
      //                       key: "userInfo",
      //                       data: res.userInfo 
      //                     })  
      //                 }
      //             });
      //         } else {
      //             // 用户没有授权
      //             // 改变 isHide 的值，显示授权页面
      //             that.setData({
      //                 isHide: true
      //             });
      //         }
      //     }
      // });
      this.getHomeData();
      this.getPhysicalInfo();
    },
    bindGetUserInfo: function (e) {
      //     if (e.detail.userInfo) {
      //         //用户按了允许授权按钮
      //         var that = this;
      //         // 获取到用户的信息了，打印到控制台上看下
      //         console.log("用户的信息如下：");
      //         console.log(e.detail.userInfo);
      //         //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      //         that.setData({
      //             isHide: false
      //         });
      //         this.getHomeData();
      // 	      this.getShouldAvoid();
      // 	      this.getRecoArticle();
      //     } else {
      //         //用户按了拒绝按钮
      //         wx.showModal({
      //             title: '警告',
      //             content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //             showCancel: false,
      //             confirmText: '返回授权',
      //             success: function(res) {
      //                 // 用户没有授权成功，不需要改变 isHide 的值
      //                 if (res.confirm) {
      //                     console.log('用户点击了“返回授权”');
      //                 }
      //             }
      //         });
      //     }
    }
  })