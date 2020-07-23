<template>
	<div class="home-view">
		<!-- 輪播圖 -->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in banner" :key="item.img">
				<img v-lazy="item.img" />
			</van-swipe-item>
		</van-swipe>
		
		<!-- 分類 -->
		<CategoryView></CategoryView>
		
		<!-- 單品熱賣 -->
		<TitleView :name="`單品熱賣`" :icon="`star-o`"></TitleView>
		<SellingView></SellingView>
		
		<!-- 精選活動 -->
		<TitleView :name="`精選活動`" :icon="`gift-o`"></TitleView>
		<WinnowView :bigImg="winnowBig1" :contents="winnowContents1"></WinnowView>
		<WinnowView :bigImg="winnowBig2" :contents="winnowContents2"></WinnowView>
		
		<!-- 為你推薦 -->
		<TitleView :name="`為你推薦`" :icon="`label-o`"></TitleView>
		<CommendView></CommendView>
		
		<!-- 商品詳情 -->
		<transition name="slide-right">
			<GoodsDetailView v-if="goodsDetailShow"></GoodsDetailView>
		</transition>
		
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'vant';
	import CategoryView from './content/CategoryView.vue';
	import TitleView from './content/TitleView.vue';
	import SellingView from './content/SellingView.vue';
	import WinnowView from './content/WinnowView.vue';
	import CommendView from './content/CommendView.vue';
	import GoodsDetailView from './GoodsDetailView.vue';
	
	export default {
		name: 'homeView',
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			CategoryView,
			TitleView,
			SellingView,
			WinnowView,
			CommendView,
			GoodsDetailView
		},
		data () {
			return {
				title: '全視眼鏡商城',
				navShow: true,
				banner: [],
				winnowBig1: '',
				winnowContents1: [],
				winnowBig2: '',
				winnowContents2: []
			}
		},
		computed: {
			goodsDetailShow () {
				return this.$store.state.goodsDetailShow;
			}
		},
		created () {
			let that = this;
			// 改變nav
			this.$emit('onTitle', this.title);
			this.$emit('onNavShow', this.navShow);
			
			// 輪播圖
			this.$ajax.get('/json/banner.json')
				.then(function(response) { // 获取数据成功
					// 服务器返回的数据是在 response.data 中
					console.log(response.data);
					that.banner = response.data;
				})
				.catch(function(err) { // 出错
					console.log(err);
				})
				
			// 精品活動
			this.$ajax.get('/json/winnow.json')
				.then(function(response) { // 获取数据成功
					// 服务器返回的数据是在 response.data 中
					console.log(response.data);
					that.winnowBig1 = response.data.bigImg1;
					that.winnowContents1 = response.data.winnowItems1;
					that.winnowBig2 = response.data.bigImg2;
					that.winnowContents2 = response.data.winnowItems2;
				})
				.catch(function(err) { // 出错
					console.log(err);
				})
		}
	}
</script>

<style>
.home-view {
	padding-top: 2.8125rem;
	padding-bottom: 3.125rem;
}
.my-swipe {
	/* margin-top: 2.8125rem; */
	height: 9.875rem;
}
.my-swipe img {
	width: 100%;
}
</style>
