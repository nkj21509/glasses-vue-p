<template>
	<div class="goods-item-view" @click="goodsItemClick()">
		<img class="img" v-lazy="goods.img" />
		<p class="title">{{ goods.title }}</p>
		<p class="desc">{{ goods.desc }}</p>
		<p class="other">
			<span class="now-price">${{ goods.nowPrice }}</span>
			<span class="old-price">${{ goods.oldPrice }}</span>
			<span class="rebate">{{ goods.rebate }}折</span>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'goodItemView',
		props: ['goods'],
		methods: {
			goodsItemClick() {
				console.log(this.goods.id);
				this.$store.commit('changeGoodsDetailShow');
				this.$store.commit('changeGoodsItemsId', this.goods.id);
				console.log(this.$store.state.goodsDetailShow, this.goods.id)
			}
		}
	}
</script>

<style>
	.goods-item-view {
		width: 50%;
		height: 13.875rem;
		border-right: 0.0625rem solid #bbbbbb;
		border-bottom: 0.0625rem solid #bbbbbb;
		float: left;
		box-sizing: border-box;
		background: white;
		text-align: center;
	}
	.goods-item-view .img {
		width: 9.375rem;
		height: 8.125rem;
		margin: 0.625rem;
		
	}
	.goods-item-view .title {
		font-size: 0.8125rem;
		color: black;
		margin-bottom: 0.625rem;
	}
	.goods-item-view .desc {
		font-size: 0.75rem;
		color: #b4b4b4;
		margin-bottom: 0.8125rem;
	}
	.goods-item-view .now-price {
		color: red;
		font-size: 0.875rem;
		font-weight: 800;
		margin-right: 0.5rem;
	}
	.goods-item-view .old-price {
		color: #B4B4B4;
		font-size: 0.75rem;
		margin-right: 8px;
		text-decoration: line-through;
	}
	.goods-item-view .rebate {
		color: white;
		font-size: 0.75rem;
		background: red;
		border-radius: 0.1875rem;
		width: 2.0625rem;
		height: 0.75rem;
		line-height: 0.75rem;
		display: inline-block;
	}
</style>
