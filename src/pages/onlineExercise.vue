<template>
	<div id="onlineExercise">
		<!-- 头部 -->
		<mt-header title="在线练习">
			<div slot="left"><mt-button @click="goback()" icon="back"></mt-button></div>
			<div slot="right" @click="submitPreservation()">提交保存</div>
		</mt-header>
	
			<!-- tab切换题 -->
			<div class="tabBox" v-if="testList.length">
					<van-tabs>
					  <van-tab v-for="(test,index) in testList" :title="'第'+(index+1)+'题'" >
			
						<!-- 试题详情 -->
						<div class="tabMessage">{{index+1}}.{{test.testContent}}</div>
						
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
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				index:'',
				testList:[],
				// 获取试题四个选项
				// isoption:0,
				answerLists:['A','B','C','D'],
				userId:'',
				ruleId:''
				
			}
		},
		// 页面加载时执行
		mounted(){

			Indicator.open('加载中...');
			
			this.userId = this.$route.query.userId;
			this.ruleId = this.$route.query.ruleId;
			this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId
			
			//在线练习列表
			this.$ajax.post('/wlxy/onLineFreePractice/startPractice.action',this.$qs.stringify(
			{
				ruleId:this.ruleId,
				studentId:this.userId
			}
			
			)).then((res)=>{
				Indicator.close();
				this.testList=res.data.data.testVoList;
				// console.log(this.testList)
				this.onLineFreePracticeList = res.data.data.onLineFreePractice;
							
			}).catch((err) =>{
// 				console.log(err)
// 				Toast("没有试题")
			})
			
			
		},
		methods:{
			// 返回方法
			goback(){
				this.$router.push({
					path:'/volumeRules',
					query:{
						userId:this.userId,
						ruleId:this.ruleId,
						fkCoursedirtreeId:this.fkCoursedirtreeId
					}
				})
			},
			// 选择答案
			chooseAnser(i,e){
				this.testList[i].selectAnswer=e;
				this.$set(this.testList,i,this.testList[i]);
				console.log(this.testList[i])
				
			},
			// 保存考试数据 
			examDataBc(){
				let arrTx=[];
				let tabMessage=this.testList;
			
				this.beginTime = this.$route.query.beginTime;  //开始时间获取
				let endTime = new Date().getTime();     // 结束时间获取
				let practiceUseTime =parseInt((endTime-this.beginTime)/60000) 
				
				let examAll = tabMessage.length; //试题总数
				let trueNum = 0; //正确个数
				
				
				for(let i in tabMessage){
					let fkTestId = this.testList[i].testId;
					let answer = this.testList[i].answer;  //正确答案
					let myAnswer = this.testList[i].selectAnswer;  //我的答案
					let fkPracticeId = this.onLineFreePracticeList.practiceId;
					
					let isRight =''; 
					if(answer == myAnswer){
							isRight = 1;
							trueNum++;
						}else {
							isRight=0;
					}
					let accuracy = parseInt(trueNum/examAll*100)+'%'; //正确率
					let examData = {
						accuracy:accuracy,
						practiceUseTime:practiceUseTime,
						fkPracticeId:fkPracticeId,
						fkTestId:fkTestId,
						mineAnswer:myAnswer,
						isRight:isRight
					}
					arrTx.push(examData)   
				}
				return arrTx
			},
			
			//提交保存接口
			submitPreservation(){
				
				let arrTx = this.examDataBc();
				console.log(arrTx)
				for(let i in arrTx){
					if(!arrTx[i].mineAnswer){
						return Toast('请做完所有题目之后提交');
					}
				}
				
				this.$ajax.post('/wlxy/onLineFreePracticeTest/updatePracticeTest.action',this.$qs.stringify(
				{
					data:JSON.stringify(arrTx)
				}
				
				)).then((res)=>{
					Toast('保存成功');
					// 当提交成功后,将练习记录展示到在线练习列表页面
					this.$router.push({
							path:'/studyonline',
							query:{
								userId:this.userId,
								num:2
							}
						})			
					
					// this.testList=res.data.data.testVoList;
					// console.log(this.testList)
				
										
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
