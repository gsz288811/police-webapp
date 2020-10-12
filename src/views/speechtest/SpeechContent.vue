<template>
	<div id="main">
		<TreeList v-on:getlesson="getlesson"></TreeList>
	    <div class="contentbox">		
	    	<div class="cont_nav">
				<span class="act check" @click="goback" id="goback">返回</span>
		        <div class="head">课时：<span class="text-content" id="head-lesson">{{lessons}}</span></div>
		        <div class="topictype">题型：
		        	<span v-for="(v,i) in navLists" :class="{ act:isAct == i}" @click="changeColor(i,v.English)">{{v.text}}</span>
		        </div>
		        <div class="line"></div>
		        <div class="head">题目<span class="tip">(选入你想要布置的题目)</span></div>
	    	</div>
	        <div class="contentdiv" style="padding: 0;">
				<div class="myword" v-show="showWord">
					<span class="act check" @click="checkin(word)">加入题单</span>
					<div class="title">
						<b class="OEM-fsColor">单词</b>
						<span>(划掉你不需要的单词)</span>
					</div>
					<div class="details word">
						<!-- <span class="nothing" v-if="sentence.length" v-for="(v,i) in sentence" @click="toDel($event)">{{v.word}}</span> -->
						<span class="nothing1" v-if="initData.length" v-for="(v,i) in initData" @click="toDel($event,i)" :wId = "v.word_id" :index="i">{{v.word}}</span>
						<div v-if="!initData.length">
							<img src="../../assets/images/no_data.png" style="padding:30px 0 18px 285px;"/>
						</div>
					</div>
				</div>
				<div class="mytext" v-show="showText">
					<span class="act check" @click="checkin(text)">加入题单</span>
					<div class="title">
						<b class="OEM-fsColor">句子</b>
						<span>(划掉你不需要的句子)</span>
					</div>
					<div class="details statement">
						<div class="sentence nothing2" v-if="sentence.length" v-for="v in sentence" @click="toDelText($event)" :tId = "v.text_id">{{v.text}}</div>
						<div v-if="!sentence.length">
							<img src="../../assets/images/no_data.png" style="padding:30px 0 18px 285px;"/>
						</div>
					</div>
				</div>
				<div class="myroleplay" v-show="showRo">
					<span class="act check" @click="checkin(talk)">加入题单</span>
					<div class="title">
						<b class="OEM-fsColor">对话</b>
						<span></span>
					</div>
					<div class="details statement">
						<div class="sentence" v-if="article.length" v-for="v in article" :tkId = "v.id"> <b>{{v.role}}</b> : {{v.astring}}</div>
						<div v-if="!article.length" class="null">
							<img src="../../assets/images/no_data.png" style="padding:30px 0 18px 285px;"/>
						</div>
					</div>
				</div>
				<div class="myread" v-show="showRead">
					<span class="act check" @click="checkin(reading)">加入题单</span>
					<div class="title">
						<b class="OEM-fsColor">课文</b>
						<span></span>
					</div>
					<div class="details read">
						<div v-if="readdata.length" v-for="val in readdata">
							<div v-for="value in val.text">
								<div>
									<span class="nothing4" :rId = "v.sentence_id"  v-for="v in value.sentence">{{v.sentence_value}}</span>
								</div>
							</div>
						</div>
						<div v-if="!readdata.length" class="null2">
							<img src="../../assets/images/no_data.png" style="padding:30px 0 18px 285px;"/>
						</div>
					</div>
				</div>
				<div class="myword" v-show="showSpell">
					<span class="act check" @click="checkin(spell)">加入题单</span>
					<div class="title">
						<b class="OEM-fsColor">单词听写</b>
						<span>(划掉你不需要听写的单词)</span>
					</div>
					<div class="details word">
						<span class="nothing3" v-for="(v,i) in initData" @click="toDelSpell($event)" :sId='v.word_id'>{{v.word}}</span>
						<div v-if="!initData.length">
							<img src="../../assets/images/no_data.png" style="padding:30px 0 18px 285px;"/>
						</div>
					</div>
				</div>
	        </div>        
	    </div>
		<div class="topic-basket-leftBar1">
			<span class="lanzi-bg" id="lanzi-totalTopicNum">{{Sum}}</span>
			试<br>题<br>篮<br>
			<span style="display: inline-block;height: 170px;" v-if="Sum==0?false:true"></span>
			<b class="topic-basket-smokeBtn" id="topic-basket-smokeBtn" num="1" @click="hideLanzi" style="color:#fff ;">
				◀
			</b>
		</div>
		<transition name="slide-fade">
			<div class="topic-basket" id="topic-basket" v-if="fade">
				<div class="topic-basket-leftBar" id='testbar2'>
					<span class="lanzi-bg" id="lanzi-totalTopicNum">{{Sum}}</span>
					试<br>题<br>篮<br>
					<span style="display: inline-block;height: 170px;" v-if="Sum==0?false:true"></span>
					<b class="topic-basket-smokeBtn" id="topic-basket-smokeBtn" num="1" @click="showLanzi" style="color:#fff ;">
						▶
					</b>
				</div>
				<div class="topic-basket-rightCont" id='testbar'>
					<p class="topic-basket-rTitle">共计：( <span id="totalTopicNum">{{Sum}}</span> ) 道题 
					<a class="topic-basket-delAll-btn" @click="removeAll()" style="cursor: pointer;"> <img src="../../assets/images/del2.png" alt="" style="vertical-align: sub;"></a></p>
					<div class="topic-basket-rTypeList" id="topic-basket-rTypeList" v-if="Sum==0?false:true">
						<p  v-for="(v,i) in totals">{{v.type}}<span id="topicTypeid-1">{{v.num}}</span>道
							<a class="topic-basket-del-btn" style="color: #AAA;cursor: pointer;" @click="removeByType(i,v.num)">
								<img src="../../assets/images/del2.png" alt=""> 
							</a>
						</p>
					</div>
					<div class="topic-basket-rOperaBtn">
						<!-- <a id="link-ylpage-btn" @click="previewTests()">预览题单</a> -->
						<button type="text" @click="previewTests()" class="button">预览题单</button>
					</div>
				</div>
			</div>
		</transition>
		<!-- 弹窗 -->
		<div id="assignHomework" class="assignHomework pop-up" v-if="flagTest"> 
			<div class="arrangement">
				<p class="title"><i class="border OEM-bgColor"></i><span class="titleText">预览题单</span> <i class="close" @click="cancel()">X</i></p>
				<div class="siction" v-if="obj.word.length == 0?false:true">
					<div class="head">
						<label>单词</label>
					</div>
					<div class="cot" style="padding: 0px 0;">
						<span class="word" style="margin: 10px 0 0 20px;" v-for="v in obj.word">
							<a>{{v.innerText}}</a>
						</span>
					</div>
				</div>
				<div class="siction" v-if="obj.text.length == 0?false:true">
					<div class="head">
						<label>句子</label>
					</div>
					<div class="cot" style="padding: 0px 0;">
						<span class="word" style="margin: 10px 0 0 20px;" v-for="v in obj.text">
							<a>{{v.innerText}}</a>
						</span>
					</div>
				</div>
				<div class="siction" v-if="article.length == 0?false:true">
					<div class="head">
						<label>对话</label>
					</div>
					<div class="cot" style="padding: 0px 0;">
						<p style="margin: 10px 0 0 15px;" v-for="v in article">
							<b>{{v.role}}</b> : {{v.astring}}
						</p>
					</div>
				</div>
				<div class="siction" v-if="obj.read.length == 0?false:true">
					<div class="head">
						<label>课文</label>
					</div>
					<div class="cot" style="padding: 0px 0;">
						<p style="margin: 10px 0 0 15px;" v-for="v in obj.read">
							{{v.innerText}}
						</p>
					</div>
				</div>
				<div class="siction" v-if="obj.spell.length == 0?false:true">
					<div class="head">
						<label>听写</label>
					</div>
					<div class="cot" style="padding: 0px 0;">
						<span class="word" style="margin: 10px 0 0 20px;" v-for="v in obj.spell">
							<a>{{v.innerText}}</a>
						</span>
					</div>
				</div>
				<div class="submit-btn">
					<div id="layoutSubmit" class="btn-com green-btn" type="button" @click="gopublish">立即发布</div>
					<div id="layoutCancel" class="btn-com red-btn" type="button" @click="cancel">返回</div>
				</div>
			</div>
		</div>
		<!-- 作业布置确定弹窗 -->
		<div id="assignHomework" class="assignHomework pop-up" v-if="sure"> 
			<div class="arrangement">
				<p class="title"><i class="border OEM-bgColor"></i><span class="titleText">发布作业</span> <i class="close" @click="cancel()">X</i></p>
				<div class="inputbox">
					<div>作业名称：<input type="text" value="" v-model="workname"/></div>
					<div>截止时间：<div class="block" style="display: inline-block;margin-bottom: 5px;">
						<el-date-picker
						  v-model="endtime"
						  type="datetime"
						  value-format="yyyy-MM-dd-HH-mm-ss"
						  placeholder="选择日期时间">
						</el-date-picker>
					  </div>
					</div>
					<div>选择班级: <span v-for="v in getclass"><input type="checkbox" :value="v.teachclassId" v-model="classes"/>{{v.teachclassName}}</span></div>							
				</div>
				<div class="submit-btn">
					<button id="layoutSubmit" class="btn-com green-btn" type="button" @click="suredata" :disabled="disabled">发布作业</button>
					<div id="layoutCancel" class="btn-com red-btn" type="button" @click="cancelback">取消</div>
				</div>
			</div>
		</div>
		<!-- 蒙层 -->
		<div id="logo-shadow" class="logo-shadow" v-if="flagM"></div>
		<!-- 查询框 -->
		<Loading v-show="loadFlag"></Loading>
	</div>
