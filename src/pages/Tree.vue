<template>
	<div id="treeBox">
		
		<!-- 头部 -->
		<mt-header title="微课程">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<!-- ztree -->
		<div style='width:100%;' v-if='ztreeDataSourceList.length>0'>
                <vueztree :list.sync='ztreeDataSourceList' :func='nodeClick' :is-open='false' :is-check='true'></vueztree>
        </div>
	</div>	
		
</template>

<script>
import vueztree from '../components/vue-ztree.vue';
export default {
		name:'treeBox',
		components:{
			vueztree
		},
		data () {
			return {
				msg: 'Hello Vue-Ztree-2.0!',
				treeDeepCopy:[],
				parentNodeModel:[],//当前点击节点父亲对象
				nodeModel:null, // 当前点击节点对象
				ztreeDataSourceList:[{
									id:1,
									name:"音乐",
									children:[],
									url:"http://www.baidu.com"
				},{
						id:2,
						name:"视频",
						children:[{
							 id:3,
							 name:"电影",
							 children:[{
									id:4,
									name:"国产电影",
									url:""
							 },{
									id:5,
									name:"好莱坞电影",
									url:""
							 },{
									id:6,
									name:"小语种电影",
									url:""
							 }]
						},{
							 id:7,
							 name:"短片",
							 children:[{
									id:9,
									name:"电视剧",
									url:""
							 },{
									id:10,
									name:"短片",
									url:""
							 }]
						}]
				}],
			
			}
  },
  methods:{

    // 点击节点
    nodeClick:function(m, parent, trees){
       //this.treeDeepCopy = trees;
       this.nodeModel = m;  // 当前点击节点对象
       this.parentNodeModel = parent; //当前点击节点父亲对象
       console.log(m);
       console.log(parent);
    },
    // 点击展开收起
    expandClick:function(m){
       console.log(JSON.parse(JSON.stringify(m)));
    },
	
	
	
		// 返回方法
		goback(){
			this.$router.push('/volumeRules')
		},
	
	
	
	
},
	// 页面加载时执行
  mounted (){
    
	
	this.$ajax.post('/wlxy/resourcemanage/loadTreeJson.action',this.$qs.stringify(
		{
			root_dirtreeId:,
			position:1,
			fkTeacherId:this.userId,
			fkCourseDirtreeId:this.fkCoursedirtreeId
		}
	
	)).then((res)=>{
		
		
							
	})
	

			
  }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
		
		
	
	
	
	
	
	
	
</script>

<style>
/* 头部样式	 */
.mint-header {
    	background-color: #4E7FFF;
		height: 60px;
}
</style>
