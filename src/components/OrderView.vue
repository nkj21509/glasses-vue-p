<template>
	<div class="order-view">
		<van-nav-bar
			title="訂單詳情"
			left-arrow
			@click-left="onClickLeft"
		/>
		
		<van-tabs v-model="active">
			<van-tab title="全部">
				<OrderItemView v-for="(order, index) in orderList" :key="index" :order="order"></OrderItemView>
			</van-tab>
			<van-tab title="待付款">
				<OrderItemView v-for="(order, index) in orderList1" :key="index" :order="order"
			</van-tab>
			<van-tab title="待發貨">
				<OrderItemView v-for="(order, index) in orderList2" :key="index" :order="order"
			</van-tab>
			<van-tab title="待收貨">
				<OrderItemView v-for="(order, index) in orderList3" :key="index" :order="order"
			</van-tab>
			<van-tab title="交易成功">
				<OrderItemView v-for="(order, index) in orderList4" :key="index" :order="order"
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import { NavBar, Tab, Tabs } from 'vant';
	import OrderItemView from './content/OrderItemView.vue';

	export default {
		name: 'orderView',
		props: ['orderType'],
		components: {
			[NavBar.name]: NavBar,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			OrderItemView
		},
		data() {
			return {
				active: 2,
				orderList: [],
				orderList1: [],
				orderList2: [],
				orderList3: [],
				orderList4: []
			};
		},
		created () {
			this.active = this.orderType;
			
			// 獲取數據
			let that = this;
			this.$ajax.get('/glass-vue/json/order.json')
			.then(function (response) {
				console.log(response.data);
				that.orderList = response.data;
				
				for(let i=0; i<that.orderList.length; i++) {
					let order = that.orderList[i];
					if(order.type == 1) {
						that.orderList1.push(order);
					} else if(order.type == 2) {
						that.orderList2.push(order);
					} else if(order.type == 3) {
						that.orderList3.push(order);
					} else if(order.type == 4) {
						that.orderList4.push(order);
					}
				}
			}).catch(function (err) {
				console.log(err)
			});
		},
		methods: {
			onClickLeft () {
				this.$emit('onBack');
			}
		}
	}
</script>

<style>
.order-view {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	background: #f2f2f2;
	z-index: 99;
}
.order-view .van-tabs__content{
	overflow: auto;
	position: fixed;
	width: 100%;
	height: 100%;
	padding-bottom: 6.1875rem;
	box-sizing: border-box;
}
</style>
