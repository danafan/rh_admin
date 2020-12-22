<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="用户手机号：">
					<el-input v-model="req.user_id" placeholder="输入用户手机号"></el-input>
				</el-form-item>
				<el-form-item label="相关商家：">
					<el-select v-model="req.store_id" filterable clearable placeholder="全部">
						<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="等级评分：">
					<el-select v-model="req.level_star">
						<el-option v-for="item in level_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申诉状态：">
					<el-select v-model="req.complaint_status">
						<el-option v-for="item in complaint_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="评论时间：">
					<el-date-picker
					v-model="comment_date"
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
			<el-table-column width="220" show-overflow-tooltip prop="user_name" label="用户手机号" align="center">
			</el-table-column>
			<el-table-column width="220" show-overflow-tooltip prop="comment_content" label="用户评论" align="center">
			</el-table-column>
			<el-table-column width="220" show-overflow-tooltip prop="reply_content" label="商家回复" align="center">
			</el-table-column>
			<el-table-column label="评论图片" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="goodsImg(scope.row.comment_img_list)">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="level_start" label="等级评分" align="center">
			</el-table-column>
			<el-table-column width="220" prop="comment_time" label="评论时间" align="center">
			</el-table-column>
			<el-table-column width="220" prop="store_name" label="相关商家" align="center">
			</el-table-column>
			<el-table-column width="220" prop="complaint_text" label="申诉状态" align="center">
			</el-table-column>
			<el-table-column width="120" fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" v-if="scope.row.complaint_status == '1'" @click="audit(scope.row.comment_id)">审核</el-button>
					<el-button type="text" size="small" v-if="scope.row.complaint_status == '2'" @click="setQuality(scope.row.comment_id)">设为优质</el-button>
					<el-button type="text" size="small" v-if="scope.row.complaint_status == '4'" @click="lookDetail(scope.row.comment_id)">失败原因</el-button>
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
	<!-- 申诉内容 -->
	<el-dialog title="审核申诉" :visible.sync="showAudit">
		<div class="audit_title">申诉原因：</div>
		<div class="why_item">同行恶意差评</div>
		<div class="why_item">用户选错评分</div>
		<div class="why_item">用户提出不合理要求</div>
		<div class="audit_title">详细描述：</div>
		<div class="why_item">用户提出不合理要求用户提出不合理要求用户提出不合理要求用户提出不合理要求用户提出不合理要求</div>
		<el-dialog
		width="30%"
		title="拒绝原因"
		:visible.sync="innerVisible"
		append-to-body>
		<el-input
		type="textarea"
		:rows="3"
		placeholder="请输入拒绝原因"
		v-model="refused_why">
	</el-input>
	<div slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="Refused">确定</el-button>
	</div>
</el-dialog>
<div slot="footer" class="dialog-footer">
	<el-button size="small" type="primary" @click="auditFun('1')">拒绝</el-button>
	<el-button size="small" type="primary" @click="auditFun('2')">通过</el-button>
</div>
</el-dialog>
<!-- 评论图片 -->
<el-dialog title="评论图片" :visible.sync="showImg">
	<div class="dialog_box">
		<el-carousel class="fileCon" :loop="false">
			<el-carousel-item class="fileCon" v-for="item in comment_img_list" :key="item">
				<img class="fileCon" :src="item">
			</el-carousel-item>
		</el-carousel>
	</div>
	<div slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="showImg = false">关 闭</el-button>
	</div>
</el-dialog>
<!-- 拒绝原因 -->
<el-dialog
width="30%"
title="失败原因"
:visible.sync="whyDetail">
<div class="why_item">这是拒绝原因</div>
<div slot="footer" class="dialog-footer">
	<el-button size="small" type="primary" @click="whyDetail = false">关闭</el-button>
