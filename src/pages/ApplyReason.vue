<template>
	<div>
		<mt-header title="培训申请" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<p>申请原因：</p>
		<form action="">
			<textarea value="" placeholder="" v-model="reason"/>
			<p> 所属大队：
				<select name="" id="">
					<option>请选择</option>
					<option>{{Bigteam}}</option>
				</select>
			</p>
			<p> 所属中队：
				<select name="" id="">
					<option>请选择</option>
					<option>{{middleTeam}}</option>
				</select>
			</p>
			<p><button @click="goSubmit">提交上报</button></p>
		</form>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				userId:'',
				Bigteam:'',
				middleTeam:'',
				reason:''
			};
		},
		methods:{
			goback(){
				this.$router.push({
					path:'/ApplyType',
					query:{
						userId:this.userId
					}
				})
			},
			goSubmit(){
				if(this.reason.length){
					this.$ajax.post('/wlxy/trainSuspendApply/applyOfApp.action',this.$qs.stringify(
					{
						userId:this.userId,
						reason:this.reason
					})).then((res)=>{
						if(res.data.success == 1){
							MessageBox('提示', '培训申请提交成功！');
						}	
					})
				}				
			}			
		},
		mounted() {
			this.userId = this.$route.query.userId
			this.$ajax.post('/wlxy/trainingteamtrainee/findOneOfApp.action',this.$qs.stringify(
			{
				userId:this.userId,
			})).then((res)=>{
				this.Bigteam = res.data.data.fkBrigadeName
				this.middleTeam = res.data.data.fkDetachmentName	
			})
		}
	}
</script>

<style scoped>
	div form textarea{
		margin-left: 1rem;
		height: 9rem;
		width: 90%;
	}
	div>p{
		margin-left: 1rem;
		margin-top: 2rem;
	}
	form p{
		line-height: 3rem;
		margin-left: 1rem;
	}
	form p select{
		width: 12rem;
		height: 1.8rem;
	}
	form p button{
		margin-top: 3rem;
		width: 60%;
		height: 2.2rem;
		line-height: 2rem;
		margin-left: 20%;
		background-color: #4E7FFF;
		outline: none;
		border: none;
		color: #fff;
		border-radius: 4px;
	}
</style>
