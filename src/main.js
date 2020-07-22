import Vue from 'vue';
import App from './App.vue';

// Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Axios
import Axios from 'axios';
Vue.prototype.$ajax = Axios;

// 懶加載
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// Vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// 定義狀態
const store = new Vuex.Store({
  state: {
    goodsDetailShow: false,
	goodsItemId: 0
  },
  mutations: {
    changeGoodsDetailShow (state) {
		state.goodsDetailShow = !state.goodsDetailShow;
    },
	changeGoodsItemsId (state, goodsId) {
		state.goodsItemId = goodsId;
	}
  }
});

Vue.config.productionTip = false;

// all components
import HomeView from './components/HomeView.vue';
import AssortView from './components/AssortView.vue';
import SearchView from './components/SearchView.vue';
import CartView from './components/CartView.vue';
import MineView from './components/MineView.vue';

var routes = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		component: HomeView
	},
	{
		path: '/assort',
		component: AssortView
	},
	{
		path: '/search',
		component: SearchView
	},
	{
		path: '/cart',
		component: CartView
	},
	{
		path: '/mine',
		component: MineView
	}
]

var router = new VueRouter({
	routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
