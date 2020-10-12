<template>
	<div id="loading">
		<div class="box">
			<p>正在加载题库</p>
			<img src="../assets/images/timg.gif"/>
		</div>			
	</div>
</template>

<script>
	export default {
		name:"Loading",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
        #loading {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -110px;
			margin-left: -160px;
            width: 320px;
            height: 220px;
            background-color: #fff;
			border: 1px solid #ccc;
        }
		#loading p{
			background-color: #55C3B1;
			text-align: center;
			line-height: 24px;
			color: #fff;
		}
		#loading img{
			display: inline-block;
			height: 180px;
			padding-left: 70px;
		}
</style>
