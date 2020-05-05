import {
    getPhysicalInfo,
    getMyinfo
} from '../../api/api.js'
  
Page({
    /**
     * 页面的初始数据
     */
    data: {
      personalInfo: {},
      physicalInfo: {},
      hideMeans: true,
      hideAlert: false,
      hideImprove: false,
      hideBother: false,
      hideReason: true,
    },
    // 获取个人档案
    getPhysicalInfo() {
      getPhysicalInfo({}).then(res => {
        this.setData({
          physicalInfo: res.data[0],
        })
        console.log("个人档案", this.data.physicalInfo);
      })
    },
    showMeans:function(){
      this.setData({
          hideMeans: !this.data.hideMeans
      })
    },
    showAlert:function(){
      this.setData({
        hideAlert: !this.data.hideAlert
      })
    },
    showImprove:function(){
      this.setData({
        hideImprove: !this.data.hideImprove
      })
    },
    showBother:function(){
      this.setData({
          hideBother: !this.data.hideBother
      })
    },
    showReason:function(){
      this.setData({
          hideReason: !this.data.hideReason
      })
    },
    // 重新测试
    reTest() {
      wx.navigateTo({
        url: '/pages/physique/physique',
      })
    },
    onLoad: function () {
      wx.setNavigationBarTitle({
        title: "个人档案"
      })
    },

    onShow: function () {
      this.getPhysicalInfo();
    },
  })