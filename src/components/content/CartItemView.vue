<template>
	<div class="cart-item-view">
		<div class="cart-checkbox">
			<van-checkbox class="checkbox" v-model="checked" checked-color="red" @change="checkedChange"></van-checkbox>
			<span></span>
		</div>
		
		<div class="cart-img">
			<img v-lazy="cart.img" />
			<span></span>
		</div>
		
		<div class="cart-detail">
			<div class="goods-detail">
				<span>特價</span>
				<span>{{ cart.name }}</span>
			</div>
			<p>{{ cart.price }}</p>
			<p>x{{ cart.num }}</p>
		</div>
	</div>
</template>

<script>
	import { Checkbox } from 'vant';
	
	export default {
		name: 'cartItemView',
		props: ['cart', 'isChecked', 'index'],
		components: {
			[Checkbox.name]: Checkbox
		},
		computed: {
			checked () {
				return this.isChecked;
			}
		},
		methods: {
			checkedChange () {
				console.log(this.checked, this.index)
				this.$emit('onCheckedChange', this.checked, this.index)
			},
			test () {
				console.log('test')
			}
		}
	}
</script>

<style>
.cart-item-view {
	width: 22.1875rem;
	height: 6.25rem;
	margin: 0.625rem;
	border: 0.0625rem solid #BBBBBB;
	box-shadow: 0 0 0.25rem 0 gray;
	border-radius: 0.5rem;
	background: white;
}

.cart-item-view .cart-checkbox {
	float: left;
	width: 1.5625rem;
	height: 100%;
	text-align: right;
}
.cart-item-view .cart-checkbox span {
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
.cart-item-view .cart-checkbox .checkbox {
	vertical-align: middle;
	display: inline-block;
}

.cart-item-view .cart-img {
	width: 4.8125rem;
	height: 100%;
	float: left;
	text-align: center;
}
.cart-item-view .cart-img img {
	width: 4.375rem ;
	display: inline-block;
	vertical-align: middle;
}
.cart-item-view .cart-img span {
	display: inline-block;
	vertical-align: middle;
	height: 100%;
}

.cart-item-view .cart-detail {
	float: left;
	margin-top: 1.5625rem; 
}
.cart-item-view .cart-detail .goods-detail {
	font-size: 0.875rem;
}
.cart-item-view .cart-detail .goods-detail span:nth-of-type(1) {
	color: red;
	margin-right: 0.6875rem ;
}
.cart-item-view .cart-detail p {
	font-size: 0.625rem;
	
}
.cart-item-view .cart-detail p:nth-of-type(1) {
	line-height: 2.1875rem;
}
</style>
