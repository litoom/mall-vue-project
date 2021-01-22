// https://www.jianshu.com/p/b358a91bdf2d

module.exports = {
  configureWebpack: {
    resolve: {
      //配置忽略后缀,默认已经配置
      // extensions:[],
      alias: {
        'assets':"src/assets",
        'common':"src/common",
        'components':"src/components",
        'views':"src/views",
      }
    }
  }
}
