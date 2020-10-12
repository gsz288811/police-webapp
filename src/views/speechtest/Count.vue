<template>
	<div id="speech">
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
	 		<!-- <CountContainer></CountContainer> -->
			<div id="count_box">
				<p class="nav_func">
					<span>
						<input type="checkbox" name="" id="auto" value="" @click="autoplay" :play="isplay"/>跟读连播
					</span>
					<span @click="goback()">返回</span>
				</p>
				<div id="c_container" class="cl">
					<div id="list_ranking" class="fl_left">
						<p>查看：<span :class="{act:index==1}" @click="showCon(1)"></span>按学生 &nbsp;<span @click="showCon(2)" :class="{act:index==2}"></span>按题</p>
						<ul>
							<li class="list_title" @click="increase" v-show="sort0"><b>得分降序▼</b></li>
							<li class="list_title" @click="reduce" v-show="sort1"><b>得分升序▲</b></li>
							<div  v-show="isShow1">
								<li class="rank">
									<span>排名</span>
									<span>学生</span>
									<span>用时</span>
									<span>得分</span>
								</li>
								<li :class="{active:flag1 == i}" v-for="(v,i) in listdata"  @click="detail(v.studentId,i)">
									<span>{{i+1}}</span>
									<span>{{v.key}}</span>
									<span>{{v.time}}</span>
									<span>{{v.score}}</span>
								</li>
							</div>
							<div v-show="isShow2">
								<li class="rank">
									<span>排名</span>
									<span>题号</span>
									<span>用时</span>
									<span>得分</span>
								</li>
								<li :class="{active:flag == i}" v-for="(v,i) in listdata1"  @click="More(v.dailyId,i)">
									<span>{{i+1}}</span>
									<span>{{v.key}}</span>
									<span>{{v.time}}</span>
									<span>{{v.score}}</span>
								</li>
							</div>
						</ul>
					</div>
					<div id="list_cont" class="fl_left">
						<!-- <p>单元---单元标题</p> -->
						<!--按学生查看-->
						<div class="findlist " v-show="isShow1">
							<div class="word_part">
								<p><i></i>{{sname}}</p>
								<ul v-if="initword.length" class="cl">
									<p>单词</p>
									<div class="el-col el-col-8" v-for="(val,i) in initword">
										<div class="grid-content bg-purple" v-for="v in val">
												<span>{{i+1}}. </span>
												<span>{{v.content}}</span> 
												<span>&emsp;{{v.score}}分</span> 
												<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)">
												<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)">
										</div>
									</div>
								</ul>
								<ul v-if="inittext.length" class="cl">
									<p>句子</p>
									<div class="el-col el-col-10" v-for="(val,i) in inittext">
										<div class="grid-content bg-purple" v-for="v in val">
												<span>{{i+1}}. </span>
												<span>{{v.content}}</span> 
												<span>&emsp;{{v.score}}分</span> 
												<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)">
												<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)">
										</div>
									</div>
								</ul>
								<ul v-if="initplay.length" class="cl">
									<p>对话</p>
										<div class="el-col el-col-24" v-for="(val,i) in initplay">
											<div class="grid-content bg-purple" v-for="v in val">
													<span>{{i+1}} .</span>
													<span>{{v.content}}</span>
													<span>&emsp;{{v.score}}分</span>
													<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)">
													<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)">
											</div>
										</div>
								</ul>
								<ul v-if="initread.length" class="cl">
									<p>课文</p>
									<div class="el-col el-col-24" v-for="(val,i) in initread">
										<div class="grid-content bg-purple" v-for="v in val">
												<span>{{i+1}} .</span>
												<span>{{v.content}}</span>
												<span>&emsp;{{v.score}}分</span>
												<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)"/>
												<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)"/>
										</div>
									</div>
								</ul>
								<ul v-if="initspell.length" class="cl">
									<p>听写</p>
									<div class="el-col el-col-8" v-for="(val,i) in initspell">
										<div class="grid-content bg-purple" v-for="v in val">
												<span>{{i+1}} .</span>
												<span>{{v.content}}</span>
												<span>&emsp;<b>答案:</b>{{v.answer}}</span>
												<span>&emsp;{{v.score}}分</span>
												<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)"/>
												<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)"/>
										</div>
									</div>
								</ul>
							</div>
						</div>
						<!--按题查看-->
						<div class="findlist" v-show="isShow2">
							<div class="word_part cl" v-for="val in students">
								<p><i></i>{{val.name}}</p>
								<div class="el-col el-col-24" v-for="v in val.test">
									<div class="grid-content bg-purple single" v-for="v in val">
											<span>{{v.content}}</span>
											<span>&emsp;{{v.score}}分</span>
											<img src="../../assets/images/sound.png" alt="标准音频" width="25px" @click="goplay(v.question)"/>
											<img src="../../assets/images/bofang.png" alt="播放" width="25px" @click="goplaymy(v.answer)"/>
									</div>
								</div>
							</div>
						</div>
					<div>
							<!-- <audio :src="srcUrl" controls id="audios" v-show="false"></audio> -->
							
							<audio width="" height="" controls autoplay name="media" id="audios" v-show="false">
								<source :src="srcUrl" type="audio/mpeg">
							</audio>
							
						</div>
					</div>
				</div>
			</div>
	 	</div>
 	</div>
