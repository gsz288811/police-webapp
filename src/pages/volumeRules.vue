<template>
	<div id="volumeRules">
		<!-- 头部 -->
		<mt-header title="微课程">
			<div slot="left">
				<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>

		<!-- 中间内容 -->
		<div class="center_cont" id="center_cont">
			<!-- 已选章节 -->
			<div class="selectChapter">
				<div class="chapterTitle">
					<span class="chapterNum">已选章节：<b></b></span>
					<span class="chapterOption">
						<!-- <a href="javascript:;" @click="selectChapter()">选择章节</a> -->
						<a href="javascript:;" @click="open = !open">选择章节</a>
						<span class="line">|</span>
						<a href="javascript:;" class="emptyList" @click="emptylist()">清空</a>
					</span>
				</div>
				<div class="chapterCont" id="chapterCont">
					<span class="chapterList" v-for="item in resultList">{{item.name}}<a href="javascript:;" class="delete" @click="deleteZj(item)">×</a></span>
				</div>
			</div>
			<!-- 规则设置 -->
			<div class="rulesSet">
				<div class="rulesTitle">规则设置：</div>
				<div class="rulesSetCont">
					<dl>
						<dt>题型：</dt>
						<!-- <dd class="ddActive">选择题</dd>
						<dd>填空题</dd> -->
						<dd v-for="(questionType,index) in questionTypes" :class="{'ddActive':istrue==index}" @click="istrue=index">{{questionType.type}}</dd>
					</dl>
					<dl>
						<dt>难度：</dt>
						<!-- <dd class="ddActive">普通</dd>
						<dd>中等</dd>
						<dd>困难</dd> -->
						<dd v-for="(diffcultType,index) in diffcultTypes" :class="{'ddActive':isdiffcult==index}" @click="isdiffcult=index">{{diffcultType.type}}</dd>
					</dl>
					<dl>
						<dt>题量：</dt>
						<dd class="ddOpt" @click="add_tl()">+</dd>
						<dd><input type="text" class="iptNum" v-model="amount" id="iptNum"></dd>
						<dd class="ddOpt" @click="min_tl()">-</dd>
					</dl>
					<div class="optionBtn" @click="createRules()">创建规则</div>
				</div>
			</div>
			<!-- 添加规则 -->
			<div class="addRules">
				<div class="rulesTitle">添加规则：</div>
				<div class="addRulesCont" id="addRulesCont">
					<!-- <p v-for="item in [1,2,3,4]"><b>1.</b><span></span><span></span><span>题</span><a href="javascript:;" class="deleteList" @click="deletelist($event)"><img src="../assets/images/mipmap-xhdpi/jx_del2_icon.png" alt=""></a></p> -->
					<p v-for="(v,k) in addRulesContList"><b>{{k+1}}.</b><span>{{v.topic}}</span><span>{{v.difficulty}}</span><span>{{v.amount}}题</span><a
						 href="javascript:;" class="deleteList" @click="deletelist(k)"><img src="../assets/images/mipmap-xhdpi/jx_del2_icon.png"
							 alt=""></a></p>
				</div>
				<div class="optionBtn" @click="beginExercise()">开始练习</div>
			</div>
		</div>



		<!-- 选择章节页面 -->
		<mu-container>
			<mu-drawer :open.sync="open" :docked="true" :right="position === 'right'">

				<!-- 树 -->
				<div class="treeBox">
					<div class="treeTitle">
						<select name="" id="" v-model="dirtreeId" @change="getTree">
							<option :value="v.dirtreeId" v-for="v in jcList" >{{v.courseDirtreeName}}</option>
							<!-- <option value="1">2222</option> -->
						</select>
					</div>
					<div style='width:100%;' v-if='ztreeDataSourceList.length>0'>
						<vueztree :list.sync='ztreeDataSourceList' :func='nodeClick' :is-open='true' :is-check='true'></vueztree>
					</div>
					<span v-if="ztreeDataSourceList.length==0">该教材没有章节</span>
				</div>
				<a href="javascript:;" @click="open = false" button class="closeBtn">关闭</a>
			
				<!-- <mu-list>
					<mu-list-item @click="open = false" button>
						<mu-list-item-title>关闭</mu-list-item-title>
					</mu-list-item>
				</mu-list> -->
			</mu-drawer>
		</mu-container>


	</div>
</template>

