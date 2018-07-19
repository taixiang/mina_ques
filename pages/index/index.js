//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../intr/intr?type='+e.currentTarget.dataset.type,
    })
  },
  onLoad: function () {
    
  },
  
})
