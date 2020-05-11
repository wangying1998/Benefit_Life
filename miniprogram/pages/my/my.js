// miniprogram/pages/tabs/my/my.js
import {
  getMyinfo,
  updateBaseinfo
} from '../../api/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalList: [
      {
        id: 'collection',
        icon: '../../images/collection.png',
        text: '我的喜欢',
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
      }
    ],
    userInfo: {},
  },
  bindGetUserInfo(){
    // 查看是否授权
    wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res)=> {
              this.setData({
                nickName: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl
              });
              let user = wx.getStorageSync('user');
              user.nickName = res.userInfo.nickName;
              user.avatar = res.userInfo.avatarUrl;
              wx.setStorageSync('user', user);
                
              updateBaseinfo({
                nickName: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl
              });
            }
          })
        }
      }
    });
  },

  // 修改个人资料
  editInfo: function() {
    wx.navigateTo({
      url: '/pages/modify-information/modify-information',
    })
  },
  gotoPage:function(e) {
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userInfo']) {
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
              this.getInfo();
              break;
            case 'feedback':
              wx.navigateTo({
                url: '/pages/feedback/feedback',
              })
              break;
            default:
              break;
          }
        }else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  getInfo: function () {
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindGetUserInfo();
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
})