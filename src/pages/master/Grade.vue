<template>
	<div id="exam">
		<mt-header title="成绩" style="height: 40px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click='anzuocallExit()'>X</mt-button>
			</div>
		</mt-header>
		<mt-search style="background-color: #4E7FFF;"></mt-search>
		<div class="exam_list">
			<ul @click="goexam">
				<li>
					<p>省厅定期培训班第五期男子体能测试</p>
					<p class="px14 gray1">创建时间：2018年12月1日</p>
					<p class="px14 gray1">男子100米  总人数：304   已录：34</p>
				</li>
			</ul>
		</div>
		<!-- 添加练习 -->
		<div class="add_btn" @click="goadd()">
			+
		</div>
		<MsTabBar :mynum="num"></MsTabBar>
	</div>
</template>

<script>
	import MsTabBar from '../../components/MsTabBar.vue'
	export default {
		components: {MsTabBar},
		data() {
			return {
				num:3,
			};
		},
		methods:{
			goadd(){
				this.$router.push('/AddTest')
			},
			// 跳转到详情页
			goexam(){
				this.$router.push('/testDetails')
			}
		}
	}
</script>

<style scoped="scoped">
	/* 公用样式 */
	.px14{
		font-size: 14px;
	}
	.gray1{
		color: #9C9C9C;
	}
	
	.exam_list>ul>li{
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background-color: #fff;
		margin-top: 1rem;
		padding: 0.6rem 1.2rem;
	}
	/* 添加练习样式 */
	.add_btn{
		position: fixed;
		bottom:5rem;
		right: 1rem;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		text-align: center;
		line-height:2.5rem;
		background-color: #4E7FFF;
		color: #fff;
		font-size: 2rem;
	}
</style>
