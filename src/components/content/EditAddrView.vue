<template>
	<div class="edit-addr-view">
		<van-address-edit
			:area-list="areaList"
			:address-info="editValue"
			show-set-default
			show-search-result
			:search-result="searchResult"
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
			@change-detail="onChangeDetail"
		/>
	</div>
</template>

<script>
	import { AddressEdit, Toast } from 'vant';
	import AreaList from './area.js'

	export default {
		name: 'editAddrView',
		props: ['editValue'],
		components: {
			[AddressEdit.name]: AddressEdit
		},
		data() {
			return {
				areaList: AreaList,
				searchResult: []
			};
		},
		methods: {
			onSave(content) {
				let newValue = {
					id: content.id,
					name: content.name,
					tel: content.tel,
					address: content.province + content.city + content.county + content.addressDetail,
				}
				this.$emit('saveEditAddr', newValue)
				console.log(content)
			},
			onChangeDetail(val) {
				if (val) {
				this.searchResult = [
						{
							name: '黄龙万科中心',
							address: '杭州市西湖区',
						},
					];
				} else {
					this.searchResult = [];
				}
			},
		},
	}
</script>

<style>
</style>
