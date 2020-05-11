// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  clickLike,
  disLike
} from '../../api/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailDyna: {},
    userInfo: {},
  },
  

  getData(id) {
    let param = {
      id: id
    };
    getSquareList(param).then(res => {
			this.setData({
				detailDyna: res[0],
      })
		})
  },
  // 点赞
  gotoLike: function(e) {
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userInfo']) {
          if (this.data.detailDyna) {
            var isLike = this.data.detailDyna.isLike;
              this.setData({
                'detailDyna.isLike': !isLike
              })
          }
          var param = {
            likeId: e.currentTarget.dataset.id,
            class: 1,
            authId: e.currentTarget.dataset.authid,
          }
          this.setData({
            currentIndex: e.currentTarget.dataset.id
          })
          clickLike(param).then(res => {})
        }else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  // 取消点赞
  goDislike: function(e) {
    if (this.data.detailDyna) {
      var isLike = this.data.detailDyna.isLike;
      this.setData({
        'detailDyna.isLike': !isLike
      })
    }
    var param = {
      id: e.currentTarget.dataset['id'],
      class: 1
    }
    disLike(param).then(res => {
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {
  //   this.getData();
  // },

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

})