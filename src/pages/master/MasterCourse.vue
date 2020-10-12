<template>
	<div id="MC_nav">
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>
		<div class="MC_list" id="MC_list1">
			<div @click="gomore()">
				<div class="list_pic" >
					<img src="../../assets/images/book.png"/>
				</div>
				<ul class="list_cont">
					<li>体能训练</li>
					<li>学生人数： 已完成：</li>
				</ul>
			</div>
		</div>
		<MsTabBar :mynum="num"></MsTabBar>
	</div>	
</template>

<script>
	import MsTabBar from '../../components/MsTabBar.vue'
	export default {
		components: {MsTabBar},
		data(){
			return{
				num:1,
			}
		},
    	methods:{
			gomore(){
				this.$router.push({
					path:'/Resource',
					query: {   
						num:1,
						loginid:0
					}
				})
			}
		}
    }

</script>

<style scoped="scoped">
	#MC_nav{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#MC_nav .mint-header{
		background-color: #4E7FFF;
		height: 60px!important;
	}
	.dis_none{
		display: none;
	}
	#MC_nav{
		width: 100%;
	}
	#MC_nav .MC_nav{
		height: 2.4rem;
		border-bottom: 1px solid #ccc;
		box-shadow: 0 2px 4px #CCC;
		background-color: #fff;
	}
	#MC_nav .MC_nav span{
		width:3rem;
		display: inline-block;
		text-align: center;
		padding-bottom: 0.5rem;
		margin-top: 0.5rem;
		margin-left: 1.4rem;
	}
	.tab_act{
		border-bottom:1px solid #4E7FFF;
	}

	#MC_nav .MC_list>div{
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background-color: #fff;
		margin-top: 1rem;
		padding:0.6rem 0.2rem;
	}
	#MC_nav .MC_list>div>.list_pic{
		width: 20%;
	}
	#MC_nav .MC_list>div>.list_cont{
		width: 70%;
	}
	#MC_nav .MC_list>div>.list_cont>li{
		margin-bottom: 2%;
		font-size: 14px;
	}
	#MC_nav .MC_list>div>.list_cont>li:first-child{
		font-size: 18px;
		color: #3F3F3F;
		font-weight: bold;
	}
	#MC_nav .MC_list>div>.list_cont>li:nth-child(2){
		color: #7A7A7A;
	}
	#MC_nav .MC_list>div>.list_cont>li:nth-child(3){
		color: #CCCCCC;
	}
</style>