// miniprogram/pages/tabs/squre/square.js

import {
  getSquareList,
  clickLike,
  disLike
} from '../../api/api.js'
import {
	getSessionData,
} from '../../utils/session';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    squareList: {},
    currentIndex: '',
  },
  getData() {
    getSquareList({}).then(res => {
			this.setData({
				squareList: res.list.reverse(),
      })
      
      console.log("全部动态",res);
		})
  },
  // },
  gotoSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  detailDynamic: function(e) {
    let query = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: `/pages/detail-dynamic/detail-dynamic?id=${query}`,
    })
    
  },
  // 点赞
  gotoLike: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.curindex;
    var list = that.data.squareList;
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
          if (list[index]) {
            var isLike = list[index].isLike;
            if (isLike !== undefined) {
              if (isLike) {
                list[index].isLike = false;
              } else {
                list[index].isLike = true;
              }
              that.setData({
                squareList: list
              })
            }
          }
          var param = {
            likeId: e.currentTarget.dataset.id,
            class: 1,
            authId: e.currentTarget.dataset.authid,
          }
          that.setData({
            currentIndex: e.currentTarget.dataset.id
          })
          clickLike(param).then(res => {
          })
        } 
      } 
    });
    
    
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
      id: e.currentTarget.dataset['id'],
      class: 1
    }
    disLike(param).then(res => {
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom:function(){
  //   // 分页请求
    
  //   console.log('上拉触底事件');
  //   let that = this;
  //   // if (this.data.loading) return;  
  //   // this.setData({ loading: true });  
  //   if (!that.data.hasMoreData) {
  //     that.setData({
  //       loadMore: true, //加载中  
  //       loadAll: false //是否加载完所有数据
  //     });

  //     //加载更多，这里做下延时加载
  //     setTimeout(function() {
  //       that.getData()
  //     }, 2000)
  //   }
    // this.updateRefreshIcon.call(this);
    // var list = this.data.squareList.concat([{message: '土生土长',viewid:'0',time:util.formatTime(new Date),greeting:'hello'}]);
    // getSquareList(param).then(res => {
		// 	this.setData({
    //     loading: false,
		// 		squareList: res.list,
		// 	})
		// 	console.log("动态",res.list);
    // })
    
  // },
  /**
 * 旋转刷新图标
 */
// updateRefreshIcon: function () {
//   var deg = 0;
//   console.log('旋转开始了.....')
//   var animation = wx.createAnimation({
//     duration: 1000
//   });

//   var timer = setInterval( ()=> {
//     if (!this.data.loading)
//       clearInterval(timer);
//     animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
//     deg += 360;
//     this.setData({
//       refreshAnimation: animation.export()
//     })
//   }, 2000);
// },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})