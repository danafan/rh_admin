<template>
	<div class="cardBox">
		<div class="left_box">
			<div class="name">热乎优选后台</div>
		</div>
		<div class="right_box">
			<div class="loginForm">
				<div class="login_title">登录</div>
				<div class="label">账户</div>
				<input class="input" v-model="request.admin_name" placeholder="请输入账号" @keyup.enter="login"></input>
				<div class="label">密码</div>
				<input class="input" type="password" v-model="request.password" placeholder="请输入密码" @keyup.enter="login"></input>
				<div class="label">验证码</div>
				<div class="codeBox">
					<input class="captcha" v-model="request.captcha" placeholder="请输入验证码" @keyup.enter="login"></input>
					<div class="code">
						<img class="code_img" :src="codeUrl">
					</div>
					<div class="toast" @click="getCode">看不清，换一张</div>
				</div>
				<!-- <div class="codeBox">
					<input class="captcha" v-model="request.captcha" placeholder="请输入验证码" @keyup.enter="login"></input>
					<div class="code" @click="getCode">{{codebutTxt}}</div>
				</div> -->
			</div>
			<div class="login_but" @click="login">登录</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.cardBox{
	position: absolute;
	top: 0;
	left: 0;
	width:100%;
	height: 100%;
	display: flex;
	.left_box{
		background: #ec722e;
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.name{
			font-size: 36px;
			font-weight:500;
			color: #FFFFFF;
			z-index: 1;
		}
	}
	.right_box{
		width: 50%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.loginForm{
			width: 480px;
			.login_title{
				margin-bottom: 42px;
				width: 100%;
				text-align: center;
				font-size: 20px;
				color:#ec722e;
			}
			.label{
				margin-bottom: 10px;
				font-size: 16px;
				color:#999990;
			}
			.input{
				padding-left: 16px;
				background: #F0F0F0;
				margin-bottom: 20px;
				width: 100%;
				height: 48px;
				border-radius:4px;
				color:#999999;
				font-size: 14px;
			}
			.codeBox{
				width: 100%;
				height: 48px;
				display: flex;
				align-items: center;
				.captcha{
					flex:1;
					padding-left: 16px;
					background: #F0F0F0;
					height: 48px;
					border-radius:4px;
					color:#999999;
					font-size: 14px;
				}
				.code{
					margin-left: 16px;
					margin-right: 16px;
					width:158px;
					height:48px;
					position: relative;
					.code_img{
						display: block;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}
				.toast{
					font-size: 14px;
					color:#ec722e;
				}
			}
		}
	}
	.login_but{
		margin-top: 108px;
		width:140px;
		text-align: center;
		height:38px;
		line-height: 38px;
		background:#ec722e;
		border-radius:2px;
		font-size: 14px;
		color:#FFFFFF;
	}
}
</style>
<script>
	// import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				request:{
					admin_name:"",
					password:"",
					captcha:""
				},
				notBut: true,                   	//默认获取验证码按钮可点击
      			codebutTxt: "获取验证码",         	//按钮文字
      			time:60,                        	//默认倒数60秒
      		}
      	},
      	created(){
      		this.codeUrl = this.captcha;
      	},
      	methods:{
      		//获取验证码
      		getCode(){
      			if(!this.judgmentPhone.test(this.request.admin_name)){
      				this.$message.warning("请输入正确的账号");
      			}else{
        			if(this.notBut == true){//如果按钮可以点击
        				let obj = {
        					phone: this.request.admin_name,
        				}
        				resource.getCaptcha(obj).then(res => {
            				if(res.data.code == 1){ //发送成功
            					this.$message.success("发送成功...");
            					this.time = res.data.data;
            					this.timeDown();
            				}else{
            					this.$message.warning(res.data.msg);
            				}
            			});
        			}else{
        				this.$message.warning("操作频繁");
        			}
        		}
        	},
			// 倒计时
			timeDown () {
				var _this = this;
				if (_this.time > 0) {
        			_this.notBut = false;   //按钮不可点击
        			_this.time --;
        			_this.codebutTxt = "重新发送" + _this.time + "秒";
        			setTimeout(_this.timeDown, 1000);
        		} else {
        			_this.notBut = true;    //按钮可以点击
        			_this.time = 60;
        			_this.codebutTxt = "获取验证码";
        		}
        	},
			//点击登录
			login(){
				if(this.request.admin_name == ''){
					this.$message.warning("请输入账号");
				}else if(this.request.password == ''){
					this.$message.warning("请输入密码");
				}else if(this.request.captcha == ''){
					this.$message.warning("请输入验证码");
				}else{
					resource.login(this.request).then(res => {
						if(res.data.code == '1'){
							localStorage.setItem("token",res.data.data.login_token);
							localStorage.setItem("secret_key",res.data.data.secret_key);
							localStorage.setItem("admin_id",res.data.data.admin_id);
							localStorage.setItem("admin_name",res.data.data.admin_name);
							this.$message.success("登录成功");
							this.$router.push('/index');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			}
		}
	}
</script>