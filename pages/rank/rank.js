// pages/rank/rank.js
var constant = require("../../utils/constant.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected:true, //小学 是否选中
    items:null
  },

  primary:function(e){
    if(this.data.isSelected){
      return
    }
    this.setData({
      isSelected:true
    })
    getData(this, 1)

  },

  middle:function(e){
    if (!this.data.isSelected) {
      return
    }
    this.setData({
      isSelected: false
    })
    getData(this, 2)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      getData(this, 1)
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

function getData(that, type){
  wx.request({
    url: constant.rank+"?type_id="+type,
    success:function(e){
      console.log(e.data.results)
      that.setData({
        items:e.data.results
      })
    }
  })
}