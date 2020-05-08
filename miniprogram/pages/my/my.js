// miniprogram/pages/tabs/my/my.js
import {
  getMyinfo
} from '../../api/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalList: [
      {
        id: 'collection',
        icon: '../../images/like.png',
        text: '我喜欢的',
      },
      {
        id: 'my-post',
        icon: '../../images/collection.png',
        text: '我的动态',
      },
      {
        id: 'physique',
        icon: '../../images/wode.png',
        text: '我的体质',
      },
      {
        id: 'feedback',
        icon: '../../images/feedback.png',
        text: '意见反馈',
      },
      {
        id: 'settings',
        icon: '../../images/setting.png',
        text: '关于我们',
      },
    ],
    userInfo: {},
  },
  // 修改个人资料
  editInfo: function() {
    wx.navigateTo({
      url: "/pages/about-us/about-us",
    })
  },
  gotoPage:function(e) {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权',
            content: '此功能需要您授权用户信息',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '去授权',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            },
          });
        }else {
          switch(e.target.id){
            case 'collection':
              wx.navigateTo({
                url: '/pages/collection/collection',
              })
            case 'my-post':
              wx.navigateTo({
                url: '/pages/my-post/my-post',
              })
              break;
            case 'physique':
              that.getInfo();
              break;
            case 'feedback':
              wx.navigateTo({
                url: '/pages/feedback/feedback',
              })
              break;
            case 'settings':
              wx.navigateTo({
                url: '/pages/about-us/about-us',
              })
              break;
            default:
          }
        } 
      } 
    });
  },
  getInfo: function () {
    // this.getUserInfo();
    getMyinfo({}).then(res => {
      if(res.data[0].physical) {
        wx.navigateTo({
          url: '/pages/test-result/test-result',
        })
      }else {
        wx.navigateTo({
          url: '/pages/physique/physique',
        })
      }
    })
		
  },
  getUserInfo() {
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权',
            content: '此功能需要您授权用户信息',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '去授权',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            },
          });
        } 
      } 
    });
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 点击查看体质测试
    this.getUserInfo();
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
    })
  },
})