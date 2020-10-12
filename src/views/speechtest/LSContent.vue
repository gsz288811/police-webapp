<template>
	<div class="lscontainer">
	    <div class="center-cont">
	        <div class="center-cont-div">
	            <div class="piyue-nav cl">
	                <!-- <p class="piyue-nav-btn cl" id="ls-status"> -->
	                <span class="fl" style="margin-top: 11px; margin-left: 10px; font-size: 16px;color: #666;">教材：</span>
							<div class="select-div tree-select-div fl" id="select-div-publisher">
								<div  @click="showlist()">
									<span id="publishers-select-name" v-if="!currentbook.length">全部教材</span>
									<span id="publishers-select-name" v-if="currentbook.length">{{currentbook}}</span>
									<a class="books-select-btn"> ▼ </a>
								</div>
								<ul class="textbook-select books-ul-select scrollTypeDiv" id="publishers-select" v-show="flag">
									<li @click="chooseAll" :class="{act:acts==-1}">全部教材</li>
									<li v-for="(v,i) in coures" :class="{act:acts==i}" :key="i" @click="choosebook(v.courseId,v.courseName,i)">{{v.courseName}}</li>
								</ul>
							</div>
	                <!-- </p> -->
	            </div>
	
	            <div class="piyue-class" style="position: relative;">
	                <div class="topic_name cl">
	                    <p class="ec_title">班级：</p>
	                    <p class="ec_type2" id="ls-teachclass">
							<a :class="{ec_activeGreen:index==i}" v-for="(v,i) in classroom" @click="chooseClass(i,v.teachclassId,v.teachclassName)">{{v.teachclassName}}</a>
						</p>
	                </div>
	                <a class="addbtn" @click="goTowork()">布置作业</a>
	            </div>
				<!-- 作业布置情况 -->
	            <div class="piyue-list-cont" id="keqian-list-cont" @scroll="loading && scrollEvent($event)">
	                <div class="piyueList" id="piyueList" v-for="(v,i) in assInfor"  :key="i">
	                    <div class="time-title-list" id="time-title-list">
	                    	<div class="time-title" style="height:132px;">
	                    		<p>{{v.publishTime}}</p><b></b><i></i>
	                    	</div>
	                    </div>				 
	                    <div class="piyueList-cont" id="piyueList-cont">
	                    	<div class="piyueList-div" data-id="37025">
	                    		<div class="piyue-state state-not-piyue">已批阅</div>
	                    		<div class="piyue-exp">
	                    			<p class="piyue-exp-name" style="width: 290px;" onclick="forwardDetailJsp(37025,'2018-12-18 17:57:44');">{{v.homeworkName}}</p>
	                    			<p class="piyue-exp-timeLimit" style="width: 290px;">截止时间：{{v.endTime}}</p>
	                    			<p class="piyue-exp-btn" style="width: 290px;">
	                    				<a type="0" data-id="37025" data-publishtime="2018-12-18 17:57:44" @click="gocount(v.homeworkId,v.subStudentNum)">统计</a>
	                    			</p>
	                    		</div>
	                    		<div class="piyue-chart" style="width: 570px;">
	                    			<div class="chartG piyue-chart-guankan" :id="'myCirles'+i">
	                    				
	                    			</div> 
	                    			
	                    			<div class="chartG piyue-chart-pigai" type="readcount" :id="'Cirles'+i"></div>
	                    		</div>
	                    		<div class="piyue-exp-moreBtn" style="display: none;bottom:0;"></div>
	                    	</div>
	                    </div>
	                </div>
					<div class="notData-tips" id="notData-tips" style="display: none;text-align: center;" v-show="!ishas">
					    没有更多的数据了！
					 </div>
	                <div class="data-tips" id="data-tips" v-show="assInfor.length===0" style="display: none;text-align:center;line-height:40px;"> 
	                    好像没有数据哦！
	                </div>
	            </div>
	        </div>
		</div>
		<!-- <div id="myCirle">
			
		</div> -->
	</div>
