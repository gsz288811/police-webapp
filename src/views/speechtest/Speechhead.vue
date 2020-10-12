<template>
	<div id="speech">
	 	<div class="hd-switch-nav" style="position: inherit; display: block;">
		 	<div class="switch-nav-cont">
				<div class="switch-nav-list cl" id="secondNavSpan_230" style="display: block;">
					<a class="class_package_kebao act" id="secondNavSpan_a_231" >
						慧听慧说
					</a>
				</div>
		 	</div>
	 	</div>
	 	<div id="speech_cont">
	 		<SpeechContent></SpeechContent>
	 	</div>
 	</div>
</template>

<script>
	import SpeechContent from './SpeechContent.vue'  
    export default {
    	name: "Speechhead",
        components: {SpeechContent}
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
	    width: 1256px;
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
	    width: 1256px;
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
	    width: 1256px;
	    margin: 0 auto;
	    margin-top: 16px;
	}
</style>