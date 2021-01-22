### 项目笔记
	接口：http://152.136.185.210:7878/api/m5
1.划分目录结构(src)
	assets  存放资源-->图片 css 
	components 组件-->放公共的组件
	components /common 其他项目也可以使用的组件,独立的组件
	components /content 和当前业务相关的公共组件
	views(大的视图/首页视图/分类视图/购物车视图等等)    
	/src/common  公共的常量进行抽取、工具类

2.引用了两个css文件
	base.css
	normalize.css

3.配置别名cli3	--vue-config.js
	/vue-config.js
	就是cli2中的webpack的配置,只不过在cli3中被隐藏了,需要手动创建

4.配置.editorconfig  
	缩进的一些配置

5.项目的模块划分
	把之前写好的tabbar组件引入到这个项目中

6.配置路由	
	src/router/index.js里面配置，配置路由映射

7.title小图标修改
	在public/index.html里面修改
	<link rel="icon" href="<%= BASE_URL %>favicon.ico">
	<%= BASE_URL %>:表示当前文件所在的路径,jsp语法

	//public文件夹在打包时，会原封不动的复制到dist文件夹里面

8.首页制作
	8.1封装独立的导航组件NavBar，并预留插槽，/src/components/			 common/navbar/NavBar.vue
		 导航插槽样式书写
	8.2请求首页的多个数据axios
		网络模块的封装,在network里面新增一个home.js文件，封装的是对首页数据的请求,可以对首页的多个请求统一管理

9.FeatureView封装
	本周流行封装，就是一张照片显示

10.TabControl封装
	/content/tabControl/
	流行新款精选封装为独立的组件
	和业务是相关的，放到content文件里
	因为组件复用时，只改变组件导航的文字，不对样式进行修改，所以可以不适用插槽，动态绑定传入的文字，遍历传入文字的数组

11.保存商品的数据结构设计
	goods: {
      pop: { page: 0, list: [] },
      new: { page: 0, list: [] },
      sell: { page: 0, list: [] },
    },

12.商品首页数据展示
	组件封装content/goods/GoodsList.vue &GoodsListItem.vue
	逻辑：请求的响应数据在Home.vue的data里面，封装一个大的组件GoodsList，在Home里使用GoodsList时	<goods-list  :goods="goods['pop'].list"> </goods-list> 把Home页面保存的商品列表信息传给GoodsList组件，在GoodsList对商品列表信息进行遍历，又把商品列表信息里的数据传给GoodsListItem组件，在GoodsListItem里面进行更多详细信息的显示




Question:
1.在cli3中，别名报错问题
2.滚动better-scroll
3.轮播图 swiper










# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
