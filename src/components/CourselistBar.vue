<template>
	<div id="courselist">
		
		<!-- <div class="resource_cont">
			<!-- <router-view></router-view> -->
		<!-- </div> --> 
		<div class="bottom_nav">
			<router-link :to="{path:'/Resource',query:{'userId':userId,'loginid':loginid,'num':1,'fkCoursedirtreeId':fkCoursedirtreeId}}">
				<span  :class="{tab_act:shows==1}" @click="show(1)">
					☰&nbsp;资源
				</span> 
			</router-link>
			<router-link v-if='flag' :to="{path:'/Studyonline',query:{'userId':userId,'loginid':loginid,'num':2,'fkCoursedirtreeId':fkCoursedirtreeId}}">
				<span  :class="{tab_act:shows==2}" @click="show(2)">
					☰&nbsp;在线学习
				</span>
			</router-link>
			<router-link v-if='!flag' :to="{path:'/Studyprogress',query:{'userId':userId,'loginid':loginid}}">
				<span  :class="{tab_act:shows==2}" @click="show(2)">
					☰&nbsp;学习进度
				</span>
			</router-link>
			<router-link :to="{path:'/QAonline',query:{'userId':userId,'loginid':loginid,'num':3,'fkCoursedirtreeId':fkCoursedirtreeId}}">
				<span  :class="{tab_act:shows==3}" @click="show(3)">
					☰&nbsp;在线答疑
				</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	
	export default {
    	name: "Courselist",
    	data(){
    		return{
				shows:1,
				mynum:'',
				loginid:'',
				userId:'',
				fkCoursedirtreeId:'',
				flag:true
    		}
    	},
		mounted(){
			this.mynum = this.$route.query.num
			this.loginid = this.$route.query.loginid
			this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId
			var flags = this.$route.query.flags
			this.userId = this.$route.query.userId
			this.show(this.mynum)
			console.log("loginid",this.loginid)
			//  0教官
// 			if(this.loginid == 0){
// 				this.flag = false
// 				this.show(this.mynum)
// 				this.$router.push({
// 					path:'/Resource',
// 					query:{
// 						userId:this.userId,
// 						loginid:this.loginid
// 					}
// 				})
// 			}else{
// 				this.flag = true
// 				this.show(this.mynum)
// 				this.$router.push({
// 					path:'/Resource',
// 					query:{
// 						userId:this.userId,
// 						loginid:this.loginid
// 					}
// 				})
// 			}
			// 返回的跳转页面
			if(this.mynum == 3){
				this.show(this.mynum)
				this.$router.push({
					path:'/QAonline',
					query:{
						userId:this.userId,
						loginid:this.loginid,
						'fkCoursedirtreeId':this.fkCoursedirtreeId,
						'num':3,
					}
				})
			}else if(this.mynum == 2){
				this.show(this.mynum)
				this.$router.push({
					path:'/Studyonline',
					query:{
						userId:this.userId,
						loginid:this.loginid,
						'num':2,
						'fkCoursedirtreeId':this.fkCoursedirtreeId
					}
				})
			}
		},
    	methods:{
    		goback(){
				console.log(this.loginid)
				if(this.loginid == 1){
					this.$router.push({  
						path: '/MicroCourse', 
						query: {   
							num:1,
							userId:this.userId,
							hasloginid:this.loginid
						}  
					})
				}else if(this.loginid == 0){
					this.$router.push({  
						path: '/MasterCourse', 
						query: {   
							num:1,
							userId:this.userId,	
							hasloginid:this.loginid
						}  
					})
				}							
    		},
    		show(num){
    			this.shows = num;
    		}
    	}
   }
</script>

<style scoped="scoped">
	#courselist .bottom_nav{
		display:flex;
		justify-content: center;
		margin-top: 10%;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color:#fff;
	}
	#courselist .bottom_nav a{
		border: 1px solid #ccc;	
		width: 100%;
		height: 36px;
		text-align: center;
		color: #2C345B;
		font-size: 14px;
		line-height: 36px;
	}
	#courselist .bottom_nav a span{
		width: 100%;
		height: inherit;
		display: inline-block;
	}
	.tab_act{
		color: #4E7FFF !important;
	}
	#courselist .bottom_nav a:nth-child(1),
	#courselist .bottom_nav a:nth-child(2),
	#courselist .bottom_nav a:nth-child(3){
		border-right: none;
	}
	#courselist .bottom_nav a:nth-child(1){
		border-left: none;
	}
</style>