</template>
<!-- <script src="../../assets/js/raphael.js" type="text/javascript"></script> -->
<!-- <script src="../../assets/js/justgage(1).js" type="text/javascript"></script> -->
<script>
	import JustGage from '../../assets/js/justgage(1).js'
	import '../../assets/js/raphael.js'	
	// circle.refresh(50)
	// console.log(JustGage)
    export default {
    	name: "LSContent",
			data(){
				return{
					EVENT_DATA_FLOW : "ajax_data_pulled",
					CURRENT_PAGE_INDEX : 1,
					LOCK_STATUS : false,
					loading: true,
					bill_list: [],
					// 
					coures:[],
					assInfor:[],
					classroom:[],
					// initbook:'',
					currentbook:'',
					flag:false,
					index:0,
					acts:-1,
					cid:0,
					tid:0,
					allpages:0,         //总页数 
					nextpage:0,
					ishas:true,
					// initpage:1,			 
					userId:'',
					fkSchoolId:null,
					postUrl:'http://192.168.0.25/singsound/homework/getHomeworkList.do'
				}
			},
			methods:{
			//获取数据函数
            scrollHandler : function (e){
                //如果已经在加载数据，不可以重复加载
                if (this.LOCK_STATUS) return;
              
				var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
				//变量windowHeight是可视区的高度
		   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		   		//变量scrollHeight是滚动条的总高度
   					var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
				//距离底部10px时，开始加载数据
				// console.log(scrollTop+windowHeight,scrollHeight,this.ishas)
				if ((scrollTop+windowHeight ) == scrollHeight){
					this.LOCK_STATUS = true;
					if(this.ishas){
					this.$ajax.post(this.postUrl, {
					   'userId':this.userId, 
					   "schoolId": this.fkSchoolId,
					   "currentPage":this.nextpage   //nextpage
					}, {loading:'加载中...'}).then( (res) => {
					    //调用拼接数据事件
						this.nextpage = res.data.data.nextPage
						console.log('请求之后',this.nextpage)
					    this.$emit(this.EVENT_DATA_FLOW,{
					        assInfor : res.data.data.assignmentTeacherInfos,
					        total_page : res.data.data.hasNextPage
					    });				
					    ++this.CURRENT_PAGE_INDEX;
						console.log("a",this.CURRENT_PAGE_INDEX)
					    this.LOCK_STATUS = false;
					}).catch (() => {
					    this.LOCK_STATUS = false;
					});}
				}         
            },
            //滚动时对滚动事件进行节流
            scrollEvent: function (e) {
                this.throttled(this.scrollHandler(e), 300)
            },
            //节流
            throttled:  function (func, wait, options) {
                var self = this;
                var timeout, context, args, result
                var previous = 0
                if (!options) options = {}

                var later = function () {
                      previous = options.leading === false ? 0 : self.now()
                      timeout = null
                      result = func.apply(context, args)
                      if (!timeout) context = args = null
                }

                 var throttled = function () {
                    var now = self.now()
                    if (!previous && options.leading === false) previous = now
                    var remaining = wait - (now - previous)
                    context = this
                    args = arguments
                    if (remaining <= 0 || remaining > wait) {
                         if (timeout) {
                            clearTimeout(timeout)
                            timeout = null
                        }
                        previous = now
                        result = func.apply(context, args)
                        if (!timeout) context = args = null
                    } else if (!timeout && options.trailing !== false) {
                        timeout = setTimeout(later, remaining)
                    }
                    return result;
                }

                throttled.cancel = function () {
                    clearTimeout(timeout)
                    previous = 0
                    timeout = context = args = null
                }

                return throttled;
            },
            now: function () {
                return new Date().getTime();
            },
            //初始化监听事件
            initPage(){
                this.$on(this.EVENT_DATA_FLOW, (e) => {
                    if(e.total_page == false){
                      //如果等于最后一页，就停止滚动
                        this.ishas = false;
                    }
                    if (e.assInfor instanceof Array) {
                        //将现有页面的数据和接口返回的数据相加
                        this.assInfor = this.assInfor.concat(e.assInfor);
						console.log("拼接之后",this.assInfor)
						this.$nextTick(() => {
								for(let i in this.assInfor){
									var circle = new JustGage({
										id:"myCirles"+i,
										min:0,
										max:this.assInfor[i].totalStudentNum,
										labelFontColor:"#999",
										levelColors :["#F3D349"],
										label:"提交",
										gaugeWidthScale:0.5,
										valueMinFontSize:24
									});	
									circle.refresh(this.assInfor[i].subStudentNum)
									var circle1 = new JustGage({
										id:"Cirles"+i,
										min:0,
										max:this.assInfor[i].totalStudentNum,
										label: "批阅",
										labelFontColor:"#999",
										levelColors :["#33BAAC"],
										gaugeWidthScale:0.5,
										valueMinFontSize:24
									});	
									circle1.refresh(this.assInfor[i].subStudentNum)
								}															
						});	
                        return;
                    }
                });
            },
    		goTowork(){
    			this.$router.push({
						path:'/Speechhead',
						query:{
							"userId":this.userId,
							"fkSchoolId":this.fkSchoolId
						}
					})
    		},
    		gocount(hid,finishNum){
				if(finishNum == 0){
					alert("还没有人提交作业")
				}else{
					this.$router.push({
						path: '/Count', 
						query: {   
							hid:hid,
							userId:this.userId,
							fkSchoolId:this.fkSchoolId
						} 
					})
				}
    			
    		},
			//选择班级	
			chooseClass(i,tid){
				this.tid = tid
				this.index = i
				var that = this
				this.$ajax.post(this.postUrl,{'userId':this.userId, "schoolId": this.fkSchoolId,"teachclassId":tid
				}).then(function(res){
					// console.log(res)
					that.coures = res.data.data.courses
					that.assInfor = res.data.data.assignmentTeacherInfos
					// that.showcount = res.data.data.total
					
				})
			},
			showlist(){
				this.flag = !this.flag
			},
			// 选择所有的教材
			chooseAll(){
				this.acts = -1
				this.$ajax.post(this.postUrl,{'userId':this.userId, "schoolId": this.fkSchoolId
				}).then((res)=>{
					this.initbook = "全部教材"
					this.assInfor = res.data.data.assignmentTeacherInfos
					this.flag = false
				})
			},
			// 选择教材
			choosebook(id,name,i){
				this.cid = id
				this.currentbook = name
				this.flag = false
				this.acts = i
				var that = this
				this.$ajax.post(this.postUrl,{'userId':this.userId, "schoolId": this.fkSchoolId,"courseId":id
				}).then(function(res){
					console.log(res)
					that.assInfor = res.data.data.assignmentTeacherInfos
					that.classroom = res.data.data.teachclasses
					// that.showcount = res.data.data.total
				})
			},
			//获取参数 
			GetQueryString(key){			
				var url = document.location.toString();
				var arrObj = url.split("?");
			　　　　if (arrObj.length > 1) {
			　　　　　　var arrPara = arrObj[1].split("&");
			　　　　　　var arr;
		
			　　　　　　for (var i = 0; i < arrPara.length; i++) {
			　　　　　　　　arr = arrPara[i].split("=");
							
			　　　　　　　　if (arr != null && arr[0] == key) {
			　　　　　　　　　　return arr[1];
			　　　　　　　　}
			　　　　　　}
			　　　　　　return "";
			　　　　}
			　　　　else {
			　　　　　　return "";
			　　　　}
			}
		},
		created() {
			 console.log("justgaga",JustGage)
			 console.log("ra",Raphael)
// 			var circle = new JustGage({
// 				id:"myCirles1",
// 				min:0,
// 				max:100
// 			});	
// 			circle.refresh(50)			  
		},
		mounted(){
			this.userId = this.GetQueryString("userId")
			this.fkSchoolId = this.GetQueryString("fkSchoolId")
			// 接受参数
			this.userId = this.$route.query.userId 
			this.fkSchoolId = this.$route.query.fkSchoolId
			var that = this
			var str = ''
			this.$ajax.post(this.postUrl,{'userId':this.userId, "schoolId": this.fkSchoolId
			}).then(function(res){
				console.log(res)
				that.coures = res.data.data.courses
				that.initbook = res.data.data.courses[0].courseName
				that.assInfor = res.data.data.assignmentTeacherInfos
				that.classroom = res.data.data.teachclasses
				that.nextpage = res.data.data.nextPage
				that.ishas = res.data.data.hasNextPage
				that.$nextTick(() => {
					for(let i in that.assInfor){
						var circle = new JustGage({
							id:"myCirles"+i,
							min:0,
							max:that.assInfor[i].totalStudentNum,
							label: "提交",
							labelFontColor:"#999",
							levelColors :["#F3D349"],
							gaugeWidthScale:0.5,
							valueMinFontSize:24
						});	
						circle.refresh(that.assInfor[i].subStudentNum)
						var circle1 = new JustGage({
							id:"Cirles"+i,
							min:0,
							max:that.assInfor[i].totalStudentNum,
							label: "批阅",
							labelFontColor:"#999",
							levelColors :["#33BAAC"],
							gaugeWidthScale:0.5,
							valueMinFontSize:24
						});	
						circle1.refresh(that.assInfor[i].subStudentNum)
					}															
				});											
			})
			// 分页
			this.initPage();
// 			this.scrollHandler();
			window.addEventListener('scroll', this.scrollHandler, true)
		}
  }
