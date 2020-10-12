<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	#app{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		-webkit-overflow-scrolling: touch;
		/* overflow: auto; */
	}
	.mint-header-title{
		margin-top: 1.6rem;
	}
	.mint-header div{
    margin-top: 0.8rem;
	}
	*{
		margin:0;
		padding:0;
		
	}
	a{
		text-decoration: none;
		color: #000;
	}
	html,body{
		width:100%;
		height:100%;
	}
	ul{list-style:none}
</style>
