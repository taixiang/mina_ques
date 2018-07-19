// pages/ques/que's.js
var constant = require("../../utils/constant.js")
const app = getApp()
var list=[]
var optList=[]
var num=0 //题目数
var timer;
var right = 0 //答对题目
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    type:1, //班级
    level:0, //关卡
    opts:[], //选项
    t:15, //倒计时
  },

  /**
   * 答题
   */
  chooseOpt(e){

    if (this.data.item.isComplete){
      return
    }

    console.log(e)
    
    var val = e.currentTarget.dataset.value;
    
    var rightNum;
    if (this.data.item.correctOpt == "A"){
      rightNum = 0
    } else if (this.data.item.correctOpt == "B") {
      rightNum = 1
    } else if (this.data.item.correctOpt == "C") {
      rightNum = 2
    } else if (this.data.item.correctOpt == "D") {
      rightNum = 3
    }

    this.data.item.isComplete = true

    if (val == rightNum){ //答对
      right++;
      this.data.opts[val].isRight = true
      this.setData({
        opts: this.data.opts
      })
      console.log(this.data.opts)
    }else{ //答错
      this.data.opts[val].isRight = false
      this.data.opts[rightNum].isRight = true
      this.setData({
        opts: this.data.opts
      })
    }

    next(this)


  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type:options.type,
      level:options.level
    })
    getData(this,options.level,options.type)

    
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
    clearInterval(timer)
    timer = null
    list = []
    optList = []
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

function getData(that,level,type){
  wx.request({
    url: constant.getQues + "?type_id=" + type + "&level_id=" + level,
    method: 'GET',
    success: function (res) {
      console.log(res)
      list = res.data.results
      renderData(that)

      //倒计时
      setTime(that)
      console.log(that.data.opts)
    }
  })
}

/**
 * 倒计时
 */
function setTime(that) {
  console.log("===========")
  timer = setInterval(function () {
    that.setData({
      t:that.data.t-1
    })

    if (that.data.t == 0 && that.data.isComplete == null){
      next(that)
    }

    if(that.data.t < 0){
      that.setData({
        t:15
      })
    }
    // console.log(that.data.t)
  }, 1000)
}


/**
 * 题目渲染
 */
function renderData(that){
  that.data.opts.push({ "val": "A. " + list[num]["optA"] })
  that.data.opts.push({ "val": "B. " + list[num]["optB"] })
  that.data.opts.push({ "val": "C. " + list[num]["optC"] })
  that.data.opts.push({ "val": "D. " + list[num]["optD"] })

  that.setData({
    item: list[num],
    opts: that.data.opts
  })

}

/**
 * 下一题
 */
function next(ths){
  clearInterval(timer)
  timer = null
  var that = ths
  setTimeout(function () {
    num++

    if(num>=list.length){
      clearInterval(timer)
      var data={};
      data.point = right;
      if(right >= 10){
        data.star = 3
      }else if(right>=7&&right<=9){
        data.star = 2
      }else if(right>=3&&right<=6){
        data.star = 1
      }else{
        data.star = 0
      }
      data.type_id = ths.data.type
      data.level_id = ths.data.level
      data.user_id_id = app.globalData.openId

      postResult(ths,data)

      wx.navigateTo({
        url:"../result/result"
      })
      return
    }

    that.data.opts = []
    renderData(that)

    that.setData({
      t: 15
    })
    setTime(that)

  }, 2000)
}

/**
 * 提交答案
 */
function postResult(that,data){
  wx.request({
    url: constant.postResult,
    data:data,
    method: "POST",
    success:function(res){
      console.log(res)
    },
    fail:function(res){

    }

  })
}