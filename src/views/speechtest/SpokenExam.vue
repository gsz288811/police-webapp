<template>
	<div id="spoken">
		<!--导航-->
		<div class="hd-switch-nav" style="position: inherit; display: block;">
		 	<div class="switch-nav-cont">
				<div class="switch-nav-list cl" id="secondNavSpan_230" style="display: block;">
					<a class="class_package_kebao act" id="secondNavSpan_a_231" >
						慧听慧说
					</a>
				</div>
		 	</div>
		</div>
		<!--内容部分-->
		<div id="speech_cont">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
			  <el-menu-item index="1" default-active @click="goExam">按试卷出题</el-menu-item>
			</el-menu>
			<!-- <div id="ByTest" v-if="examFlag">
				<div class="check">
				地区：
					<el-select v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value"
						  @change="choose"
						 >
						</el-option>
					  </el-select>
				</div>
				<div class="check">
				年级：
					<el-select v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value"
						  @change="choose"
						 >
						</el-option>
					  </el-select>
				</div>
				<div class="check">
				题型：
					<el-select v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value"
						  @change="choose"
						 >
						</el-option>
					  </el-select>
				</div>
				<div class="check">
				状态：
					<el-select v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value"
						  @change="choose"
						 >
						</el-option>
					  </el-select>
				</div>
				<span class="clear">清除筛选条件</span>
			</div>
			<div id="Byquest" v-if="questFalg">
				<div class="check">
				地区：
					<el-select v-model="value" placeholder="请选择">
						<el-option
						  v-for="item in options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value"
						  @change="choose"
						 >
						</el-option>
					  </el-select>
				</div>
				<span class="clear">清除筛选条件</span>
			</div> -->
			<!-- 按试卷 -->
			<div class="paperBox">
				<div id="paperLists" class="paper-list">
					<h2 style="margin: 0 16px 12px; padding: 24px 0 16px 8px; border-bottom: 1px solid #E8E8E8;">题型列表</h2>
					<ul id="queListTotal" class="testPaper" v-for="(v,i) in spokenlist">
						<li class="typeActive act" @click="chooseTest(v.name,v.paper_id)">							
							<a href="javascript:;">{{v.name}}</a>
						</li>
					</ul>
				</div>
				<div id="PaperDetails" class="paper-content">
					<div id="PaperSpoken" class="paper-spoken">
						<div class="paper-title clearfix cl">
							<p class="paper-name">
								{{testName}}
							</p>
							<span data-id="30002275" data-title="人教听力训练九年级上unit9" class="btn-exam-layout OEM-bgColor">布置试题</span>
						</div>
						<div class="paper-detail">
							<!-- <div v-for="val in testobj.discrible"> -->
								<div class="topic">
									<div class="topic-caption" v-for="v in testobj.title">								
										{{v.flag}}.{{v.title}}
									</div>
									<div class="topic-case">				
										<div class="topic-describe"></div>							
										<div class="original-box">
											<div class="cl">
												<div id="28599" class="topic-audio clearfix">
													<p class="audio-url audio-play" data-id="28599" data-url="https://data.caidouenglish.com/2018/08/31/e4/ef/e4ef649a77417f2bdead965c2157ad85.mp3">
														<i></i>
														<span>听力材料</span>
													</p>
												</div>
												<p class="original-btn clearfix">
													<span class="OEM-fsColor">查看原文</span>
												</p>
											</div>
											<div class="original-text" v-show="false"> W: I’d like to get good grades this term.<br>  M: I think you should listen carefully in class.</div>
										</div>							
										<div class="topic-stem">
											<p>timu</p>								
											<div class="options clearfix">											
												<p>A. Reading books at home.</p>
												<p>B. Listening carefully in class.</p>
												<p>C. Doing more exercises.</p>										
											</div>										
										</div>				
									</div>							
								</div>
							<!-- </div> -->
						</div>
					</div>					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'SpokenExam',
		data() {
			return {
				activeIndex: '1',
				examFlag:true,
				questFalg:false,
				testName:'',
				baseUrl:'http://192.168.0.25/singsound/basecode/',
				spokenlist:[],
				paperdata:[],
				testobj:{
					"title":[],
					"discrible":[]				
				}
			}	
		},
		mounted() {
			this.$ajax.post(this.baseUrl+'findPaperList.do',{
				"type":"speak", //试卷类型 listen 听力 speak 口语
				"cityId":"", 	 //默认传空
				"paperTypeId":"" //默认传空
			}).then((res)=>{
				this.spokenlist = res.data.data.data
				this.testName = res.data.data.data[0].name
				console.log(res,"试题列表",this.spokenlist)
			})
		},
		methods:{
			choose(){
				console(1111)
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			chooseTest(name,paperid){
				this.testName = name
				this.$ajax.post(this.baseUrl+'findMockTest.do',{"paperId":paperid}).then((res)=>{
					var data = res.data.data.paper_page_list
					console.log("所有",data)		
					for(let i in data){				
						for(let z in data[i]){
							if(data[i][z].stitle_type == 14){								
								this.testobj.title.push(data[i][z])
								console.log(this.testobj.title)
							}else if(data[i][z].stitle_type == 1){
								this.testobj.title.push(data[i][z])
							}							
						}
					}
				})
			},
			goExam(){
				this.examFlag = true
				this.questFalg = false
			},
			goQues(){
				this.examFlag = false
				this.questFalg = true
			}
		}
	}
