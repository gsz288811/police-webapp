<template>
	<div id="speech">
	 	<!--导航-->
	 	<div class="hd-switch-nav" style="position: inherit; display: block;">
		 	<div class="switch-nav-cont">
				<div class="switch-nav-list cl" id="secondNavSpan_230" style="display: block;">
					<a class="class_package_kebao act" id="secondNavSpan_a_231" >
						慧听慧说
					</a>
				</div>
		 	</div>
	 	</div>
	 	<!--内容部分-->
	 	<div id="speech_cont">
			<div class="action-nav" id="action-nav">
			    <a class="tblx-btn" style="width: 33.3%; text-indent: 12%;" @click="goTowork()"></a>
			    <a class="bjxq-btn" style="width: 33.3%; text-indent: 12%;"></a>
			    <a class="sjk-btn" style="width: 33.4%; text-indent: 12%;"></a>
			</div>
	 		<LSContent></LSContent>
	 	</div>
 	</div>
</template>

<script>
	import LSContent from './LSContent.vue'  
    export default {
    	name: "ListenandSpeak",
        components: {LSContent},
		mounted() {
			this.userId = this.$route.query.userId 
			this.fkSchoolId = this.$route.query.fkSchoolId
		},
		methods:{
			goTowork(){
				this.$router.push({
					path:'/Speechhead',
					query:{
						"userId":this.userId,
						"fkSchoolId":this.fkSchoolId
					}
				})
			}
		}
    }
</script>

<style scoped>
	a{
		text-decoration: none;
		cursor: pointer;
	}
	.cl:after{
		content: "";
		width: 0;
		display: block;
		clear: both;
	}
	.fl_left{
		float: left;
	}
	.fl_rigth{
		float: right;
	}
	.hd-heard {
	    width: 100%;
	}
	.hd-heard-cont {
	    width: 1240px;
	    margin: 0 auto;
	    height: 60px;
	}
	.hd-heard-cont .hd-logo {
	    /*padding-left: 30px;*/
	    font-size: 20px;
	    /* background: url(../images/home/school.png) no-repeat center left; */
	}
	.hd-heard-cont span {
     height: 60px; 
     line-height: 60px; 
}
	.hd-heard-cont .hd-heard-nav a {
	    padding: 0 20px; 
	    font-size: 14px;
	    color: #333;
	}
	.hd-switch-nav {
	    width: 100%;
	    height: 50px;
	    background-color: #55C3B1;
	    z-index: 99;
	    display: none;
    }
    .switch-nav-list {
	    width: 100%;
	    display: none;
	}
	.switch-nav-cont {
	    width: 1240px;
	    margin: 0 auto;
	}
	.switch-nav-list a {
		display: block;
		float: left;
	    width: 155px;
	    height: 50px;
	    text-align: center;
	    line-height: 50px;
	    font-size: 16px;
	    color: #fff;
	}
	.switch-nav-list a.act {
	    background-color: #4BAC9C;
	}
	#speech_cont{
		display: table;
	    position: relative;
	    /* height: 760px; */
	    min-height: 760px;
	    width: 1240px;
	    margin: 0 auto;
	    margin-top: 16px;
	}
	/* 副导航 */
	.action-nav {
		width: 1240px;
		height: 100px;
		background-color: #fff;
		margin: 0 0 10px 0;
		overflow: hidden;
	}
	.action-nav a {
		display: block;
		float: left;
		width: 20%;
		height: 100px;
		line-height: 100px;
		text-indent: 10%;
		font-size: 24px;
		color: #fff;
	}
	.action-nav a.tblx-btn {
		background: url(../../assets/images/hd_StudySkills_btn.png) no-repeat 20% center #FF7473;
	}
	.action-nav a.bjxq-btn {
		background: url(../../assets/images/hd_spokenLanguage_btn.png) no-repeat 20% center #FFC952;
	}
	.action-nav a.sjk-btn {
		background: url(../../assets/images/hd_hearing_btn.png) no-repeat 20% center #47B8E0;
	}
</style>