</script>
<style scoped>
	.cl:after{
		content:"";
		width:0;
		height: 0;
		display: block;
		clear: both;
	}
	.fl{
		float: left;
	}
	#ls-archive{
	    width: 148px;
	    height: 28px;
	    border: solid 1px #55C3B1;
	    line-height: 28px;
	    text-align: center;
	    border-radius: 8px;
	}
	#ls-status{
		padding: 10px;
		font-size: 16px;
	}
	select {
	    outline: none;
	}
	.center-cont-div {
	    width: 1238px;
	    height: auto;
	    /* min-height: 798px; */
	    border: 1px solid #f3f3f3;
	    background-color: #fff;
	    border-radius: 5px;
	}
	.piyue-nav {
	    width: 100%;
	    height: 40px;
	    border-bottom: solid 1px #f3f3f3;
	}
	.piyue-class {
	    width: 100%;
	    height: auto;
	    padding: 5px 0;
	    border-bottom: solid 1px #f3f3f3;
	}
	p.ec_title {
	    line-height: 26px;
	    height: 30px;
	    font-size: 16px;
	    padding: 0 10px;
	    color: #666;
	}
	p.ec_type, p.ec_type2 {
	    width: auto;
	    line-height: 22px;
	    height: auto;
	    max-width: 85%;
	}
	.topic_name p {
	    float: left;
	}
	.topic_name p a {
	    display: block;
	    float: left;
	    margin-right: 6px;
	    margin-bottom: 8px;
	    padding: 2px 10px;
	    font-size: 14px;
	    color: #666;
	    cursor: pointer;
	}
	.topic_name p a.ec_activeGreen {
	    background-color: #55C3B1;
	    color: #fff;
	    border-radius: 10px;
	}
	.addbtn {
	    position: absolute;
	    color: #fff;
	    top: 5px;
	    right: 18px;
	    width: 80px;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    color: white;
	    background: #00be6d;
	    border-radius: 5px;
	    text-decoration: none;
	    cursor: pointer;
	}
	.cl:after{
		content: "";
		display: block;
		width: 0;
		height: 0;
		clear: both;
	}
	/*内容部分*/
	.piyue-list-cont {
	    width: 100%;
	    height: auto;
	    padding-bottom: 20px;
	    overflow: hidden;
	    overflow-y: auto;
	}
	.piyueList {
	    float: left;
	    width: 100%;
	    height: auto;
	}
	.time-title-list {
	    width: 185px;
	    height: auto;
	    float: left;
	}
	.piyueList .time-title {
	    position: relative;
	    width: 185px;
	    float: left;
	    overflow: hidden;
	}
	/*左边列表样式*/
	.piyueList .time-title p {
	    width: 80%;
	    text-align: center;
	    padding-top: 10px;
	    font-size: 16px;
	}
	.piyueList .time-title b {
	    width: 16px;
	    height: 16px;
	    background-color: #55C3B1;
	    border-radius: 50%;
	    top: 10px;
	}
	.piyueList .time-title i {
	    width: 1px;
	    height: 100%;
	    top: 16px;
	    right: 8px;
	    background: -webkit-linear-gradient(top, rgba(77, 195, 105, 0.9), rgba(155, 155, 155, 0.3));
	}
	.piyueList .time-title b, .piyueList .time-title i {
	    display: block;
	    position: absolute;
	    right: 0;
	}
	/*右边部分*/
	.piyueList-cont {
	    width: 1000px;
	    float: right;
	    margin-right: 20px;
	}
	.piyueList-cont .piyueList-div {
	    position: relative;
	    width: 1000px;
	    height: 120px;
	    margin: 10px 0;
	    border: solid 1px #f3f3f3;
	    border-radius: 5px;
	    overflow: hidden;
	}
	div.piyue-state {
	    width: 80px;
	    height: 80px;
	    margin: 20px;
	    border-radius: 50%;
	    line-height: 80px;
	    text-align: center;
	}
	.state-not-piyue {
	    background-color: #EE7420;
	    color: #fff;
	}
	.piyueList-div>div {
	    float: left;
	}
	.piyue-exp>p.piyue-exp-name {
	    font-size: 16px;
	    line-height: 40px;
	    height: 30px;
	    overflow: hidden;
	}
	.piyue-exp-timeLimit {
	    color: #999;
	    font-size: 14px;
	}
	.piyue-exp-btn a {
	    display: inline-block;
	    color: #55C3B1;
	    font-size: 14px;
	    margin: 0 30px 0 0;
	    font-weight: 600;
	    cursor: pointer;
	}
	.piyue-exp>p.piyue-exp-timeLimit {
	    line-height: 30px;
	    height: 24px;
	}
	.piyue-exp>p {
	    width: 450px;
	    height: 40px;
	    line-height: 40px;
	}
	.piyue-chart {
	    height: 100%;
	}
	.piyue-chart>div {
	    width: 175px!important;
	}
	.piyue-chart>div {
	    float: left;
	    width: 180px;
	    height: 120px;
	    margin: -15px 0 0 15px;
	}
	.piyueList .time-title i {
	    width: 1px;
	    height: 100%;
	    top: 16px;
	    right: 8px;
	    background: -webkit-linear-gradient(top, rgba(77, 195, 105, 0.9), rgba(155, 155, 155, 0.3));
	}
	/*  */
	div.select-div{
		position: relative;
		margin-left: 10px;
		width: 150px;
		height: 24px;
		color: #000;
		border: 1px solid #ececec;
		border-radius: 4px;
		font-size: 12px;
		top: 8px;
	}
	.books-select-btn{
		margin-left: 8px;
		display: inline-block;
		margin-top: 4px;
		cursor: pointer;
	}
	.textbook-select{
		position: absolute;
		width: 150px;
		max-height: 240px;
		top: 25px;
		left: -1px;
		background-color: #fff;
		border: 1px solid #ececec;
		border-top: none;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		overflow: hidden;
		overflow-y: auto;
		z-index: 999;
	}
	.textbook-select li{
		padding: 5px 5px;
		border-bottom: solid 1px #ececec;
		cursor: pointer;
	}
	.textbook-select li:hover{
		background-color: #55C3B1;
		color: #fff;
	}
	.textbook-select li.act{
		background-color: #55C3B1;
		color: #fff;
	}
	#publishers-select-name{
		margin-left: 5px;
		color: #666;
		width: 110px;
		display: inline-block;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		height: 14px;
	}
	/* 分页 */
	.page { 
  font-weight: 900; 
  height: 40px; 
  text-align: center; 
  color: #888; 
  margin: 20px auto 0; 
  background: #f2f2f2; 
} 
 
.pagelist { 
  font-size: 0; 
  background: #fff; 
  height: 50px; 
  line-height: 50px; 
} 
 
.pagelist span { 
  font-size: 14px; 
} 
 
.pagelist .jump { 
  border: 1px solid #ccc; 
  padding: 5px 8px; 
  -webkit-border-radius: 4px; 
  -moz-border-radius: 4px; 
  border-radius: 4px; 
  cursor: pointer; 
  margin-left: 5px; 
} 
 
.pagelist .bgprimary { 
  cursor: default; 
  color: #fff; 
	background: #55C3B1;
  border-color: #55C3B1; 
} 
 
.jumpinp input { 
  width: 55px; 
  height: 26px; 
  font-size: 13px; 
  border: 1px solid #ccc; 
  -webkit-border-radius: 4px; 
  -moz-border-radius: 4px; 
  border-radius: 4px; 
  text-align: center; 
} 
 
.ellipsis { 
  padding: 0px 8px; 
} 
 
.jumppoint { 
  margin-left: 30px; 
} 
 
.pagelist .gobtn {} 
 
.bgprimary { 
  cursor: default; 
  color: #fff; 
  background: #337ab7; 
  border-color: #337ab7; 
}
</style>