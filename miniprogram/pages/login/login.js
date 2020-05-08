
import {
	updateBaseinfo,
} from '../../api/api.js'
import {
  getSessionData,
} from '../../utils/session';
// let paramDefault = {
//   openId: getSessionData('openId'),
//   userId: getSessionData('userId'),
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            
            console.log("用户的信息如下：");
            console.log(e.detail.userInfo);
            wx.setStorage({
              key: "userInfo",
              data: e.detail.userInfo
            })   
            let param = {
              nickName: e.detail.userInfo.nickName,
              avatar: e.detail.userInfo.avatarUrl,
              // openId: getSessionData('openId'),
              // userId: getSessionData('userId'),

            }
            updateBaseinfo(param).then(res => {
              console.log(res); 
            })
            wx.navigateBack();
              
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
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