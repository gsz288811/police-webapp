<template>
	<div>
		<mt-header title="添加测试" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button icon="back" @click="goback"></mt-button>
			</div>
		</mt-header>
		<div class="box_one">
			<p>测验名称 <input type="text" value="" /></p>
			<p>总数人&emsp; <input type="text" value="" /></p>
		</div>
		<div class="box_two">
			测试类型
			<p><input type="radio" value="" name="test"/>女子100米跑</p>
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
			<p><input type="radio" value="" name="test"/>女子100米跑</p> 
		</div>
		<div style="display: flex;justify-content: center;">
			<button type="button" class="ok_btn">保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goback(){
				this.$router.push({				
					path: '/Grade', 
					query: {   
						num:3,
						haslogin:0
					}
				})
			}
		}
	}
</script>

<style>
	.box_one,.box_two{
		margin:1rem 1rem 0 1rem;
		background-color: #fff;
		border: 1px solid #ccc;
		padding: 1rem;
	}
	.box_one p input{
		width: 10rem;
		height: 1.5rem;
		display: inline-block;
		margin-top: 1rem;
	}
	.box_two p{
		line-height: 2.5rem;
	}
	.ok_btn{
		width: 5rem;
		height: 2.4rem;
		display: inline-block;
		margin: 1rem auto;
		border-radius: 0.5rem;
		outline: none;
		color: #fff;
		font-size: 18px;
		background-color: #4E7FFF;
		outline: none;
		border: none;
		color: #fff;
	}
</style>
