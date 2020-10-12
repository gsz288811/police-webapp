<template>
	<div id="score_query">
		<mt-header title="成绩查询" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<mt-search
		  cancel-text="取消"
		  placeholder="成绩查询">
		</mt-search>
		<div ref="wrapper" id="wrapper">
			<div class="content score_list">
				<div>
					<ul v-for="(v,i) in testdata" :key="i" v-if="testdata.length">
						<li>
							<p>{{v.examName}}</p>
							<p> <span class="gray">考试时间：</span> {{v.examTime}}</p>
						</li>
						<li class="sq_marking">
							<span>{{v.achievement}}分</span>
						</li>
					</ul>
					<div id="imgbox" v-if="!testdata.length">
						<img src="../assets/images/nodata.png" />
						<p>暂无数据</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				userId:null,
				testdata:[]
			};
		},
		methods:{
			goback(){
				this.$router.go(-1)
// 				this.$router.push({  
// 					path: '/Personal', 
// 					query: {   
// 						num:4,
// 						userId:this.userId
// 					}  
// 				})
			}	
		},
		mounted(){		
			this.userId = this.$route.query.userId
			console.log(this.userId)
			this.$ajax.post('/wlxy/examresult/getAchievementListRemote.action',this.$qs.stringify({
				userId:this.userId
			})).then((res)=>{
				this.testdata = res.data.data
			})
		},
		created() {
			this.$nextTick(function(){
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						click:true
					})
					console.log(this.scroll)
				}		
			})
		}
	}
</script>

<style scoped="scoped">
	.gray{
		color: #999999;
	}
	#score_query{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	.mint-search{
		height: auto;
	}
	.score_list ul{
		display: flex;
		justify-content: space-between;
		padding: 4%;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		margin-top: 0.8rem;
	}
	.score_list ul li:first-child p{
		line-height: 1.8rem;
	}
	.score_list ul .sq_marking span{
		display: inline-block;
		width: 3.4rem;
		height: 3.4rem;
		border-radius: 50%;
		text-align: center;
		line-height: 3.4rem;
		border: 1px solid #ccc;
		color: #4E7FFF;
	}
	#wrapper{
		position:absolute;
		top: 6.2rem;
		/* bottom: 2.4rem; */
		overflow: hidden;
		width: 100%;
		height: 90%;
	}
	#score_query .content{
		min-height: 900px;
	}
	#imgbox{
		padding: 5rem;		
	}
	#imgbox p{
		color: #999;
		text-align: center;
	}
</style>
