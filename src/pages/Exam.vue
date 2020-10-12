<template>
	<div id="exam">
		<mt-header title="考试" style="height: 40px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>
		<mt-search style="background-color: #4E7FFF;"></mt-search>
		
		<div class="examBox" ref="wrapper">
			<div class="examCont">
				<div class="exam_list" >
	
					<ul @click="goexam(item.examinationRecordId,examStatus[item.status].url)" v-for="item in itemList" >
						<li>
							<div><img src="../assets/images/mipmap-xhdpi/jx_math_icon.png" width="46px"/></div>
							
						</li>
						<li>
							<p>{{item.examinationName}}</p>
						
							<p class="px14 gray1">开始时间:{{item.startTime}}</p>
							<p class="px14 gray1">结束时间:{{item.endTime}}</p>
						</li>
						<li class="orange1">{{examStatus[item.status].name}}</li>
					</ul>
					
				</div>
			</div>	
		</div>
		<TabBar :mynum="num"></TabBar>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';  //加载
	import TabBar from '../components/TabBar.vue'
	export default {
		components: {TabBar},
		data() {
			return {
				// examStatus:{0:'未开始',1:'开始考试',2:'已结束',3:'缺考'},
				examStatus:{0:{name:'未开始',url:''},1:{name:'开始考试',url:'/Onlinetest'},2:{name:'已结束',url:'/ExamResult'},3:{name:'缺考',url:''}},
				itemList:[],
				userId:'',
				examinationRecordId:'',
				loginid:'',
				num:3
			};
		},
		// 页面加载时执行
		mounted:function(){
			Indicator.open('加载中...');
			// 考试列表页
			this.userId = this.$route.query.userId;
			this.loginid = this.$route.query.loginid;
			
			this.$ajax.post('/wlxy/examinationrecord/getOnlineExamIndexRemote.action',this.$qs.stringify(
			{
				userId:this.userId
			}
			
			)).then((res)=>{
				
				Indicator.close();
				this.itemList=res.data.data.list;
				
			}).catch((err) =>{
					// console.log(err)
					Toast("系统错误，请联系管理员！")
				})
			
			
			
		},
		
		created() {
			// 向下滑动方法
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
			goexam(id,url){
				console.log(url)
				// if(!url) return;
				if(!url){
					Toast('考试缺考，暂无数据')
				}
				
				// 跳转页面
				this.$router.push({
					path:url,
					query:{
						examinationRecordId:id,
						userId:this.userId
					}
				});	
				

			},
			// 安卓调用退出当前页面
			anzuocallExit(){
				if(typeof(test) != "undefined"){
					test.callExit();
				}
			}
		}
	}
</script>

<style scoped="scoped">
	/* 公用样式 */
	.px14{
		font-size: 14px;
	}
	.px12{
		font-size: 12px;
	}
	.gray{
		color: #ccc;
	}
	.gray1{
		color: #9C9C9C;
	}
	.orange{
		color: #F7B864;
	}
	.orange1{
		color: orange;
	}
	.green{
		color: #00BE6D;
	}
	.examBox{
		position:absolute;
		top: 6rem;
		bottom: 2.4rem;
		overflow: hidden;
		width: 100%;
	}
	.examCont{
		min-height: 500px;
		margin-bottom: 20px;
	}
	 .exam_list{
		overflow-y: scroll;
	}
	
	#exam .exam_list ul{
		display: flex;
		justify-content:flex-start;
		background-color: #fff;
		margin-top: 0.6rem;
		border-top:1px solid #ccc ;
		border-bottom:1px solid #ccc ;
		padding: 0.6rem;
	}
	#exam .exam_list ul li:first-child{
		width: 3rem;
		height: 3rem;
		margin: 0.5rem 0;
	}
	#exam .exam_list ul li:first-child{
		text-align: center;
	}
	#exam .exam_list ul li:nth-child(2){
		margin:0 1.5rem;
		width: 12rem;
	}
	/* #exam .exam_list ul li:last-child{
		margin-left: 10%;
	} */
</style>
