import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
// import CourselistBar from '@/components/CourselistBar'
import MicroCourse from '@/pages/MicroCourse'
import Personal from '@/pages/Personal'
import Resource from '@/pages/Resource'
import Studyonline from '@/pages/Studyonline'
import QAonline from '@/pages/QAonline'
import AddQuestion from '@/pages/AddQuestion'
import Dayoff from '@/pages/Dayoff'
import Scorequery from '@/pages/Scorequery'
import QuestionInvest from '@/pages/QuestionInvest'
import TrainApplication from '@/pages/TrainApplication'
import ScorequeryPage from '@/pages/ScorequeryPage'
import volumeRules from '@/pages/volumeRules'
import onlineExercise from '@/pages/onlineExercise'
import Exam from '@/pages/Exam'
import Onlinetest from '@/pages/Onlinetest'
import Dayoffapply from '@/pages/Dayoffapply'
import ApplyForm from '@/pages/ApplyForm'
import ApplyType from '@/pages/ApplyType'
import ApplyReason from '@/pages/ApplyReason'
// import Tree from '@/components/Tree'
import MasterCourse from '@/pages/master/MasterCourse'
import Studyprogress from '@/pages/master/Studyprogress'
import Grade from '@/pages/master/Grade'
import AddTest from '@/pages/master/AddTest'
import CourseSearch from '@/pages/master/CourseSearch'
import MasterPersonal from '@/pages/master/MasterPersonal'
import ExamResult from '@/pages/ExamResult'
// import testDetails from '@/pages/master/testDetails'
Vue.use(Router)
export default new Router({
  routes: [
		{
			path:'/',
			component:Login
		},
// 		{
// 			path: '/TabBar',
// 			name: 'TabBar',
// 			component: TabBar,
// 			children: [ 
// 		　　　{ 
// 		　　　	 	path: '/MicroCourse', 
// 		 　　　 	component: MicroCourse
// 		　　  },
// 					{ 
// 		　　　	 	path: '/MasterCourse', 
// 		　　　 	component: MasterCourse
// 		　　  },
// 					{
// 							path: '/Personal', 
// 			 　　　 	component: Personal 
// 					},
// 					{
// 						path:'/MasterPersonal',
// 						component:MasterPersonal
// 					},
// 					{
// 						path:'/Exam',
// 						component:Exam
// 					},
// 					{
// 						path:'/Grade',
// 						component:Grade
// 					}
// 　　		]
// 		},
		{ 
　　　	 	path: '/MicroCourse', 
 　　　 		component: MicroCourse
　　  	},
		{ 
		　　path: '/MasterCourse', 
		　　component: MasterCourse
		},
		{
			path: '/Personal', 
			component: Personal 
		},
		{
			path:'/MasterPersonal',
			component:MasterPersonal
		},
		{
			path:'/Exam',
			component:Exam
		},
		{
			path:'/Grade',
			component:Grade
		},
// 			{
// 				path: '/CourselistBar', 
// 		 　	component: CourselistBar,
// 				children: [ 
// 		　　　	
// 				{
// 						path: '/Studyonline', 
// 		 　　　 	component: Studyonline 
// 				},
// 				{
// 					path:'/Studyprogress',
// 					component:Studyprogress
// 				},
// 				{
// 					path: '/QAonline', 
// 	 　　　 	component: QAonline 
// 				}
// 　　		]
// 		},
		{ 
		　　path: '/Resource', 
		 　 component: Resource
		},
		{
			path: '/Studyonline', 
 　　　 		component: Studyonline 
		},
		{
			path: '/QAonline', 
			component: QAonline 
		},
		{
			path:'/AddQuestion',
			component:AddQuestion
		},
		{
			path:'/Dayoff',
			component:Dayoff
		},
		{
			path:'/volumeRules',
			component:volumeRules
		},
		{
			path:'/Scorequery',
			component:Scorequery
		},
		{
			path:'/QuestionInvest',
			component:QuestionInvest
		},
		{
			path:'/TrainApplication',
			component:TrainApplication
		},
		{
			path:'/ScorequeryPage',
			component:ScorequeryPage
		},
		{
			path:'/onlineExercise',
			component:onlineExercise
		},
		{
			path:'/Onlinetest',
			component:Onlinetest
		},
		{
			path:'/Dayoffapply',
			component:Dayoffapply
		},
		{
			path:'/ApplyForm',
			component:ApplyForm
		},
		{
			path:'/ApplyType',
			component:ApplyType
		},
		{
			path:'/ApplyReason',
			component:ApplyReason
		},
// 		{
// 			path:'/Tree',
// 			component:Tree
// 		},
		{
			path:'/AddTest',
			component:AddTest
		},
		{
			path:'/CourseSearch',
			component:CourseSearch
		},
		{
			path:'/ExamResult',
			component:ExamResult
		},
// 		{
// 			path:'/testDetails',
// 			component:testDetails
// 		}

		]
})
