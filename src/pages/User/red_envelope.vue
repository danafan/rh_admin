<template>
	<div>
		<el-card style="margin-bottom: 15px">
			<div class="table_tag">
			<div class="tag_item">
				<div class="tag_label">红包总数</div>
				<div class="tag_val">268</div>
			</div>
			<div class="tag_item">
				<div class="tag_label">红包总金额</div>
				<div class="tag_val">¥268000</div>
			</div>
			<div class="tag_item">
				<div class="tag_label">已使用数量</div>
				<div class="tag_val">182</div>
			</div>
			<div class="tag_item">
				<div class="tag_label">已使用金额</div>
				<div class="tag_val">¥182000</div>
			</div>
		</div>
		</el-card>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="发放日期：">
					<el-date-picker
					v-model="date"
					type="datetimerange"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="红包类型：">
				<el-select v-model="req.type_id" clearable placeholder="不限">
					<el-option v-for="item in package_type_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
			<el-button type="primary" size="small" @click="create">创建</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="180" prop="date" label="发放日期" align="center">
			</el-table-column>
			<el-table-column prop="type" label="红包类型" align="center">
			</el-table-column>
			<el-table-column prop="money" label="红包金额" align="center">
			</el-table-column>
			<el-table-column prop="money" label="红包数量" align="center">
			</el-table-column>
			<el-table-column prop="money" label="红包总金额" align="center">
			</el-table-column>
			<el-table-column prop="money" label="已使用数量" align="center">
			</el-table-column>
			<el-table-column prop="money" label="已使用金额" align="center">
			</el-table-column>
			<el-table-column prop="desc" label="说明" align="center">
			</el-table-column>
			<el-table-column width="180" prop="filter_name" label="筛选条件" align="center">
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
<!-- 创建红包 -->
<el-dialog title="创建红包" :visible.sync="showCreate" :close-on-click-modal="false">
	<el-form size="small" style="width: 100%">
		<el-form-item label="红包名称：" label-width="220px" required>
			<el-input type="text" v-model="createReq.name" placeholder="如 用户满减红包"></el-input>
		</el-form-item>
		<el-form-item label="红包金额：" label-width="220px" required>
			<el-input type="number" v-model="createReq.money" placeholder="请输入红包金额"></el-input>
		</el-form-item>
		<el-form-item label="红包类型：" label-width="220px" required>
			<el-select v-model="createReq.package_type">
				<el-option v-for="item in package_type_list" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="满减金额：" label-width="220px" required v-if="createReq.package_type == '1'">
			<el-input type="number" v-model="full_money" placeholder="请输入满减金额"></el-input>
		</el-form-item>
		<el-form-item label="过期时间：" label-width="220px" required>
			<el-select v-model="createReq.expiration_time">
				<el-option v-for="item in expiration_time_list" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择用户：" label-width="220px" required>
			<div class="check_user">已选用户：{{user_nums}}个</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="筛选条件：">
					<el-select v-model="checkReq.filter_id" clearable placeholder="全部">
						<el-option v-for="item in filter_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" size="small" @click="getUserList">搜索</el-button>
			</el-form>
			<el-table :data="table_obj.tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="phone" label="用户手机号" align="center">
				</el-table-column>
				<el-table-column prop="order_num" label="下单数量" align="center">
				</el-table-column>
				<el-table-column prop="order_money" label="下单金额" align="center">
				</el-table-column>
				<el-table-column prop="user_id" label="退款数量" align="center">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
				@size-change="handleFilter"
				@current-change="handleCurrentFilter"
				:current-page="checkReq.filter_page"
				:pager-count="11"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="dataObj.total"
				>
			</el-pagination>
		</div>
	</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
	<el-button @click="showCreate = false">取 消</el-button>
	<el-button type="primary" @click="submit">确 定</el-button>
