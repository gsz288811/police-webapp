<template>
	<div id="personal">
		<mt-header title="我">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>
		<div class="p_head">
			<img src="../../assets/images/mipmap-xhdpi/jx_defaultAvatar.png" width="56px" height="52px"/>
			<ul>
				<li>刘国梁</li>
				<li>教官</li>
			</ul>
		</div>
		<div class="setting">
			<!-- <div @click="gograde()">
				<img src="../../assets/images/mipmap-xhdpi/jx_personage_scoreInquiry.png" width="35px" height="40px"/>
				课堂查询
			</div> -->
			<div @click="goques()">
				<img src="../../assets/images/mipmap-xhdpi/jx_personage_survey.png" width="35px" height="40px"/>
				问卷调查
			</div>
			<!-- <div>
				<img src="../../assets/images/mipmap-xhdpi/jx_personage_changepassword.png" width="35px" height="40px"/>
				密码修改
			</div> -->
		</div>
		<ul>
			<MsTabBar :mynum="num"></MsTabBar>
		</ul>
	</div>
</template>

<script>
	import MsTabBar from '../../components/MsTabBar.vue'
	export default{
		name:"Personal",
		components: {MsTabBar},
		data(){
			return{
				num:4,
			}
		},
		methods:{
			gograde(){
				this.$router.push('/Scorequery')
			},
			goques(){
				this.$router.push({
					path:'/QuestionInvest',
					query:{
						haslogin:0
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
		padding:0 5px 10px;
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