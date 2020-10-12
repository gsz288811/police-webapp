<template>
	<div id="personal">
		<mt-header title="我">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>
		<div class="p_head">
			<!-- <img src="../assets/images/mipmap-xhdpi/jx_defaultAvatar.png" width="56px" height="52px"/> -->
			<img :src="imgurl" width="56px" height="60px"/>
			<ul>
				<li>{{accountName}}</li>
				<li>民警</li>
			</ul>
		</div>
		<div class="setting">
			<div @click="godayoff()">
				<img src="../assets/images/mipmap-xhdpi/jx_personage_application.png" width="35px" height="40px"/>
				请假申请
			</div>
			<div @click="gograde()">
				<img src="../assets/images/mipmap-xhdpi/jx_personage_scoreInquiry.png" width="35px" height="40px"/>
				成绩查询
			</div>
			<div @click="goques()">
				<img src="../assets/images/mipmap-xhdpi/jx_personage_survey.png" width="35px" height="40px"/>
				问卷调查
			</div>
			<div @click="gotrain()">
				<img src="../assets/images/mipmap-xhdpi/jx_personage_application2.png" width="35px" height="40px"/>
				培训申请
			</div>
			<!-- <div>
				<img src="../assets/images/mipmap-xhdpi/jx_personage_changepassword.png" width="35px" height="40px"/>
				密码修改
			</div> -->
		</div>
		<ul>
			<TabBar :mynum="num"></TabBar>
		</ul>
		
	</div>
</template>

<script>
	import TabBar from '../components/TabBar.vue'
	export default{
		name:"Personal",
		components: {TabBar},
		data(){
			return{
				userId:null,
				accountName:null,
				imgurl:null,
				num:4
			}
		},
		mounted(){
			// this.userId = this.$route.query.userId			
			// 再取出本地的数据
			this.userId = sessionStorage.getItem('userId');
			this.imgurl = sessionStorage.getItem('imgurl');
			this.accountName = sessionStorage.getItem('acName');			
		},
		methods:{
			godayoff(){
				this.$router.push({
					path:'/Dayoff',
					query:{
						userId:this.userId
					}
				})
			},
			gograde(){
				this.$router.push({
					path:'/Scorequery',
					query:{
						userId:this.userId
					}
				})
			},
			goques(){
				this.$router.push({
					path:'/QuestionInvest',
					query:{
						userId:this.userId
					}
				})
			},
			gotrain(){
				this.$router.push({
					path:'/TrainApplication',
					query:{
						userId:this.userId
					}
				})
			},
			anzuocallExit(){
				if(typeof(test) != "undefined"){
					test.callExit();
				}
			}
		}
	}
</script>

<style scoped>
	#personal{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#personal>div{
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding: 2%;
		margin:0 auto;
	}
	#personal .p_head{
		display: flex;
		justify-content: space-around;
		margin-top: 5%;
		background-color: #fff;
	}
	#personal .p_head img{
		border: 1px solid #ccc;
		border-radius:8px
	}
	#personal .p_head ul li{
		line-height: 28px;
	}
	#personal .p_head ul li:nth-child(2){
		color: #aaa;
	}
	#personal .mint-header{
		background-color:#4E7FFF;
		height: 60px;
	}
	#personal .p_head ul{
		width: 75%;
	}
	#personal .setting{
		margin-top: 5%;
		padding:0 5%;
		background-color: #fff;
	}
	#personal .setting div{
		margin-top: 2%;
		padding-bottom: 2%;
		border-bottom: 1px solid #ccc;
	}
	#personal .setting div:last-child{
		border-bottom: none;
	}
	#personal .setting img{
		vertical-align: middle;
	}
</style>