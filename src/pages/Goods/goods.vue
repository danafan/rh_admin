<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="商品编号：">
					<el-input v-model="req.goods_id" placeholder="输入订单编号"></el-input>
				</el-form-item>
				<el-form-item label="商家名称：">
					<el-select v-model="req.store_id" filterable clearable placeholder="不限">
						<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态：">
					<el-select v-model="req.goods_status">
						<el-option v-for="item in goods_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上架时间：">
					<el-date-picker
					v-model="up_shelves_date"
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
			<el-form-item label="下架时间：">
				<el-date-picker
				v-model="down_shelves_date"
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
		<el-table-column prop="goods_id" label="商品编号" align="center">
		</el-table-column>
		<el-table-column width="220" show-overflow-tooltip prop="goods_name" label="商品名称" align="center">
		</el-table-column>
		<el-table-column label="商品图片" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="goodsImg">查看</el-button>
			</template>
		</el-table-column>
		<el-table-column width="220" show-overflow-tooltip prop="store_name" label="所属商家" align="center">
		</el-table-column>
		<el-table-column width="120" prop="goods_price" label="商品价格（元）" align="center">
		</el-table-column>
		<el-table-column prop="sold_num" label="已售数量" align="center">
		</el-table-column>
		<el-table-column width="220" prop="up_shelves_date" label="上传时间" align="center">
		</el-table-column>
		<el-table-column width="220" prop="up_shelves_date" label="上架时间" align="center">
		</el-table-column>
		<el-table-column width="220" prop="down_shelves_date" label="下架时间" align="center">
		</el-table-column>
		<el-table-column width="120" prop="goods_status" label="状态" align="center">
		</el-table-column>
		<el-table-column width="200" fixed="right" label="操作" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="getDetail(scope.row.goods_id)">套餐内容</el-button>
				<el-button type="text" size="small" @click="Through(scope.row.goods_id)">通过</el-button>
				<el-button type="text" size="small" @click="Refused(scope.row.goods_id)">拒绝</el-button>
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
<!-- 套餐内容 -->
<el-dialog title="套餐内容" :visible.sync="showDetail">
	<div class="content_item">
		<div class="item_label">主食</div>
		<div class="item_val">
			<div class="val_box">米饭</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥2</div>
		</div>
		<div class="item_val">
			<div class="val_box">手擀面</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥16</div>
		</div>
		<div class="item_val">
			<div class="val_box">汤圆</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥5</div>
		</div>
	</div>
	<div class="content_item">
		<div class="item_label">涮菜</div>
		<div class="item_val">
			<div class="val_box">精品肥牛</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥2</div>
		</div>
		<div class="item_val">
			<div class="val_box">腐竹</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥16</div>
		</div>
		<div class="item_val">
			<div class="val_box">木耳</div>
			<div class="val_box">x1</div>
			<div class="val_box">¥5</div>
		</div>
	</div>
	<div class="total_price">合计：¥168</div>
	<div slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="showDetail = false">关 闭</el-button>
	</div>
</el-dialog>
<!-- 商品图片 -->
<el-dialog title="商品图片" :visible.sync="showImg">
	<div class="dialog_box">
		<el-carousel class="fileCon" :loop="false">
		<el-carousel-item class="fileCon" v-for="item in banner_list" :key="item">
			<img class="fileCon" :src="item">
		</el-carousel-item>
	</el-carousel>
	</div>
	
	<div slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="showImg = false">关 闭</el-button>
	</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.content_item{
	margin-bottom: 10px;
	.item_label{
		margin-bottom: 5px;
		font-size: 18px;
		font-weight: 700;
		color: #333;
	}
	.item_val{
		margin-bottom: 5px;
		color: #333;
		display: flex;
		align-items: center;
		.val_box{
			width: 200px;
		}
	}
}
.total_price{
	color: #333;
	font-weight: 700;
}
.dialog_box{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.fileCon{
	height: 400px;
	width: 520px;
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
					goods_id:"",
					store_id:"",
					goods_status:"",
					up_shelves_start_time:"",
					up_shelves_end_time:"",
					down_shelves_start_time:"",
					down_shelves_end_time:""
				},								//请求参数
				up_shelves_date:[],					//下单时间
				down_shelves_date:[],			//消费时间
				goods_status_list:[{
					id:"",
					name:"不限"
				},{
					id:"0",
					name:"待审核"
				},{
					id:"1",
					name:"已上架"
				},{
					id:"2",
					name:"待上架"
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
					goods_id:"1",
					up_shelves_date:'2020-09-20 12:34:52',
					goods_name:"遇上侬火锅2-4人套餐",
					store_name:"遇上侬火锅",
					goods_price:"98",
					sold_num:"108",
					down_shelves_date:"",
					goods_status:"待审核"
				},{
					goods_id:"2",
					up_shelves_date:'2020-09-20 12:34:52',
					goods_name:"遇上侬火锅2-4人套餐",
					store_name:"遇上侬火锅",
					goods_price:"98",
					sold_num:"108",
					down_shelves_date:"",
					goods_status:"已上架"
				},{
					goods_id:"3",
					up_shelves_date:'2020-09-20 12:34:52',
					goods_name:"遇上侬火锅2-4人套餐",
					store_name:"遇上侬火锅",
					goods_price:"98",
					sold_num:"108",
					down_shelves_date:"2020-09-20 12:34:52",
					goods_status:"待上架"
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
				showDetail:false,				//详情弹框
				showImg:false,					//商品图片
				banner_list: ['https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg', 'https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-005.jpg', 'https://img.ivsky.com/img/tupian/t/202002/14/xican_meishi-001.jpg']
			}
		},
		created(){
			//获取列表
			// this.getList();
		},
		watch:{
			//上架时间
			up_shelves_date:function(n){
				this.req.up_shelves_start_time = n && n.length > 0 ? n[0] : "";
				this.req.up_shelves_end_time = n && n.length > 0 ? n[1] : "";
			},
			//下架时间
			down_shelves_date:function(n){
				this.req.down_shelves_start_time = n && n.length > 0 ? n[0] : "";
				this.req.down_shelves_start_time = n && n.length > 0 ? n[1] : "";
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
			//查看商品图片
			goodsImg(){
				this.showImg = true;
			},
			//查看详情
			getDetail(goods_id){
				this.showDetail = true;
			},
			//通过
			Through(goods_id){
				this.$confirm('通过后商品将会展示给用户，确认通过?', '提示', {
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
			},
			//拒绝
			Refused(goods_id){
				this.$prompt('请输入拒绝原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({ value }) => {
					this.$message({
						type: 'success',
						message: '拒绝原因是: ' + value
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});       
				});
			}
		}

	}
</script>














v x  ]