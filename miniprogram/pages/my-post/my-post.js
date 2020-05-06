// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  getUserSquareList,
  deleteDynamic,
  clickLike,
  disLike
} from '../../api/api.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareList: {},
    userInfo: {},
    myInfo: {},
  },
  

  getData() {
    getUserSquareList({}).then(res => {
			this.setData({
        squareList: res[0].actList,
        myInfo: res[0],
      })
      console.log("我发布的全部动态",res);
		})

  },
  // 删除
  goDelete(e) {
    let param = {
      id: e.currentTarget.dataset['id']
    }
    deleteDynamic(param).then(res => {
      if(res.stats.removed === 1) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }else {
        wx.showToast({
          title: '删除失败',
          icon: 'fail',
          duration: 2000
        })
      }
		})
  },
  // 点赞
  gotoLike: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.curindex;
    var list = that.data.squareList;
    if (list[index]) {
      var isLike = list[index].isLike;
      if (isLike !== undefined) {
        if (isLike) {
          list[index].isLike = false;
        } else {
          list[index].isLike = true;
        }
        this.setData({
          squareList: list
        })
      }
    }
    var param = {
      likeId: e.currentTarget.dataset.id,
      class: 1,
      authId: e.currentTarget.dataset.authid,
    }
    clickLike(param).then(res => {
    })
    
  },
  // 取消点赞
  goDislike: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.curindex;
    var list = that.data.squareList;
    if (list[index]) {
      var isLike = list[index].isLike;
      if (isLike !== undefined) {
        if (isLike) {
          list[index].isLike = false;
        } else {
          list[index].isLike = true;
        }
        this.setData({
          squareList: list
        })
      }
    }
    var param = {
      id: e.currentTarget.dataset.id,
      class: 1,
    }
    disLike(param).then(res => {
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
   
  //   this.getData(options.id);

    
  // },


  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的动态"
    })
  },  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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
})