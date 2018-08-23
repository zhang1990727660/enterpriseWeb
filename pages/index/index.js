import { bannerList, getCategoryAll} from '../../api/reqUrl.js'
//获取应用实例
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true, //是否显示点
    autoplay:true,      //是否自动轮播
    indicatorColor:'rgba(255,255,255,0.3)',
    indicatorActiveColor:'rgba(255,255,255,1)',
    interval: 3000,     //切换间隔时间
    duration: 1000,
    categories:[],      //类别
    typeSelected:0,     //商品类别选中的那一项    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList();
    this.getCategoryAll();
  },
  /**
   * 获取banner信息列表
   */
  getBannerList:function(){
    var that = this;
    wx.request({
      url: bannerList,
      data: {
        key: 'mallName'
      },
      success: function (res) {
        if (res.data.code == 404) {
          wx.showModal({
            title: '提示',
            content: '请在后台添加 banner 轮播图片',
            showCancel: false
          })
        } else {
          that.setData({
            banners: res.data.data
          });
        }
      }
    })
  },
  /**
   * 获取商品类别信息
   */
  getCategoryAll:function(){
    var that=this;
    wx.request({
      url: getCategoryAll,
      success:function(res){
        var dataObj=res.data;
        if (dataObj && dataObj.data.length>0){
          var data = dataObj.data;
          data.unshift({ id: 0, name: "全部" });
          that.setData({
            categories:data,
            typeSelected:0,
          })
        }
      }
    })
  },
  /**
   * 切换商品类别
   */
  switchType:function(e){
    var id=e.target.id;
    this.setData({
      typeSelected:id
    });
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