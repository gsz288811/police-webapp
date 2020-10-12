<template>
	<div id="day_off">
		<mt-header title="请假申请">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="dy_container">
			<ul v-for="v in listdata" v-if="listdata.length">
				<li>
					<span>{{v.applyTime}}请假申请</span>
					<span class="blue" v-if="v.fkLeaveApplyFlow.detachmentStatus == 1&&v.fkLeaveApplyFlow.brigadeStatus == 1&&v.fkLeaveApplyFlow.sysBaseStatus == 1&&v.fkLeaveApplyFlow.provinceStatus == 1">审核通过</span>
					<span class="blue" v-if="!(v.fkLeaveApplyFlow.detachmentStatus == 1&&v.fkLeaveApplyFlow.brigadeStatus == 1&&v.fkLeaveApplyFlow.sysBaseStatus == 1&&v.fkLeaveApplyFlow.provinceStatus == 1)">审核中</span>

				</li>
				<li>
					<span>
						<span class="gray">中队审批：</span>
						<b v-if="v.fkLeaveApplyFlow.detachmentStatus == 1">通过</b>
						<b v-if="v.fkLeaveApplyFlow.detachmentStatus == 0">待核审</b>
						<b v-if="v.fkLeaveApplyFlow.detachmentStatus == 2">不通过</b>
					</span>
					<span><span class="gray">大队审批：</span>
						<b v-if="v.fkLeaveApplyFlow.brigadeStatus == 1">通过</b>
						<b v-if="v.fkLeaveApplyFlow.brigadeStatus == 0">待核审</b>
						<b v-if="v.fkLeaveApplyFlow.brigadeStatus == 2">不通过</b>
					</span>	
				</li>
				<li>
					<span><span class="gray">基地审批：</span>
						<b v-if="v.fkLeaveApplyFlow.sysBaseStatus == 1">通过</b>
						<b v-if="v.fkLeaveApplyFlow.sysBaseStatus == 0">待核审</b>
						<b v-if="v.fkLeaveApplyFlow.sysBaseStatus == 2">不通过</b>
					</span>
					<span><span class="gray">省厅审批：</span>
						<b v-if="v.fkLeaveApplyFlow.provinceStatus == 1">通过</b>
						<b v-if="v.fkLeaveApplyFlow.provinceStatus == 0">待核审</b>
						<b v-if="v.fkLeaveApplyFlow.provinceStatus == 2">不通过</b>
					</span>
				</li>
			</ul>
			<div id="imgbox" v-if="!listdata.length">
				<img src="../assets/images/nodata.png" />
				<p>暂无请假申请</p>
			</div>
			<div class="add_btn" @click="goadd()">
				+
			</div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	export default {
		data() {
			return {
				userId:'',
				listdata:[],
			};
		},
		mounted() {
			this.userId = this.$route.query.userId
			Indicator.open('加载中...');
			this.$ajax.post('/wlxy/leaveApply/findPageOfApp.action',this.$qs.stringify(
				{
				"userId":this.userId,
				"currentPage":1,
				"showCount":10
				}
				)).then((res) =>{
					Indicator.close();
					this.listdata = res.data.data.list
				})
		},
		methods:{
			goback(){
				// this.$router.go(-1)
				this.$router.push({  
					path: '/Personal', 
					query: {   
						num:4,
						userId:this.userId
					}  
				})
			},
			goadd(){
				this.$router.push({
					path:'/Dayoffapply',
					query:{
						userId:this.userId
					}
				})
			}	
		}
	}
</script>

<style scoped="scoped">
	.blue{
		color: #4E7FFF;
	}
	.gray{
		color: #999999;
	}
	#day_off{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#day_off .mint-header{
		background-color: #4E7FFF;
		height: 60px;
	}
	#day_off .dy_container ul{
		border: 1px solid #ccc;
		border-left: none;
		border-right: none;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: #fff;
	}
	#day_off .dy_container ul li:first-child{
		display: flex;
		justify-content: space-between;
	}
	#day_off .dy_container ul li:nth-child(2),
	#day_off .dy_container ul li:nth-child(3){
		display: flex;
		justify-content: space-between;
	}
	#day_off .dy_container ul li:nth-child(2) span:nth-child(2),
	#day_off .dy_container ul li:nth-child(3) span:nth-child(2){
		width: 9rem;
		display: inline-block;
		margin-right:2rem ;
	}
	.add_btn{
		background-color:#4E7FFF ;
		width:2.5rem;
		height:2.5rem;
		border-radius:50%;
		color: #fff;
		text-align: center;
		line-height: 2.5rem;
		font-size: 30px;
		position: absolute;
		bottom: 2rem;
		right: 1rem;
	}
	#imgbox{
		padding: 5rem;		
	}
	#imgbox p{
		color: #999;
		text-align: center;
	}
</style>
