<template>
	<div class="search-view">
		<!-- 搜索欄 -->
		<van-search
			v-model="searchKey"
			show-action
			placeholder="请输入搜索关键词"
			@search="onSearch"
		>
			<template #action>
				<div @click="onSearch">搜索</div>
			</template>
		</van-search>
		
		<!-- 搜索歷史 -->
		<div class="history-view">
			<div class="history-title">
				<h4>最近搜索</h4>
				<span @click="onClear">清空紀錄</span>
			</div>
			
			<van-tag @click="onHistoryItem(item)" round v-for="(item, index) in historyList" :key="index">{{ item }}</van-tag>
		</div>
		
		<!-- 搜索詳情 -->
		<SearchDetailView v-if="searchDetailShow" @detailClose="detailClose" :searchDataList="searchDataList"></SearchDetailView>
		
	</div>
</template>

<script>
	import { Search, Tag, Toast } from 'vant';
	import SearchDetailView from './SearchDetailView.vue'
	
	export default {
		name: 'searchView',
		components: {
			[Search.name]: Search,
			[Tag.name]: Tag,
			SearchDetailView,
			[Toast.name]: Toast
		},
		data () {
			return {
				title: '搜索',
				navShow: false,
				searchKey: '',
				historyList: [
					'明月',
					'海昌',
					'隱形眼鏡'
				],
				searchDetailShow: false,
				searchDataList: null
			}
		},
		created () {
			// 改變nav
			this.$emit('onTitle', this.title);
			this.$emit('onNavShow', this.navShow);
		},
		methods: {
			onSearch () {
				if(this.searchKey) {
					this.searchDetail();
					this.historyList.push(this.searchKey);
				}
			},
			onClear () {
				this.historyList = [];
			},
			onHistoryItem (item) {
				this.searchKey = item;
				this.searchDetail();
			},
			detailClose () {
				this.searchDetailShow = false;
			},
			closeLoading () {
				this.searchDetailShow = true;
			},
			searchDetail () {
				// 加載提示
				Toast.loading({
					overlay: true,
					message: '加载中...',
					forbidClick: true,
					duration: 0,
					onClose: this.closeLoading
				});
				
				// 獲取搜索內容數據
				let that = this;
				this.$ajax.get('/json/search-detail.json')
				.then(function (response) {
					console.log(response.data)
					that.searchDataList = response.data.list; 
					Toast.clear();
				})
				.catch(function (err) {
					console.log(err)
				});
				
			}
		}
	}
</script>

<style>
.search-view {
	/* position: fixed;
	top: 0;
	left: 0;
	bottom: 0; */
	width: 100%;
	min-height: 100vh; 
	background: #f2f2f2;
}
.search-view .history-view {
	padding: 0 1.25rem;
}
.search-view .history-view .history-title {
	margin: 1.125rem 0 1.25rem;
	overflow: hidden;
}
.search-view .history-view .history-title h4 {
	float: left;
	font-size: 1rem;
	font-weight: 800;
}
.search-view .history-view .history-title span {
	float: right;
	font-size: 1rem;
	color: red; 
}
.search-view .history-view .van-tag {
	margin: 0 0.625rem;
}
</style>
