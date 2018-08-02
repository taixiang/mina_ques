//me.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 排行榜
   */
  toRank:function(e){
    wx.navigateTo({
      url: '../rank/rank',
    })
  },

  /**
   * 我的错题
   */
  toWrong:function(e){
    wx.navigateTo({
      url: '../wrong/wrong',
    })
  },

  /**
   * 我的纠错
   */
  toError:function(e){
    wx.navigateTo({
      url: '../error/error',
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo.nickName) {
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
  getUserInfo: function (e) {
    console.log("获取信息")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.userInfo.openId = app.globalData.openId

    console.log(app.globalData.userInfo)
    app.postUser(app.globalData.userInfo)

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
