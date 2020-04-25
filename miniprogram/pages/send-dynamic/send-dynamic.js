import {
	sendDynamic,
} from '../../api/api.js'

Page({
  data: {
    imgs: [],
    content:''
  },

  onLoad: function (options) {

  },
  input:function(e){
    this.setData({
      content:e.detail.value
    })
  },

  chooseimage:function(){
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        if (res.tempFilePaths.length>0){
          //图如果满了9张，不显示加图
          if (res.tempFilePaths.length == 9){
            that.setData({
              hideAdd: 1
            })
          }else{
            that.setData({
              hideAdd: 0
            })
        }
        //把每次选择的图push进数组
        let imgs = that.data.imgs;
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          imgs.push(res.tempFilePaths[i])
        }

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
  send:function(){
    var that = this;
    var user_id = wx.getStorageSync('userid')
    wx.showLoading({
      title: '上传中',
    })
    let value = wx.getStorageSync('userInfo');
    // 发布动态上传图片
    let params = {
      	content: that.data.content,
      	img: that.data.imgs
    };
    sendDynamic(params).then(res => {
			this.setData({
				shouldToDo: res,
			})
      console.log("发布动态成功了吗",res);
      // 目前是没成功的状态，发布动态不成功
      wx.navigateTo({
        url: '/pages/square/square',
      })
		})
    // that.img_upload()
  },

  //图片上传，现在没有接口

  img_upload: function () {
    let that = this;
    let imgs= that.data.imgs;
    let imgs_ok = [];
    //由于图片只能一张一张地上传，所以用循环
    for (let i = 0; i < imgs.length; i++) {
      wx.uploadFile({
      //路径填你上传图片方法的地址，目前没有？？？
        url: 'http://wechat.homedoctor.com/Moments/upload_do',
        filePath: imgs[i],
        name: 'file',
        formData: {
            'user': 'test'
        },
        success: function (res) {
              console.log('上传成功');
              //把上传成功的图片的地址放入数组中
              imgs_ok.push(res.data)
              //如果全部传完，则可以将图片路径保存到数据库
              if (imgs_ok.length == imgs.length) {
                var userid = wx.getStorageSync('userid');
                var content = that.data.content;
                wx.request({
                  url: 'http://wechat.homedoctor.com/Moments/adds',
                  data: {
                    user_id: userid,
                    images: imgs_ok,
                    content: content,
                },
                success: function (res) {
                  if (res.data.status == 1) {
                    wx.hideLoading()
                    wx.showModal({
                      title: '提交成功',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/my_moments/my_moments',
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            console.log('上传失败')
          }
        })
      }
    } 
 })

// Page({
//   data: {
//     img_url: [],
//     content:''
//   },

//   onLoad: function (options) {
//   },
//   input:function(e){
//     this.setData({
//       content:e.detail.value
//     })
//   },
//   chooseImg(){
//       let that = this;
//       let len = this.data.imgs;
//       if(len>=9){
//           this.setData({
//               lenMore: 1
//           })
         

//           return;
//       }
//       wx.chooseImage({
//           success: (res)=>{
//               let tempFilePaths = res.tempFilePaths;
//               console.log(tempFilePaths)
//               let imgs = that.data.imgs;
//               for(let i=0;i<tempFilePaths.length;i++){
//                   if(imgs.length<9){
//                       imgs.push(tempFilePaths[i])
//                   }else{
//                       that.setData({
//                           imgs
//                       })
//                       wx.showModal({
//                           title: '提示',
//                           content: '最多只能有九张图片'
//                       })
//                       return;
//                   }
//               }
//               that.setData({
//                   imgs
//               })
//           }
//       })
//   },
//   previewImg(e){
//       let index = e.currentTarget.dataset.index;
//       let imgs = this.data.imgs;
//       wx.previewImage({
//           current: imgs[index],
//           urls: imgs,
//       })
//   },
//   deleteImg(e){
//       let _index = e.currentTarget.dataset.index;
//       let imgs = this.data.imgs;
//       imgs.splice(_index,1);
//       this.setData({
//           imgs
//       })
//   }

// })

