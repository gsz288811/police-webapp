<template>
	<div id="train_apply">
		<mt-header title="培训申请">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="dy_container">
			<ul v-for="(v,i) in applyData" :key="i" v-if="applyData.length">
				<li>
					<span>{{v.applyTime}}{{text}}</span>
					<span class="blue" v-if="v.fktTrainSuspendApplyFlow.detachmentStatus == 1&&v.fktTrainSuspendApplyFlow.brigadeStatus == 1&&v.fktTrainSuspendApplyFlow.baseStatus == 1&&v.fktTrainSuspendApplyFlow.provinceStatus == 1">审核通过</span>
					<span class="blue" v-if="!(v.fktTrainSuspendApplyFlow.detachmentStatus == 1&&v.fktTrainSuspendApplyFlow.brigadeStatus == 1&&v.fktTrainSuspendApplyFlow.baseStatus == 1&&v.fktTrainSuspendApplyFlow.provinceStatus == 1)">审核中</span>
				</li>
				<li>
					<span>
						<span class="gray">中队审批：</span>
						<b v-if="v.fktTrainSuspendApplyFlow.detachmentStatus == 1">通过</b>
						<b v-if="v.fktTrainSuspendApplyFlow.detachmentStatus == 0">待核审</b>
						<b v-if="v.fktTrainSuspendApplyFlow.detachmentStatus == 2">不通过</b>
					</span>
					<span><span class="gray">大队审批：</span>
						<b v-if="v.fktTrainSuspendApplyFlow.brigadeStatus == 1">通过</b>
						<b v-if="v.fktTrainSuspendApplyFlow.brigadeStatus == 0">待核审</b>
						<b v-if="v.fktTrainSuspendApplyFlow.brigadeStatus == 2">不通过</b>
					</span>	
				</li>
				<li>
					<span><span class="gray">基地审批：</span>
						<b v-if="v.fktTrainSuspendApplyFlow.baseStatus == 1">通过</b>
						<b v-if="v.fktTrainSuspendApplyFlow.baseStatus == 0">待核审</b>
						<b v-if="v.fktTrainSuspendApplyFlow.baseStatus == 2">不通过</b>
					</span>
					<span><span class="gray">省厅审批：</span>
						<b v-if="v.fktTrainSuspendApplyFlow.provinceStatus == 1">通过</b>
						<b v-if="v.fktTrainSuspendApplyFlow.provinceStatus == 0">待核审</b>
						<b v-if="v.fktTrainSuspendApplyFlow.provinceStatus == 2">不通过</b>
					</span>
				</li>
			</ul>
			<div id="imgbox" v-if="!applyData.length">
				<img src="../assets/images/nodata.png" />
				<p>暂无培训申请</p>
			</div>
			<div class="add_btn" @click="goadd()">
				+
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userId:null,
				applyData:[]
			};
		},
		methods:{
			goback(){
				this.$router.push({  
					path: '/Personal', 
					query: {   
						num:4,
						userId:this.userId,
					}  
				})
			},
			goadd(){
				this.$router.push({
					path:'/ApplyType',
					query:{
						userId:this.userId,
					}
				})
			}
		},
		mounted(){
			this.userId = this.$route.query.userId
			this.$ajax.post('/wlxy/approvalReview/findAllOfApp.action',this.$qs.stringify(
			{
				userId:this.userId
			}	
			)).then((res)=>{
				console.log(res)
				this.applyData = res.data.data.TrainSuspendApply.data
				this.text = res.data.data.TrainSuspendApply.text
			})
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
	#train_apply{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	#train_apply .mint-header{
		background-color: #4E7FFF;
		height: 60px;
	}
	#train_apply .dy_container ul{
		border: 1px solid #ccc;
		border-left: none;
		border-right: none;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: #fff;
	}
	#train_apply .dy_container ul li{
		line-height: 1.8rem;
	}
	#train_apply .dy_container ul li:first-child{
		display: flex;
		justify-content: space-between;
	}
	#train_apply .dy_container ul li:nth-child(2),
	#train_apply .dy_container ul li:nth-child(3){
		display: flex;
		justify-content: space-between;
	}
	#train_apply .dy_container ul li:nth-child(2) span:nth-child(2),
	#train_apply .dy_container ul li:nth-child(3) span:nth-child(2){
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
