// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  clickLick
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareList: {},
    userInfo: {},
  },
  

  getData() {
    let that = this;
    getSquareList({}).then(res => {
			this.setData({
				squareList: res.list,
			})
			console.log("动态",res.list);
		})
  },
  // },
  gotoSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  detailDynamic: function(e) {
    console.log(e);
    let query = e.currentTarget.dataset['id'];
    console.log("query",query);
    wx.navigateTo({
      url: `/pages/detail-dynamic/detail-dynamic?id=${query}`,
    })
    
  },
  // 点赞
  gotoLike: function(e) {
    var param = {
      likeId: e.currentTarget.dataset['likeId'],
      class: 1
    }
    clickLick(param).then(res => {
			// this.setData({
			// 	squareList: res,
			// })
			console.log("点赞是否成功",res);
		})
    
  },
  // 去消息通知
  gotoNotice: function() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  // 去发送
  gotoSend: function() {
    wx.navigateTo({
      url: '/pages/send-dynamic/send-dynamic'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
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
    this.getData();
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
  onReachBottom:function(){
    // 分页请求
    
    console.log('上拉触底事件');
    let that = this;
    // if (this.data.loading) return;  
    // this.setData({ loading: true });  
    if (!that.data.hasMoreData) {
      that.setData({
        loadMore: true, //加载中  
        loadAll: false //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      setTimeout(function() {
        that.getData()
      }, 2000)
    }
    // this.updateRefreshIcon.call(this);
    // var list = this.data.squareList.concat([{message: '土生土长',viewid:'0',time:util.formatTime(new Date),greeting:'hello'}]);
    // getSquareList(param).then(res => {
		// 	this.setData({
    //     loading: false,
		// 		squareList: res.list,
		// 	})
		// 	console.log("动态",res.list);
    // })
    
  },
  /**
 * 旋转刷新图标
 */
updateRefreshIcon: function () {
  var deg = 0;
  console.log('旋转开始了.....')
  var animation = wx.createAnimation({
    duration: 1000
  });

  var timer = setInterval( ()=> {
    if (!this.data.loading)
      clearInterval(timer);
    animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
    deg += 360;
    this.setData({
      refreshAnimation: animation.export()
    })
  }, 2000);
},



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})