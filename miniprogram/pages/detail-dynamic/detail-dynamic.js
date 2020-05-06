// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  deleteDynamic
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
      // wx.setNavigationBarTitle({
      //   title: res.data[0].name//页面标题为路由参数
      // })
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