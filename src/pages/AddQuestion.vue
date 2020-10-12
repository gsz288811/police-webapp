<template>
	<div id="add_ques">
		<mt-header title="提问">
		  <div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
		  </div>
		</mt-header>		
		<div>
			<mu-select label="请选择教官" v-model="value1" full-width @change="getID($event)">
				<mu-option v-for="(v,i) in options" :key="i" :label="v.userName" :value="v.userId" ></mu-option>
			</mu-select>
			<p>详细内容:</p>
			<textarea v-model="value2"></textarea>
			<button class="ok_btn" @click="goSubmit()">提交</button>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				options: [],	
				value1:'',
				value2:'',
				userId:'',
				answerUserId:'',
				fkCoursedirtreeId:null,
			}	
		},
		mounted() {
			this.userId = this.$route.query.userId
			this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId;
			this.$ajax.post('/wlxy/onLineQuestion/findTeacher.action',this.$qs.stringify({
				userId:this.userId,
				onLineClassId:null
			})).then((res)=>{
				console.log(res)
				this.options = res.data.data
			})
		},
		methods:{
			goback(){
				this.$router.push({  
					path: '/QAonline', 
					query: {   
						num:3,
						userId:this.userId
					}  
				})
			},
			goSubmit(){
				if(this.value2 !=="" && this.answerUserId !== ""){
					this.$ajax.post('/wlxy/onLineQuestion/saveQuestion.action',this.$qs.stringify({
						studentId:this.userId,
						questionContent:this.value2,
					    answerUserId:this.answerUserId,
						fkCoursedirtreeId:this.fkCoursedirtreeId,
					})).then((res)=>{
						if(res.data.success == 1){
							MessageBox('提示',"问题提交成功！").then(()=>{
								this.value2 = ""
							});
							
						}
					})
				}else{
					MessageBox('提示',"请输入提问内容");
				}			
			},
			getID(event){
				this.answerUserId = event
			}
		}
	}
</script>

<style scoped="scoped">
	/*给当前页面添加背景色*/
	#add_ques {
		background-color:#F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#add_ques .mint-header {
    	background-color: #4E7FFF;
			height: 60px;
	}
	#add_ques p{
		padding-left: 10%;
		margin-top: 4%;
	}
	#add_ques textarea{
		width: 80%;
		height: 10rem;
		margin-left: 10%;
		border-radius: 4px;
		border: 2px solid #ccc;
	}
	#add_ques .ok_btn{
		width: 14rem;
		height: 2.4rem;
		display: inline-block;
		margin: 1rem auto;
		border-radius: 0.5rem;
		outline: none;
		color: #fff;
		font-size: 18px;
		margin-left: 20%;
		background-color: #4E7FFF;
		outline: none;
		border: none;
		color: #fff;
	}
	.mu-input{
		margin: 0 auto;
		margin-left: 10%;
		margin-top: 1.5rem;
	}
	.mu-input.full-width{
		width: 80%;
	}
	#add_ques .mu-item-title{
		color: #1890FF;
	}
</style>