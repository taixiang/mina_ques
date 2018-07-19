// pages/new_ques/new_ques.js
var constant = require("../../utils/constant.js")
const app = getApp()
var list = []
var optList = []
var num = 0 //题目数
var timer;
var right = 0 //答对题目

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    type: 1, //班级
    opts: [], //选项
    t: 15, //倒计时
    count : 0 //题目数
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
      this.data.opts[val].isRight = false
      this.data.opts[rightNum].isRight = true
      this.setData({
        opts: this.data.opts
      })
    }

    // next(this)


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getData(this)
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

function getData(that, level, type) {
  wx.request({
    url: constant.getQues + "?type_id=" + type,
    method: 'GET',
    success: function(res) {
      console.log(res)
      list = res.data.results
      renderData(that)

      //倒计时
      // setTime(that)
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
    count:num+1
  })

}