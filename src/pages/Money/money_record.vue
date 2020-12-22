<template>
	<div>
		<el-card style="margin-top: 20px">
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="资金流水号：">
					<el-input v-model="req.id" placeholder="输入订单编号"></el-input>
				</el-form-item>
				<el-form-item label="变动类型：">
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
		<div class="table_tag">
			<div class="tag_item">账户余额：¥1000023.32</div>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="id" label="资金流水号" align="center">
			</el-table-column>
			<el-table-column prop="change_desc" label="变动类型" align="center">
			</el-table-column>
			<el-table-column prop="change_money" label="变动金额（元）" align="center">
			</el-table-column>
			<el-table-column prop="time" label="变动时间" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button v-if="scope.row.change_type != '2' && scope.row.change_type != '3'" type="text" size="small" @click="getDetail(scope.row)">详情</el-button>
				</template>
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
<!-- 详情 -->
<el-dialog :title="dialog_title" :visible.sync="showDialog" width="30%">
	<!-- 商户提现 -->
	<div v-if="change_type == '0'">
		<div class="content_row">商户名称：彪子湘菜馆</div>
		<div class="content_row">提现金额：¥1998</div>
		<div class="content_row">提现银行：中国工商银行</div>
		<div class="content_row">账号：453645352635453</div>
		<div class="content_row">提现时间：2020-09-20 12:34:24</div>
		<div class="content_row">到账时间：2020-09-20 15:34:24</div>
	</div>
	<!-- 用户下单 -->
	<div v-if="change_type == '1'">
		<div class="content_row">订单编号：712635</div>
		<div class="content_row">用户手机号：13067882143</div>
		<div class="content_row">套餐名称：彪子无敌套餐</div>
		<div class="content_row">单价：¥98</div>
		<div class="content_row">数量：1</div>
		<div class="content_row">红包抵扣：¥10</div>
		<div class="content_row">积分抵扣：¥0</div>
		<div class="content_row">余额抵扣：¥0</div>
		<div class="content_row">实际支付：¥88</div>
		<div class="content_row">入帐金额：¥88</div>
		<div class="content_row">入帐时间：2020-09-20 15:34:24</div>
	</div>
	<!-- 系用户退款 -->
	<div v-if="change_type == '4'">
		<div class="content_row">订单编号：287346</div>
		<div class="content_row">用户手机号：13067882143</div>
		<div class="content_row">套餐名称：彪子无敌套餐</div>
		<div class="content_row">单价：¥98</div>
		<div class="content_row">数量：1</div>
		<div class="content_row">红包抵扣：¥10</div>
		<div class="content_row">积分抵扣：¥0</div>
		<div class="content_row">余额抵扣：¥0</div>
		<div class="content_row">实际支付：¥88</div>
		<div class="content_row">退款金额：¥88</div>
		<div class="content_row">申请时间：2020-09-20 15:34:24</div>
		<div class="content_row">退款时间：2020-09-20 16:34:24</div>
	</div>
	<span slot="footer" class="dialog-footer">
		<el-button type="primary" @click="showDialog = false">确 定</el-button>
	</span>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.table_tag{
	margin-bottom: 5px;
	display: flex;
	align-items: center;
	.tag_item{
		margin-right: 20px;
		font-size: 16px;
		color:#ec722e;
	}
}
.content_row{
	margin-bottom: 5px;
	font-size: 15px;
	color:#333;
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
					name:"全部"
				},{
					id:"0",
					name:"商户提现"
				},{
					id:"1",
					name:"用户下单"
				},{
					id:"2",
					name:"系统提现"
				},{
					id:"3",
					name:"系统入帐"
				},{
					id:"4",
					name:"用户退款"
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
					change_money:'108',
					change_desc:"商户提现",
					change_type:'0',
					balance:'32846367.53'
				},{
					id:"2",
					user_phone:"13067882143",
					order_id:"1",
					store_name:"",
					bank_name:'',
					bank_number:'',
					time:'2020-09-20 12:34:52',
					change_money:'120',
					change_desc:"用户下单",
					change_type:'1',
					balance:'32846367.53'
				},{
					id:"2",
					user_phone:"13067882143",
					order_id:"1",
					store_name:"",
					bank_name:'',
					bank_number:'',
					time:'2020-09-20 12:34:52',
					change_money:'120',
					change_desc:"系统提现",
					change_type:'2',
					balance:'32846367.53'
				},{
					id:"2",
					user_phone:"13067882143",
					order_id:"1",
					store_name:"",
					bank_name:'',
					bank_number:'',
					time:'2020-09-20 12:34:52',
					change_money:'120',
					change_desc:"系统入账",
					change_type:'3',
					balance:'32846367.53'
				},{
					id:"2",
					user_phone:"13067882143",
					order_id:"1",
					store_name:"",
					bank_name:'',
					bank_number:'',
					time:'2020-09-20 12:34:52',
					change_money:'120',
					change_desc:"用户退款",
					change_type:'4',
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
				},
				showDialog:false,			//详情弹框
				change_type:"",				//弹框内容类型（0:商户提现；1:用户下单；4:用户退款）
				dialog_title:''

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
			//详情
			getDetail(row){
				this.change_type = row.change_type;
				switch(row.change_type){
					case '0':
						this.dialog_title = "系统提现";
						break;
					case '1':
						this.dialog_title = "用户下单";
						break;
					case '4':
						this.dialog_title = "用户退款";
						break;
					default:
						return false;
				}
				this.showDialog = true;
			}
		}

	}
</script>














v x  ]