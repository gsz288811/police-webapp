<template>
	<div id="QA_online">
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="resource_content" ref="wrapper">
			<div class="content_list" v-if="questionList.length">				
				<ul v-for="(v,i) in questionList" :key='i'>
					<li>
						<span>{{v.questionContent}}</span>
						<span>{{v.questionTime}}</span>
					</li>
				</ul>
				<p @click="loadmore" v-if="questionList.length>9">{{warnMess}}</p>
			</div>
			<div id="imgbox" v-if="!questionList.length">
				<img src="../assets/images/nodata.png" />
				<p>暂时没有数据，请先添加...</p>
			</div>
		</div>
		<div class="add_btn" @click="goadd()">
			+
		</div>
		<CourselistBar></CourselistBar>	
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Header } from 'mint-ui';
	import CourselistBar from '../components/CourselistBar.vue' 
	export default{
		components: {CourselistBar},
		data(){
			return{
				userId:'',
				questionList:[],
				loginid:'',
				fkCoursedirtreeId:null,
				loading: false,
				currentPage:1,
				warnMess:"轻触加载更多..."
			}
		},
		mounted(){		
			this.userId = this.$route.query.userId
			this.loginid = sessionStorage.getItem('loginid');
			this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId;
			// this.mynum = this.$route.query.num;
			console.log(this.userId)
			this.$ajax.post('/wlxy/onLineQuestion/findQuestion.action',this.$qs.stringify({
				studentId:this.userId,
				showCount:10,
                currentPage:1
			})).then((res)=>{
				console.log(res)
				this.questionList = res.data.data.questionList
			})
		},
		methods:{
			goadd(){
				this.$router.push({
					path:'/AddQuestion',
					query:{
						userId:this.userId,
						fkCoursedirtreeId:this.fkCoursedirtreeId,
					}
				})
			},
			// 返回事件
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
			// 加载更多
			loadmore(){
				this.$ajax.post('/wlxy/onLineQuestion/findQuestion.action',this.$qs.stringify({
					studentId:this.userId,
					showCount:10,
				    currentPage:++this.currentPage
				})).then((res)=>{					
					if(res.data.data.questionList.length){
						var arry = res.data.data.questionList
						this.questionList = this.questionList.concat(arry)
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
	#QA_online ul{
		height: 3.2rem;
		line-height: 3.2rem;
		margin-top: 4%;
		background-color: #fff;
	}
	#QA_online ul li span:first-child{
		color: #FF6A09;
		display: inline-block;
		width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	#QA_online ul li{
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin: 0 auto;
		background-color: #fff;
		/* margin-top: 0.8rem; */
	} 
	#QA_online .add_btn{
		background-color:#4E7FFF ;
		width:2.5rem;
		height:2.5rem;
		border-radius:50%;
		color: #fff;
		text-align: center;
		line-height: 2.5rem;
		font-size:2rem;
		position: absolute;
		bottom: 5rem;
		right: 1rem;
	}
	#QA_online .resource_content{
		position:absolute;
		top: 4.2rem;
		bottom: 2rem;
		overflow: hidden;
		width: 100%;
	}
	#QA_online .content_list{
		min-height: 700px;
	}
	#QA_online .content_list p{
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