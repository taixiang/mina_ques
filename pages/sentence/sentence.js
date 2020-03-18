// pages/sentence/sentence.js
var constant = require("../../utils/constant.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: [],
    page: 1,
    hasNext: false

  },

  copyTxt: function (e) {
    let that = this
    let sn = e.currentTarget.dataset.copytxt
    let id = e.currentTarget.dataset.id
    let param = {
      sId: id,
      user_id_id : app.globalData.openId
    }
    wx.setClipboardData({
      data: sn,
      success(res) {
        console.log("==--- 成功== ")

        wx.request({
          url: constant.postCopy,
          method: 'post',
          data: param,
          success: function (res) {
            
          },
          fail: function (res) {

          }

        })

      }
    })

  },

  getData(){
    let that = this
    wx.showLoading()
    wx.request({
      url: constant.sentence + "?page=" + this.data.page,
      success: function (res) {
        console.log("》》》》 ===---   ", res)
        that.setData({
          contents: that.data.contents.concat(res.data.results || [])
        })
        that.data.page = res.data.next != null ? that.data.page += 1 : that.data.page
        that.data.hasNext = res.data.next != null ? true : false,

        wx.hideLoading()
      },
      fail: function (res) {
        wx.hideLoading()
      }

    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

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
    if (this.data.hasNext) {
      console.log("===")
      
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})