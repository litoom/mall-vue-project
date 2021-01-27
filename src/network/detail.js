import { request } from './request'

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

//封装的商品详情页的每一个商品的数据的类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

//封装的商品详情页的店铺的信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

//封装商品的参数类
export class GoodsParam {
  constructor(info, rule) {
    //注意:images可能没有值(某些商品有值，有些没有值)
    this.img = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//详情页推荐数据的请求
export function getRecommend(){
  return request({
    url:"/recommend",
  })
}