</template>

<script>
	// import CountContainer from './CountContainer.vue'  
    export default {
    	name: "Count",
        // components: {CountContainer}  
		data(){
			return{
				isShow1:true,
				isShow2:false,
				index:1,
				flag:-1,
				flag1:-1,
				hmId:0,
				listdata:[],    //获取左边列表数据
				listdata1:[],    //获取左边列表数据 ---按题
				sID:'',   	    //获取学生ID
				sname:'',		//设置默认学生名字
				initword:[],    //设置右边默认第一个学生的数据   --单词
				inittext:[],	//句子
				initplay:[],    //对话or角色扮演
				initread:[],    //课文
				initspell:[],   //听写
				initallsound:[],  //获取所有录音
				alldata:[],     //获取右边的内容
				students:'',
				sort0:true,     //默认降序排列
				sort1:false,    //升序排列
				srcbase:'https://data.caidouenglish.com',
				srcUrl:'',
				audio:{},
				audiomy:{},
				isplay:false,
				baseurl:'http://192.168.0.25/singsound/homework/statistics/',
				player:null,
				userId:'',
				fkSchoolId:null
			}
		},
		mounted() {
			this.hmId = this.$route.query.hid
			this.userId = this.$route.query.userId 
			this.fkSchoolId = this.$route.query.fkSchoolId
			this.player = document.getElementById("audios")
			var that = this
			this.$ajax.post(this.baseurl+'sort.do',{
				"homeworkId":this.hmId,
				"userId":this.userId,
				"schoolId":this.fkSchoolId,
				"type":0,
				"sort":0}).then(function(res){
				that.listdata = res.data.data
				that.sID = res.data.data[0].studentId
				that.sname = res.data.data[0].key
				console.log(res.data.data)
			})			
		},
		methods:{
			//播放我的音频
			goplaymy(url){
				this.audiomy = new Audio();
				this.audiomy.src = url
				this.audiomy.play();
				// this.audio.pause();
			},
			// 播放标准
			goplay(url){
				this.audio = new Audio();
				this.audio.src =this.srcbase+url
				this.audio.play();
				this.audiomy.pause();
			},
			goback(){
				this.$router.push({
					path:'/ListenandSpeak',
					query:{
						"userId":this.userId,
						"fkSchoolId":this.fkSchoolId
					}
				})
			},
			showCon(num){
				// 点击显示按学生排序列表
				if(num == 1){
					this.index = 1
					this.isShow1 = true
					this.isShow2 = false
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":0,
						"sort":0}).then(function(res){
							that.listdata = res.data.data
							console.log("按学生",that.listdata)
					})
					
				}else{
					this.index = 2
					this.isShow2 = true
					this.isShow1 = false
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":1,
						"sort":0}).then(function(res){
							that.listdata1 = res.data.data
							console.log("按题号",that.listdata1)
					})
				}
			},
			// 按学生查看---点击学生获取右边数据
			detail(sid,i){
				this.flag1 = i
				var that = this
				this.$ajax.post(this.baseurl+'detail.do',{
					"homeworkId":this.hmId,
					"userId":this.userId,
					"schoolId":this.fkSchoolId,
					"type":0,
					"studentId":sid}).then(function(res){
						console.log(res.data.data)
						that.initword = res.data.data.word
						that.inittext = res.data.data.text
						that.initplay = res.data.data.roleplay
						that.initread = res.data.data.read
						that.initspell = res.data.data.dictation
						that.initallsound = res.data.data.studentsVoice
				})
			},
			// 按题目查看---点击题目获取右边数据
			More(tid,i){
				this.flag = i
				var that = this
				this.$ajax.post(this.baseurl+'detail.do',{
					"homeworkId":this.hmId,
					"userId":this.userId,
					"schoolId":this.fkSchoolId,
					"type":1,
					"dailyId":tid}).then(function(res){
						console.log(res.data.data.userTest)
						that.students = res.data.data.userTest
				})
			},
			// 降序
			reduce(){
				this.sort0 = true
				this.sort1 = false
				//按学生
				if(this.index == 1){
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":0,
						"sort":0}).then(function(res){
							that.listdata = res.data.data
							console.log("按学生",that.listdata)
					})
				//按题目
				}else{
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":1,
						"sort":0}).then(function(res){
							that.listdata = res.data.data
							console.log("题目降序",that.listdata)
					})
				}
			},
			// 升序
			increase(){
				this.sort0 = false
				this.sort1 = true
				if(this.index == 1){
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":0,
						"sort":1}).then(function(res){
							that.listdata = res.data.data
					})
				//按题目
				}else{
					var that = this
					this.$ajax.post(this.baseurl+'sort.do',{
						"homeworkId":this.hmId,
						"userId":this.userId,
						"schoolId":this.fkSchoolId,
						"type":1,
						"sort":1}).then(function(res){
							that.listdata = res.data.data
							console.log("题目升序",that.listdata)
					})
				}
			},
			// 跟读连播
			autoplay(){
				this.isplay = !this.isplay
				if(this.isplay){
					this.lianxugendu(this.initallsound,0)
				}else{
					console.log("取消跟读播放")
				}		
			},
			lianxugendu(arr,num){
				  this.srcUrl = arr[num]
					console.log(this.srcUrl)
					// if(num == 0){
						this.player.src = this.srcUrl;
						this.player.play();
					// }
// 					console.log(arr.length)
// 					if(num > arr.length) return;
					// console.log(num)
					if(num < arr.length){						  						
							this.player.addEventListener('ended',()=>{
								// console.log(this.player.ended)
								// if(this.player.ended == true){
									console.log(this.player.playing)
									num ++
									// console.log(this.player.ended)
									this.lianxugendu(arr,num)
								// }	
						})
				  }				  
			}
		}
  }
