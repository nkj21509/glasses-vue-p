<template>
  <div class="navbar">
    <van-nav-bar :title="title" />
  </div>
</template>

<script>
  import { NavBar } from 'vant'
  export default {
    name: 'navView',
    components:{
      [NavBar.name]:NavBar
    },
    data() {
      return {
        title: '全视眼镜商城'
      }
    },
  }
</script>

<style>
	.van-nav-bar{
		background: red;
		height: 2.8125rem;
		text-align: center;
		line-height: 2.8125rem;
	}
	.van-nav-bar__title{
		color: white;
	}
</style>
