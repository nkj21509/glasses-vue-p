<template>
	<div class="assort-view">
		<div class="side-view">
			<div class="item" v-for="(item, index) in assortList" :key="index" @click="onNavClick(index)" ref="sideItem">{{ item.text }}</div>
		</div>
		
		<div class="main-view">
			<div class="main-wrapper">
				<div class="goods-wrapper" v-for="(item, index) in goodsList" :key="index">
					<div class="img">
						<img v-lazy="item.img" />
						<span></span>
					</div>
					<div class="content">
						<p class="name">{{ item.name }}</p>
						<p class="old-price">原價：${{ item.oldPrice }}</p>
						<p class="price">折扣價：${{ item.price }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'assortView',
		data () {
			return {
				title: '分類',
				navShow: true,
				assortList: null,
				activeIndex: 0,
				selectItem: null,
				goodsList: null
			}
		},
		created () {
			// 改變nav
			this.$emit('onTitle', this.title);
			this.$emit('onNavShow', this.navShow);
			
			let that = this;
			this.$ajax.get('json/assort.json')
			.then(function (response) {
				console.log(response.data);
				that.assortList = response.data
				that.$nextTick(function () {
					that.selectItem = that.$refs.sideItem[that.activeIndex]
					that.selectItem.className = 'item active';
					that.goodsList = that.assortList[that.activeIndex].children
				});
			})
			.catch(function (err) {
				console.log(err);
			});
		},
		methods: {
			onNavClick (index) {
				this.activeIndex = index;
				this.selectItem.className = 'item';
				this.selectItem = this.$refs.sideItem[index]
				this.selectItem.className = 'item active';
				this.goodsList = this.assortList[this.activeIndex].children;
			}
		}
	}
</script>

<style>
.assort-view {
	background: #f2f2f2;
	padding-top: 2.8125rem;
	padding-bottom: 3.125rem;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100%;
}

.assort-view .side-view {
	width: 5.9375rem;
	height: 100%;
	background: white;
	float: left;
	padding: 0.9375rem;
	box-sizing: border-box;
}
.assort-view .side-view .item {
	color: black;
	font-size: 0.75rem;
	height: 1.625rem;
	line-height: 1.625rem;
	border-radius: 12px;
	text-align: center;
	margin-bottom: 0.9375rem;
}
.assort-view .side-view .item.active {
	background: black;
	color: white;
}

.assort-view .main-view {
	width:  16.25rem;
	height: 100%;
	float: left;
	margin: 0.625rem;
	overflow: auto;
}
.assort-view .main-view .main-wrapper {
	width: 100%;
	padding-bottom: 0.625rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper {
	background: white;
	width: 100%;
	height: 6.25rem;
	margin-bottom: 0.625rem;
	box-sizing: border-box;
	border-radius: 0.3125rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .img {
	width: 5.625rem;
	float: left;
	text-align: center;
	height: 100%;
}
.assort-view .main-view .main-wrapper .goods-wrapper .img img {
	width: 100%;
	vertical-align: middle;
	display: inline-block;
}
.assort-view .main-view .main-wrapper .goods-wrapper .img span {
	vertical-align: middle;
	display: inline-block;
	height: 100%
}
.assort-view .main-view .main-wrapper .goods-wrapper .content {
	width: 155px;
	float: left;
	margin-top: 0.8125rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .name {
	font-size: 0.75rem;
	line-height: 1.0625rem;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .old-price {
	font-size: 0.75rem;
	line-height: 2.0625rem;
	text-decoration: line-through;
	color: #BBBBBB;
}
.assort-view .main-view .main-wrapper .goods-wrapper .content .price {
	font-size: 0.6875rem;
	color: red;
}
</style>
