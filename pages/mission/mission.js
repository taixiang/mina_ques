// pages/mission/mission.js
var constant = require("../../utils/constant.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    type:1
  },

  bindQues:function(e){
    console.log(e)
    if (e.currentTarget.dataset.level.star==-1){
      return
    }
    wx.navigateTo({
      url: '../ques/ques?level=' + e.currentTarget.dataset.level.level_id+"&type="+this.data.type,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type
    })
    getData(this,options.type, app.globalData.openId)
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

function getData(that , type, user_id) {
  wx.request({
    url: constant.getMission + "?type_id=" + type + "&user_id=" + user_id,
    method: 'GET',
    success: function (res) {
      console.log(res)
      that.setData({
        list:res.data.results
      })
    }
  })
}