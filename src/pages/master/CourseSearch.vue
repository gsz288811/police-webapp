<template>
	<div id="coursearch">
		<mt-header title="课堂查询" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<mt-search
			cancel-text="取消"
			placeholder="课堂查询">
		</mt-search>
		<div class="score_list">
			<ul>
				<li>
					<p>体能训练课程</p>
					<p> <span class="gray">授课时间：</span> 2018.5.4</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.gray{
		color: #999999;
	}
	#coursearch{
		background-color: #F5F5F5;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
	}
	.mint-search{
		height: auto;
	}
	.score_list>ul>li{
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		background-color: #fff;
		margin-top: 1rem;
		padding: 0.6rem 1.2rem;
	}
</style>
