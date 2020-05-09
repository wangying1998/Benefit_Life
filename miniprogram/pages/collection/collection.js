
import {
  getMyLike,
  clickLike,
  disLike
} from '../../api/api.js'
// import { isRegExp } from 'util';

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
    var index  = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.class;
    var list = [];
    if(type) {
      list = that.data.activityList;
    }else {
      list = that.data.articleList;
    }
    if (list[index]) {
      var isLike = list[index].isLike;
      if (isLike !== undefined) {
        if (isLike) {
          list[index].isLike = false;
        } else {
          list[index].isLike = true;
        }
        if(type) {
          this.setData({
            activityList: list
          })
        }else {
          this.setData({
            articleList: list
          })
        }
        
      }
    }
    var param = {
      likeId: index,
      class: type,
      authId: e.currentTarget.dataset.authid,
    }
    clickLike(param).then(res => {
      // this.setData({
      // 	squareList: res,
      // })
    })
    
  },
  // 取消点赞
  goDislike: function(e) {
    var that = this;
    var index  = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.class;
    var list = [];
    if(type) {
      list = that.data.activityList;
    }else {
      list = that.data.articleList;
    }
    if (list[index]) {
      var isLike = list[index].isLike;
      if (isLike !== undefined) {
        if (isLike) {
          list[index].isLike = false;
        } else {
          list[index].isLike = true;
        }
        if(type) {
          this.setData({
            activityList: list
          })
        }else {
          this.setData({
            articleList: list
          })
        }
        
      }
    }
    var param = {
      id: e.currentTarget.dataset.id,
      class: e.currentTarget.dataset.class,
      authId: e.currentTarget.dataset.authid,
    }
    disLike(param).then(res => {
      
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