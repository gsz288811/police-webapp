<template>
	<div id="MC_nav">
		<mt-header title="微课程">
			<div slot="left">
			<mt-button icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="MC_nav">
			<span :class="{tab_act:isact==1}" @click="gochange(1)">学习中</span>
			<span :class="{tab_act:isact==2}" @click="gochange(2)">已完成</span>
		</div>
		<div class="MC_list" v-show="flag1">
			<div class="exam_list">
				<ul>
					<li>
						<img src="../../assets/images/mipmap-xhdpi/jx_math_icon.png" width="46px"/>
					</li>
					<li>
						<p>李明珠</p>
						<p class="px14 gray1">开始时间：</p>
						<p class="px14 gray1">当前章节：</p>
						<div style="width: 130%;" class="px14 gray1">练习次数： 做题数：  正确率：</div>
					</li>
				</ul>			
			</div>
		</div>
		<div class="MC_list" v-show="flag2">
			<div class="exam_list">
				<ul>
					<li>
						<img src="../../assets/images/mipmap-xhdpi/jx_math_icon.png" width="46px"/>
					</li>
					<li>
						<p>游客</p>
						<p class="px14 gray1">考试天数：</p>
						<p class="px14 gray1">考试成绩：</p>
						<div style="width: 130%;" class="px14 gray1">练习次数： 做题数：  正确率：</div>
					</li>
				</ul>			
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
    	name: "MicroCourse",
    	data(){
    		return{
    			isact:1,
				flag1:true,
				flag2:false,
    		}
    	},
    	methods:{
   			gochange(num){
   				this.isact = num
   				if(num == '1'){
					this.flag1 = true
					this.flag2 = false
				}else{
					this.flag1 = false
					this.flag2 = true
				}
   			}
    	}
    }

</script>

<style scoped="scoped">
	/* 公用样式 */
	.px14{
		font-size: 14px;
	}
	.px12{
		font-size: 12px;
	}
	.gray{
		color: #ccc;
	}
	.gray1{
		color: #9C9C9C;
	}
	.orange{
		color: #F7B864;
	}
	.orange1{
		color: orange;
	}
	.green{
		color: #00BE6D;
	}
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
	.exam_list ul{
		display: flex;
		justify-content:flex-start;
		background-color: #fff;
		margin-top: 0.6rem;
		border-top:1px solid #ccc ;
		border-bottom:1px solid #ccc ;
		padding: 0.6rem;
	}
	.exam_list ul li:first-child{
		width: 4rem;
	}
	.exam_list ul li:first-child img{
		padding-top: 1rem;
	}
	.exam_list ul li:first-child{
		text-align: center;
	}
	.exam_list ul li:nth-child(2){
		margin-left: 1rem;
		width: 11rem;
	}
</style>