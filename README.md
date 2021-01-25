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
	8.1封装独立的导航组件NavBar，并预留插槽,方便其他页面复用
		/src/components/common/navbar/NavBar.vue
		导航插槽样式书写
	8.2请求首页的多个数据axios
		网络模块的封装,在network里面新增一个home.js文件，封装的是对首页数据的请求,可以对首页的多个请求统一管理
	8.3 轮播图
		swiper框架学习，不要忘记了！！！
		
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

13.点击切换商品首页数据展示，子组件数据传递到父组件上
	this.getHomeGoods("pop");
	this.getHomeGoods("new");
	this.getHomeGoods("sell");
	上面三个函数把三个栏目的数据全都请求下来了，但是只显示了一个数据，点击哪个项目，就把点击的index的数据传递给home组件，在home组件显示响应的项目数据

14.better-scroll安装和使用
	演示代码在category文件夹内
	安装:  npm i --save better-scroll@1.13.2 
	原理： wrapper，也就是父容器，它会有固定的高度。黄色部分为 content，它是父容器的第一个子元素，它的高度会随着内容的大小而撑高。当 content 的高度超过父容器wrapper的高度,就可以滚动内容区,外层盒子限制高度，内层盒子是滚动内容

15.如果要是在Home页面使用better-scroll
	import引入better-scroll，在Home模板设置两个div，一个时wrapper，一个是content，wrapper设置高度,然后再mounted生命周期函数中new BScroll即可,但是写到Home里面耦合度高

16.better-scroll封装为组件:	
	注意封装的模板有wrapper和content两个div，配合better-scroll使用；
	尽量不适用document.querySeletor()获取元素，应使用ref获取元素，这样能够准确的获取某一个元素

17.点击返回顶部组件
	点击返回组件按钮样式书写；
	点击返回顶部的逻辑书写：原生元素可以直接监听事件，如 <button @click="btnClick"> ，但是组件不能直接监听,使用native修饰符可以监听组件,新版不需要这个修饰符也可以监听

	backTop的显示与隐藏:
		需要实时监听当前滚动的位置，需要在scroll里设置probeType，同时在scroll里监听scroll事件(on.方法)，
		backTop的显示隐藏是要在home组件里面设置，所以在scroll组件里面用子传父自定义事件把postion事件传递给home组件，然后再backTop标签里面使用v-show控制显示与隐藏

18.上拉加载更多


!.回顾一下，理一下思路:
	导航栏、轮播图、推荐recommend、FeatureView、TabControl、首页商品数据的请求

	FeatureView：独立组件封装
		div->a->img
	TabControl：独立组件封装
		props->titles[数组]
		div>根据titles进行v-for遍历,决定有几个div->span{{title}}
		css:	flex、 flex=1
		选中哪一个tab，哪一个tab的文字颜色变色，下面有border-bottom
		currentIndex：记录当前选中的那个tab，currentIndex与遍历的index进行比较，动态绑定.active，再active里面改变颜色
	首页商品数据的请求:
		3.1设计数据结构，用于保存数据
		首先有三种不同的类型的tab，每一个类型里面有当前自己请求的页码和数据需要保存
		goods:{
			pop:page/list
			new:page/list
			sell:{page:0,list[]}
		}
		3.2发送数据请求
			network/home.js对请求的路径和参数的封装，封装为这个函数getHomeGoods(type,page);
			再Home组件created声明收起函数中发送网络请求，
			一开始pop、new、sell的数据都进行请求；
			再Home组件里又在methods中对getHomeGoods(type)又进行一层封装，在这个封装里面又调用home.js里面的getHomeGoods(type,page)函数,从goods里面取出相应tab的page，动态的获取对应的page；

			获取到数据：res，this.goods[type].list.push(...res),把获取到的数据添加到goods.pop.list[]里面
			this.goods[type].page+=1
	
	商品数据进行展示:
		1.封装GoodsList组件
			props：goods->list 这个参数传递是根据点击哪一个item，就把相应item的list传递给GoodsList组件
			遍历v-for goods->遍历会创建多个GoodsListItem
			每一个GoodsListItem对应一个商品数据封装的对象GoodsItem
		2.封装GoodsListItem组件
			props:goodsItem
			从goodsItem取出数据，使用正确的div/span/img进行商品的展示
			goodsItem.show.img	图片
			goodsItem.title			标题
			goodsItem.price			价格
			goodsItem.cfav			收藏

	对滚动进行重构:Better-Scroll
		1.在index.html中使用Better-Scroll
				const bscroll = new BScroll('el',{
					probeType:0/1/2/3;
					pullUpLoad:true;
					click:true
				})
				注意:wrapper->content->需要滚动的内容
				监听滚动:
					probeType:0/1/2(手指滚动时才监听)/3(滚动全程都监听)
					bscroll.on('scroll',(position)=>{监听滚动时的回调})
				上拉加载:
					pullUpLoad:true
					bscroll.on('pullingUp',()=>{回调})
				click:
					当参数click为false时,组件内部元素button可以监听点击事件,但是div等非按钮元素不能监听点击事件
		2.在Vue项目中使用Better-Scroll
				在Catrgory中简单演示
				对Better-Scroll封装:封装在Scroll.vue中
				Home.vue和Scroll.vue之间的通信:
					Home需要获得滚动的position数据,但这个数据只能在Scroll.vue中才能获取,所以在Scroll.vue中监听scroll获取position
					(scroll.on('scroll',(position)=>{
						子传父通信
						this.$emit('scroll',position)
					}))
					Home.vue将ProbeType设置为3：这是因为在封装Scroll.vue时，为了能让Scroll.vue最大的利用,所以将Scroll.vue的probeType设置为动态绑定的，在Home.vue中动态传入probeType的值:probe-type="3"
					wrapper外层盒子必须有高度

	6.点击回到顶部BackTop.vue
		1.对BAckTop.vue的封装：
				里面只有一张图片和css
		2.如何监听组件的点击：
			2.1在组件内部监听点击,通过自定义事件把数据传到父组件
			2.2直接监听父组件BackTop.vue的点击,不能直接监听,需要使用.natve修饰符 @click.native="backClick"
		3.回到顶部：
			需要拿到Scroll.vue里面的scroll对象,使用scroll对象的方法 scroll.scrollTo(x,y,time)
			在Home.vue中用this.$refs.scroll.scroll.scrollTo(x,y,time),其中在Home.vue的scroll上要绑定ref="scroll"
			this.$refs.scroll拿到的是Scroll组件
			this.$refs.scroll.scroll拿到的是Scroll组件的内部的(data)scroll属性
		4.BactTop组件的显示与隐藏
			isShowBackTop:false
			监听滚动，拿到滚动的位置:
					-position.y > 1000: isShowBackTop是true
					isShowBackTop = -position.y > 1000

Question:
1.在cli3中，别名报错问题
2.滚动better-scroll
3.轮播图 swiper


Bug:
1.图片加载滚动一半卡住的情况


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