</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.audit_title{
	margin-bottom: 10px;
}
.why_item{
	margin-bottom: 5px;
	color: #e84d2a;
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
					user_id:"",
					store_id:"",
					level_star:"",
					complaint_status:"",
					comment_start_time:"",
					comment_end_time:""
				},								//请求参数
				comment_date:[],				//申诉时间
				level_list:[{
					id:"",
					name:"不限"
				},{
					id:"1",
					name:"1分"
				},{
					id:"2",
					name:"2分"
				},{
					id:"3",
					name:"3分"
				},{
					id:"4",
					name:"4分"
				},{
					id:"5",
					name:"5分"
				}],								//等级评分
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
				complaint_status_list:[{
					id:"",
					name:"不限"
				},{
					id:"1",
					name:"申诉中"
				},{
					id:"2",
					name:"未申诉"
				},{
					id:"3",
					name:"申诉通过"
				},{
					id:"4",
					name:"申诉失败"
				}],								//申诉状态
				dataObj:{data:[{
					comment_id:"1",
					user_id:"1",
					user_name:"Ranbol",
					comment_content:'这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容',
					reply_content:"这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容",
					comment_img_list: ['https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg', 'https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-005.jpg', 'https://img.ivsky.com/img/tupian/t/202002/14/xican_meishi-001.jpg'],
					level_start:'4',
					comment_time:'2020-09-20 12:34:23',
					store_name:"遇上侬火锅",
					complaint_status:'1',
					complaint_text:'申诉中'
				},{
					comment_id:"1",
					user_id:"1",
					user_name:"Ranbol",
					comment_content:'这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容',
					reply_content:"这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容",
					comment_img_list: ['https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg', 'https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-005.jpg', 'https://img.ivsky.com/img/tupian/t/202002/14/xican_meishi-001.jpg'],
					level_start:'4',
					comment_time:'2020-09-20 12:34:23',
					store_name:"遇上侬火锅",
					complaint_status:'2',
					complaint_text:'未申诉'
				},{
					comment_id:"1",
					user_id:"1",
					user_name:"Ranbol",
					comment_content:'这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容',
					reply_content:"这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容",
					comment_img_list: ['https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg', 'https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-005.jpg', 'https://img.ivsky.com/img/tupian/t/202002/14/xican_meishi-001.jpg'],
					level_start:'4',
					comment_time:'2020-09-20 12:34:23',
					store_name:"遇上侬火锅",
					complaint_status:'3',
					complaint_text:'申诉通过'
				},{
					comment_id:"1",
					user_id:"1",
					user_name:"Ranbol",
					comment_content:'这是评论内容这是评论内容这是评论内容这是评论内容这是评论内容',
					reply_content:"这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容这是回复内容",
					comment_img_list: ['https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-001.jpg', 'https://img.ivsky.com/img/tupian/t/202002/28/riben_meishi-005.jpg', 'https://img.ivsky.com/img/tupian/t/202002/14/xican_meishi-001.jpg'],
					level_start:'4',
					comment_time:'2020-09-20 12:34:23',
					store_name:"遇上侬火锅",
					complaint_status:'4',
					complaint_text:'申诉失败'
				}]},							//列表信息
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
				showAudit:false,				//审核申诉
				innerVisible:false,				//拒绝原因弹框
				refused_why:'',					//拒绝原因
				whyDetail:false,				//拒绝原因详情
				showImg:false,					//评论图片
				comment_img_list:[],			//评论图片列表
			}
		},
		created(){
			//获取列表
			// this.getList();
		},
		watch:{
			//申诉时间
			comment_date:function(n){
				this.req.comment_start_time = n && n.length > 0 ? n[0] : "";
				this.req.comment_end_time = n && n.length > 0 ? n[1] : "";
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
			goodsImg(comment_img_list){
				this.showImg = true;
				this.comment_img_list = comment_img_list;
			},
			//审核弹框
			audit(comment_id){
				this.showAudit = true;
			},
			//设为优质评价
			setQuality(){
				this.$confirm('设为优质评价后该用户将会获得10积分，确认设置?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已确认'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//审核
			auditFun(type){
				if(type == '1'){
					this.innerVisible = true;
				}else{
					this.showAudit = false;
				}
			},
			//确认拒绝
			Refused(){
				if(this.refused_why == ''){
					this.$message.warning('请输入拒绝原因');
				}else{
					this.innerVisible = false;
					this.showAudit = false;
					console.log(this.refused_why)
				}
			},
			//查看拒绝原因
			lookDetail(){
				this.whyDetail = true;
			}
			
		}

	}
</script>














v x  ]