</script>

<style scoped>
	a{
		text-decoration: none;
		cursor: pointer;
	}
	.hd-heard {
	    width: 100%;
	}
	.hd-heard-cont {
	    width: 1256px;
	    margin: 0 auto;
	    height: 60px;
	}
	.hd-heard-cont .hd-logo {
	    /*padding-left: 30px;*/
	    font-size: 20px;
	    /* background: url(../images/home/school.png) no-repeat center left; */
	}
	.hd-heard-cont span {
     height: 60px; 
     line-height: 60px; 
}
	.hd-heard-cont .hd-heard-nav a {
	    padding: 0 20px; 
	    font-size: 14px;
	    color: #333;
	}
	.hd-switch-nav {
	    width: 100%;
	    height: 50px;
	    background-color: #55C3B1;
	    z-index: 99;
	    display: none;
    }
    .switch-nav-list {
	    width: 100%;
	    display: none;
	}
	.switch-nav-cont {
	    width: 1256px;
	    margin: 0 auto;
	}
	.switch-nav-list a {
		display: block;
		float: left;
	    width: 155px;
	    height: 50px;
	    text-align: center;
	    line-height: 50px;
	    font-size: 16px;
	    color: #fff;
	}
	.switch-nav-list a.act {
	    background-color: #4BAC9C;
	}
	#speech_cont{
		display: table;
	    position: relative;
	    /* height: 760px; */
	    min-height: 760px;
	    width: 1256px;
	    margin: 0 auto;
	    margin-top: 16px;
	}
	/* 内容样式 */
	#count_box{
		background-color: #fff;
		border: 1px solid #eee;
		color: #727272;
		min-height: 700px;
	}
	.nav_func{
		text-align: right;
		line-height: 34px;
		padding: 10px;
	}
	.nav_func span:nth-child(2){
		background-color: #55C3B1;
		padding:4px 20px;
		border-radius: 4px;
		color: #fff;
		margin-left: 20px;
		color: #fff;
		cursor: default;
	}
	/*左边列表*/
	#list_ranking{
		width: 230px;
		margin-left: 20px;	
	}
	#list_ranking ul{
		border-top-left-radius:20px ;
		border-top-right-radius:20px ;
		border: 1px solid #55C3B1;
	}
	#list_ranking p{
		text-align: center;
		margin-bottom: 10px;
		cursor: default;
	}
	#list_ranking p span{
		display: inline-block;
		border: 1px solid #727272;
		width: 8px;
		height: 8px;
		border-radius: 5px;
		
	}
	#list_ranking p span.act{
		background-color: #55C3B1;
		border-color:#55C3B1 ;
	}
	#list_ranking ul li{
		line-height: 30px;
		font-size: 12px;
		cursor: default;
	}
	#list_ranking ul li:hover{
		background-color: #55C3B1;
		color: #fff;
	}
	#list_ranking ul li span{
		display: inline-block;
		width: 50px;
		text-align: center;
		text-overflow: ellipsis;
    white-space: nowrap;
	}
	#list_ranking .list_title{
		text-align: center;
		background-color:#55C3B1 ;
		color: #fff;
		font-size: 14px;
		border-top-left-radius:14px ;
		border-top-right-radius:14px ;
		cursor: default;
	}
	#list_ranking .list_title b{
		cursor: pointer;
	}
	#list_ranking ul .rank{
		border-bottom: 1px solid #ccc;
		
	}
	#list_ranking ul .rank:hover{
		background-color:#fff;	
		color: #727272;
	}
	/*右边内容*/
	#list_cont{
		width: 940px;
		margin-left: 45px;
	}
	#list_cont>p{
		font-size: 30px;
		text-align: center;
		margin-bottom: 28px;
	}
	#list_cont .word_part p i{
		display: inline-block;
		width: 3px;
		height: 18px;
		border-radius: 1.5px;
		background-color:#55C3B1;
		margin-right: 8px;
		vertical-align: middle;
	}
	#list_cont .word_part ul{
		padding: 10px 54px;
	}
	#list_cont .word_part ul li{
		line-height: 48px;
	}
	#list_cont .word_part ul>p{
		font-size: 16px;
		font-weight: bold;
		color: #4BAC9C;
		margin-bottom: 10px;
	}
	#list_cont .word_part .grid-content img{
		vertical-align: middle;
		cursor: pointer;
	}
	#list_cont .smart_ls{
		display: flex;
		justify-content: space-between;
	}
	#list_cont .word_part .single img{
		vertical-align: middle;
		cursor: pointer;
	}
	.single{
		padding: 20px;
	}
	/*点击样式*/
	.active{
		background-color:#B5E5DD ;
	}	
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		  margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.el-col{
    border-radius: 4px;
	}
	.el-col-8{
			width: 33.33333%;
	}
	.el-col-10{
			width: 41.66667%;
	}
	.el-col-24{
			width: 100%;
	}
	[class*=el-col-]{
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}
	.cl:after{
		content:"";
		display: block;
		height: 0;
		width: 0;
		clear: both;
	}
</style>