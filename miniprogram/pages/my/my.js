// miniprogram/pages/tabs/my/my.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalList: [
      {
        id: 'collection',
        icon: '../../images/collection.png',
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
        text: '我的设置',
      },
    ],
    userInfo: {},
  },
  // 修改个人资料
  editInfo: function() {
    wx.navigateTo({
      url: '/pages/modify-information/modify-information',
    })
  },
  gotoPage:function(e) {
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
        wx.navigateTo({
          url: '/pages/physique/physique',
        })
        break;
      case 'feedback':
        wx.navigateTo({
          url: '/pages/feedback/feedback',
        })
        break;
      case 'settings':
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
        break;
      default:

    }
    
  },
  // updateBaseinfo(){
	// 	let params = {
	// 		nickName: '没错就是我了',
	// 		avatar: "头像"
	// 	};
	// 	updateBaseinfo(params).then(res=>{
	// 		this.setData({
	// 			userInfo: res.userInfo,
	// 		})
	// 		console.log(22222222,res);
	// 		// res.data
	// 	})
  // },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.getStorage({
    //   key: 'userInfo',
    //   success (res) {
    //     this.userInfo = res.data
    //     
    //   }
    // })
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
    // 点击查看体质测试

      wx.getSetting({
        success: function(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } 
        } 
      });
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
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