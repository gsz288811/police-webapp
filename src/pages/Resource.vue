<template>
	<div id="resource">
		<!-- title -->
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="resource_title">
			<div class="title_list1">
				<p class="course" style="font-size: 1rem;">课程：<span>{{courseName}}</span></p>
				<p style="color: #F4A01C;" @click="open = !open">切换章节</p>
			</div>
			<!-- <p class="chapter">章节：<span class="zhangjieBtn" @click="selectChapterMessage()">第一章 交通学>1.1 交通指挥手势</span></p> -->
		</div>
		<!-- 课件列表 -->
		<div class="resource_content" ref="wrapper">
			<div class="content_list">
				<div class="coursewareAndVedio">
					<p class="kj_title"><img src="../assets/images/mipmap-xhdpi/jx_navArrow.png" alt="">课件</p>
					<div class="listBox" v-for="v in coursewareList" v-if="coursewareList.length" @click="pdfView(v.browserUrl)">
						<div class="list_pic">
							<img src="../assets/images/mipmap-xhdpi/doc.png" alt="">
						</div>
						<div class="list_cont">
								<p class="cont_title">{{v.resourceName}}</p>
								<p class="cont_center">
									<span><img src="../assets/images/mipmap-xhdpi/jx_time_icon.png" alt="time" width="14px">时间：{{v.createTime}}</span>
									<span><img src="../assets/images/mipmap-xhdpi/down.png" alt="">下载{{v.downNum}}次</span>
								</p>
								<p>
									<span>上传者：{{v.createTeacherName}}</span>
									<span>学分：{{v.score}}分</span>
								</p>
						</div>
					</div>
					<div class="imgbox" v-if="!coursewareList.length">
						<img src="../assets/images/nodata.png" />
						<p>暂时没有课件...</p>
					</div>
				</div>									
				 <!-- 课件（接口对接后） -->
				<div class="coursewareAndVedio">
					<p class="kj_title"><img src="../assets/images/mipmap-xhdpi/jx_navArrow.png" alt="">视频</p>
					<div class="listBox" v-for="(v,i) in videoList" :key='i'  @click="goplay(v.browserUrl)" v-if="videoList.length">
						<div class="list_pic">
							<img src="../assets/images/mipmap-xhdpi/mp4.png" alt="">
						</div>
						<div class="list_cont">
								<p class="cont_title">{{v.resourceName}}</p>
								<p class="cont_center">
									<span><img src="../assets/images/mipmap-xhdpi/jx_time_icon.png" alt="" width="14px">时间：{{v.createTime}}</span>
									<span><img src="../assets/images/mipmap-xhdpi/down.png" alt="">下载{{v.downNum}}次</span>
								</p>
								<p>
									<span>上传者：{{v.createTeacherName}}</span>
									<span>学分：{{v.score}}分</span>
								</p>
						</div>						
					</div>
					<video :src="videourl" controls v-show="isPlay" class="video"></video>
					<div v-show="isPlay" id="shadow" @click="goclose"></div>
					<div class="imgbox" v-if="!videoList.length">
						<img src="../assets/images/nodata.png" />
						<p>暂时没有视频...</p>
					</div>
				</div>
			</div>
		</div>
		<!-- <div v-show="isPlay" id="shadow" @click="goclose"></div> -->
		<CourselistBar></CourselistBar>
		<!-- 选择章节页面 -->
		<mu-container>
			<mu-drawer :open.sync="open" :docked="true" :right="position === 'right'">	
				<!-- 树 -->
				<div class="treeBox">
					<div class="treeTitle">
						<select name="" id="" v-model="dirtreeId" @change="getTree">
							<option :value="v.dirtreeId" v-for="v in jcList" >{{v.courseDirtreeName}}</option>							
						</select>
					</div>
					<div style='width:100%;'>
						<ul>
							<div v-for="(item,i) in unitdata">
								<p @click="showToggle(item,i,item.data.id)" class="list_title" :class="{Green_active:index == i}">{{item.data.name}}</p>
								<ul v-show="item.flag">
									<li v-for="(subItem,j) in item.data.childs" class="list_item" @click="getSource(i,j,subItem.id)" :class="{active_item:indexItem == i+'-'+j}">
										{{subItem.name}}
									</li>
								</ul>
							</div>
						</ul>
					</div>
					<p v-if="unitdata.length==0" id="infor_warn">该教材没有章节</p>
				</div>
				<a href="javascript:;" @click="open = false" button class="closeBtn">关闭</a>
			</mu-drawer>
		</mu-container>
		<!-- pdf -->
		<PdfPreview :url="passURL"></PdfPreview>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import { Header } from 'mint-ui';