</script>

<style>
		#spoken .hd-heard-cont .hd-heard-nav a {
		    padding: 0 20px; 
		    font-size: 14px;
		    color: #333;
		}
		#spoken .hd-switch-nav {
		    width: 100%;
		    height: 50px;
		    background-color: #55C3B1;
		    z-index: 99;
		    display: none;
	    }
	    #spoken .switch-nav-list {
		    width: 100%;
		    display: none;
		}
		#spoken .switch-nav-cont {
		    width: 1240px;
		    margin: 0 auto;
		}
		#spoken .switch-nav-list a {
			display: block;
			float: left;
		    width: 155px;
		    height: 50px;
		    text-align: center;
		    line-height: 50px;
		    font-size: 16px;
		    color: #fff;
		}
		#spoken .switch-nav-list a.act {
		    background-color: #4BAC9C;
		}
		#speech_cont{
			display: table;
			position: relative;
			min-height: 760px;
			width: 1240px;
			margin: 0 auto;
			margin-top: 16px;
		}
		/* 按试卷 */
		#ByTest,#Byquest{
			background-color: #fff;
			line-height: 70px;
		}
		#ByTest .check,#Byquest .check{
			display: inline-block;
			margin: 10px -50px 0 20px;
		}
		#ByTest .check .el-input,#Byquest .check .el-input{
			width: 60%;
		}
		#ByTest span.clear,#Byquest span.clear{
			cursor: pointer;
			position: absolute;
			right: 40px;
			top: 72px;
		}
		.el-menu--horizontal>.el-menu-item.is-active {
			border-bottom: 2px solid #55C3B1;
		}
		/* 卷子内容 */
		.paperBox{
			margin-top: 10px;
		}
		.paperBox .paper-list {
			float: left;
			width: 270px;
			min-height: 720px;
			max-height: 1035px;
			overflow: auto;
			border-radius: 4px;
			background-color: #FFF;
		}
		.paperBox .paper-list li {
			position: relative;
			width: 100%;
			line-height: 20px;
			font-size: 14px;
			display: table;
		}
		.act{
			background-color: #55C3B1 !important;
		}
		.paperBox .paper-list .testPaper li.typeActive a {
			color: #fff;
		}
		.paperBox .paper-list .testPaper li a {
			display: block;
			color: #666;
			height: 38px;
			line-height: 38px;
			font-size: 14px;
			padding: 0 0 0 24px;
			text-align: left;
			vertical-align: middle;
			border: none;
		}
		.paperBox .paper-content {
			float: right;
			position: relative;
			width: 950px;
			margin-left: 20px;
			min-height: 720px;
			border-radius: 2px;
			background-color: #FFF;
		}
		.paperBox .paper-spoken {
			padding: 0 24px 24px;
		}
		.paperBox .paper-title {
			padding: 16px 16px 16px 20px;
			font-size: 20px;
			color: #333;
			border-bottom: 1px dashed #EFEFEF;
			text-align: left;
		}
		.paperBox .paper-title .paper-name {
			display: block;
			float: left;
			max-width: 442px;
			padding: 6px 0 0 60px;
			line-height: 26px;
		}
		#spoken .paper-title span {
			display: block;
			float: right;
		}

		#spoken .btn-exam-layout {
			font-size: 16px;
			overflow: hidden;
			border-radius: 4px;
			cursor: pointer;
			width: 117px;
			height: 36px;
			line-height: 36px;
			color: #FFF;
			display: block;
			text-align: center;
			background-color: #55C3B1;
		}
		#spoken .paper-detail .topic {
			position: relative;
		}
		#spoken .paper-spoken .topic {
			margin-top: 16px;
			background: #FAFAFA;
			border: 1px solid #EEE;
			border-radius: 2px;
		}
		#spoken .topic .topic-caption {
			padding: 16px;
			font-size: 16px;
			border-bottom: 1px solid #EFEFEF;
			color: #333;
			line-height: 25px;
		}
		#spoken .topic-audio .audio-url {
			display: block;
			width: 64px;
			height: 16px;
			padding: 6px 8px;
			background: #FFD800;
			border-radius: 4px;
			cursor: pointer;
		}
		#spoken .topic-audio .audio-url span {
			display: block;
			color: #fff;
			font-size: 12px;
			line-height: 14px;
		}
		.topic .topic-case .original-btn {
			float: right;
			width: 80px;
			line-height: 16px;
			cursor: pointer;
			font-size: 0;
		}
		#spoken .paper-detail .topic .topic-case {
			padding: 0 16px 46px;
		}
		#spoken .topic .topic-case .topic-describe {
			margin-top: 16px;
			color: #999;
			font-size: 14px;
			line-height: 21px;
		}
		#spoken .topic .topic-case .original-btn span {
			font-size: 14px;
			display: inline-block;
			margin-right: 2px;
		}
		#spoken .topic .topic-case .topic-audio {
			float: left;
			width: 450px;
		}
</style>
