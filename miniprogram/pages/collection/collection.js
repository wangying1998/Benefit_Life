
import {
  getMyLike,
  clickLike,
  disLike
} from '../../api/api.js'

Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
      currentid: '',
      activityList: {},
      articleList: {}
  },
  
  getMyLike() {
    getMyLike({}).then(res => {
      this.setData({
        activityList: res.activity,// 动态
        articleList: res.article, //文章
      })
      console.log("我喜欢的",res.article);
    })
  },
  // 点赞
  gotoLike: function(e) {
    var index  = e.currentTarget.dataset['id'];

    var param = {
      likeId: index,
      class: 1
    }
    clickLike(param).then(res => {
      // this.setData({
      // 	squareList: res,
      // })
      console.log("点赞",res);
    })
    
  },
  // 取消点赞
  goDislike: function(e) {

    console.log("取消点赞1",e,e.currentTarget.dataset.id)
    var param = {
      id: e.currentTarget.dataset['id'],
      class: 1
    }
    disLike(param).then(res => {
      console.log("取消点赞",res);
    })
  },

  onLoad: function() {
    var that  = this;
    wx.setNavigationBarTitle({
      title: "我喜欢的"
    })

      /**
       * 获取当前设备的宽高
       */
      wx.getSystemInfo( {
          success: function( res ) {
              that.setData( {
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }

      });
      
  },
    
  onShow: function() {
    this.getMyLike();
  },
//  tab切换逻辑
  swichNav: function( e ) {
      var that = this;
      if( this.data.currentTab === e.target.dataset.current ) {
          return false;
      } else {
          that.setData( {
              currentTab: e.target.dataset.current
          })
      }
  },
  // 文章详情
  detailsArticle (e) {
    let query = e.currentTarget.dataset['artid'];
    wx.navigateTo({
      url: `/pages/detail-article/detail-article?artid=${query}`,
    })
  },

  bindChange: function( e ) {
      var that = this;
      that.setData( { currentTab: e.detail.current });

  },
})