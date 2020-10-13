<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="商户编号：">
					<el-input v-model="req.store_id" placeholder="输入商户编号"></el-input>
				</el-form-item>
				<el-form-item label="商户名称：">
					<el-input v-model="req.store_name" placeholder="输入商户名称"></el-input>
				</el-form-item>
				<el-form-item label="法人姓名：">
					<el-input v-model="req.user_name" placeholder="输入法人姓名"></el-input>
				</el-form-item>
				<el-form-item label="经营品类：">
					<el-select v-model="req.cate_id" clearable placeholder="全部">
						<el-option v-for="item in cate_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="营业状态：">
					<el-select v-model="req.business_status" clearable placeholder="不限">
						<el-option v-for="item in business_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
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
			<el-form-item label="商户状态：">
				<el-select v-model="req.store_status" clearable placeholder="不限">
					<el-option v-for="item in store_status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="120" prop="store_id" label="商户编号" align="center">
			</el-table-column>
			<el-table-column width="220" prop="create_date" label="注册时间" align="center">
			</el-table-column>
			<el-table-column label="店铺主图" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookImg(scope.row.store_img,'1')">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column width="150" show-overflow-tooltip prop="store_name" label="商户名称" align="center">
			</el-table-column>
			<el-table-column width="120" prop="user_name" label="法人姓名" align="center">
			</el-table-column>
			<el-table-column width="200" prop="id_number" label="身份证号" align="center">
			</el-table-column>
			<el-table-column width="120" label="身份证图片" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookImg(scope.row.user_cart_img,'2')">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column width="120" prop="cate_name" label="经营品类" align="center">
			</el-table-column>
			<el-table-column width="220" show-overflow-tooltip prop="store_address" label="店铺地址" align="center">
			</el-table-column>
			<el-table-column width="120" prop="business_hours" label="营业时间" align="center">
			</el-table-column>
			<el-table-column label="营业执照" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookImg(scope.row.business_license,'3')">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column width="120" label="食品经营许可证" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="lookImg(scope.row.license,'4')">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column width="120" prop="goods_num" label="菜品数量" align="center">
			</el-table-column>
			<el-table-column width="120" prop="package_num" label="套餐数量" align="center">
			</el-table-column>
			<el-table-column width="120" prop="has_been" label="已上架" align="center">
			</el-table-column>
			<el-table-column width="120" prop="sold_num" label="已售数量" align="center">
			</el-table-column>
			<el-table-column width="120" prop="total_money" label="总销售额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="withdrawal_money" label="待提现余额（元）" align="center">
			</el-table-column>
			<el-table-column width="120" prop="contact" label="联系人" align="center">
			</el-table-column>
			<el-table-column width="150" prop="contact_phone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column width="120" prop="operating_state" label="营业状态" align="center">
			</el-table-column>
			<el-table-column width="180" fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small">资金记录</el-button>
					<el-button type="text" size="small" v-if="scope.row.store_status == '1'" @click="settingStore(scope.row.store_status)">禁用</el-button>
					<el-button type="text" size="small" v-if="scope.row.store_status == '2'" @click="settingStore(scope.row.store_status)">启用</el-button>
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
<!-- 图片 -->
<el-dialog :title="title" :visible.sync="showImg">
	<div class="dialog_box">
		<el-carousel class="fileCon" :loop="false">
			<el-carousel-item class="fileCon" v-for="item in img_list" :key="item">
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
					store_id:"",
					store_name:"",
					user_name:"",
					cate_id:"",
					business_status:"",
					store_status:"",
					create_start_time:"",
					create_end_time:""
				},								//请求参数
				cate_list:[{
					id:"1",
					name:"火锅"
				},{
					id:"2",
					name:"烧烤烤肉"
				},{
					id:"3",
					name:"海鲜"
				}],								//经营品类
				business_status_list:[{
					id:"1",
					name:"营业中"
				},{
					id:"2",
					name:"已打烊"
				},{
					id:"3",
					name:"已停业"
				}],								//经营状态
				store_status_list:[{
					id:"1",
					name:"已启用"
				},{
					id:"2",
					name:"已禁用"
				}],								//店铺状态
				create_date:[],					//注册时间
				dataObj:{data:[{
					store_id:"1",
					create_date:'2020-09-20 12:34:52',
					store_img:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					store_name:"遇上侬火锅",
					user_name:"彪子",
					id_number:"152223184736453546",
					user_cart_img:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg","https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					cate_name:'火锅',
					store_address:'浙江省杭州市萧山区城厢街道104号',
					business_hours:'07:00 - 21:00',
					business_license:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					license:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					goods_num:'15',
					package_num:"6",
					has_been:'6',
					sold_num:'182',
					total_money:'9860',
					withdrawal_money:'0',
					contact:'菜鸟彪',
					contact_phone:'13067882143',
					operating_state:'营业中',
					store_status:'1'
				},{
					store_id:"1",
					create_date:'2020-09-20 12:34:52',
					store_img:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					store_name:"遇上侬火锅",
					user_name:"彪子",
					id_number:"152223184736453546",
					user_cart_img:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg","https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					cate_name:'火锅',
					store_address:'浙江省杭州市萧山区城厢街道104号',
					business_hours:'07:00 - 21:00',
					business_license:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					license:["https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg"],
					goods_num:'15',
					package_num:"6",
					has_been:'6',
					sold_num:'182',
					total_money:'9860',
					withdrawal_money:'0',
					contact:'菜鸟彪',
					contact_phone:'13067882143',
					operating_state:'营业中',
					store_status:'2'
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
				showImg:false,
				title:'',
				img_list:[],
				store_status:'1',//1:禁用；2:启用
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
			//查看图片
			lookImg(img_list,type){
				if(type == '1'){
					this.title = '店铺主图';
				}else if(type == '2'){
					this.title = '身份证图片';
				}else if(type == '3'){
					this.title = '营业执照';
				}else if(type == '4'){
					this.title = '食品经营许可证';
				}
				this.showImg = true;
				this.img_list = img_list;
			},
			//设置店铺（禁用、启用）
			settingStore(status){
				if(status == '1'){
					this.$prompt('禁用后该商家将不能发布商品，已上架的商品也不在展示，确认禁用?', '禁用原因', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({ value }) => {
						this.$message({
							type: 'success',
							message: '你的邮箱是: ' + value
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入'
						});       
					});
				}else{
					this.$confirm('确认启用?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$message({
							type: 'success',
							message: '已启用!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}
				
			}
		}

	}
</script>














v x  ]