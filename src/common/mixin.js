import BackTop from '../components/content/backTop/BackTop.vue'
/**
 * mixin混入
 */
export const itemListenerMixin = {
    mounted() {
      
    },
}

//BackTop回到顶部的混入:
//methods里面的函数里面的函数不能mixin，因为会覆盖，methods里面的函数可以mixin
export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShowBackTop:false,
        }
    },
    methods: {
        backTop(){
            this.$refs.scroll.scrollTo(0,0,300)
        }
    },
}
