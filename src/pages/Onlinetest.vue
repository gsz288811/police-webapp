<template>
	<div id="onlineExercise">
		<!-- 头部 -->
		<mt-header title="在线考试">
			<div slot="left"><mt-button @click="goback()" icon="back"></mt-button></div>
			<div slot="right" @click="submitPreservation()">提交保存</div>
		</mt-header>
	
			<!-- tab切换题 -->
			<div class="tabBox" >
					<van-tabs>
					  <van-tab v-for="(test,index) in testList" :title="'第'+(index+1)+'题'" >
			
						<!-- 试题详情 -->
						<div class="tabMessage">{{index+1}}.{{test.content}}</div>
						
						<!-- 试题答案选择 -->
						<div class="selectAnswer">
							<ul>
								<li v-for="item in answerLists" 
								:class="{'ansAcitve':test.selectAnswer==item}"
								@click="chooseAnser(index,item)"
								class="answerList">{{item}}</li>
							</ul>
						</div>
						
					  </van-tab>
					</van-tabs>
			</div>
			<!-- 没有试题时提示图片 -->
			<div id="imgbox" v-if="!testList.length">
				<img src="../assets/images/nodata.png" />
				<p>暂时没有相符合的试题...</p>
			</div>
		
	
	</div>
</template>

<script>
	import { Tab, Tabs } from 'vant';  //引入标签
	import { Toast } from 'mint-ui';  //提示
	import { Indicator } from 'mint-ui';  //加载
	export default {
		data() {
			return {
				index:'',
				testList:[],
				// 获取试题四个选项
				// isoption:'',
				answerLists:['A','B','C','D'],
				otherList:[]
				
				
			};
		},
		// 页面加载时执行
		mounted(){
			
			Indicator.open('加载中...');
			
			this.userId = this.$route.query.userId;
			this.examinationRecordId = this.$route.query.examinationRecordId
			console.log(this.examinationRecordId)
			
			//开始考试列表
			this.$ajax.post('/wlxy/examinationrecord/findExamDataRemote.action',this.$qs.stringify(
			{
				examinationRecordId:this.examinationRecordId
			}
			
			)).then((res)=>{
				
				Indicator.close();
				
				this.testList = res.data.data.testQuestionsVoList;
				let type=res.data.data.type;
				for(let i in this.testList){
					if(type==1){
						this.testList[i].testId=this.testList[i].examinationTestId;
					}else{
						this.testList[i].testId=this.testList[i].testId;
					}
				}
				this.otherList = res.data.data
								
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
			
			// 选择答案
			chooseAnser(i,e){
				this.testList[i].selectAnswer=e;
				this.$set(this.testList,i,this.testList[i]);
				
			},
			// 考试数据保存	
			dataBc(){
				
			let arrTx = [];
			let tabMessage=this.testList
			// let tabMessage = document.getElementsByClassName('.tabMessage');
			for(let i in tabMessage){
				let testType = this.testList[i].testType;   //题型1-选择题  题型2-简答题
				// let type = this.otherList.type;
				let fkExamTestId = this.testList[i].testId  //试题id
				let fkExamResultId = this.otherList.examResultId;   //试题结果id
				let answer = this.testList[i].answer;  //正确答案
				let myAnswer = this.testList[i].selectAnswer;  //我的答案
				
				
				let isRight ='';
				 //  判断题型为1时是选择题，则判断答案是否正确
				   if(testType ==1 ){
					   if(answer == myAnswer){
						   isRight = 1;
					   }else {
						   isRight=0;
					   }
				   }
				   
				   let data={
					   fkExamTestId:fkExamTestId,
					   //answer:_o.attr('answer'),
					   isRight:isRight,
					   mineAnswer:myAnswer,
					   fkExamResultId:fkExamResultId
				   }
				arrTx.push(data);
				
			}	
				return arrTx
			},
			
			
			
			// 提交保存
			submitPreservation(){
			
			let arrTx=this.dataBc();
			
			for(let i in arrTx){
				if(!arrTx[i].mineAnswer){
					return Toast('请做完所有题目之后提交');
				}
			}
			// console.log('请求了接口')
				this.$ajax.post('/wlxy/examStudentDetail/saveStudentAnwserDetail.action',this.$qs.stringify(
							{
								data:JSON.stringify(arrTx)
							}
							
							)).then((res)=>{
								
								this.testList=res.data.data.testQuestionsVoList;
								Toast('保存成功');
								// 作答提交后返回列表页
								this.$router.push({
									push:'/Exam',
									query:{
										userId:this.userId
									}
								})
													
							})
			}
			
			
		}
	}
</script>

<style>
#onlineExercise{
  width: 100%;
  height: 100%;
  background-color: #F7F7F7;
  overflow-y: scroll;
}
/* 头部样式	 */
.mint-header {
    background-color: #4E7FFF;
	height: 60px;
}
/* -----tab切换题----------- */
.tabBox{
	border-bottom: 1px solid #ddd;
}
/* 试题详情 */
.tabMessage{
	padding: 1rem;
	color: #777;
	background-color: #fff;
}
/* 试题答案选择 */
.selectAnswer{
	position: fixed;
	bottom: 1rem;
	text-align: center;
	margin: 0 35px;
}
.selectAnswer ul{
	display: flex;
	justify-content: center;
	height:3.5rem;
	line-height: 3.5rem;
}
.answerList{
	width: 2.5rem;
	height: 2.5rem;
	line-height: 2.5rem;
	text-align: center;
	color: #fff;
	background-color: #D2D2D2;
	margin: 0.5rem 1rem;
	border-radius: 50%;
	
}
.ansAcitve{
	background-color: #4E7FFF;
}

/* 页面提示图片 */
#imgbox{
	padding: 5rem;		
}
#imgbox p{
	color: #999;
	text-align: center;
}
	
</style>
