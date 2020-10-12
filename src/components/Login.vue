<template>
	<div id="login">
		<div class="head">
			<p>四川公安网络学院</p>
			<div>
				<img src="../assets/images/mipmap-xhdpi/jx_defaultAvatar.png" alt="" width="90px">
			</div>
		</div>
		<div class="loginbox">
			<form action="">
				<!-- <mt-radio
				  v-model="value"
				  :options="options">
				</mt-radio> -->
				<div class="select-control-group">
					<mu-flex class="select-control-row" :key="i" v-for="(v,i) in options">
					  <mu-radio v-model="value" :value="i" :label="v.label" name="juese"></mu-radio>
					</mu-flex>
				</div>
				<div><input type="text" value="" placeholder="请输入用户名" v-model="username"/></div>
				<div><input type="password" value="" placeholder="请输入密码" v-model="pwd"/></div>
				<div><button type="button" @click="gologin">登录</button></div>
			</form>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data() {
			return {
				username:'',
				pwd:'',
				options : [
					{
					label: '教官',
					values: '0'
					},
					{
					label: '民警',
					values: '1'
					}				
				],
				value: 1,
				// loginid:''
				userType:1
			};
		},
		methods:{
			gologin(){
				this.$ajax.post('/wlxy/appclientremote/loginAppNewRemote.action',this.$qs.stringify(
					{
					"accountName":this.username,
					"password":this.pwd,
					"userType":this.value
					}
					)).then((res)=>{
						console.log(res)
						// return false
						if(res.data.error == "请输入用户名.."){
							MessageBox('提示', '请输入正确用户名');
						}else if(res.data.error == "用户名或密码错误.."){
							MessageBox('提示', '密码错误');
						}else if(res.data.error =="用户不具备该角色!"){
							MessageBox('提示',res.data.error);
						}else{
							// var loginid = res.data.data.userType
							var userId = res.data.data.userId
							var imgurl = res.data.data.imageUrl
							console.log(this.value)
							if(this.value == 1){
								this.$router.push({
									path: '/Personal', 
									query: {   
										loginid:this.value,
										userId:userId,
										userType:this.value,
										accountName:this.username,
										password:this.pwd,
										imgurl:imgurl
									} 
								})
							}else{
								this.$router.push({
									path: '/MasterPersonal', 
									query: {   
										loginid:this.value,
										userId:userId,
										userType:this.value,
										accountName:this.username,
										password:this.pwd,
										imgurl:imgurl
									} 
								})
							}							
						}						
				})		
			}
		}
	}
</script>

<style>
	#login{
		background: linear-gradient(#4E7FFF, #7858E0); 
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#login .head{
		padding: 4rem 4rem 3rem 4rem;;
	}
	#login .head p{
		text-align: center;
		color: #fff;
		font-size: 1.6rem;
	}
	#login .head div{
		display: flex;
		justify-content: center;
		align-items: center;  
		width: 100%;
		margin-top: 2rem;
	}
	#login .loginbox{
		width:100%;
		display: flex;
		justify-content: center;
	}
	#login .loginbox div input{
		width: 15rem;
		height: 2.5rem;
		border-radius: 1.5rem;
		outline: none;
		border: 1px solid #fff;
		background-color: rgba(255,255,255,0.5);
		padding-left: 1rem;
		color: #fff;
	}
	#login .loginbox div{
		margin-bottom: 1rem;
	}
	#login .loginbox div.select-control-group{
		margin-bottom: -0.5rem;
	}
	#login .loginbox div button{
		width: 15rem;
		height: 2.5rem;
		border-radius: 1.5rem;
		outline: none;
		border: 1px solid #fff;
		background-color: rgba(255,255,255,0.8);
		color:rgb(119,89,225);
		font-size: 1rem;
	}
	#login .loginbox div input::-webkit-input-placeholder{
		color:#fff
	}

	#login .align-items-start{
		float: left;
		margin-right: 1rem;
	}
	#login .mint-radiolist:after{
		content: "";
		width: 0;
		display: block;
		clear: both;
	}
	#login .mu-radio-label{
		color: rgba(255,255,255,0.8);
	}
	#login .select-control-group{
		display: flex;
		justify-content: center;
	}
	#login .select-control-group:after{
		content: "";
		width: 0;
		display: block;
		clear: both;
	}
</style>
