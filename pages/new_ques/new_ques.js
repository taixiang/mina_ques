// pages/new_ques/new_ques.js
var constant = require("../../utils/constant.js")
const app = getApp()
var list = []
var num = 0 //题目数
var timer;
var right = 0 //答对题目
var wrongsid = "" //错题id
var ans = "" //选错答案

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    type: 1, //班级
    opts: [], //选项
    t: 15, //倒计时
    count: 0 //题目数
  },


  /**
   * 答题
   */
  chooseOpt(e) {

    if (this.data.item.isComplete) {
      return
    }

    console.log(e)

    var val = e.currentTarget.dataset.value;

    var rightNum;
    if (this.data.item.correct == "A") {
      rightNum = 0
    } else if (this.data.item.correct == "B") {
      rightNum = 1
    } else if (this.data.item.correct == "C") {
      rightNum = 2
    } else if (this.data.item.correct == "D") {
      rightNum = 3
    }

    this.data.item.isComplete = true

    if (val == rightNum) { //答对
      right++;
      this.data.opts[val].isRight = true
      this.setData({
        opts: this.data.opts
      })
      console.log(this.data.opts)
    } else { //答错

      if(val == 0){
        ans = ans+"A,"
      }else if(val == 1){
        ans = ans + "B,"
      }else if(val == 2){
        ans = ans + "C,"
      }else if(val == 3){
        ans = ans + "D,"
      }

      wrongsid = wrongsid + this.data.item.id+","

      console.log("wrongsid ======  "+wrongsid)
      console.log("ans ======  " + ans)

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
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    getData(this, options.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(timer)
    timer = null
    list = []
    num = 0
    right = 0
    wrongsid = ""
    ans = ""
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getData(that, type) {
  wx.request({
    url: constant.getQues + "?type_id=" + type,
    method: 'GET',
    success: function(res) {
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
 * 题目渲染
 */
function renderData(that) {
  that.data.opts.push({
    "val": list[num]["optA"]
  })
  that.data.opts.push({
    "val": list[num]["optB"]
  })
  that.data.opts.push({
    "val": list[num]["optC"]
  })
  that.data.opts.push({
    "val": list[num]["optD"]
  })

  that.setData({
    item: list[num],
    opts: that.data.opts,
    count: num + 1
  })

}

/**
 * 倒计时
 */
function setTime(that) {
  console.log("===========")
  timer = setInterval(function () {
    that.setData({
      t: that.data.t - 1
    })
    //时间到，未作答
    if (that.data.t == 0 && that.data.isComplete == null) {
      wrongsid = wrongsid + that.data.item.id + ","
      ans = ans + " ,"
      console.log("wrongsid ======  " + wrongsid)
      console.log("ans ======  " + ans)
      next(that)
    }

    if (that.data.t < 0) {
      that.setData({
        t: 15
      })
    }
    // console.log(that.data.t)
  }, 1000)
}


/**
 * 下一题
 */
function next(ths) {
  clearInterval(timer)
  timer = null
  var that = ths
  setTimeout(function () {
    num++

    if (num >= list.length) {
      clearInterval(timer)
      var data = {};
      data.type_id = ths.data.type
      data.user_id_id = app.globalData.openId
      data.point = right

      data.answers = ans.substr(0,ans.length-1)
      data.wrongs = wrongsid.substr(0,wrongsid.length-1)

      console.log("data.wrongs ====  "+data.wrongs)
      console.log("data.answers ====  " + data.answers)
      console.log("data.point ====  " + data.point)

      postResult(ths, data)

      wx.redirectTo({
        url: "../result/result?type="+ths.data.type+"&right="+right
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
function postResult(that, data) {
  wx.request({
    url: constant.postPoint,
    data: data,
    method: "POST",
    success: function (res) {
      console.log(res)
    },
    fail: function (res) {

    }

  })
}