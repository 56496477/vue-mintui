import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerconfig from './router'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import 'mint-ui/lib/style.css'
import { InfiniteScroll } from 'mint-ui'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(InfiniteScroll)
Vue.use(VueLazyload,{
    preLoad: 1.3,
    error: 'http://10.10.0.98:8080/success.gif',
    loading: 'http://10.10.0.98:8080/success.gif',
    try: 1 
})

var router = new VueRouter()

routerconfig(router)

router.start(App,'#app')
