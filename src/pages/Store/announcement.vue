<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="日期：">
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
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
			<el-button type="primary" size="small" @click="create">创建</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="300" prop="date" label="日期" align="center">
			</el-table-column>
			<el-table-column width="500" show-overflow-tooltip label="内容" align="center">
				<template slot-scope="scope">
					<div class="box">{{scope.row.content}}</div>
				</template>
			</el-table-column>
			<el-table-column label="包含商家" align="center">
				<template slot-scope="scope">
					<div class="box">{{scope.row.store_name}}</div>
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
<!-- 创建公告 -->
<el-dialog title="创建公告" :visible.sync="showCreate" :close-on-click-modal="false">
	<el-form size="small" style="width: 100%">
		<el-form-item label="公告内容：" label-width="220px" required>
			<el-input type="textarea" v-model="createReq.content" :row="5" placeholder="请输入内容"></el-input>
		</el-form-item>
		<el-form-item label="选择商家：" label-width="220px" required>
			<el-select v-model="store_ids" filterable multiple clearable placeholder="全部">
				<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
		</el-select>
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
				},				//请求参数
				date:[],	//时间
				dataObj:{
					data:[{
						date:"2020-01-24 13:32:34",
						content:"这是公告内容这是公告内容这是公告内容这是公告内容",
						store_name:"沪小川川菜馆,遇上侬火锅,江巴人重庆市井火锅"
					}]
				},	
				showCreate:false,
				store_list:[{
					id:"1",
					name:"沪小川川菜馆"
				},{
					id:"2",
					name:"遇上侬火锅"
				},{
					id:"3",
					name:"江巴人重庆市井火锅"
				}],							//商家列表
				store_ids:[],				//选中的商家列表
				createReq:{
					content:"",
					store_ids:""
				},
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
			//创建公告
			create(){
				this.showCreate = true;
				this.createReq = {
					content:"",
					store_ids:""
				};
				this.store_ids = [];
			},
			//确认创建
			submit(){
				if(this.createReq.content == ""){
					this.$message.warning("请输入公告内容");
				}else{
					this.createReq.store_ids = this.store_ids.join(',');
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
			}
		}
	}
</script>














v x  ]