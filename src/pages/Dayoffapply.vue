<template>
	<div id="dayapply">
		<mt-header title="请假申请" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="rules">
			<p>请假相关规定</p>
			<div class="rules_list">
				<p>一、训练期间突发伤病或训练受伤，经县级以上医院诊断证明需要休息或确实不能完成当期训练的</p>
			    <p>二、直系亲属患重病住院、配偶生育等需要本人照顾的</p>
			    <p>三、直系亲属病故的</p>
			    <p>四、其他特殊情况必须请假的</p><br>
			    <p>学员请假审批权限：</p>
			    <p>一、1天以内的由集训支队支队长审批</p>
			    <p>二、超过1天的由支队报省厅战训中心审批</p>
			    <p>三、请假累计超过2天的，中止本期培训，延期安排再训</p>				
			</div>
			<input type="checkbox" value="" v-model="checked"/>我已阅读此规定
			<div class="dayokbtn"><button @click="goapply()">符合条件</button></div> 
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {		
		data() {
			return {
				checked:false,
				userId:''
			};
		},
		mounted() {
			this.userId = this.$route.query.userId
		},
		methods:{
			goback(){
				this.$router.push({
					path:'/Dayoff',
					query:{
						userId:this.userId
					}					
				})
			},
			goapply(){
				if(this.checked == false){
					MessageBox('提示', '请同意协议');
				}else{
					this.$router.push(
					{
						path:'/ApplyForm',
						query:{
							userId:this.userId
						}
					})
				}			
			}
		}
	}
</script>

<style scoped>
	#dayapply .rules>p{
		text-align: center;
		width: 100%;
		margin-top: 1rem;
	}	
	#dayapply .rules .rules_list{
		width:90%;
		margin:0 auto;
		background-color: #fff;
		padding: 0.5rem;
		border: 1px solid #eee;
		margin-top: 0.5rem;
	}
	#dayapply .rules input{
		margin-left: 1rem;
	}
	#dayapply .dayokbtn button{
		margin-top: 3rem;
		width: 60%;
		height: 2rem;
		margin-left: 20%;
		background-color: #4E7FFF;
		outline: none;
		border: none;
		color: #fff;
		border-radius: 4px;
	}
</style>