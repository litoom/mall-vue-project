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


	7.解决首页中Better-Scroll可滚动区域的问题
		Better-Scroll在决定有多少区域可以滚动时，是根据scroll对象的scrollerHeight属性决定的，而scrollerHeight属性是根据放在Better-Scroll的content内的所有子组件的高度决定的，但是首页中，刚开始在计算scrollerHeight属性式，是没有将图片高度计算在内的(因为图片还没有完全加载出来),所以计算的高度是不准确的，后来图片全部加载完成，高度发生变化，scrollerHeight属性没有更新，所以属性出现问题

		解决：监听每一张是否加载完成，只要有一张图片加载完成，就执行一次refresh

		如何监听图片加载完成?
			1.原生js监听图片：img.onload = function(){}
			2.vue中通过@load=“function”监听
				 在GoodsListItem.vue里面的img元素里面使用@load="imageLoad"，就是当图片加载完成之后调用imageLoad方法
			3.调用scroll的refresh()方法

Question:
1.在cli3中，别名报错问题
2.滚动better-scroll
3.轮播图 swiper


Bug:
	1.图片加载滚动一半卡住的情况
		产生Bug的原因:betterscroll会遍历content内的所有子组件,计算所有子组件的高度,图片加载是异步进行的，在图片加载之前betterscroll已经计算出高度，等图片全部加载完成之后，content的高度发生变化，但是betterscroll计算的content的高度还是之前计算的高度,所以会出现滚动卡住的问题
		解决：this.scroll.refresh();    //更新高度
		但是，图片加载完成如何和refresh关联：
			监听每一张是否加载完成，只要有一张图片加载完成，就执行一次refresh
			
	2.GoodsListItem.vue怎么调用Scroll.vue里的scroll对象的方法？
			方法一:自定义事件
				通过子传父自定义事件,GoodsListItem传递给GoodsList，GoodsList传递给Home,Home里用this.$refs.scroll.scroll获取scroll对象，再调用scroll对象的方法;
			方法二:Vuex
				使用Vuex状态管理,在GoodsListItem里面通过this.$store保存一个状态在Vuex内，Home组件监听Vuex，当Vuex保存的GoodsListItem状态变化时，Home就调用一次scroll对象的方法
			方法三:事件总线
				事件总线与Vuex作用相似，Vuex是管理状态的，事件总线是管理事件的;
				在GoodsListItem里，通过this.$bus.$emit('事件a',参数),发射事件a到事件总线里，在Home里可以监听事件总线，用this.$bus.$on('事件a',function(参数){回调,在这里调用refrsh()})
					!!!但是并没有$bus这个属性，所以要在vue的原型上加上这个bus属性
					main.js //Vue.prototype.$bus = new Vue()
					为什么要赋值new Vue()?
							因为赋值vue实例后，才会有$emit方法
	(如何将GoodsListItem中的事件传入到Home.vue中?)
			因为涉及到非父子组件的通信,所以我们选择事件总线
			$bus/总线
			1.Vue.prototype.$bus = new Vue();	//main.js
			2.this.$bus.$emit('事件名称',参数)		//子组件发射事件
			3.this.$bus.$on('事件名称',function(){回调函数}				//其他组件

	对于refresh()会频繁的调用的问题，进行防抖:
		debounce防抖/throttle节流；
		防抖函数起作用的过程：
				如果直接执行refresh函数，那么refresh函数会被执行30次；
				可以将refresh函数传入到debounce函数中，生成一个新的函数 
				之后再调用频繁的时候，就是用新生成的函数；
				新生成的函数，并不会频繁的调用，如果下一次执行来的非常快，会把上一次执行取消掉
				//封装防抖函数
					debounce(func, delay) {
						let timer = null;
						return function (...args) {
							if (timer) {
								clearTimeout(timer);
							}
							timer = setTimeout(() => {
								func.apply(this, args);
							}, delay);
						};
					},


common/utils.js	把debounce封装到utils.js里面
		上拉加载更多(重做):
			1.监听滚动到底部:
					再Scroll组件内部写上参数pullUpLoad: this.pullUpLoad；
					pullUpLoad属性是由外界传递的，父传子props；
					监听滚动到底部：
							this.scroll.on("pullingUp",()=>{
    				  // console.log("上拉加载");
      				//自定义事件传递给home组件
      				this.$emit('pullingUp');
    					})

			2.自定义事件传递
					监听到滚动到底部实在Scroll组件内监听到的，但是请求更多的数据是在Home首页执行的，在Scroll通过$emit发送事件到Home组件，Home组件监听事件并执行loadMore方法
			3.在loadMore中:
					this.getHomeGoods(this.currentType),获取当前类型的数据
			4.scroll默认加载一次
					应允许下拉加载多次,调用finishPullUp()
					this.$refs.scroll.scroll.finishPullUp();

tabControl吸顶效果:
	tab-control:position:sticky粘性定位失效
	1.获取到tab-control的offsetTop
		必须知道滚动到多少时，开始有吸顶效果:这个时候就需要获取tab-control的offsetTop；
		但是如果直接再mounted中获取tab-control的offsetTop是不正确的，因为图片可能未完全加载；
		如何获取争取的tab-control的offsetTop？监听HomeSwiper中img的加载完成，加载完成后发出时间，再Home.vue中，获取正确的值;
		补充：为了不让HomeSwiper多次发出事件，可以使用isLoad的变量进行状态的记录,这就是节流阀;
		注意：这里不进行多次调用和debounce防抖的区别

		//获取tabControl的offsetTop,这里获取的是组件，不是dom元素,组件没有offsetTop属性;
    //所有的组件都有一个属性$el:用于获取组件中的dom元素;
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
		这里必须写到Home的mounted里面，如果写到created里面将获取不到组件和组件里面的对象
		但是写到mounted里面获取的offsetTop也不正确，因为获取到offsetTop时，图片并没有全部加载出来
		/影响tabcontrol最大的因素是轮播图的加载时间，所以在这要对轮播图监听图片是否加载完成@load="方法"
	2.监听滚动，当滚动到某一位置时，动态的改变tabControl的样式
		问题：动态的改变tabControl的样式时，会出现两个问题：
			问题1：下面的商品内容，会突然间上移？
			问题2：tabControl虽然设置了fixed，但也随着Better-Scroll一起向上滚出了？
				解决1、2：再最上面，scroll外面，多复制了一份TabControl组件对象来占位，利用它来实现停留效果；
				当用户滚动到一定位置时，占位的TabControl v-show显示出来；
				当用户没有滚动到一定位置时，占位的TabControl隐藏起来的

			问题3：解决两个tab-control点击项目滚动项目变化的问题？
				解决3：currentIndex保持一致

			 /* 问题： */
        /* 1.tabControl脱标，下面的图片会闪一下到上面
        2.tabControl消失
          因为Better-Scroll原理是tranfrom的translate移动的，fixed的元素也会被平移
   			
Home离开时记录位置和状态:
	1.让Home组件不要被随意销毁掉：
		路由跳转组件会销毁destroyed(){},再点回组件,组件会重新创建
		在App.vue里使用keep-alive标签包裹
		 <keep-alive>
      <router-view></router-view>
     </keep-alive>
	2.让Home组件中的内容保持原来的位置：
		离开Home时保存一个位置信息saveY;进来时，将位置设置为原来保存的位置信息saveY即可；
		// 组件活跃时执行的函数
		activated() {},
		// 组件离开时执行的函数
		deactivated() {
		}


详情页制作:
	跳转到详情页并携带商品id
		1.监听GoodsListItem的点击事件;
		2.给详情页配置路由,增加Detali.vue组件,index.js配置路由,并在GoodsListItem配置this.$router.push('/detail'),因为需要动态传入参数，这里选择动态路由的方式：path:"/detail/:id"
			this.$router.push('/deati/' + xxxx)
		3.当点击GoodsListItem时，跳转路由到Detail组件，在Detail组件里面需要获取到跳转路由的params并发送网络请求，并显示

				路由跳转传递参数：
					动态路由方式:path:"/detail/:id"
						this.$router.push('/deati/' + xxxx)
					query传递参数：
						itemClick(){
							this.$router.push({
								path:'deatil',
								query:{}
								})
							}

	详情页导航栏制作：
	数据请求以及轮播图显示:
		网络请求封装到deatil.js里面
		路由被keep-alive，组件不会销毁，也不会创建新的组件，导致Detail详情页面没有刷新新的数据,解决：在App.vue里面的<keep-alive exclude='Deatil'>
	商品基本信息的展示:
		对请求来的数据进行整合，整合未一个数据对象，封装到detail.js里面的一个类上
	商家信息的展示:
		也封装到了detail.js的类上
	商品详情页面不显示TabBar
		因为TabBar是固定定位的，脱离了标准流
	商品详情页的商品的详情展示：
	商品的参数展示：
		封装商品参数类GoodsParam
	商品评价：

	推荐数据：
		1.请求，获取数据
		2.在复用GoodsList时,出现获取数据结构不一致的情况，需要增加computed属性，用计算属性判断一下

	详情页滚动卡顿的问题：
		问题：详情页推荐页面使用的GoodsListItem组件，当GoodsListItem页面图片加载完之后，会通过bus总线通知到Home组件，Home组件会刷新高度，但此时Home组件不需要刷新；
				解决一：通过路由解决:
						//GoodsListItem 
							methods: {
								imageLoad() {
									// console.log('@load="imageLoad"');
									//向事件总线发射itemImageLoad事件
									if(this.$route.path.indexOf('/home')){
										this.$bus.$emit("itemImageLoad");
									}   else if (this.$route.path.indexOf('/detail')){
										this.$bus.$emit("DetailImageLoad")
									}   
				解决二：
						//取消全局事件的监听
						//Home deactivated
							this.$bus.$of('itemImgLoad','监听事件总线上itemImgLoad的回调的函数');				
				
mixin混入:
	作用:组件之间复用代码,data和生命周期函数、components、methods等等等都可以mixin

TabControl保持一致:
	让两个TabControl的currentIndex保持一致
	this.$refs.topTabControl.currentIndex = index;
	this.$refs.tabControl.currentIndex = index;

注意：
	首页：
		在created声明周期函数里面通过document.querySelector()获取dom元素都是空的，因为dom可能在组件创建时还没有挂载上去
		
		防抖:在规定的事件内执行多次事件只执行最后一次

		offsetTop

		服务器返回时间戳：
			时间戳————>时间格式:
				1.将时间戳转换为Date()对象；
					const date = new Date(传入时间戳*1000)
				2.将date进行格式化，转成对应的字符串：
					方法一).date.getYear() + date.getMonth()+1...
					方法二).date->FormatString	封装到函数里
			封装在utils.js里面

详情页-点击NavBar滚动到相应位置
	联动效果-滚动和NavBar联动
		1.点击NavBar滚动到对应的主题
			//DetailNavBar.vue
				this.$emit('titleClick',index)
			//Deatil
			在Detail中监听标题的点击，获取index；
			滚动对应的主题：
				获取所有主题的offsetTop；
				在哪里才能获取到正确的offsetTop?
					1.created里不行，created里面不能获取元素；
					2.mounted不行，在这里dom渲染但数据还没有完全获取；
					3.获取到数据的回调中也不行，dom还没有完全渲染结束
					4.$nextTick不行，图片高度没有被计算在内；
					5.在监听图片加载完成时，获取的高度才是正确的
		2.滚动时，标题发生改变	
			1).先获取滚动的位置，监听滚动，在Scroll组件里有监听scroll事件，并发出scroll事件，发出position位置信息，在Detail组件监听scrol事件
			2).positionY和滚动的值进行对比,根据positionY和position对比，改变index值

详情页底部工具栏的封装：
	阿巴阿巴阿巴
详情页的回到顶部：
	Home和Detail都有回到顶部；
	mixin混入的方式,抽取到mixin.js里面
点击加入购物车：
	VueX@3.1.0
	当点击添加购物车时，Detail里addToCart函数先获取商品，通过vuex的commit调用index.js里的mutations里的addCart方法，并传参数;
	1.监听首页的加入购物车按钮的点击，并且获取商品的信息iid,price,img,title,desc；
	2.将商品添加到vuex里面，安装vuex，配置vuex，定义mutations，将商品添加到state.cartList里面；
	3.重构代码：将mutations的代码抽取到actions(定义两个mutations)；将mutations/actions单独抽取到文件中，我没有抽取

购物车的显示：
	1.导航栏的显示，以及显示购物车商品的数量
	2.购物车商品的展示：
		1.从vuex的CartList里取出购物车商品的数据，遍历展示在CartList组件里，使用Scroll滚动
		2.封装CartListItem，每一个商品显示的组件CartListItem，遍历展示
		3.封装CheckButton

商品的选中和不选中效果：
	修改模型队形，改变选中和补选中

底部工具栏的汇总
	全选按钮
	计算总价格
	去结算按钮

购物车全选按钮：
	显示的状态：
		商品列表全部选中时，全选按钮点亮：
			判断是否有一个商品不选中，全选按钮就是不选中,
	点击全选按钮：
		点击全选按钮时，商品列表全部点亮：
			如果购物车商品都是选中的，点击一次全选按钮，商品全部不选中：
			如果原来有不选中，则商品全部选中：

点击加入购物车弹窗的动画效果:Toast
	1.在Detail里监听点击加入购物车事件：
			不是一点击按钮就提示添加购物车成功，而是等完成操作之后再提示添加成功，是一个异步操作;dispatch返回一个Promise,再index.js里操作resolve()；然后在Detail.js的dispatch接收到返回的Promise，dispatch进行then操作
		补充：1).mapActions：也可以把vuex的actions方法映射到组件的methods方法
				//Detail.vue import {mapActions} from 'vuex'
				...mapActions(['addCart'])
				//可以直接调用使用 this.addCart()...........
				2).Actions可以返回一个Promise
	2.封装Toast组件
		1).普通组件封装
		2).插件方式封装
				通过在Detail里this.$toast.show(res,1500)显示弹窗;
				把组件封装到插件里，安装插件，就会把组件创建出来，一开始就会添加到prototype里；
				1.在toast文件夹里创建index.js文件
				2.安装toast插件,本质上是调用toast对象的install方法
					Vue.use(toast);



把vuex的getters转换未computed，可以直接使用{{}}
import {mapGetters} from 'vuex';
computed:{
	...mapGetters(["cartLength"])
}
Question:
	this.$nextTick(()=>{})

————————项目基本完成————————

补充:
	1.fastClick
		移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick
		npm install fastclick --save
		在main.js中导入:
			import fastClick from 'fastclick'
		使用fastclick:
			fastClick.attach(document.body);
	2.图片懒加载vue-lazyload
			图片懒加载是用到时再加载，图片需要显示在屏幕上时，再加载这张图片
				安装：npm install vue-lazyload --save
				导入：import VueLazyLoad from 'vue-lazyload'
				Vue安装：Vue.use(VueLazyLoad);
				修改img:src 改为v-lazy
	3.px2vw
		postcss-px-to-viewport@0.0.3











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
