<template>
	<div id="ques_invest">
		<mt-header title="问卷调查" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="ques_list" ref="wrapper">
			<div class="content_list">
				<ul v-for="v in listdata">
					<li>
						<p>{{v.appraisalName}}</p>
						<p> <span class="gray">有效时间：</span>{{v.startDate}}-{{v.endDate}}</p>
					</li>
					<li class="sq_marking" @click="gostart(v.baseId,v.appraisalPlanId)">
						<span>开始</span>
					</li>
				</ul>
				<p @click="loadmore">{{warnMess}}</p>
			</div>
			<div id="imgbox" v-if="!listdata.length">
				<img src="../assets/images/nodata.png" />
				<p>暂无数据</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				haslogin:'',
				userId:null,
				listdata:[],
				currentPage:1,
				warnMess:"轻触加载更多...",
			};
		},
		mounted() {
			this.haslogin = this.$route.query.haslogin
			this.userId = this.$route.query.userId
			Indicator.open('加载中...');
			this.$ajax.post('/wlxy/kcappraisalplan/appGetKcAppraisalPlanListRemote.action',this.$qs.stringify(
			{
				userId:this.userId,
				userType:2,
				showCount:10,
				currentPage:1,
			}	
			)).then((res)=>{
				console.log(res)
				Indicator.close();
				this.listdata = res.data.data.list
			})
		},
		methods:{
			goback(){
				// this.$router.go(-1)
				console.log(this.haslogin)
				if(this.haslogin == 0){
					this.$router.push({  
						path: '/MasterPersonal', 
						query: {   
							num:4,
							haslogin:0,
							userId:this.userId,
						}  
					})
				}else{
					this.$router.push({  
						path: '/Personal', 
						query: {   
							num:4,
							userId:this.userId,
						}  
					})
				}				
			},
			gostart(baseId,appraisalPlanId){
				this.$router.push({
					path:'/ScorequeryPage',
					query:{
						userId:this.userId,
						baseId:baseId,
						appraisalPlanId:appraisalPlanId
					}
				})
			},
			// 加载更多
			loadmore(){
				this.$ajax.post('/wlxy/onLineQuestion/findQuestion.action',this.$qs.stringify({
					studentId:this.userId,
					showCount:10,
				    currentPage:++this.currentPage
				})).then((res)=>{					
					if(res.data.data.questionList.length){
						var arry = res.data.data.list
						this.listdata = this.listdata.concat(arry)
					}else{
						this.warnMess = "暂无更多数据..."
					}					
				})
			}
		},
		created() {
			this.$nextTick(function(){
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						click:true
					})
					console.log(this.scroll)
				}	
			})
		}
	}
</script>

<style scoped="scoped">
	#ques_invest{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	.ques_list ul{
		display: flex;
		justify-content: space-between;
		padding: 4%;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		margin-top: 0.8rem;
	}
	.ques_list ul li:first-child p{
		line-height: 1.8rem;
	}
	.ques_list ul .sq_marking span{
		display: inline-block;
		width: 3.4rem;
		height: 3.4rem;
		border-radius: 50%;
		text-align: center;
		line-height: 3.4rem;
		border: 1px solid #ccc;
		color: #4E7FFF;
	}
	#ques_invest .ques_list{
		position:absolute;
		top: 4.2rem;
		bottom: 0.1rem;
		overflow: hidden;
		width: 100%;
	}
	#ques_invest .content_list{
		min-height: 760px;
	}
	.content_list>p{
		line-height: 2.5rem;
		text-align: center;
		color: #999;
	}
	#imgbox{
		padding: 5rem;		
	}
	#imgbox p{
		color: #999;
		text-align: center;
	}
</style>
