//app.js
import {
  handleLogin
} from './util/login';
import {
  getSessionData,
  setSessionData
} from './util/session';
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        let custom = wx.getMenuButtonBoundingClientRect();
        // this.globalData.StatusBar = e.statusBarHeight;
        // this.globalData.Custom = custom;
        // this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    });
    !getSessionData() ? setSessionData({}) : '';

    if (getSessionData().openId) {
      handleLogin().then(res => {
        // wx.switchTab({
        //   url: '/pages/homeNew/homeNew',
        // })
      })
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }
    else{
      handleLogin().then(res => {
        // console.log(res)
      })
    }
    
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-gb0if',  // 测试环境
        // env: 'node-l1lsj',  // 正式
        traceUser: true,
      })
    }

    this.globalData = {
      userid: '',
      userInfo: null
    }
  }
})
