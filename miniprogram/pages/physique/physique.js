// pages/home/my-physique/physique.js

import {
  getTestQuestion,
  sendTestAnswer
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [],
    idx: '',
    quesIndex: '',
    scoreArr: {
      answer: []
    },
    questionFlag: [],
    sign: true,
    currentIndex: '', // 当前操作
    selectButton: [
      {
        score: 1,
        select: '没有'
      },
      {
        score: 2,
        select: '很少'
      },
      {
        score: 3,
        select: '有时'
      },
      {
        score: 4,
        select: '经常'
      },
      {
        score: 5,
        select: '总是'
      }
    ],
    submitAnswer: {
      url: "/physical/answer",
      data: {
          answer: [
            {
              "id": 1,
              "score": 3
            },
                    {
                        "id": 2,
                        "score": 3
                    },
                    {
                        "id": 3,
                        "score": 3
                    }
                ]
            }
    }
  },

  // 获取体质测试题目
  fitnessTestQuestions() {
		getTestQuestion({}).then(res => {
			this.setData({
        testList: res.data,
      })
      var listArr = [];
      for(let i = 0; i<res.data.length; i++) {
        var obj = {}
        obj.id= res.data[i].id;
        obj.flag = false;
        listArr.push(obj);
      }
      this.setData({
        questionFlag: listArr
      })
      console.log(listArr);
			console.log("体质测试题目",res.data);
		})
  },
  clickAnswer: function (e) {
    console.log("控制一下",e.target.dataset.curindex);
    console.log("控制一下2",e.target.dataset)
    this.setData({
      currentIndex: e.target.dataset.curindex
   });
    let that = this;
    var scoreArr = this.data.scoreArr;
    var index = e.currentTarget.dataset.order;
    for(var i = 0; i<scoreArr.answer.length;i++) {
      if(scoreArr.answer[i].id == index) {
        scoreArr.answer[i].score = e.target.dataset.score;
        this.setData({
          sign: false
        });
        break;
      }else {
        this.setData({
          sign: true
        })
      }
    }
    if(that.data.sign) {
      var scoreObj = {id: e.target.dataset.order, score: e.target.dataset.score};
      scoreArr.answer.push(scoreObj);
    }

    
    // if (Object.keys({id:1,score:2})) {
    //   return false // 如果为空,返回false
    // }
    // if (list[index]) {
    //   var isLike = list[index].isLike;
    //   if (isLike !== undefined) {
    //     if (isLike) {
    //       list[index].isLike = false;
    //     } else {
    //       list[index].isLike = true;
    //     }
    //     this.setData({
    //       squareList: list
    //     })
    //   }
    // }
    this.setData({
       idx: e.target.dataset.score,
       quesIndex: e.target.dataset.order,
       scoreArr: scoreArr,
       currentIndex: e.target.dataset.curIndex
    });
    console.log(e.target.dataset.score,e.target.dataset.order);
    console.log("分数",that.data.scoreArr);
    
  },
  // sendTestAnswer() {
  //   let param = {

  //   }
  //   getTestQuestion({}).then(res => {
	// 		console.log("体质测试题目",res);
	// 	})
  // },
  submitTest() {
    var that = this;
    let param = that.data.scoreArr;
    console.log("分数信息",param);
    sendTestAnswer(param).then(res => {
			console.log("提交体质测试题目",res);
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fitnessTestQuestions();
    console.log("这里这里",Object.keys({id:1,score:2}));
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