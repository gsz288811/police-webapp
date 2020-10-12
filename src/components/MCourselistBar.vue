<template>
	<div id="Mcourselist">
		<mt-header title="微课程">
				<div slot="left">
				<mt-button @click="goback()" icon="back"></mt-button>
				</div>
		</mt-header>
		<div class="resource_cont">
			<router-view></router-view>
		</div>
		<div class="bottom_nav">
			<router-link to='/Resource'>
				<span  :class="{tab_act:shows==1}" @click="show(1)">
					☰&nbsp;资源
				</span> 
			</router-link>
			<router-link to='/Studyprogress'>
				<span  :class="{tab_act:shows==2}" @click="show(2)">
					☰&nbsp;学习进度
				</span>
			</router-link>
			<router-link to='/QAonline'>
				<span  :class="{tab_act:shows==3}" @click="show(3)">
					☰&nbsp;在线答疑
				</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { Header } from 'mint-ui';
	import Vue from 'vue';
	Vue.component(Header.name, Header);
	export default {
    	name: "Courselist",
    	data(){
    		return{
					shows:1,
					mynum:'',
					loginid:'',
					flag:true
    		}
    	},
			mounted(){
				this.mynum = this.$route.query.num
				// this.$router.push('/Resource')
				this.show(this.mynum)
			},
    	methods:{
    		goback(){	
						this.$router.push({  
							path: '/MasterCourse', 
							query: {   
								num:1
							}  
						})			
    		},
    		show(num){
    			this.shows = num;
    		}
    	}
   }
</script>

<style scoped="scoped">
	#Mcourselist{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#Mcourselist .mint-header{
		background-color:#4E7FFF;;
		height: 60px!important;
	}
	#Mcourselist .bottom_nav{
		display:flex;
		justify-content: center;
		margin-top: 10%;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color:#fff;
	}
	#Mcourselist .bottom_nav a{
		border: 1px solid #ccc;	
		width: 100%;
		height: 36px;
		text-align: center;
		color: #2C345B;
		font-size: 14px;
		line-height: 36px;
	}
	#Mcourselist .bottom_nav a span{
		width: 100%;
		height: inherit;
		display: inline-block;
	}
	.tab_act{
		color: #4E7FFF !important;
	}
	#Mcourselist .bottom_nav a:nth-child(1),
	#Mcourselist .bottom_nav a:nth-child(2),
	#Mcourselist .bottom_nav a:nth-child(3){
		border-right: none;
	}
	#Mcourselist .bottom_nav a:nth-child(1){
		border-left: none;
	}
</style>