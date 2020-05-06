import {
  sendDynamic,
} from '../../api/api.js'

Page({
  data: {
    imgs: [],
    content:'',
    imgsId: [],
    count: ''
  },

  onLoad: function (options) {

  },
  input:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  chooseimage:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        if (res.tempFilePaths.length>0){
          //图如果满了3张，不显示加图
          if (that.data.count >= 3){
              that.setData({
                hideAdd: 1
              })
            } else{
              that.setData({
                hideAdd: 0
              })
          }
        //把每次选择的图push进数组
        let imgs = that.data.imgs;
        that.setData({
          count: that.data.count+res.tempFilePaths.length
        })
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          imgs.push(res.tempFilePaths[i])
        }
        console.log(res.tempFilePaths);
        that.setData({
          imgs: imgs
        })
        }
      }
    }) 
    
  },
  deleteImg(e){
    let _index = e.currentTarget.dataset.index;
    let imgs = this.data.imgs;
    imgs.splice(_index,1);
      this.setData({
        imgs
    })
  },
  //发布按钮事件
  goSend: function(){
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    that.img_upload();
    
    
  },

  //图片上传，现在没有接口

img_upload: function () {
    let that = this;
    let imgs= that.data.imgs;
    let imgs_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < imgs.length; i++) {
      wx.cloud.uploadFile({
        //cloudPath :路径解释上文已经解释过了
        cloudPath: 'ZJK_a/' + new Date().getTime() + imgs[0].match(/\.[^.]+?$/)[0], 
        filePath: imgs[0], // 文件路径 ，循环的当前临时路径 
      }).then(res => {   
          // 返回的存储在云端的路径
          var imagesArr = that.data.imgsId;
          imagesArr.push(res.fileID);
          this.setData({
            imgsId: imagesArr
          });
          if (that.data.imgsId.length == imgs.length){  //长度相同，说明已经循环完成 
              // 发布动态上传图片
              let params = {
                content: that.data.content,
                imgs: that.data.imgsId
              };
              sendDynamic(params).then(res => {
                wx.showToast({
                  title: '发布成功',
                  icon: 'success',
                  duration: 1500,
                  mask: false,
                  complete: ()=>{
                    
                  }
                });
                wx.navigateBack();   
              })
          }
      }) 
    }
    

  },
    
    

 })
