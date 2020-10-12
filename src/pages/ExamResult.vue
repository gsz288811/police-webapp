<template>
	<div id="result">
		<mt-header title="考试结果" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="resultBox" ref="wrapper">
			<div class="resultCont">
				
				<div v-for="(resultItem,index) in resultList">
					<div class="testlist testrules">
						<p>题型：{{txText[resultItem.testType]}}</p>
						<p>难度：{{ndText[resultItem.fkDegreeId]}}</p>
					</div>
					<p class="titleCont">{{index+1}}.{{resultItem.content}}</p>
					<!-- <ul class="testlist">
						<li>A.</li>
						<li>B.</li>
						<li>C.</li>
						<li>D.XXXXXXX</li>
					</ul> -->
					<p class="titleAnswer">
						<span>正确答案: {{resultItem.answer}}</span> 
						<span>我的答案: {{resultItem.mineAnswer}}</span>
						<span class="orange">
						{{resultItem.isRight==0?'错误':'正确'}} 
						</span>
					</p>
				</div>
				
			</div>
		</div>

	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				resultList:[],
				examinationRecordId:'',
				txText:{
					1:'选择题',
					2:'简答题'
				},
				ndText:{
					1:'简单',
					2:'中等',
					3:'困难'
				},
				
			};
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
		
		
		// 页面加载时执行
		mounted(){
			Indicator.open('加载中...');
			this.userId = this.$route.query.userId;
			this.examinationRecordId = this.$route.query.examinationRecordId;
			console.log(this.examinationRecordId)
			//考试结果列表
			this.$ajax.post('/wlxy/examresult/viewExamResultRemote.action',this.$qs.stringify(
						{
							examinationRecordId:this.examinationRecordId
						}
						
			)).then((res)=>{
							Indicator.close();
							this.resultList=res.data.data.vos;		
												
			}).catch((err) =>{
					// console.log(err)
					Indicator.close();
					Toast("系统错误，请联系管理员！")
				})
		},
		methods:{
			// 返回方法
			goback() {
				this.$router.push({
					path: '/Exam',
					query: {
						userId:this.userId,
						num:3
					}
				})
			},
		}
}
</script>

<style scoped>
	.resultBox{
		position:absolute;
		top: 3.7rem;
		bottom: 0.1rem;
		overflow: hidden;
		width: 100%;
	}
	.resultCont{
		min-height: 700px;
		margin-bottom: 20px;
	}
	#result .testlist{
		display: flex;
		justify-content: space-around;
	}
	#result>div{
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		min-height: 7rem;
	}
	#result .testrules{
		background-color: #ddd;
		height: 2.4rem;
		line-height: 2.4rem;
	}
	#result p.titleCont{
		padding:0.5rem 0.8rem;
		border-bottom: 1px dashed #ddd;
	}
	#result p.titleAnswer{
		padding: 0.8rem;
	}
	#result p.titleAnswer span{
		margin-right: 2rem;
	}
	.orange{
		color: #F7BF78;
	}
</style>
