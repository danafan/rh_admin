<template>
	<div class="box">
		<el-container style="height:100%">
			<el-aside>
				<div class="title">热乎优选后台管理系统</div>
				<el-menu
				:default-active="activeIndex"
				class="el-menu-vertical-demo"
				background-color="#ffffff"
				active-text-color="#fff"
				text-color="#333333"
				:unique-opened="true"
				:router="true"
				@select="handleSelect"
				>
				<el-menu-item index="/index">
					<i class="el-icon-menu"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>订单管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/order">订单管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>资金管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/money_record">资金明细</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>商品管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/goods">商品管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>评论管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/comment">评论管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>用户管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/user">用户管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>商家管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/store">商家管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>系统管理</span>
					</template>
					<el-menu-item-group>     
						<el-menu-item index="/announcement">商家公告</el-menu-item>
						<el-menu-item index="/red_envelope">用户红包</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header class="header">
				<!-- <div class="breadcrumb">面包屑</div> -->
				<div class="user_set">
					<div class="username">ranbol</div>
					<div class="line"></div>
					<div class="tui" @click="exit">退出</div>
				</div>
			</el-header>
			<el-main class="main">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-main>
		</el-container>
	</el-container>
</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.title{
		background: #fff;
		width: 256px;
		height: 64px;
		display:flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: #333;
	}
	.header{
		width: 100%;
		height: 64px;
		background:#fff !important;
		display:flex;
		align-items: center;
		justify-content: flex-end;
		// .breadcrumb{
		// 	font-size: 18px;
		// 	color: #333333;
		// 	font-weight:600;
		// }
		.user_set{
			display: flex;
			align-items: center;
			.username{
				font-size: 14px;
				color: #000000;
			}
			.line{
				margin-right: 8px;
				margin-left: 8px;
				border-right: 1px solid #008DFF;
				height:13px;
			}
			.tui{
				font-size: 14px;
				color: #333333;
			}
		}
	}
	.el-menu-item.is-active {
		background:#008DFF !important;
	}
	.el-aside{
		background:#fff !important;
	}
	.el-menu{
		border: none !important;	
	}
	.main{
		background: #F0F2F5;
		height: 100%;
		overflow-y: scroll;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				activeIndex:"",
				admin_name:""
			}
		},
		created(){
			this.admin_name = localStorage.getItem("admin_admin_name");
			let tab = sessionStorage.getItem("tab");
			if(!tab){
				this.activeIndex = '/index';
			}else{
				this.activeIndex = tab;
			}
		},	
		watch:{
			$route(n){
				this.handleSelect(n.path);
			}
		},
		methods:{
			handleSelect(index){
				this.activeIndex = index;
			},
			//点击退出
			exit(){
				this.$confirm('确认退出当前账户?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.clear();
					this.$message.success(res.data.msg);
					this.$router.push('/login');
					// resource.quit().then(res => {
					// 	if(res.data.code == 1){
					// 		localStorage.clear();
					// 		this.$message.success(res.data.msg);
					// 		this.$router.push('/login');
					// 	}else{
					// 		this.$message.warning(res.data.msg);
					// 	}
					// })
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});          
				});
			}
		}
	}
</script>




















