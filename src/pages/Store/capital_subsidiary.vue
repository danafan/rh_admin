<template>
	<div>
		<el-card>
			<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="store_name" label="商户名称" align="center">
				</el-table-column>
				<el-table-column prop="store_id" label="商户编号" align="center">
				</el-table-column>
				<el-table-column prop="create_date" label="时间" align="center">
				</el-table-column>
				<el-table-column prop="change_money" label="金额" align="center">
				</el-table-column>
				<el-table-column prop="change_type" label="类型" align="center">
				</el-table-column>
				<el-table-column prop="balance" label="余额" align="center">
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
					pagesize:10
				},								//请求参数
				dataObj:{data:[{
					store_name:"遇上侬火锅",
					store_id:"1",
					create_date:'2020-09-20 13:23:34',
					change_money:"88",
					change_type:"商户提现",
					balance:"0"
				},{
					store_name:"遇上侬火锅",
					store_id:"1",
					create_date:'2020-09-20 13:23:34',
					change_money:"98",
					change_type:"核销收入",
					balance:"98"
				}]}
			}
		},
		created(){
			let store_id = this.$route.query.store_id;
			console.log(store_id);
			//获取列表
			// this.getList();
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
			}


		}

	}
</script>














v x  ]