<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="手机号：">
					<el-input v-model="req.phone" placeholder="输入注册手机号"></el-input>
				</el-form-item>
				<el-form-item label="提交时间：">
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
			<el-table-column prop="create_date" label="提交时间" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="注册手机号" align="center">
			</el-table-column>
			<el-table-column width="180" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="auditFun">审核</el-button>
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
<!-- 商家信息 -->
<el-dialog title="审核商家" :visible.sync="show_audit">
	<!-- 拒绝原因 -->
	<el-dialog width="30%" title="拒绝原因" :visible.sync="show_refused" append-to-body>
		<el-input type="textarea" :rows="3" placeholder="如 法人信息与营业执照不符" v-model="refused_why"> </el-input>
		<div slot="footer" class="dialog-footer">
			<el-button @click="show_refused = false" size="small">取消</el-button>
			<el-button type="primary" @click="refused" size="small">确认</el-button>
		</div>
	</el-dialog>
	<!-- 查看图片 -->
	<el-dialog :title="img_title" :visible.sync="showImg" append-to-body>
		<div class="dialog_box">
			<img class="fileCon" :src="img_url">
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" type="primary" @click="showImg = false">关 闭</el-button>
		</div>
	</el-dialog>
	<!-- 信息内容 -->
	<div class="info_title">法人信息</div>
	<div class="info_item">法人姓名：张大彪</div>
	<div class="info_item">法人身份证号：152223746453646354</div>
	<div class="img_row">
		<div class="img_box">
			<img class="img" src="../../assets/logo.png" @click="imgDialog('身份证正面')">
			<div class="img_toast">身份证正面</div>
		</div>
		<div class="img_box">
			<img class="img" src="../../assets/logo.png" @click="imgDialog('身份证反面')">
			<div class="img_toast">身份证反面</div>
		</div>
	</div>
	<div class="info_title">店铺信息</div>
	<div class="info_item">店铺名称：鱼夕酸菜鱼</div>
	<div class="info_item">经营品类：川菜</div>
	<div class="info_item">店铺地址：杭州市萧山区宁围街道126号</div>
	<div class="info_item">营业时间：7:00 - 21:00</div>
	<div class="img_box">
		<img class="img" src="../../assets/logo.png" @click="imgDialog('店铺主图')">
		<div class="img_toast">店铺主图</div>
	</div>
	<div class="info_item">联系人：李云龙</div>
	<div class="info_item">联系电话：13974635465</div>
	<div class="info_title">资质认证</div>
	<div class="img_row">
		<div class="img_box">
			<img class="img" src="../../assets/logo.png" @click="imgDialog('营业执照')">
			<div class="img_toast">营业执照</div>
		</div>
		<div class="img_box">
			<img class="img" src="../../assets/logo.png" @click="imgDialog('食品经营许可证')">
			<div class="img_toast">食品经营许可证</div>
		</div>
	</div>
	<div slot="footer" class="dialog-footer">
		<el-button @click="show_refused = true" size="small">拒绝</el-button>
		<el-button type="primary" @click="though" size="small">通过</el-button>
	</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.info_title{
	margin-bottom: 10px;
	margin-top: 10px;
	font-size: 16px;
	color: #333;
	font-weight: 500;
}
.img_row{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.img_box{
	width: 338px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.img{
		width: 338px;
		height: 260px;
	}
}
.dialog_box{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.fileCon{
		height: 400px;
		width: 520px;
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
					phone:"",
					create_start_time:"",
					create_end_time:""
				},								//请求参数
				create_date:[],					//提交时间
				dataObj:{data:[{
					phone:"1",
					create_date:'2020-09-20 12:34:52',
					auth_entication:'1',
					store_info:'1',
					certification:'1'
				},{
					phone:"1",
					create_date:'2020-09-20 12:34:52',
					auth_entication:'1',
					store_info:'0',
					certification:'1'
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
				show_audit:false,				//最外层弹框
				show_refused:false,				//拒绝弹框
				refused_why:"",					//拒绝原因
				showImg:false,					//查看图片
				img_title:"",					//图片弹框标题
				img_url:"",						//图片地址
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
			//点击审核
			auditFun(){
				this.show_audit = true;
			},
			//拒绝
			refused(){
				if(this.refused_why == ""){
					this.$message.warning("请输入拒绝原因");
				}else{
					console.log(this.refused_why);
					this.show_audit = false;
				}
			},
			//通过
			though(){
				this.$confirm('通过后商家即可暴露给用户，并且可以发布商品，确认通过?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已通过'
					});
					this.show_audit = false;
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//查看图片
			imgDialog(img_title){
				this.showImg = true;
				this.img_title = img_title;
				this.img_url = require('../../assets/logo.png');
			},
			//设置店铺（禁用、启用）
		// 	settingStore(status){
		// 		if(status == '1'){
		// 			this.$prompt('禁用后该商家将不能发布商品，已上架的商品也不在展示，确认禁用?', '禁用原因', {
		// 				confirmButtonText: '确定',
		// 				cancelButtonText: '取消',
		// 			}).then(({ value }) => {
		// 				this.$message({
		// 					type: 'success',
		// 					message: '你的邮箱是: ' + value
		// 				});
		// 			}).catch(() => {
		// 				this.$message({
		// 					type: 'info',
		// 					message: '取消输入'
		// 				});       
		// 			});
		// 		}else{
		// 			this.$confirm('确认启用?', '提示', {
		// 				confirmButtonText: '确定',
		// 				cancelButtonText: '取消',
		// 				type: 'warning'
		// 			}).then(() => {
		// 				this.$message({
		// 					type: 'success',
		// 					message: '已启用!'
		// 				});
		// 			}).catch(() => {
		// 				this.$message({
		// 					type: 'info',
		// 					message: '已取消'
		// 				});          
		// 			});
		// 		}
		// 	}
		// }

	}
}
</script>


