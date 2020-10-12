<template>
  <div id="tabbar"> 	
		<mt-tabbar>
			<!-- 民警 -->
			<router-link :to="{path:'/MicroCourse',query:{'userId':userId}}">
				<div class="bar" @click="showpic(1)">
					<img src="../assets/images/wcourse_pre.png" v-show="showImg1">
					<img src="../assets/images/wcourse.png" v-show="!showImg1">
					<p>微课程</p>	 
				</div>  
			</router-link>
			<!-- 民警 -->
			<a @click="anzhuocallClassRoom(0)">
				<div class="bar" @click="showpic(2)">
				  <img src="../assets/images/classroom_pre.png" v-show="showImg2">
				  <img src="../assets/images/classroom.png" v-show="!showImg2">
					<p>课堂</p> 
				</div>
			</a>
			<!-- 民警 -->
			<router-link :to="{path:'/Exam',query:{'userId':userId}}">
				<div class="bar"  @click="showpic(3)">
					  <img src="../assets/images/enam_pre.png" v-show="showImg3">
					  <img src="../assets/images/enam.png" v-show="!showImg3">
					   <p>考试</p> 
				</div>    
			</router-link>
			<!-- 民警 -->
			<router-link :to="{path:'/Personal',query:{'userId':userId}}">
				<div class="bar" @click="showpic(4)">
					<img src="../assets/images/personage_pre.png" v-show="showImg4">
					<img src="../assets/images/personage.png" v-show="!showImg4">
					<p>我的</p> 
				</div>    
			</router-link>
		</mt-tabbar>	
  </div>
</template>
 
<script>
	export default {
	  name: 'TabBar',
	  props:{
		mynum: Number,
		required: true,
	  },
		data(){
			return{
				showImg1:true,
				showImg2:false,
				showImg3:false,
				showImg4:false,
				loginid:'',
				haslogin:'',  //登录后
				userId:'',
				userType:'',
				accountName:'',
				password:'',
			}
		},
		mounted:function(){
			// 用于安卓调用
			window.getNum = this.getNum
			// 判断登录的的用户
			this.loginid = this.$route.query.loginid
			this.userType = this.$route.query.userType		
			this.password = this.$route.query.password
			// 第一次登入存入图片，以及保存全局信息
			var userId = this.$route.query.userId
			var imgurl = this.$route.query.imgurl
			var accountName = this.$route.query.accountName
			if(sessionStorage.length == 0){
			    sessionStorage.setItem('imgurl',imgurl);
				sessionStorage.setItem('acName',accountName);
				sessionStorage.setItem('userId',userId);
				sessionStorage.setItem('loginid',this.loginid);
			}
			this.userId = sessionStorage.getItem('userId');
			// 对应图标
			this.showpic(this.mynum)
		},
	  methods:{
	  	showpic(i){
				if(i == 1){
					this.showImg1=true
					this.showImg2=false
					this.showImg3=false
					this.showImg4=false
				}else if(i == 2){
					this.showImg1=false
					this.showImg2=true
					this.showImg3=false
					this.showImg4=false
					
				}else if(i == 3){
					this.showImg1=false
					this.showImg2=false
					this.showImg3=true
					this.showImg4=false
				}else(
					this.showImg1=false,
					this.showImg2=false,
					this.showImg3=false,
					this.showImg4=true
				)
	  	},
		anzhuocallClassRoom(num){
			
			var obj = {
				'type':this.userType,
				'studentId':this.userId,
				'studentAccount':this.studentAccount,
				'pwdStudent':this.pwdStudent
			}
			if(typeof(test) != "undefined"){
				test.callClassRoom(JSON.stringify(obj));
			}	
		},
		// 安卓返回后进入的界面
		getNum(num,loginid,userId){
			this.mynum = num
			this.showpic(this.mynum)
			if(loginid == '1'){
				this.flag = true
				this.$router.push({
					path:'/Personal',
					query:{
						userId:userId
					}
				})
			}else if(loginid == '0'){
				this.flag = false
				this.$router.push({
					path:'/MasterPersonal',
					query:{
						userId:userId
					}
				})
			}
		}
	  }
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mint-tabbar{
		justify-content: center;
		position: fixed;
	}
	#tabbar .bar{
		width: 100%;
		margin: 0 auto;
		margin-top: 6%;
		margin-bottom: 6%;
		font-size: 0.8rem;
	}
	#tabbar .bar img{
		text-align: center;
		width: 1.8rem;
		height: 1.6rem;
	}
	#tabbar a{
		color: #000 !important;
		width: 25%;
	}
</style>
