<template>
	<div id="studyOnline">
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<!-- 时间轴 -->
		<div class="timeListBox" ref="wrapper">
			<div class="timeListCont">
				<div v-for="(v,k) in studyLists"  style="overflow: hidden;" >
				
					<div class="timeLine">
						<div class="timeList" >
							<div class="timeMessage">
								<p class="day"></b>
								<!-- <p class="yearMouth">{{studylist.practiceTime}}</p> -->
								<p class="yearMouth">{{k}}</p>
							</div>
							<i class="line" :style="{height:(83*v.length)+'px'}"></i>
						</div>
					</div>
						<!-- 练习列表 -->
					<div class="exerciseCont">
							
						<div class="exerciseList" v-for="testList in v">
							<div class="exerciseTitle">{{testList.dirtreeName}}</div>
							<div class="exerciseMessage">
								<span>题量：{{testList.testNumb}}</span>
								<span class="center">用时：{{testList.practiceUseTime}}</span>
								<span>正确率：{{testList.accuracy}}</span>
							</div>
						</div>
												
					</div>			
					<!-- 添加练习 -->
					<!-- <div class="add_btn" @click="goadd(v[0].fkRuleId)" >+</div> -->
					
				</div>	
			
				<p @click="loadmore" class="loadMore" v-if="show">{{warnMess}}</p>
			</div>
		</div>
		<!-- 添加练习 -->
		<div class="add_btn" @click="goadd()" >+</div>
		
		<!-- 没有试题时提示图片 -->
		<div id="imgbox" v-if="studyLists.length == 0">
			<img src="../assets/images/nodata.png" />
			<p>暂时没有数据，请先添加....</p>
		</div>
				
		<CourselistBar></CourselistBar>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Header } from 'mint-ui';
	import CourselistBar from '../components/CourselistBar.vue' 
	import { Indicator } from 'mint-ui';
	export default{
		name:'Studyonline',
		components: {CourselistBar},
		data(){
			return{
				studyLists:[],
				userId:'',
				fkCoursedirtreeId:'',
				fkRuleId:'',
				loginid:'',
				loading: false,
				currentPage:2,
				warnMess:"轻触加载更多...",
				show:false
			}
			
		},
		mounted() {
			Indicator.open('加载中...');
			this.userId = this.$route.query.userId;
			this.loginid = sessionStorage.getItem('loginid');
			this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId;
			// console.log(this.fkCoursedirtreeId)
			// this.mynum = this.$route.query.num;
			this.$ajax.post('/wlxy/onLineFreePractice/findPracticeList.action',this.$qs.stringify({
				dirtreeId:null,
				studentId:this.userId,
				showCount:10,
				currentPage:2
			})).then((res)=>{
				Indicator.close();
				let data= res.data.data.practiceJson;

				function objKeySort(obj) {
					let newkey = Object.keys(obj).sort().reverse();
					
					let newObj = {};//创建一个新的对象，用于存放排好序的键值对
					for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
						newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
					}
					
					return newObj;
				}
					this.studyLists=objKeySort(data);

			}).catch((err) =>{
					// console.log(err)
					Indicator.close();
					Toast("系统错误，请联系管理员！")
			})
				
			
		},
		
		created() {
					this.$nextTick(function(){
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.wrapper, {
								click: true,
								scrollY: true
							})
						}		
					})
		},
		methods:{
			
			goadd(){
				// console.log(fkRuleId)
				this.$router.push({
					path:'/volumeRules',
					query:{
						fkCoursedirtreeId:this.fkCoursedirtreeId,
						userId:this.userId,
						// ruleId:fkRuleId,
					}
				})
			},
			// 返回事件
			goback(){
				// console.log(this.loginid)
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
			
			// 加载更多
			loadmore(){
				this.$ajax.post('/wlxy/onLineFreePractice/findPracticeList.action',this.$qs.stringify({
					dirtreeId:null,
					studentId:this.userId,
					showCount:10,
				    currentPage:++this.currentPage
				})).then((res)=>{	
					Indicator.close();
					if(res.data.data.practiceJson.length){
						var arry = res.data.data.practiceJson
						this.practiceJson = this.practiceJson.concat(arry)
					}else{
						this.show = !this.show
						this.warnMess = "暂无更多数据..."
						
					}					
				}).catch((err) =>{
					// console.log(err)
					Indicator.close();
					Toast("系统错误，请联系管理员！")
				})
			}
			
			
		}
	}
</script>

<style scoped="scoped">
#studyOnline{
	width: 100%;
	height: 100%;
	position: fixed;
	background-color: #F7F7F7;
	/* display: flex; */
	justify-content: left;
	overflow-y: scroll;
}
/* 时间轴样式 */
.timeListBox{
	position:absolute;
	top: 3.2rem;
	bottom: 2.4rem;
	overflow: hidden;
	width: 100%;
}
.timeListCont{
	height: 100%;
	overflow-y: scroll;
}


.timeLine{
	float: left;
	height: auto;
}
.timeList{
	width: 3.5rem;
	height: 3.7rem;
	margin: 0.5rem;
	position: relative;
	
}
.timeList .timeMessage{
	position: absolute;
	padding: 0.3rem;
	color: #F4A01C;
	font-size: 0.8rem;
	border: 1px solid #F4A01C;
	text-align: center;
	
}
.timeList .day{
	font-size: 1.5rem;
}
.timeList .line{
	width: 1px;
	height: 100%;
	background-color: #F4A01C;
	position: absolute;
	top: 3.1rem;
	left: 1.75rem;
	/* top:2.8rem;
	left: 1.2rem; */
}
/* 练习列表样式 */
.exerciseCont{
	height: auto;
	float: right;
}
.exerciseList{
	width: 17rem;
	padding: 0.6rem;
	border: 1px solid #ddd;
	background-color: #fff;
	margin: 0.5rem ;
}
.exerciseTitle{
	margin-bottom: 0.3rem;
	font-size: 1.2rem;
}
.exerciseMessage{
	color: #999;	
}
.exerciseMessage span{
	display: inline-block;
	width: 32%;
}
/* .exerciseMessage .center{
	margin: 0 1.5rem;
} */

.timeListCont .loadMore{
	line-height: 2.5rem;
	text-align: center;
	color: #999;
}

/* 添加练习样式 */
.add_btn{
	position: fixed;
	bottom:5rem;
	right: 1rem;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	text-align: center;
	line-height:2.5rem;
	background-color: #4E7FFF;
	color: #fff;
	font-size: 2rem;
}
/* 头部样式 */
.mint-header{
	position: fixed;
	width: 100%;
}
/* 页面提示图片 */
#imgbox{
	padding:10rem 5rem;		
}
#imgbox p{
	color: #999;
	text-align: center;
}
</style>