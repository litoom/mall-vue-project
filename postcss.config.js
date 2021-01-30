module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,      //视口宽度，对应设计稿的宽度(750)，设计稿iPhone6 750*1334
      viewportHeight: 667,     ////视口高度，对应设计稿的高度
      unitPrecision: 5,    //指定'px'转换为视窗单位值的小数位数
      viewportUnit:"vw",    //指定需要转换的单位,建议使用vw
      selectorBlackList:['ignore','tab-bar','tab-bar-itrm'], //指定不需要转换的类
      minPixelValue:1,  //小于等一1px不转换为视窗单位
      mediaQuery:false,   //允许在媒体查询中转换px
      exclude:[/TabBar/],  //忽略文件,不转化vw
      // exclude中存放的元素必须是正则表达式，排除的文件名称的正则
      // ^abc:匹配的内容，必须以abc开头
      // abc$:必须以abc结尾
    },
  }
}
