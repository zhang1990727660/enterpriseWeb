var root ="https://api.it120.cc/tz";

const reqUrl={
  bannerList: root +"/banner/list",                //首页导航列表
  getCategoryAll: root +"/shop/goods/category/all",//商品类型获取
  getGoodList:root + "/shop/goods/list",           //获取商品列表
}

module.exports=reqUrl
