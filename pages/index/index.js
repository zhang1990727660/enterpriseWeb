import { bannerList, getCategoryAll, getGoodList} from '../../api/reqUrl.js'
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
    goods:[],           //商品列表 
    searchInput:null,   //索搜的内容
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
          that.getGoodList(0);//请求全部的商品
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
      typeSelected:id,
      searchInput:null,
    })
    this.getGoodList(id);
  },

  /**
   * 获取商品列表
   */
  getGoodList: function (categoryId, nameLike){
    var categoryId_new= !categoryId ? "" : categoryId;
    var nameLike_new = !nameLike ? "" : nameLike;
    var that=this;
    wx.request({
      url:getGoodList,
      data:{
        categoryId: categoryId_new,
        nameLike: nameLike_new
      },
      success:function(res){
        //console.log("res:",res);
        var dataObj=res.data || {};
        var goods = dataObj.data;
        that.setData({
            goods:[]
        });
        if (goods && goods.length>0){
            that.setData({
              goods:goods
            })
        }
      }
    });
  },

  /**
   * 监听索搜框输入的内容
   */
  listenerSearchInput:function(e){
    console.log("input:",e);
    this.setData({
      searchInput:e.detail.value
    });
  }, 

  /**
   * 去索搜
   */
  toSearch:function(){
    this.getGoodList(this.data.typeSelected, this.data.searchInput);
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("come in");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})