import CourselistBar from '../components/CourselistBar.vue'
import vueztree from '../components/vue-ztree.vue';
import PdfPreview from '../components/PdfPreview.vue'
export default{
	name:"Resource",
	components: {CourselistBar,vueztree,PdfPreview},
	data(){
			return{
				unitdata:[],
				coursewareList:[],
				videoList:[],
				userId:'',
				mynum:'',
				loginid:'',
				videourl:null,
				isPlay:false,
				courseName:null,
				// 展示树列表的抽屉导航
				docked: false,
				open: false,
				position: 'left',
				addRulesContList: [],
				amount: 10,
				index:0,
				indexItem:-1,
				// 树的数据
				treeDeepCopy: [],
				resultList: [],
				jcList:[],
				dirtreeId:'',				
				ztreeDataSourceList: [
					
				],
				passURL:'http://127.0.0.1/file/999/resource/2019-03-18/f6c6cb22-5916-4195-bb37-95597c28f1ec.pdf',
			}
		},		
		// 页面加载时执行
		mounted() {
			console.log(this)
			this.userId = this.$route.query.userId
			this.mynum = this.$route.query.num
			this.loginid = sessionStorage.getItem('loginid');
			this.courseDirtreeId = this.$route.query.fkCoursedirtreeId
			// 加载教材的接口
			this.$ajax.post('/wlxy/syscoursedirtree/findAllSysCourseDirtree.action', this.$qs.stringify({
					courseDirtreeId:this.courseDirtreeId,
				}
			
			)).then((res) => {
				this.jcList = res.data.data;
				// console.log("需要的",this.jcList)
				this.courseName = res.data.data[0].courseDirtreeName;
				this.getTree();//调用章节数据
				
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
			pdfView(url){
				this.passURL = url
				// console.log(url)
				// window.location.href = url
			},
			// 树的方法
			showToggle:function(item,i,id){
				item.flag = !item.flag
				this.index = i
				this.indexItem = -1
				this.nodeClick(id)
			},
			goplay(url){
				console.log(11111111)
				this.videourl = url
				this.isPlay = true
			},
			// 关闭蒙层
			goclose(){
				this.isPlay = false
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
// 			beforeRouteLeave (to, from , next) {
// 			  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
// 			  if (answer) {
// 				next()
// 			  } else {
// 				next(false)//可以通过在这里写逻辑来处理用户点了物理返回之后的操作
// 				this.goback
// 			  }
// 			}
			// 选择资源
			getSource(i,j,id){
				this.indexItem = i+'-'+j
				this.index = -1
				this.nodeClick(id)
			},
			//选择章节获取资源
			nodeClick(id){
				this.coursewareList = []
				this.videoList = []
				this.$ajax.post('/wlxy/onLineResourceStudy/findResourceDocument.action',this.$qs.stringify(
				{
					studentId:this.userId,
					dirtreeId:id,
					showCount:12,
					currentPage:0
				})).then((res)=>{
					if(res.data.success != 0){
						this.coursewareList =res.data.data.coursewareList
						this.coursewareList = Array.from(new Set(this.coursewareList))
						this.videoList = res.data.data.videoList											 
						this.videoList = Array.from(new Set(this.videoList))			
					}			
				})
			},
			// 数据更新
			getData(trees) {
				let datas = [];
				let recurFunc = (data, list) => {
					data.forEach((i) => {
						if (i.ckbool) {
							datas.push({
								name: i.name,
								ckbool: true,
								id: i.id
							})
						}
						if (i.children) {
							recurFunc(i.children, i);
						}
					})
				};
				recurFunc(trees, trees);
				this.resultList = datas;
			},			
			// 获取树的章节和教材数据
			getTree(){
				if(!this.dirtreeId) {
					this.dirtreeId=this.jcList[0].dirtreeId;//默认选中第一个
				};		
				this.userId = this.$route.query.userId;
				this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId;
				// 加载章节的接口
				this.$ajax.post('/wlxy/resourcemanage/loadTreeJson.action', this.$qs.stringify({
						root_dirtreeId:this.dirtreeId,
						position: 1,
						fkTeacherId: this.userId,
						fkCourseDirtreeId: this.fkCoursedirtreeId
					}
				
				)).then((res) => {
					console.log(res)
					this.unitdata = []
					res.data.data.childs.forEach((o,i)=>{
						var _j = {
							"flag":false,
							data:o
						}
						this.unitdata.push(_j)
						this.nodeClick(this.unitdata[0].data.id)
						console.log("获取111",this.unitdata)
					})
					return		
				}).catch((err) =>{
					console.log(err)
				})
			},			
		}		
	}
</script>

<style scoped="scoped">
#resource{
	background-color: #F7F7F7;
	overflow-y: scroll;
}
/* title样式 */
.resource_title{
	margin-top:3%;
}
.resource_title .title_list1{
	display: flex;
    justify-content: space-between;
}
.resource_title p{
	padding: 0.5rem 1rem;
	font-size: 1rem;
}
.resource_title .course{
	font-weight: 400;
}
#resource .resource_content{
	position:absolute;
	top: 6.4rem;
	bottom: 2rem;
	overflow: hidden;
	width: 100%;
}
#resource .content_list{
	/* height: 700px;
	margin-bottom: 20px; */
	min-height: 700px;
}
/* 课件列表样式 */
.coursewareAndVedio .kj_title{
	padding: 0.5rem 1rem;
}
.coursewareAndVedio .kj_title img{
	font-size: 0.24rem;
	margin-right: 0.5rem;
	vertical-align: middle;
}
.listBox{
	display: flex;
	justify-content: left;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
	padding: 0.5rem 0;
	background-color: #fff;
	margin-bottom: 0.5rem;
}
.cont_title{
	font-size: 1rem;
}
.listBox .list_pic{
	padding: 1.2rem;
	vertical-align: middle;
}

