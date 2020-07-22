<template>
	<div class="select-addr-view">
		<van-address-list
			v-model="chosenAddressId"
			:list="addrList"
			default-tag-text="默认"
			@add="onNext"
			@edit="onEdit"
			add-button-text="下一步"
		/>
	</div>
</template>

<script>
	import { AddressList } from 'vant';

	export default {
		name: 'selectAddrView',
		props: ['addrList'],
		components: {
			[AddressList.name]: AddressList
		},
		data() {
			return {
				chosenAddressId: '1'
			}
		},
		methods: {
		    onNext () {
				
		    },
		    onEdit(item, index) {
				this.$emit('onEditAddr', index)
		    }
		}
	}
</script>

<style>
</style>
