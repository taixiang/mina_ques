// pages/intr/intr.js

const app = getApp()
var q = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    type:1
  },

  getUserInfo: function (e) {
    console.log("获取信息")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo != null){
      console.log("=============")
      app.globalData.userInfo.openId = app.globalData.openId

      console.log(app.globalData.userInfo)
      app.postUser(app.globalData.userInfo)

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      },()=>{
        console.log("---------")
        if (this.data.hasUserInfo) {
          console.log(this.data.type)
          wx.navigateTo({
            url: '../new_ques/new_ques?type=' + this.data.type,
          })
        }
      })
    }
    
  },

  toTest:function(e){
    if (this.data.hasUserInfo){
      console.log(e)
      wx.navigateTo({
        url: '../new_ques/new_ques?type=' + this.data.type,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("》》》》》》 q=== "+q)
    q=1
    console.log(app.globalData.openId)
    this.setData({
      type: options.type
    })
    if(options.type == 1){
        wx.setNavigationBarTitle({
          title: '小学语文',
        })
    }else{
      wx.setNavigationBarTitle({
        title: '初中语文',
      })
    }

    console.log(this.data.canIUse)

    if (app.globalData.userInfo.nickName) {
      console.log("有用户信息")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("------------")

      app.userInfoReadyCallback = res => {
        console.log("啊啊啊 =============")
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  
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