<template>
	<div id="query_page">
		<mt-header title="问卷调查" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="page_cont">
			<p>培训满意度调查</p>
			<ul v-for="(v,i) in querydata" :key="i">
				<li>{{v.rulesContent}}</li>
				<li>
					<input type="radio" :value="v.scoreA" :name="'check'+i" v-model="result[i]" @change="getA(v.scoreA,v.rulesId,v.fkBaseId,i)"/> 1.{{v.optionA}}
				</li>
				<li>
					<input type="radio" :value="v.scoreB" :name='"check"+i' v-model="result[i]" @change="getB(v.scoreB,v.rulesId,v.fkBaseId,i)"/> 2.{{v.optionB}}
				</li>
				<li>
					<input type="radio" :value='"v.scoreC"+1' :name='"check"+i' v-model="result[i]" @change="getC(v.scoreC,v.rulesId,v.fkBaseId,i)"/> 3.{{v.optionC}}
				</li>
				<li>
					<input type="radio" :value="v.scoreD" :name='"check"+i' v-model="result[i]" @change="getD(v.scoreD,v.rulesId,v.fkBaseId,i)"/> 4.{{v.optionD}}
				</li>
			</ul>
			<mt-button type="primary" size="large" @click="goSubmit()">提交</mt-button>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				userId:'',
				querydata:[],
				result:[],
				details: [],
				detaisObj:{					
					answer:null,
					fkRecordId: null,
					fkRulesId: null,
					fkBaseId: null					
				},
				recordId:'',
				scoreA:'',
				scoreB:'',
				scoreC:'',
				scoreD:'',
			};
		},
		mounted(){
			this.userId = this.$route.query.userId
			var baseId = this.$route.query.baseId
			var appraisalPlanId = this.$route.query.appraisalPlanId
			this.$ajax.post('/wlxy/kcappraisalplan/startQuestionnairesRemote.action',this.$qs.stringify(
			{
				userId:this.userId,
				userType:2,
				appraisalPlanId:appraisalPlanId,
				baseId:baseId,
			}	
			)).then((res)=>{
				console.log(res)
				this.querydata = res.data.data.rulesVos
				this.recordId = res.data.data.recordId
			})
		},
		methods:{
			goback(){
				this.$router.go(-1)
				// this.$router.push('/QuestionInvest')
			},
			getA(answer,rulesId,baseId,i){
				this.scoreA = answer
				this.detaisObj = {
					answer:'A',
					fkRecordId: this.recordId,
					fkRulesId: rulesId,
					fkBaseId: baseId
				}
				this.details[i] = this.detaisObj
			},
			getB(answer,rulesId,baseId,i){
				this.scoreB = answer
				this.detaisObj = {
					answer:'B',
					fkRecordId: this.recordId,
					fkRulesId: rulesId,
					fkBaseId: baseId
				}
				this.details[i] = this.detaisObj
			},
			getC(answer,rulesId,baseId,i){
				this.scoreC = answer
				this.detaisObj = {
					answer:'C',
					fkRecordId: this.recordId,
					fkRulesId: rulesId,
					fkBaseId: baseId
				}
				this.details[i] = this.detaisObj
			},
			getD(answer,rulesId,baseId,i){
				this.scoreD = answer
				this.detaisObj = {
					answer:'D',
					fkRecordId: this.recordId,
					fkRulesId: rulesId,
					fkBaseId: baseId
				}
				// this.details.push(this.detaisObj)
				this.details[i] = this.detaisObj
			},
			goSubmit(){				
				var totalScore = this.scoreA+this.scoreB+this.scoreC+this.scoreD
				console.log(this.details)
				return
				let config = {
					headers:{
						'Content-Type':"application/json;charset=utf-8"
					}
				}
				this.$ajax.post('/wlxy/kcappraisalplan/saveQuestionnairesDetailRemote.action',
				{
					recordId:this.recordId,
					totalScore:totalScore,
					details:this.details
				},config).then((res)=>{
					if(res.data.success == 1){
						MessageBox('提示', '问卷调查提交成功');
						this.$router.push({
							path: '/QuestionInvest', 
							query: {   
								userId:this.userId
							}  
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	#query_page{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	.page_cont p{
		margin-top: 0.5rem;
		width: 100%;
		text-align: center;
	}
	.page_cont ul{
		width: 80%;
		margin: 0 auto;
		border: 1px solid #eee;
		padding:1.2rem;
		border-radius: 0.5rem;
		background-color: #fff;
		margin-top: 0.5rem;
	}
	.mint-button--large {
		margin: 0 auto;
		width: 90%;
		margin-top: 0.8rem;
	}
</style>
