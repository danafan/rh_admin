<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="订单编号：">
					<el-input v-model="req.order_id" placeholder="输入订单编号"></el-input>
				</el-form-item>
				<el-form-item label="用户手机号：">
					<el-input v-model="req.user_phone" placeholder="输入用户手机号"></el-input>
				</el-form-item>
				<el-form-item label="商家名称：">
					<el-select v-model="req.store_id" filterable clearable placeholder="不限">
						<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单状态：">
					<el-select v-model="req.order_status">
						<el-option v-for="item in order_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下单时间：">
					<el-date-picker
					v-model="create_date"
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
			<el-form-item label="核销时间：">
				<el-date-picker
				v-model="consumption_date"
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
		<el-form-item label="退款时间：">
			<el-date-picker
			v-model="refund_date"
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
	<el-table-column width="120" prop="order_id" label="订单编号" align="center">
	</el-table-column>
	<el-table-column width="120" prop="user_phone" label="用户手机号" align="center">
	</el-table-column>
	<el-table-column width="220" show-overflow-tooltip prop="store_name" label="商家名称" align="center">
	</el-table-column>
	<el-table-column width="220" show-overflow-tooltip prop="goods_name" label="商品名称" align="center">
	</el-table-column>
	<el-table-column width="120" prop="order_price" label="订单金额（元）" align="center">
	</el-table-column>
	<el-table-column width="220" prop="alipay_balance" label="支付信息" align="center">
		<template slot-scope="scope">
			<div>余额抵扣：{{scope.row.balance}}</div>
			<div>红包抵扣：{{scope.row.envelope}}</div>
			<div>积分抵扣：{{scope.row.integral}}</div>
			<div>实际支付：{{scope.row.money}}</div>
		</template>
	</el-table-column>
	<el-table-column width="220" prop="create_time" label="下单时间" align="center">
	</el-table-column>
	<el-table-column width="220" prop="consumption_time" label="核销时间" align="center">
	</el-table-column>
	<el-table-column width="220" prop="refund_time" label="退款时间" align="center">
	</el-table-column>
	<el-table-column width="120" prop="order_status" label="订单状态" align="center">
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

</style>
<script>
	// import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					order_id:"",
					user_phone:"",
					store_id:"",
					order_status:"",
					create_start_time:"",
					create_end_time:"",
					consumption_start_time:"",
					consumption_end_time:"",
					refund_start_time:"",
					refund_end_time:""
				},								//请求参数
				create_date:[],					//下单时间
				consumption_date:[],			//消费时间
				refund_date:[],					//退款时间
				order_status_list:[{
					id:"",
					name:"不限"
				},{
					id:"0",
					name:"待使用"
				},{
					id:"1",
					name:"待支付"
				},{
					id:"2",
					name:"待评价"
				},{
					id:"3",
					name:"已完成"
				},{
					id:"4",
					name:"已退款"
				}],								//订单状态
				store_list:[{
					id:"1",
					name:"沪小川川菜馆"
				},{
					id:"2",
					name:"遇上侬火锅"
				},{
					id:"3",
					name:"江巴人重庆市井火锅"
				}],								//商家列表
				dataObj:{data:[{
					order_id:"1",
					user_phone:"13067882143",
					store_name:"遇上侬火锅",
					goods_name:"遇上侬火锅2-4人套餐",
					order_price:"98",
					balance:'10',
					envelope:'10',
					integral:'10',
					money:'68',
					create_time:'2020-09-20 12:34:52',
					consumption_time:'2020-09-20 12:34:52',
					refund_time:'2020-09-20 12:34:52',
					order_status:"已消费"
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
			//下单时间
			create_date:function(n){
				this.req.create_start_time = n && n.length > 0 ? n[0] : "";
				this.req.create_end_time = n && n.length > 0 ? n[1] : "";
			},
			//消费时间
			consumption_date:function(n){
				this.req.consumption_start_time = n && n.length > 0 ? n[0] : "";
				this.req.consumption_end_time = n && n.length > 0 ? n[1] : "";
			},
			//退款时间
			refund_date:function(n){
				this.req.refund_start_time = n && n.length > 0 ? n[0] : "";
				this.req.refund_end_time = n && n.length > 0 ? n[1] : "";
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