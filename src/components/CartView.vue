<template>
	<div class="cart-view">
		<CartItemView v-for="(cart, index) in carts" :key="cart.id" :cart="cart" :isChecked="selectList[index]" :index="index" @onCheckedChange="onCheckedChange" ref="cartItemView"></CartItemView>
		
		<!-- 地址選擇 -->
		<van-popup v-model="isSubmit" position="bottom">
			<SelectAddrView :addrList="addrList" @onEditAddr="onEditAddr"></SelectAddrView>
		</van-popup>
		
		<!-- 地址編輯 -->
		<van-popup v-model="isEdit" position="bottom">
			<EditAddrView :editValue="editValue" @saveEditAddr="saveEditAddr"></EditAddrView>
		</van-popup>
		
		<van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
			<van-checkbox v-model="isAll" checked-color="red" @change="onAll">全选</van-checkbox>
		</van-submit-bar>
	</div>
</template>

<script>
	import CartItemView from './content/CartItemView.vue'
	import { SubmitBar, Checkbox, Popup } from 'vant';
	import SelectAddrView from './content/SelectAddrView.vue'
	import EditAddrView from './content/EditAddrView.vue'
	
	export default {
		name: 'cartView',
		components: {
			CartItemView,
			[SubmitBar.name]: SubmitBar,
			[Checkbox.name]: Checkbox,
			SelectAddrView,
			[Popup.name]: Popup,
			EditAddrView
		},
		data () {
			return {
				title: '購物車',
				navShow: true,
				carts: null,
				isAll: false,
				selectList: [],
				isSubmit: false,
				addrList: [],
				isEdit: false,
				editValue: {},
				editIndex: 0
			}
		},
		computed: {
			totalPrice () {
				console.log('computed')
				let total = 0;
				 for(let i=0; i<this.selectList.length; i++) {
					 if(this.selectList[i]) {
						 let price = this.carts[i].price;
						 let num = this.carts[i].num;
						 total += price * num;
					 }
				 }
				 return total * 10 * 10;
			}
		},
		created () {
			// 改變nav
			this.$emit('onTitle', this.title);
			this.$emit('onNavShow', this.navShow);
			
			// 獲取購物車數據
			let that = this;
			this.$ajax.get('/json/cart.json')
			.then(function (response) {
				console.log(response.data)
				that.carts = response.data;
				
				// select list
				for(let i=0; i<that.carts.length; i++) {
					that.selectList.push(true)
				}
			})
			.catch(function (err) {
				console.log(err)
			});
			
			// 獲取地址數據
			this.$ajax.get('/json/user-addr.json')
			.then(function (response) {
				console.log(response.data)
				that.addrList = response.data;
			})
			.catch(function (err) {
				console.log(err)
			});
		},
		methods: {
			onSubmit () {
				this.isSubmit = true;
			},
			onCheckedChange (isChecked, index) {
				this.$set(this.selectList, index, isChecked);
				console.log(this.selectList);
			},
			onAll () {
				for(let i=0; i<this.selectList.length; i++) {
					this.$set(this.selectList, i, this.isAll);
					this.$refs.cartItemView[i].test()
				}
			},
			onEditAddr (index) {
				 this.isEdit = true;
				 this.editValue = this.addrList[index];
				 this.editIndex = index;
			},
			saveEditAddr (editValue) {
				this.$set(this.addrList, this.editIndex, editValue)
				this.isEdit = false;
				console.log(editValue);
			}
		}
	}
</script>

<style>
.cart-view {
	padding-top: 2.8125rem;
	padding-bottom: 6.25rem ;
	min-height: 100vh;
	box-sizing: border-box;
	background: #f2f2f2;
}

.cart-view .van-submit-bar {
	bottom: 3.125rem;
}
</style>
