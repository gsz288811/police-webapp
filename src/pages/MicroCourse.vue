<template>
	<div id="MC_nav">
		<mu-container>
		  <mu-drawer :open.sync="open" :docked="true" :right="position === 'right'">
			<mu-list v-for="(v,i) in classdata" :key="i">
			  <mu-list-item button @click="changeClass(i,v.olTrainingClassId)">
				<mu-list-item-title :class="{act:acts==i}">{{v.olClassName}}</mu-list-item-title>
			  </mu-list-item>
			</mu-list>
		  </mu-drawer>
		</mu-container>
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>		
		<div class="MC_nav">
			<span :class="{tab_act:isact==1}" @click="goStudy()">学习中</span>
			<span :class="{tab_act:isact==2}" @click="hasStudy()">已学习</span>
			<mu-button color="primary" style="margin-left: 16px" @click="open = !open">
			  切换班级
			</mu-button>
		</div>
		<div class="MC_list" id="MC_list1" ref="wrapper">
			<div class="mc_cont">
				<div @click="gomore(item.studySchedule,item.fkCoursedirtreeId)" v-for="item in studyData" class="courseListBox" v-if="studyData.length">
					<div class="list_pic" >
						<img src="../assets/images/book.png"/>
						<!-- <img :src="item.browserCoverImageUrl" alt=""> -->
					</div>
					<ul class="list_cont">
						<li>{{item.manageName}}</li>
						<li>
							当前进度:{{item.isFinish}}
						</li>
						<li style="display: flex; justify-content: flex-start;">
							<div style="line-height: 30px;margin-right: 10px;">章节总数:{{item.totalDirtreeNumb}}章</div> 
							<mt-progress :value="parseInt(item.studySchedule)" style="width: 8rem;" v-if="item.studySchedule == 0?true:false">
								<div slot="start">开始学习&nbsp;</div>
								<div slot="end">&nbsp;{{item.studySchedule}}%</div>
							</mt-progress>
							<mt-progress :value="parseInt(item.studySchedule)" style="width: 8rem;" v-if="item.studySchedule == 0?false:true">
								<div slot="start">继续学习&nbsp;</div>
								<div slot="end">&nbsp;{{item.studySchedule}}%</div>
							</mt-progress>
						</li>
					</ul>
				</div>
			</div>
			<div v-if="!studyData.length">
				<div class="imgbox">
					<img src="../assets/images/nodata.png" />
					<p>暂无课程...</p>
				</div>
			</div>
		</div>
		<div class="MC_list dis_none" id="MC_list2">
			<div v-for="item in finishedData " v-if="finishedData.length">
				<div class="list_pic">
					<img src="../assets/images/book.png"/>
				</div>
				<ul class="list_cont">
					<li>已经学习完了</li>
					<li>当前进度：{{item.studySchedule}}</li>
					<li>章节总数：{{item.totalDirtreeNumb}}章</li>
				</ul>
			</div>
			<div v-if="!finishedData.length">
				<div class="imgbox">
					<img src="../assets/images/nodata.png" />
					<p>暂无学习完成的章节</p>
				</div>
			</div>
		</div>
		<TabBar :mynum="num"></TabBar>
	</div>	
</template>

