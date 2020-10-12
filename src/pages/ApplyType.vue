<template>
	<div id="apply_type">
		<mt-header title="培训申请" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<p>请选择申请类型：</p>
		<p class="break" @click="breakoff()">中止培训申请</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userId:null,
			};
		},
		mounted() {
			this.userId = this.$route.query.userId
		},
		methods:{
			goback(){
				this.$router.push({
					path:'/TrainApplication',
					query:{
						userId:this.userId,
					}
				})
			},
			breakoff(){
				this.$router.push({
					path:'/ApplyReason',
					query:{
						userId:this.userId,
					}
				})
			}
		}
	}
</script>

<style>
	#apply_type p{
		text-align: center;
		margin-top: 2rem;
	}
	#apply_type .break{
		width: 80%;
		border: 1px solid #ccc;
		margin: 1rem auto;
		background-color: #fff;
		height: 2rem;
		line-height: 2rem;
	}
</style>
