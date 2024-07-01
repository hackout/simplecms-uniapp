import config from "@/config"

export const mixin = {
  data () {
    return {
      share: {
        title: config.APP_NAME,
        path: '/pages/index/index',
        imageUrl: '/static/logo.png',
		desc: config.APP_SLOGEN
      }
    }
  },
  // 分享到微信
  onShareAppMessage: function () {
    // 获取加载的页面
    let pages = getCurrentPages(), view = pages[pages.length - 1]
    //分享的页面路径
    if(!this.share.path) {
		// #ifdef MP-WEIXIN	
    	this.share.path = `/${view.route}`
    	//#endif
    	//#ifdef MP-ALIPAY
    	this.share.path = view.$page.fullPath
    	//#endif
	}
    //转发参数
    return this.share
  },
  // 分享到朋友圈
  onShareTimeline () {
    // 获取加载的页面
    let pages = getCurrentPages(), view = pages[pages.length - 1]
    //分享的页面路径
    if(!this.share.path) {
		// #ifdef MP-WEIXIN	
    	this.share.path = `/${view.route}`
    	//#endif
    	//#ifdef MP-ALIPAY
    	this.share.path = view.$page.fullPath
    	//#endif
	}
    //转发参数
    return this.share
  },
}