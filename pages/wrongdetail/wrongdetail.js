// pages/wrongdetail/wrongdetail.js
var constant = require("../../utils/constant.js")
const app = getApp()
var type = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    opts: [], //选项
    hiddenmodalput: true,
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

  /**
   * 弹出框
   */
  showError: function (e) {
    this.setData({
      hiddenmodalput: false
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },

  //确认  
  confirm: function () {
    console.log("66666666666")
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
    data.qId = this.data.detail.pId.id
    data.content = this.data.value
    data.type_id = type
    console.log(data)
    postError(this, data)

    this.setData({
      hiddenmodalput: true
    })
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    type = options.type
    getData(this,options.id)
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

function getData(that,id){
  wx.request({
    url: constant.wrongQues+"/"+id,
    success:e =>{
      console.log(e)
      that.data.opts.push({
        "val": e.data.pId.optA
      })
      that.data.opts.push({
        "val": e.data.pId.optB
      })
      that.data.opts.push({
        "val": e.data.pId.optC
      })
      that.data.opts.push({
        "val": e.data.pId.optD
      })
      that.setData({
        detail:e.data,
        opts:that.data.opts
      })
    }
  })
}

/**
 * 纠错提交
 */
function postError(that,data){
  wx.request({
    url: constant.postError,
    method:"POST",
    data:data,
    success:res=>{
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
    fail:e=>{
      that.setData({
        initVal: ""
      })
    }
  })
}