</template>

<script>
	import TreeList from '../../components/TreeList.vue'  
	import Loading from '../../components/Loading.vue'  
    export default {
    	name: "SpeechContent",
        components: {TreeList,Loading},
        data(){
        	return{
        		navLists:[
                    {
                        "text":"单词",
						"English":"word"					 
                    },
                    {
                        "text":"句子",
						"English":"text"					 
                    },
                    {
                        "text":"对话",
						"English":"roleplay"						
                    },
                    {
                        "text":"课文",
						"English":"read"
                    },
					{
						"text":"听写",
						"English":"word"
					}
                ],
                isAct:0,
				count:0,
				lessons:'',
				lessonId:'',
				courseId:'',
				courseName:'',
				unitId:'',
				unitName:'',
				word:'word',
				text:'text',
				talk:'talk',
				reading:'reading',
				spell:'spell',	  
				flagTest:false,   //预览题单开关
				flagM:false,  	  //蒙层开关
				sure:false,		  //作业布置开关
				disabled:false,
				fade:true,        //试题栏开关
				totals:[
					{"type":"单词","num":0},
					{"type":"句子","num":0},
					{"type":"对话","num":0},
					{"type":"课文","num":0},
					{"type":"听写","num":0}
				],
				showWord:true,
				showText:false,
				showRo:false,
				showRead:false,
				showSpell:false,
				sentence:[],
				article:[],
				initData:[],
				readdata:[],
				spelldata:[],
				getclass:[],
				obj:{
					"word":[],
					"text":[],
					"article":[],
					"read":[],
					"spell":[]
				},
				Sum:0,
				NumA:0,
				NumB:0,
				NumC:0,
				NumD:0,
				NumE:0,
				endtime:'',  //获取输入框的结束时间 
				classes:[],  //选中的班级
				workname:'', //作业名称
				userId:'',
				fkSchoolId:null,
				loadFlag:false,  //加载框开关
				getid:{
					'wid':[],
					'tid':[],
					'talkid':[],
					'read':[],
					'spell':[]
				},
				baseUrl:'http://192.168.0.25/singsound/basecode/findTestByLessonIdAndTestType.do',
				url:'http://192.168.0.25/singsound/basecode/'
        	}
        },
		mounted(){
			this.userId = this.$route.query.userId 
			this.fkSchoolId = this.$route.query.fkSchoolId
			this.getlesson()	
		},
        methods:{	
        	changeColor(i,tType){
        		this.isAct = i
				if(i == 0){
					this.showWord=true
					this.showText=false
					this.showRo=false
					this.showRead=false
					this.showSpell=false
				}else if(i == 1){
					this.showWord=false
					this.showText=true
					this.showRo=false
					this.showRead=false
					this.showSpell=false
				}else if(i == 2){
					this.showWord=false
					this.showText=false
					this.showRo=true
					this.showRead=false
					this.showSpell=false
				}else if(i == 3){
					this.showWord=false
					this.showText=false
					this.showRo=false
					this.showRead=true
					this.showSpell=false
				}else{
					this.showWord=false
					this.showText=false
					this.showRo=false
					this.showRead=false
					this.showSpell=true
				}
				var that = this
					if(tType == "word"){
						this.$ajax.post(this.baseUrl,{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':this.lessonId,'testType':tType}).then(function(res){
							that.initData = res.data.data
						})
					}else if(tType == "text"){
	
						this.$ajax.post(this.baseUrl,{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':this.lessonId,'testType':tType}).then(function(res){
							that.sentence = res.data.data
						})	
					}else if(tType == "roleplay"){
						this.$ajax.post(this.baseUrl,{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':this.lessonId,'testType':tType}).then(function(res){
							console.log(res)
							if(res.data.data[0].length !== 0){						
								that.article = res.data.data[0].dialog
							}							
						})
					}else if(tType == "read"){
						this.$ajax.post(this.baseUrl,{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':this.lessonId,'testType':tType}).then(function(res){
							that.readdata = res.data.data
						})
					}else{
						this.$ajax.post(this.baseUrl,{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':this.lessonId,'testType':tType}).then(function(res){
							that.initData = res.data.data
						})
					}					
        	},
			// 获取从tL传过来的参数
        	getlesson(lesson,Lid,Bname,cid,uid,uname){
				this.lessons = lesson
				this.lessonId = Lid
				this.courseName = Bname
				this.courseId = cid
				this.unitId = uid
				this.unitName = uname
        		// console.log(lesson,Lid)
				var that = this
				this.loadFlag = true
				this.$ajax.post(this.url+'findTestByLessonIdAndTestType.do',
				{'userId':this.userId,'schoolId':this.fkSchoolId,'lessonId':Lid,'testType':'word'}).then(function(res){
					that.loadFlag = false
					that.initData = res.data.data
					// console.log("1",that.initData)	
				})
				// 默认显示单词页面
				this.isAct = 0
				this.showWord=true
				this.showText=false
				this.showRo=false
				this.showRead=false
				this.showSpell=false
				// 选题框清零
				/* this.Sum = 0
				for(var i in this.totals){
					this.totals[i].num = 0
				} */
				// 预览框清空
				/* this.obj.word = []
				this.obj.text = []
				this.obj.talk = []
				this.obj.read = []
				this.obj.spell = [] */
				//状态清空
				/* this.sentence = []
				this.article = []
				this.initData = []
				this.readdata = []
				this.spelldata = [] */
        	},
			// 删除单词
			toDel(event,i){
				if(event.currentTarget.className == "nothing1"){
					event.currentTarget.className = "del"
				}else{
					event.currentTarget.className = "nothing1"
				}

			},
			// 删除听写
			toDelSpell(event){
				if(event.currentTarget.className == "nothing3"){
					event.currentTarget.className = "del"
				}else{
					event.currentTarget.className = "nothing3"
				}
			},
			// 删除句子
			toDelText(event){
				if(event.currentTarget.className == "sentence nothing2"){
					event.currentTarget.className = "deltext sentence"
				}else{
					event.currentTarget.className = "sentence nothing2"
				}
			},
			checkin(type){
				console.log(type)
				if(type == "word"){
					//重新点击清空
					// this.getid.wid = []	
					console.log("题",this.obj)
					var total = document.getElementsByClassName("nothing1").length
					this.totals[0]['num'] = total
					this.NumA = total				
					var data1 = document.getElementsByClassName("nothing1")
					for(let i = 0 ; i<data1.length; i++){
						var data = data1[i].getAttribute("wid")
						this.getid.wid.push(data)
						console.log(this.getid.wid)
					}
					this.obj.word = data1
				}else if(type == "text"){
					// this.getid.tid = []
					var total = document.getElementsByClassName("nothing2").length
					this.totals[1]['num'] = total
					this.NumB = total
					var data2 = document.getElementsByClassName("nothing2")
					for(let i = 0 ; i<data2.length; i++){
						var data = data2[i].getAttribute("tid")
						this.getid.tid.push(data)
					}
					this.obj.text = data2
				}else if(type == 'talk'){
					if(document.getElementsByClassName("null").length){
						this.totals[2]['num'] = 0
					}else{
						this.totals[2]['num'] = 1
						this.NumC = 1
						for(let i = 0 ; i<this.article.length; i++){							
							this.getid.talkid.push(this.article[i].id)
						}
						this.obj.talk = this.article
					}			
				}else if(type == 'reading'){
					if(document.getElementsByClassName("null2").length){
						this.totals[3]['num'] = 0
					}else{
						this.getid.read = []
						this.totals[3]['num'] = 1
						this.NumD = 1
						var data3 = document.getElementsByClassName("nothing4")
						for(let i = 0 ; i<data3.length; i++){
							var data = data3[i].getAttribute("rid")
							this.getid.read.push(data)
						}
						this.obj.read = data3
					}
				}else{
					// this.getid.spell = []
					var total = document.getElementsByClassName("nothing3").length
					this.totals[4]['num'] = total
					this.NumE = total
					var data4 = document.getElementsByClassName("nothing3")
					for(let i = 0 ; i<data4.length; i++){
						var data = data4[i].getAttribute("sid")
						console.log("听写的id",data)
						this.getid.spell.push(data)
					}
					this.obj.spell = data4
				}
				this.Sum = this.NumA + this.NumB+ this.NumC+ this.NumD+ this.NumE		
			},
			// 预览题单
			previewTests(){
				if(this.Sum !== 0){
					this.flagTest = !this.flagTest
					this.flagM = !this.flagM
				}else{
					alert("题单为空，请选入试题")
				}	
			},
			// 关闭预览题单
			cancel(){
				this.flagTest = false
				this.flagM = false
				this.sure = false
			},
			//取消返回
			cancelback(){
				this.flagTest = false
				this.sure = !this.sure
				this.flagM = !this.flagM
			},			
			// 发布作业
			gopublish(){				
				this.sure = true
				this.flagTest = false
				var that = this
				this.$ajax.post('http://192.168.0.25/singsound/homework/getTeachclass.do',{
					"userId": this.userId,
					"schoolId": this.fkSchoolId,
					"homeworkId": null,
					"teachClassId": null,
					"tableSuffix": ""
				}).then(function(res){
					that.getclass = res.data.data
					console.log("获取班级",that.getclass)
				})				
			},
			// 确认发布
			suredata(){
				console.log("id:",this.endtime)
				var passdata = {
					teachclassIds: this.classes,
					endTime:this.endtime,
					homeworkName: this.workname,
					chosenTests:[
									{
										"type":"word",
										"ids":this.getid.wid
									},
									{
										"type":"text",
										"ids":this.getid.tid
									},
									{
										"type":"roleplay",
										"ids":this.getid.talkid
									},
									{
										"type":"read",
										"ids":this.getid.read
									},
									{
										"type":"dictate",
										"ids":this.getid.spell
									}
								],
					courseId:this.courseId,   	 //教材id
					courseName:this.courseName,  //教材名字
					unitId: this.unitId,		 //单元id
					unitName: this.unitName,     //单元名
					"userId": this.userId,
					"schoolId": this.fkSchoolId
				}
				if(this.endtime=='' || this.classes.length == 0 || this.workname == ''){
					alert("请输入数据")
				}
				else{
					this.disabled = true
					this.sure = false
					this.flagTest = false
					this.flagM = false
					if(this.disabled){
						this.$ajax.post('http://192.168.0.25/singsound/homework/assign.do',passdata).then((res)=>{
							console.log(res)
						})
						this.$router.push({
							path:'/ListenandSpeak',
							query:{
								"userId":this.userId,
								"fkSchoolId":this.fkSchoolId
							}
						})
					}				
				}
			},
			// 返回
			goback(){
				this.$router.push({
					path:'/ListenandSpeak',
					query:{
						"userId":this.userId,
						"fkSchoolId":this.fkSchoolId
					}
				})
			},
			// 显示试题篮子
			showLanzi(){
				this.fade = false
			},
			// 隐藏试题
			hideLanzi(){
				this.fade = true
			},
			// 删除试题篮中的试题
			removeByType(i,testNum){
				if(testNum >0){
					this.Sum = this.Sum-testNum
					this.totals[i].num = 0
				}			
			},
			// 删除所有
			removeAll(){
				this.Sum = 0
				for(let i in this.totals){
					this.totals[i].num = 0
				}
			}
        }
    }  
