<template>
  <div id="app">
	<van-nav-bar
		:title="title"
		fixed
		v-show="navShow"
	/>
	
	<router-view @onTitle="getTitle" @onNavShow="getNavShow" ></router-view>
	
	<van-tabbar class="tabbar" v-model="active" active-color="red" @change="onClickTabbarItem">
		<van-tabbar-item icon="wap-home-o" to="/home">首頁</van-tabbar-item>
		<van-tabbar-item icon="filter-o" to="/assort">分類</van-tabbar-item>
		<van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
		<van-tabbar-item icon="cart-o" info="20" to="/cart">購物車</van-tabbar-item>
		<van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
	</van-tabbar>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from 'vant';

export default {
  name: 'App',
  components: {
	[NavBar.name]:NavBar,
	[Tabbar.name]:Tabbar,
	[TabbarItem.name]:TabbarItem
  },
  data () {
		return {
			title: '',
			navShow: true,
			active: 0,
		}
  },
  methods: {
		getTitle (title) {
			this.title = title;
		},
		getNavShow (temp) {
			this.navShow = temp
		},
		onClickTabbarItem () {
			window.localStorage.setItem('itemIndex', this.active);
		}
  },
  created () {
	  this.active = parseInt(window.localStorage.getItem('itemIndex')) || 0;
	  let page = this.$router.options.routes[this.active + 1].path;
	  this.$router.push(page).catch(()=>{});
  }
}
</script>

<style>
#app {
	background-color: #f2f2f2;
}
.van-nav-bar {
	background: red;
	height: 2.8125rem;
	text-align: center;
}
.van-nav-bar__title {
	color: white;
}
.van-nav-bar .van-icon {
	color: white;
	font-size: 1rem;
}

.tabbar {
	border-top: 0.0625rem solid #D0D0D0;
}

.slide-right-enter-active,
.slide-right-leave-active {
	transition: all 2s;
}
.slide-right-enter,
.slide-right-leave-to {
	transform: translateX(100%);
}
</style>
