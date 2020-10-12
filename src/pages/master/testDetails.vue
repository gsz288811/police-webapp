<template>
	<div id="testDetails">
		<mt-header title="测验详情">
			<div slot="left">
			<mt-button  @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<div class="messageBox">
			
			<div class="headCont">
				<div class="detailsTitle">省厅定期训练班第5期培训班体能考试男子500米</div>
				<div class="detailsTime">创建时间：2019年2月5日 16：24</div>
				<div>
					<span>男子100米</span>
					<span>总人数：34</span>
					<span>已录：23</span>
				</div>
			</div>
			<div class="mainCont">
				<p><input type="text" value="" /><a href="javascript:;">查询</a></p>
				<table>
					<tr>
						<td>学号</td>
						<td>结果（时间）</td>
						<td>操作</td>
					</tr>
				</table>
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goback(){
				this.$router.push('/Grade')
			},
			goadd(){
				this.$router.push('/AddTest')
			},
			
		}
	}
	
</script>

<style scoped="scoped">
/* 头部样式	 */
.mint-header {
    	background-color: #4E7FFF;
		height: 60px;
}	
.messageBox{
		padding: 0.8rem;
		margin: auto;
}
.headCont{
	
}
.detailsTitle{
	text-align: center;
	font-size: 1.3rem;
}

</style>