<script>
	import {Toast} from 'mint-ui';
	import vueztree from '../components/vue-ztree.vue';
	import { Indicator } from 'mint-ui';  //加载
	export default {
		components: {
			vueztree
		},
		data() {
			return {
				// 获取题型
				istrue: 0,
				questionTypes: [{
						type: '选择题',
						name:'choice'
					},
					{
						type: '简答题',
						name:'subject'
					},
				],

				// 获取难度
				isdiffcult: 0,
				diffcultTypes: [{
						type: '普通',
						ty:1,
						name:'Easy'
					},
					{
						type: '中等',
						ty:2,
						name:'Cencon'
					},
					{
						type: '困难',
						ty:3,
						name:'Hard'
					},
				],

				// 展示树列表的抽屉导航
				docked: false,
				open: false,
				position: 'left',


				userId: '',
				addRulesContList: [],
				amount: 10,

				// 树的数据
				treeDeepCopy: [],
				resultList: [],
				jcList:[],
				dirtreeId:'',
				

				ztreeDataSourceList: [
					
				],



			};
		},
		methods: {
			// 返回方法
			goback() {
				this.$router.push({
					path: '/Studyonline',
					query: {
						userId:this.userId,
						num:2
					}
				})
			},
			// 清空方法
			emptylist() {
				document.getElementById("chapterCont").remove();
			},
			// 删除方法
			deletelist(inx) {
				this.addRulesContList.splice(inx, 1);
				// obj.currentTarget.parentElement.remove();
			},
			// 题量添加方法
			add_tl() {
				var iptValue = this.amount;
				iptValue++;
				if (iptValue > 20) {
					iptValue = 20;
					Toast('最多可选20道题')
				}
				this.amount = iptValue
			},
			// 题量减少方法
			min_tl() {
				var iptValue = this.amount;
				iptValue--;
				if (iptValue < 1) {
					iptValue = 1
				}
				this.amount = iptValue
			},
			// 创建规则方法 --添加元素
			createRules() {
				// 添加规则提示
				if(this.resultList.length==0){
					return Toast('请先添加章节！');
				}
				let question = this.questionTypes[this.istrue];
				let diffcult = this.diffcultTypes[this.isdiffcult];
				let propertyName=question.name+diffcult.name;
				let topic=question.type;
				let difficulty=diffcult.type;
				
				console.log(propertyName)
				this.addRulesContList.push({
					topic: topic,
					difficulty: difficulty,
					amount: this.amount,
					propertyName:propertyName
				})
				
			},
			// 开始练习（保存规则的数据及跳转页面）
			beginExercise() {
						// 开始练习提示
						let length =this.addRulesContList.length;
						console.log(length)
						if(length == 0){
							return Toast('请先添加规则！')
						}
				
				let beginTime = new Date().getTime();
				// 保存规则
				this.userId = this.$route.query.userId;
				this.fkCoursedirtreeId = this.$route.query.fkCoursedirtreeId;
				// this.ruleId = this.$route.query.ruleId
				
				
				// 获取章节id
				let zjId = this.resultList;
				let dirtreeId=[];
				for(let i in zjId){
					 dirtreeId.push(zjId[i].id);
				}
				dirtreeId=dirtreeId.join(',')
			
		
		
		
				let data={
					fkDirtreeIds:dirtreeId,   //章节树的id
					// ruleId:this.ruleId,
					fkCoursedirtreeId: this.fkCoursedirtreeId,
					fkStudentId: this.userId,
					type: 2
				};
				
				for (let i in this.addRulesContList){
					let propertyName=this.addRulesContList[i].propertyName;
					let testNum=this.addRulesContList[i].amount;
					 switch (propertyName){
						case 'choiceEasy':
							data.choiceEasyNumb = testNum;
							break;
						case 'choiceCencon':
							data.choiceCenconNumb = testNum;
							break;
						case 'choiceHard':
							data.choiceHardNumb = testNum;
							break;
						case 'subjectEasy':
							data.subjectEasyNumb = testNum;
							break;
						case 'subjectCencon':
							data.subjectCenconNumb = testNum;
							break;
						case 'subjectHard':
							data.subjectHardNumb = testNum;
							break;
					}
				
				}
	
				
				let config = {
					headers:{
						'Content-Type':"application/json;charset=utf-8"
					}
				}
				this.$ajax.post('/wlxy/onlinefreepracticerule/saveOrUpdate.action',
					data,config).then((res)=>{
					// console.log(res.data.data)
					
						this.$router.push({
							path: '/onlineExercise',
							query: {
								ruleId:res.data.data,
								userId: this.userId,
								beginTime: beginTime,
								fkCoursedirtreeId:this.fkCoursedirtreeId
							}
						})
						
					}).catch((err) =>{
					// console.log(err)
					Toast("系统错误，请联系管理员！")
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
			// 点击节点
			nodeClick: function (m, parent, trees) {
				this.ztreeDataSourceList = trees;
				this.getData(trees);
			},
			// 删除节点
			deleteZj(m) {
				let recurFunction = (data, list) => {
					data.forEach((i) => {
						if (i.id == list.id) {
							i.ckbool = false;
						}
						if (i.children) {
							recurFunction(i.children, list);
						}
					});
				};
				recurFunction(this.ztreeDataSourceList, m);
				this.getData(this.ztreeDataSourceList);
			},
			// 点击展开收起
			expandClick: function(m) {
				console.log(JSON.parse(JSON.stringify(m)));
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
					// console.log(res)
					let data = JSON.stringify(res.data.data.childs).replace(/childs/g, "children");
					let datas=JSON.parse(data)
					
					let recurFunc = (data, list) => {
						data.forEach((i) => {
							if (i) {
								i.ckbool=false;
							}
							if (i.children) {
								recurFunc(i.children, i);
							}
						})
					};
					recurFunc(datas, datas);
					
					this.ztreeDataSourceList =datas;
			
					
				
				}).catch((err) =>{
					// console.log(err)
					Toast("系统错误，请联系管理员！")
				})
			}
		},
		// 页面加载时执行
		mounted() {
			Indicator.open('加载中...');
			this.courseDirtreeId = this.$route.query.fkCoursedirtreeId
			// 加载教材的接口
			this.$ajax.post('/wlxy/syscoursedirtree/findAllSysCourseDirtree.action', this.$qs.stringify({
					courseDirtreeId:this.courseDirtreeId,
				}
			
			)).then((res) => {
				Indicator.close();
				this.jcList = res.data.data;
				this.getTree();//调用章节数据
				
			}).catch((err) =>{
					// console.log(err)
					Indicator.close();
					Toast("系统错误，请联系管理员！")
				})
			
				
			
			
			



		}
	}
</script>

<style scoped="scoped">
	#volumeRules {
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

	/*-------------------------- 中间样式 -------------------*/
	.center_cont {
		padding: 0.5rem;
	}

	/* 已选章节样式 */
	.selectChapter {
		border: 1px solid #DCDCDC;
		margin-bottom: 1rem;
	}

	.chapterTitle {
		height: 2rem;
		line-height: 2rem;
		background-color: #EEEEEE;
		display: flex;
		justify-content: left;
		border-bottom: 1px solid #DCDCDC;
	}

	.chapterNum {
		margin: 0 8rem 0 1rem;
	}

	.chapterOption a {
		color: #F4A01C;
	}

	.chapterOption .line {
		display: inline-block;
		margin: 0 0.5rem;
		color: #F4A01C;
	}

	.chapterCont {
		height: auto;
		background-color: #fff;
		padding: 0.5rem 0;
	}

	.chapterList {
		display: inline-block;
		padding: 0.3rem 0.6rem;
		border: 1px solid #DCDCDC;
		background-color: #F8F8F8;
		border-radius: 4px;
		font-size: 0.8rem;
		margin: 0.5rem;
	}

	.chapterList .delete {
		display: inline-block;
		margin-left: 0.4rem;
		color: #F4A01C;
	}

	/* 规则设置样式 */
	.rulesSet {
		padding: 0.5rem;
		border: 1px solid #DCDCDC;
		margin-bottom: 1rem;
	}

	.rulesTitle {
		color: #666;
		margin-bottom: 0.5rem;
	}

	.rulesSetCont dl {
		display: flex;
		justify-content: flet;
		color: #333;
		margin-bottom: 0.8rem;
	}

	.rulesSetCont dd {
		margin: 0 1rem;
		font-size: 0.9rem;
	}

	.ddActive {
		color: #F4A01C;
	}

	.iptNum {
		width: 3rem;
		height: 1.5rem;
		border: 1px solid #ddd;
		text-align: center;
		color: #666666;
	}

	.ddOpt {
		font-size: 1.2rem;
		color: #F4A01C;
	}

	.optionBtn {
		width: 5rem;
		height: 2rem;
		line-height: 2rem;
		color: #fff;
		background-color: #4E7FFF;
		text-align: center;
		border-radius: 0.2rem;
		margin-bottom: 1rem;

	}

	/* 添加规则样式*/
	.addRules {
		padding: 0.5rem;
		border: 1px solid #DCDCDC;
		margin-bottom: 1rem;
	}

	.addRulesCont {}

	.addRulesCont p {
		border-bottom: 1px dashed #ddd;
		padding-bottom: 0.3rem;
		margin-bottom: 0.8rem;
		font-size: 0.9rem
	}

	.addRulesCont span {
		display: inline-block;
		margin: 0 0.5rem;
	}

	.deleteList {
		float: right;
	}

	.deleteList img {
		vertical-align: middle;
	}

/* ------------------------树样式------------------------------ */

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
	margin: 0 6rem;
	padding: 0.3rem 0.8rem;
	background-color:#4E7FFF ;
	color: #fff;
	border-radius: 4px;
}
</style>
