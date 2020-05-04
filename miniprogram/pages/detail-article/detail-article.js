import {
  getArtDetails,
  clickLick,
  disLick
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailArt: {},
    content: ''
  },
  getDetail (id) {
    var that = this;
    let param = {
      id: id,
    }
    getArtDetails(param).then(res => {
      this.setData({
        detailArt: res.data[0],
        content: res.data[0].content
      })
      console.log("时令推文详细",res.data[0]);
      let info = that.data.content
      .replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
      .replace(/<p>/ig, '<p style="font-size: 15Px; line-height: 25Px;">')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
      .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 style="width: 100%; border-radius: 8Px;"');
      // this.setData({
      //   content: info,
      // })
      // console.log("11",info);
      // console.log("2",that.data.content);
    })

    
  },
  // 点赞
  gotoLike: function(e) {
    var param = {
      likeId: e.currentTarget.dataset.id,
      class: 1
    }
    clickLick(param).then(res => {
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
    disLick(param).then(res => {
      console.log("取消点赞",res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.artid);
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