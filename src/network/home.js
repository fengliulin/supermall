import {request} from '@/network/request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

/**
 * 获取首页的流行 新款 的数据
 */
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
