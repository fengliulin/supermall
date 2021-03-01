import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

/**
 * 详情页轮播图下方获取的json数据，封装成对象
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this._oldPrice = itemInfo._oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.realPrice;
  }


  get oldPrice() {
    return this._oldPrice;
  }

  set oldPrice(value) {
    this._oldPrice = value;
  }
}


