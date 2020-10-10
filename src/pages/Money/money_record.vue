<template>
	<div>
		<el-card>
			<div class="title">账户信息</div>
			<div class="info_box">
				<div class="info_item">
					<div class="info_title">总余额</div>
					<div class="info_val">0.00</div>
				</div>
				<div class="info_item">
					<div class="info_title">商家余额</div>
					<div class="info_val">0.00</div>
				</div>
				<div class="info_item">
					<div class="info_title">预估收益</div>
					<div class="info_val">0.00</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 20px">
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="资金流水号：">
					<el-input v-model="req.id" placeholder="输入订单编号"></el-input>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="req.money_type">
						<el-option v-for="item in money_type_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="变动时间：">
					<el-date-picker
					v-model="date"
					type="datetimerange"
					:picker-options="pickerOptions"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:default-time="['00:00:00', '23:59:59']"
					>
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="120" prop="id" label="资金流水号" align="center">
			</el-table-column>
			<el-table-column width="120" prop="user_phone" label="用户手机号" align="center">
			</el-table-column>
			<el-table-column prop="order_id" label="订单编号" align="center">
			</el-table-column>
			<el-table-column width="220" show-overflow-tooltip prop="store_name" label="商家名称" align="center">
			</el-table-column>
			<el-table-column prop="store_account_number" width="300" label="商家入账信息" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.bank_name != ''">银行名称：{{scope.row.bank_name}}</div>
					<div v-if="scope.row.bank_number != ''">银行卡号：{{scope.row.bank_number}}</div>
				</template>
			</el-table-column>
			<el-table-column width="220" prop="time" label="变动时间" align="center">
			</el-table-column>
			<el-table-column width="120" prop="change_money" label="变动金额（元）" align="center">
			</el-table-column>
			<el-table-column prop="change_desc" label="变动说明" align="center">
			</el-table-column>
			<el-table-column prop="change_type" label="收支类型" align="center">
			</el-table-column>
			<el-table-column width="120" prop="balance" label="余额（元）" align="center">
			</el-table-column>
		</el-table>
		<div class="page">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="req.page"
			:pager-count="11"
			:page-sizes="[5, 10, 15, 20]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="dataObj.total"
			>
		</el-pagination>
	</div>
</el-card>
</div>
</template>
<style lang="less" scoped>
.title{
	font-weight: 700;
	color: #333333;
}
.info_box{
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.info_item{
		.info_title{
			font-size: 16px;
			color: #666666;
		}
		.info_val{
			font-size: 26px;
			font-weight: 700;
			color: #333333;
		}
	}
}
</style>
<script>
	// import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					id:"",	
					money_type:"",
					start_time:"",
					end_time:"",
				},								//请求参数
				money_type_list:[{
					id:"",
					name:"不限"
				},{
					id:"0",
					name:"收入"
				},{
					id:"1",
					name:"支出"
				}],		
				date:[],					//下单时间
				dataObj:{data:[{
					id:"1",
					user_phone:"",
					order_id:"",
					store_name:"遇上侬火锅",
					bank_name:'中国建设银行',
					bank_number:'18273618273618723613',
					time:'2020-09-20 12:34:52',
					change_money:'68',
					change_desc:"商户提现",
					change_type:'支出',
					balance:'32846367.53'
				},{
					id:"2",
					user_phone:"13067882143",
					order_id:"1",
					store_name:"",
					bank_name:'',
					bank_number:'',
					time:'2020-09-20 12:34:52',
					change_money:'68',
					change_desc:"用户下单",
					change_type:'收入',
					balance:'32846367.53'
				}]},	
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			}
		},
		created(){
			//获取列表
			// this.getList();
		},
		watch:{
			//时间
			date:function(n){
				this.req.start_time = n && n.length > 0 ? n[0] : "";
				this.req.end_time = n && n.length > 0 ? n[1] : "";
			}
		},
		methods:{
			//获取列表
			getList(){
				console.log(this.req);
				// resource.storeList(this.req).then(res => {
				// 	if(res.data.code == 1){
				// 		this.dataObj = res.data.data;
				// 	}else{
				// 		this.$message.warning(res.data.msg);
				// 	}
				// })
			},
			//分页
			handleSizeChange(val) {
				this.req.pagesize = val;
				//获取列表
				this.getList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList();
			},
		}

	}
</script>














v x  ]