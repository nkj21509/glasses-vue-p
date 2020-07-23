<template>
	<div class="selling-view">
		<GoodsItemView v-for="item in sellingList" :key="item.id" :goods="item"></GoodsItemView>
	</div>
</template>

<script>
	import GoodsItemView from './GoodsItemView.vue'
	
	export default {
		name: 'sellingView',
		components: {
			GoodsItemView
		},
		data () {
			return {
				sellingList: []
			}
		},
		created () {
			let that = this;
			this.$ajax.get('/glasses-vue/json/selling-list.json')
			.then( function (response) {
				console.log(response.data);
				that.sellingList = response.data;
			})
			.catch( function (err) {
				console.log(err);
			})
		}
	}
</script>

<style>
	.selling-view {
		border-top: 0.0625rem solid #bbbbbb;
		border-left: 0.0625rem solid #bbbbbb;
		overflow: hidden;
	}
</style>