</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.check_user{
	color: #ec722e;
}
.table_tag{
	margin-bottom: 15px;
	margin-top: 15px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tag_item{
		.tag_label{
			margin-bottom: 10px;
			font-size: 18px;
			color:#333;
			font-weight: 600;
		}
		.tag_val{
			font-size: 16px;
			color:#ec722e;
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
					created_time_start:"",
					created_time_end:"",
					type_id:"",	
				},				//请求参数
				date:[],		//时间
				dataObj:{
					data:[{
						date:"2020-01-24 13:32:34",
						type:"用户满减红包",
						money:"10",
						desc:"满100可用",
						filter_name:"下单数量从高到低"
					},{
						date:"2020-01-24 13:32:34",
						type:"无门槛红包",
						money:"20",
						desc:"无门槛",
						filter_name:"下单数量从低到高"
					},{
						date:"2020-01-24 13:32:34",
						type:"用户满减红包",
						money:"10",
						desc:"满100可用",
						filter_name:"消费金额从高到低"
					},{
						date:"2020-01-24 13:32:34",
						type:"无门槛红包",
						money:"20",
						desc:"无门槛",
						filter_name:"消费金额从低到高"
					}]
				},	
				showCreate:false,
				package_type_list:[{
					id:"1",
					name:"用户满减红包"
				},{
					id:"2",
					name:"无门槛红包"
				}],							//红包类型（筛选条件）
				createReq:{
					name:"",
					money:"",
					package_type:"1",
					expiration_time:"1",
					user_ids:""
				},
				full_money:"",					//达到满减金额
				expiration_time_list:[{
					id:"2",
					name:"当日有效"
				},{
					id:"3",
					name:"3天内有效"
				},{
					id:"4",
					name:"7天内有效"
				},{
					id:"5",
					name:"30天内有效"
				}],							//有效期
				filter_list:[{
					id:"1",
					name:"下单量从高到低"
				},{
					id:"2",
					name:"下单量从低到高"
				},{
					id:"3",
					name:"消费金额从高到低"
				},{
					id:"4",
					name:"消费金额从低到高"
				}],							//选择用户的筛选条件
				checkReq:{
					filter_id:"",
					filter_page:1,
					filter_pagesize:10,
				},
				table_obj:{
					tableData:[{
						user_id:"1",
						phone:"13067882143",
						order_num:"3",
						order_money:"302"
					},{
						user_id:"2",
						phone:"13067882143",
						order_num:"7",
						order_money:"1223"
					}],							//用户列表
				},
				user_nums:0,					//已选的用户数量

			}
		},
		created(){
			//获取列表
			// this.getList();
		},
		watch:{
			//时间
			date:function(n){
				this.req.created_time_start = n && n.length> 0?n[0]:"";
				this.req.created_time_end = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//创建红包
			create(){
				this.showCreate = true;
				this.createReq = {
					name:"",
					money:"",
					package_type:"1",
					expiration_time:"1",
				};
			},
			handleSelectionChange(val) {
				let user_ids = [];
				val.map(item => {
					user_ids.push(item.user_id)
				})
				this.user_nums = user_ids.length;
				this.createReq.user_ids = user_ids.join(',');
				console.log(this.createReq.user_ids)
			},
			//确认创建
			submit(){
				if(this.createReq.name == ""){
					this.$message.warning("请输入红包名称");
				}else if(this.createReq.money == ""){
					this.$message.warning("请输入红包金额");
				}else if(this.createReq.package_type == "1" && this.full_money == ""){
					this.$message.warning("请输入满减金额");
				} else {
					if(this.createReq.package_type == "1"){
						this.createReq.full_money = this.full_money;
					}
					console.log(this.createReq);
				}
			},
			//获取列表
			getList(){
				resource.letterslist(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页(红包记录)
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
			//搜索用户列表
			getUserList(){
				console.log(this.checkReq);
			},
			//分页（用户列表）
			handleFilter(val) {
				this.checkReq.filter_pagesize = val;
				//获取列表
				this.getList();
			},
			handleCurrentFilter(val) {
				this.checkReq.filter_page = val;
				//获取列表
				this.getList();
			}
		}
	}
</script>














v x  ]