// pages/rank/rank.js
var constant = require("../../utils/constant.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    isSelected: true, //小学 是否选中
    items: [],
    hasNext: false,
    page: 1,
    loadingTxt: "", //加载提示
    isLoading: false, //防止延迟多次加载
  },

  primary: function(e) {
    if (this.data.isSelected) {
      return
    }
    this.setData({
      isSelected: true,
      page:1,
      type:1,
      // items:[]
    })
    this.data.items = [];
    getData(this, 1,1)

  },

  middle: function(e) {
    if (!this.data.isSelected) {
      return
    }
    this.setData({
      isSelected: false,
      page: 1,
      type: 2,
      // items: []
    })
    this.data.items = [];
    getData(this, 2, 1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getData(this, 1,this.data.page)
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
    

    if (this.data.hasNext && !this.data.isLoading) {
      console.log("===")
      this.setData({
        loadingTxt: "正在加载",
        isLoading: true
      })
      getData(this, this.data.type, this.data.page)
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getData(that, type, page) {
  wx.request({
    url: constant.rank + "?type_id=" + type+"&page="+page,
    success: function(e) {
      console.log(e)
      if (e.data.code == 200) {
        that.setData({
          hasNext: e.data.next != null ? true : false,
          items: that.data.items.concat(e.data.results),
          page: e.data.next != null ? that.data.page += 1 : that.data.page,
        })
      }
    },
    complete:e=>{
      that.setData({
        isLoading: false
      })
    }
  })
}