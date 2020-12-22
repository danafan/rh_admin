<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="用户手机号：">
					<el-input v-model="req.phone" placeholder="输入用户手机号"></el-input>
				</el-form-item>
				<el-form-item label="注册时间：">
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
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="220" prop="phone" label="用户手机号" align="center">
			</el-table-column>
			<el-table-column width="220" prop="create_date" label="注册时间" align="center">
			</el-table-column>
			<el-table-column width="220" label="订单信息" align="center">
				<template slot-scope="scope">
					<el-popover
					placement="top-start"
					title="订单信息"
					width="200"
					trigger="hover"
					>
					<div>
						<div>下单数量/金额：9/1098</div>
						<div>已核销/金额：8/1000</div>
						<div>待核销/金额：1/98</div>
						<div>已退款/金额：3/398</div>
					</div>
					<el-button type="text" slot="reference">查看</el-button>
				</el-popover>
				
			</template>
		</el-table-column>
		<el-table-column width="120" prop="total_comment" label="评论总数" align="center">
		</el-table-column>
		<el-table-column width="120" prop="bad_review" label="差评数量" align="center">
		</el-table-column>
		<el-table-column width="120" prop="bad_review" label="优质评论" align="center">
		</el-table-column>
		<el-table-column width="120" prop="envelope" label="红包数量" align="center">
		</el-table-column>
		<el-table-column width="120" prop="balance" label="当前余额（元）" align="center">
		</el-table-column>
		<el-table-column width="120" prop="integral" label="当前积分" align="center">
		</el-table-column>
		<el-table-column width="180" fixed="right" label="操作" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" v-if="scope.row.comment_status == '1'" @click="setComment(scope.row.user_id,'1')">关闭评论</el-button>
				<el-button type="text" size="small" v-if="scope.row.comment_status == '2'" @click="setComment(scope.row.user_id,'2')">开启评论</el-button>
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
					user_id:"",
					phone:"",
					create_start_time:"",
					create_end_time:""
				},								//请求参数
				create_date:[],					//注册时间
				dataObj:{data:[{
					user_id:"1",
					create_date:'2020-09-20 12:34:52',
					phone:"13067882143",
					order_num:"6",
					order_money:"1098",
					waiting_consumer:'1',
					waiting_consumer_money:'99',
					apply_refund:'3',
					total_comment:"5",
					bad_review:'1',
					envelope:'6',
					balance:"68",
					integral:'108',
					comment_status:'1'
				},{
					user_id:"1",
					create_date:'2020-09-20 12:34:52',
					phone:"13067882143",
					order_num:"6",
					order_money:"1098",
					waiting_consumer:'1',
					waiting_consumer_money:'99',
					apply_refund:'3',
					total_comment:"5",
					bad_review:'1',
					envelope:'6',
					balance:"68",
					integral:'108',
					comment_status:'2'
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
			//注册时间
			create_date:function(n){
				this.req.create_start_time = n && n.length > 0 ? n[0] : "";
				this.req.create_end_time = n && n.length > 0 ? n[1] : "";
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
			//操作评论
			setComment(user_id,type){
				this.$confirm(`确认${type == '1'?'关闭':'开启'}评论?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已通过'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			}
		}

	}
</script>














v x  ]