.listBox .list_cont span{
	display: inline-block;
	margin-right: 1.5rem;
	color: #999;
	font-size: 0.7rem;
}
.listBox .list_cont img{
	vertical-align: middle;
	margin-right: 0.5rem;
}
.cont_center{
	margin: 0.4rem 0;
}
#shadow{
	background-color: #000;
	opacity: 0.6;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	z-index: 222;
}
.video{
	background-color: #000;
	width: 100%;
	height: 300px;
	z-index: 999;
	position: absolute;
	top: 40%;
    left: 50%;
    margin-top: -150px; /*height的一半*/
    margin-left: -50%; /*width的一半*/
}
/* ------------------------树样式------------------------------ */
.list_title{
	line-height: 2.4rem;
    font-size: 14px;
    padding-left:4%;	
}
.Green_active{
	padding-left:6px;
	border-left: 4px solid #4e7fff;
	background-color:#DDF3EF;
}
.active_item{
	background-color:#DDF3EF;
}
.list_item{
	line-height: 2rem;
    font-size: 14px;
    padding-left: 8%;
}
.treeTitle select{
	width: 100%;
	height: 3.1rem;
	line-height: 3.1rem;
	background-color: #4E7FFF;
	color: #fff;
	border-color: #4E7FFF;
}

.closeBtn{
	display: inline-block;
	margin: 2rem 6rem;
	padding: 0.3rem 0.8rem;
	background-color:#4E7FFF ;
	color: #fff;
	border-radius: 4px;
}
/* 页面提示图片 */
.imgbox{
	padding: 10%;
	padding-left: 36%;
}
.imgbox img{
	width: 6rem;
}
.imgbox p{
	color: #999;
}
/* pdf */
canvas {
  display: block;
  border-bottom: 1px solid black;
}
</style>