<script>
	import BScroll from 'better-scroll'
	import TabBar from '../components/TabBar.vue'
	export default {
    	name: "MicroCourse",
		components: {TabBar},
    	data(){
    		return{
    			isact:1,
				classdata:[],
				studyData:[],
				finishedData:[],
				TrainClassId:'',	//在线培训班级id
				fkCoursedirtreeId:'',
				userId:"",
				loginid:"",
				haslogin:"",
				docked: false,
				open: false,
				position: 'left',
				acts:0,
				num:1
    		}
    	},
		// 页面加载时执行
		mounted() {
			this.userId = this.$route.query.userId
			this.loginid = this.$route.query.loginid
			this.haslogin = this.$route.query.hasloginid
			// 获取班级
			this.$ajax.post('/wlxy/onLineClassStudent/findOnLineClassList.action',this.$qs.stringify(
			{
				studentId:this.userId
			}			
			)).then((res)=>{
				console.log("班级",res)
				this.classdata=res.data.data
				this.TrainClassId = res.data.data[0].olTrainingClassId
				// console.log("id",res.data.data[0].olTrainingClassId)
				// 默认获取第一个班级的课程
				this.$ajax.post('/wlxy/onLineResourceStudy/findCourseStudy.action',this.$qs.stringify(
				{
					studentId:this.userId,
					onlineTrainClassId:this.TrainClassId
				}
				
				)).then((res)=>{
					console.log("课程",res)
					this.studyData=res.data.data.studingCourse				
				})	
			})				
		},
		created() {
			this.$nextTick(function(){
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						click: true,
						scrollY: true
					})
					// console.log(this.scroll)
				}		
			})
		},
    	methods:{
			// 学习中
   			goStudy(){			
   				this.isact = 1
   				document.getElementById("MC_list1").className = "MC_list"
   				document.getElementById("MC_list2").className = "MC_list dis_none"
				this.$ajax.post('/wlxy/onLineResourceStudy/findCourseStudy.action',this.$qs.stringify(
				{
					studentId:this.userId,
					onlineTrainClassId:this.TrainClassId
				}
				
				)).then((res)=>{
					this.studyData=res.data.data.studingCourse				
				})
   			},
			// 已学习方法及接口
   			hasStudy(){
   				this.isact = 2
   				document.getElementById("MC_list2").className = "MC_list"
   				document.getElementById("MC_list1").className = "MC_list dis_none"
				
				this.$ajax.post('/wlxy/onLineResourceStudy/findCourseStudy.action',this.$qs.stringify(
				{
					studentId:this.userId
				}
				
				)).then((res)=>{
					// console.log(res)
					this.studyData=res.data.data.finishedCourse
									
				})				
   			},
			gomore(progressid,fkCoursedirtreeId){
				this.fkCoursedirtreeId = fkCoursedirtreeId
				// 判断当进度为0时(也就是课程没有开始看时)					
					console.log(fkCoursedirtreeId,this.TrainClassId)
					if(progressid==0){
							this.$ajax.post('/wlxy/onLineResourceStudy/saveCouserStudy.action',this.$qs.stringify(
								{
									"fkStudentId":this.userId,
									"fkCoursedirtreeId":fkCoursedirtreeId,
									"fkOnlineClassId":this.TrainClassId,
									"totalDirtreeNumb":5,
								}
								)).then((res)=>{											
									console.log("进度为0",res)
									// return false
									if(this.loginid !== undefined){
										this.$router.push({
											path:'/Resource',
											query: {   
												num:1,
												userId:this.userId,
												// 加一个usertype
												flags:0,
												loginid:this.loginid,
												fkCoursedirtreeId:fkCoursedirtreeId,
											}}
										)
									}else{
										this.$router.push({
											path:'/Resource',
											query: {   
												num:1,
												userId:this.userId,
												// 加一个usertype
												flags:0,
												loginid:this.haslogin,
												"fkCoursedirtreeId":fkCoursedirtreeId,
											}}
										)
									}
									
											
								}).catch((err)=>{
									// console.log(err)									
								})
						
					}else{						
						this.$ajax.post('/wlxy/onLineResourceStudy/findCourseStudy.action',this.$qs.stringify(
						{
							studentId:this.userId
						}
						
						)).then((res)=>{
								// console.log("进度不为0",res)
								this.studyData=res.data.data.studingCourse																				
						})												
					}
			},
			// 切换班级
			changeClass(i,TrainClassId){
				this.open = false
				this.acts = i
				this.TrainClassId = TrainClassId
				this.$ajax.post('/wlxy/onLineResourceStudy/findCourseStudy.action',this.$qs.stringify(
				{
					studentId:this.userId,
					onlineTrainClassId:TrainClassId
				}
				
				)).then((res)=>{
					this.studyData=res.data.data.studingCourse				
				})	
			},
			// 安卓调用退出当前页面
			anzuocallExit(){
				if(typeof(test) != "undefined"){
					test.callExit();
				}
			}
    	},
		
    }

</script>

<style scoped="scoped">
	#MC_nav{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	.dis_none{
		display: none;
	}
	#MC_nav{
		width: 100%;
	}
	#MC_nav .MC_nav{
		height: 2.4rem;
		border-bottom: 1px solid #ccc;
		box-shadow: 0 2px 4px #CCC;
		background-color: #fff;
	}
	#MC_nav .MC_nav span{
		width:3rem;
		display: inline-block;
		text-align: center;
		padding-bottom: 0.5rem;
		margin-top: 0.5rem;
		margin-left: 1.4rem;
	}
	.tab_act{
		border-bottom:1px solid #4E7FFF;
	}
	#MC_nav .MC_list{
		position:absolute;
		top: 5.8rem;
		bottom: 2.4rem;
		overflow: hidden;
		width: 100%;
	}
	#MC_nav .mc_cont{
		min-height: 700px;
		margin-bottom: 20px;
	}
	#MC_nav .MC_list>.mc_cont>div{
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background-color: #fff;
		margin-top: 1rem;
		padding:0.6rem 0.2rem;
	}
	#MC_nav .MC_list>.mc_cont>div:first-child{
		margin-top: 4rem;
	}
	#MC_nav .MC_list>div>.list_pic{
		width: 20%;
	}
	#MC_nav .MC_list>div>.list_cont{
		width: 70%;
	}
	#MC_nav .MC_list>div>.list_cont>li{
		margin-bottom: 2%;
		font-size: 14px;
	}
	#MC_nav .MC_list>div>.list_cont>li:first-child{
		font-size: 18px;
		color: #3F3F3F;
		font-weight: bold;
	}
	#MC_nav .MC_list>div>.list_cont>li:nth-child(2){
		color: #7A7A7A;
	}
	#MC_nav .MC_list>div>.list_cont>li:nth-child(3){
		color: #CCCCCC;
	}
	.act{
		color: #1890FF;
	}
	#MC_nav button.mu-inverse{
		background-color: #fff;
		color: #000;
		box-shadow: none;
	}
	.imgbox{
		padding: 5rem;		
	}
	.imgbox p{
		color: #999;
		text-align: center;
	}
</style>