<template>
	<div class="search-detail-view">
		<!-- 導航欄 -->
		<van-nav-bar
			title="搜索結果"
			left-arrow
			@click-left="onBack()"
			fixed
		/>
		
		<!-- 商品列表 -->
		<SearchItemView v-for="(goods, index) in searchDataList" :key="index" :goods="goods" ></SearchItemView>
		
	</div>
</template>

<script>
	import { NavBar } from 'vant';
	import SearchItemView from './content/SearchItemView.vue'
	
	export default {
		name: 'searchDetailView',
		props: ['searchDataList'],
		components: {
			[NavBar.name]: NavBar,
			SearchItemView
		},
		methods: {
			onBack () {
				this.$emit('detailClose');
			},
		}
	}
</script>

<style>
	.search-detail-view {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #f2f2f2;
		z-index: 999;
		padding-top: 2.8125rem;
		overflow: auto;
	}
</style>
