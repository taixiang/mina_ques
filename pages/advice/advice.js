// pages/advice/advice.js
var constant = require("../../utils/constant.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "", //输入内容
    initVal: "",//初始化内容
  },

  /**
   * 监听输入的字
   */
  bindKeyInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },

  commit:function(e){
    if (!this.data.value) {
      console.log(this.data.value)
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return

    }
    
    var data = {};
    data.user_id_id = app.globalData.openId
    data.content = this.data.value
    postAdvice(this,data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

function postAdvice(that, data) {
  wx.request({
    url: constant.postAdvice,
    method: "POST",
    data: data,
    success: res => {
      console.log(res)
      var json = JSON.parse(res.data)
      if (json.code == 200) {
        wx.showToast({
          title: json.result,
        })
        that.setData({
          initVal: ""
        })
      }
    },
    fail: e => {
      that.setData({
        initVal: ""
      })
    }
  })
}