</script>

<style scoped>
	#main{
		display: flex;
		
	}
	.cont_nav,.contentdiv{
		padding: 20px;
	}
	.contentdiv{
		background-color: #F9F9F9;
		width: 96%;
		min-height: 100px;
		margin: 0 auto;
		border: 1px solid #eee;
		margin-bottom: 20px;
		margin-left: 20px;
	}
	.cont_nav>div{
		line-height: 34px;
	}
	.contentbox{
		width: 950px;
    	height: auto;
    	min-height: 645px;
    	border:1px solid #ececec;
    	margin-left: 2%;
    	background-color: #fff;
	}
	.contentbox .cont_nav .topictype span{
		margin-right: 10px;
		cursor: pointer;
		padding: 4px 14px 4px;
	}
	.contentdiv .check{
		position: relative;
		top: 20px;
		left: 88%;
		padding:4px 14px;
		cursor: pointer;
	}
	.act{
		background-color: #55C3B1;
	    color: #fff!important;
	    border-radius: 6px;
	}
	/*内容样式*/
	/* 单词 */
	.contentdiv .title {
		padding: 0 20px;
		height: 40px;
		border-bottom: 1px solid #EFEFEF;
	}
	.contentdiv .title b{
		font-size: 16px;
		color: #55C3B1;
	}
	.contentdiv .title span {
		margin-left: 15px;
		font-size: 14px;
		color: #666;
	}
	.contentdiv .details {
		padding: 10px 8px;
		font-size: 14px;
		color: #333;
		min-height: 360px;
	}
	.contentdiv  .word span {
		display: inline-block;
		margin-left: 8px;
		margin-top: 8px;
		line-height: 35px;
		padding: 0 20px;
		border: 1px solid #F0F0F0;
		border-radius: 2px;
	}
	.contentdiv .word span:hover {
		background: #F0F0F0;
		border: 1px solid #F0F0F0;
		border-radius: 2px;
		text-decoration: line-through;
		color: #999;
		cursor: pointer;
	}
	/* 句子 */
	.contentdiv .statement {
		padding: 17px 20px;
	}
	.contentdiv .statement .duplex {
		cursor: pointer;
	}
	.contentdiv .statement .sentence {
		line-height: 35px;
		font-size: 14px;
		color: #333;
	}
	.contentdiv .mytext .sentence:hover {
		text-decoration: line-through;
		color: #999;
		cursor: pointer;
	}
	.contentdiv .read{
		margin-left: 8px;
		line-height: 35px;
		font-size: 14px;
		color: #333;
	}
	.del{
		text-decoration: line-through;
		background: #F0F0F0;
		border: 1px solid #F0F0F0;
		border-radius: 2px;
		color: #999;
	}
	.deltext{
		text-decoration: line-through;
		color: #999 !important;
	}
	/* 选择框样式 */
	.select_box .btn-com, .select_box .preview {
		width: 158px;
		height: 44px;
		font-size: 17px;
		line-height: 44px;
		margin: 10px auto 15px;
		border-radius: 4px;
		cursor: pointer;
		text-align: center;
	}
	.select_box .box-center {
		width: 100%;
		margin: 0 auto 5px;
		max-height: 229px;
		overflow-x: hidden;
	}
	.select_box .box-center ul {
		padding: 5px 16px;
	}
	.select_box .box-center ul li {
		font-size: 14px;
		line-height: 30px;
		color: #333;
	}
	.select_box .box-center ul li .length {
		font-size: 14px;
		float: right;
	}
	.select_box .btn-com {
		display: block;
		color: #fff;
	}
	.OEM-bgColor {
		background-color: #55C3B1 !important;
	}
	.select_box {
		z-index: 300;
		width: 192px;
		background: #fff;
		border-radius: 2px;
		position: fixed;
		top: 80%;
		transform: translateY(-50%);
		left: 56%;
		margin: 0 0 0 525px;
		padding-bottom: 15px;
		border: 1px solid #F2F2F2;
		font-size: 14px;
		color: #333;
	}
	@media (max-width: 1500px){
		.select_box {
			position: fixed;
			right: 10px;
			left: inherit;
			top: 80%;
			transform: translateY(-50%);
		}
	} 
	/* 选题框样式 */
	.topic-basket {
	    position: fixed;
	    right: 0;
	    top: 300px;
	    width: 210px;
	    height: auto;
	    z-index: 5;
	}
	
	.topic-basket-leftBar {
	    width: 30px;
	    min-height: 150px;
	    background-color: #55C3B1;
	    color: #fff;
	    text-align: center;
	    position: relative;
	    float: left;
	}
	.topic-basket-leftBar1{
		width: 30px;
		min-height: 150px;
		background-color: #55C3B1;
		color: #fff;
		text-align: center;
		position: fixed;
		top: 300px;
		right: 0px;
		float: left;
	}
	.lanzi-bg {
	    display: inline-block;
	    width: 30px;
	    height: 36px;
	    margin-bottom: 15px;
	    background-color: #ffa800;
	    text-align: center;
	    line-height: 36px;
	    color: #fff;
	    font-size: 20px;
	    /*background: url("../images/lanzi.png") no-repeat center center;*/
	}
	
	.topic-basket-smokeBtn {
	    display: block;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 30px;
	    height: 29px;
	    border-top: solid 1px #fff;
	    line-height: 29px;
	    text-align: center;
	    background-color: #55C3B1;
		cursor: pointer;
	}
	
	
	.topic-basket-rightCont {
	    float: right;
	    width: 177px;
	    min-height: 150px;
	    background-color: #fff;
	    border: solid 1px #f3f3f3;
	}
	
	.topic-basket-rTitle {
	    width: 100%;
	    height: 36px;
	    line-height: 36px;
	    text-align: center;
	    background-color: #e6e6e6;
	    color: #666;
	}
	
	.topic-basket-rTitle span {
	    color: #55C3B1;
	    font-size: 18px;
	}
	
	.topic-basket-rTypeList {
	    width: 140px;
	    margin: 10px 0 10px 20px;
	}
	
	.topic-basket-rTypeList > p {
	    padding: 8px 0;
	}
	
	.topic-basket-rTypeList > p span {
	    color: #55C3B1;
	    padding: 0 5px;
	}
	
	.topic-basket-rTypeList > p a {
	    float: right;
	}
	
	.topic-basket-rOperaBtn {
	    width: 100%;
	    margin: 10px 0;
	    text-align: center;
	}
	
	.topic-basket-rOperaBtn a {
	    text-align: center;
	    display: inline-block;
	    margin: 5px 0;
	    padding: 5px 20px;
	    background-color: #55C3B1;
	    color: #fff;
	    font-size: 13px;
	    border-radius: 5px;
	}
	
	.topic-basket-rOperaBtn a:hover {
	    background-color: #4BAC9C;
	}
	
	.topicNum-b {
	    font-size: 14px;
	    font-weight: 500;
	}
	/* 蒙层 */
	.logo-shadow {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: .4;
		background: #000;
	}
	/* 弹窗 */
	.assignHomework {
		z-index: 1000;
		width: 700px;
		margin-bottom: 3px;
		position: fixed;
		background: #fff;
		top: 50%;
		left: 50%;
		margin-top: -240px;
		margin-left: -354px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		border-radius: 4px;
		font-size: 14px;
		color: #333;
	}
	.assignHomework .arrangement {
		width: 100%;
		max-height: 665px;
		overflow-y: scroll;
		padding: 0;
		background: #fff;
		margin: 0;
		border-radius: 0 0 3px 3px;
		font-size: 14px;
	}
	.assignHomework .arrangement .title {
		font-size: 14px;
		padding: 0 16px;
		color: #333;
		line-height: 46px;
	}
	.assignHomework .arrangement .centent {
		height: auto;
		padding: 19px 22px 0 24px;
	}
	.assignHomework .arrangement .border {
		height: 12px;
		width: 2px;
		display: inline-block;
		background-color: #1890ff 
	}
	.assignHomework .title .titleText {
		padding-left: 4px;
		width: 2px;
		height: 12px;
		margin-right: 4px;
	}
	.assignHomework .arrangement .title .close {
		color: #f00;
		font-size: 18px;
		line-height: 46px;
		float: right;
		cursor: pointer;
		font-style: normal;
	}
	.assignHomework .arrangement .submit-btn {
		padding: 32px 130px 24px;
	}
	.assignHomework .arrangement .submit-btn .red-btn {
		margin-left: 90px;
		width: 158px;
		height: 34px;
		line-height: 34px;
		text-align: center;
		font-size: 16px;
		border-radius: 3px;
		background-color: #55C3B1;
		display: inline-block;
		border: 1px solid #55C3B1;
		cursor: pointer;
		color: #fff;
	}
	.assignHomework .arrangement .submit-btn .green-btn {
		width: 160px;
		height: 34px;
		line-height: 36px;
		text-align: center;
		font-size: 16px;
		border-radius: 3px;
		letter-spacing: 10px;
		text-indent: 13px;
		color: #fff;
		display: inline-block;
		cursor: pointer;
		background-color: #55C3B1;
		border: 1px solid #55C3B1;
	}
	.siction {
	    overflow: hidden;
	    margin-top: 10px;
	}
	
	.siction .head {
	    height: 40px;
	    line-height: 40px;
	    background: #d9d9d9;
	    color: #4c4c4c;
	
	}
	
	.siction .head label {
	    margin: 0 15px
	}
	.siction .cot {
		padding: 20px 0;
		background: white;
	}

	.siction .cot .word {
		display: inline-block;
		width: 200px;
		height: 30px;
		margin: 10px 0 0 20px;
	}

	.siction .cot .word a {
		cursor: pointer;
	}
	.inputbox{
		margin-left: 15px;
	}
	.inputbox div{
		margin-top: 5px;
	}
	.inputbox div:first-child input{
		height: 24px;
		width: 200px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		height: 34px;
		line-height: 34px;
	}
	.inputbox div:nth-child(2) input{
		height: 24px;
		width: 127px;
	}
	.inputbox div:last-child span{
		margin-right: 10px;
		margin-left: 6px;
	}
	.topic-basket-rOperaBtn .button{
		color: #fff;
		background-color: #55C3B1;
		padding-left: 10px;
		padding-right: 10px;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		border: 1px solid #dcdfe6;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		font-weight: 500;
		padding: 12px 20px;
		border-radius: 4px;
		outline: none;
	}
	#goback{
		position: relative;
		top: -2px;
		left: 91%;
		padding: 4px 14px;
		cursor: pointer;
	}
	/* 动画 */
	.slide-fade-enter-active {
	  transition: all 1.2s ease;
	}
	.slide-fade-leave-active {
	  transition: all 1s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateX(180px);
	  opacity: 1;
	}
	#main .el-date-editor.el-input{
		width: 203px;
	}
</style>