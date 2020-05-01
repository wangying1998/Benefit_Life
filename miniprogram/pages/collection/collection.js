
import {
  getMyLike,
  clickLick
} from '../../api/api.js'

Page({
  data: {
      winWidth: 0,
      winHeight: 0,
      currentTab: 0,
  },
  
  getMyLike() {
    getMyLike({}).then(res => {
      this.setData({
        activityList: res.activity.data,// 动态
        articleList: res.article.data, //文章
      })
      console.log("我喜欢的",res);
    })
  },
  // 点赞
  gotoLike: function(e) {
    var param = {
      likeId: e.currentTarget.dataset['id'],
      class: -1

    }
    clickLick(param).then(res => {
      // this.setData({
      // 	squareList: res,
      // })
      console.log("点赞或者是取消点赞",res);
    })
    
  },
  onLoad: function() {

      var that = this;

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

  bindChange: function( e ) {
      var that = this;
      that.setData( { currentTab: e.detail.current });

  },
})