<template>
	<div id="apply_form">
		<mt-header title="请假申请" style="height: 60px;background-color: #4E7FFF;">
			<div slot="left">
			<mt-button @click="goback()" icon="back"></mt-button>
			</div>
		</mt-header>
		<p>请假申请单</p>
		<form>
			<p>请假人：{{accountName}}</p>
			<p class="applyMore">开始时间：<button class="datebtn" @click="openPicker()"><span v-if="!this.selectedValue.length">选择开始日期</span><span v-if="this.selectedValue.length">{{selectedValue}}</span></button>
			<mt-datetime-picker
				@confirm="ConfirmStartTime"
				ref="picker"
				type="date"
				year-format="{value}年"
                month-format="{value}月"
                date-format="{value}日"
				:startDate="startDate"
				v-model="pickerValue1">
			</mt-datetime-picker>
			</p>
			<p class="applyMore">结束时间：<button class="datebtn" @click="openPickerEnd()"><span v-if="!this.selectedEndValue.length">选择结束日期</span><span v-if="this.selectedEndValue.length">{{selectedEndValue}}</span></button>
			<mt-datetime-picker
				@confirm="handleConfirm"
				ref="pickerend"
				type="date"
				year-format="{value}年"
				month-format="{value}月"
				date-format="{value}日"
				:startDate="startDate"
				v-model="pickerValue2">
			</mt-datetime-picker>
			</p>
			<p class="applyMore">请假天数：<input type="text" value="" v-model="offdays"/> </p>
			<p>请假原因:</p>
			<textarea value="" placeholder="请输入请假原因" v-model="reason"/>
			<p><button type="submit" @click="goSubmit">提交上报</button></p>
		</form>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import {formatDate} from '@/assets/js/formatdate.js'
	export default {
		data() {
			return {
				pickerValue1:'',
				pickerValue2:'',
				offdays:'',     //请假天数
				reason:'',      //请假原因
				startDate: new Date('2018/1/1'),
				userId:'',
				selectedValue:'',
				selectedEndValue:'',
				accountName:''
			};
		},
		mounted() {
			this.userId = this.$route.query.userId
			this.accountName = sessionStorage.getItem('acName');
		},
		methods:{
			goback(){
				this.$router.push('/Dayoffapply')
			},
			// 打开时间选择器
			openPicker(){
				if (this.selectedValue) {
					this.pickerValue1 = this.selectedValue
				} else {
					this.pickerValue1 = new Date()
				}
				this.$refs.picker.open();
			},
			openPickerEnd(){
				if (this.selectedEndValue) {
					this.pickerValue2 = this.selectedEndValue
				} else {
					this.pickerValue2 = new Date()
				}
				this.$refs.pickerend.open();
			},
			// 选择开始时间
			ConfirmStartTime(){
				this.selectedValue = formatDate(this.pickerValue1)
				console.log(this.selectedValue) 
			},
			// 选择结束时间
			handleConfirm(){
				this.selectedEndValue = formatDate(this.pickerValue2)
			},
			// 提交信息
			goSubmit(){
				if(this.selectedValue.length &&this.selectedEndValue.length &&this.offdays.length &&this.reason.length){
					this.$ajax.post('/wlxy/leaveApply/applyOfApp.action',this.$qs.stringify(
						{
						"userId":this.userId,
						"startDate":this.selectedValue,
						"endDate":this.selectedEndValue,
						"days":this.offdays,
						"reason":this.reason
						}
						)).then((res) =>{
							if(res.data.success == 1){
								MessageBox('提示', '申请提交成功！');
							}else{
								MessageBox('提示', res.data.error);
							}
						})
				}else{
					MessageBox('提示', '不能为空！');
				}
				
			}
		}
	}
</script>

<style>
	#apply_form>p{
		margin-top: 1rem;
		text-align: center;
	}
	#apply_form form p{
		line-height: 3rem;
		margin-left: 1rem;
	}
	#apply_form form textarea{
		margin-left: 1rem;
		height: 9rem;
		width: 90%;
	}
	#apply_form form p button{
		margin-top: 3rem;
		width: 60%;
		height: 2rem;
		line-height: 2rem;
		margin-left: 20%;
		background-color: #4E7FFF;
		outline: none;
		border: none;
		color: #fff;
		border-radius: 4px;
	}
	#apply_form form p button.datebtn{
		margin-top: 0rem;
		margin-left: 0rem;
		width: 10rem;
	}
	#apply_form .applyMore input{
		height: 2rem;
		width: 10rem;
	}
</style>
