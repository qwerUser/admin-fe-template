<template>
	<div>
		<div v-if="isLogin">
			<router-view></router-view>
		</div>
		<div class="main-container" v-else>
			<div class="main-top">
				<div class="main-top-title">管理台</div>
				<div class="main-top-middle"></div>
				<div class="main-top-right">用户名</div>
			</div>
			<div class="main-view">
				<el-menu class="menu-main">
					<div v-for="item in getAppMenu" :key="item.key">
						<el-submenu v-if="item.child" :index="item.key">
							<template slot="title">
								<i class="el-icon-menu"></i>
								<span>{{item.name}}</span>
							</template>
							<div v-for="secondItem in item.child" :key="secondItem.key">
								<el-submenu v-if="secondItem.child" :index="item.key+'-'+secondItem.key">
									<span slot="title"><i class="el-icon-more"></i>{{secondItem.name}}</span>
									<el-menu-item v-for="thirdItem in secondItem.child" :key="thirdItem.key" :index="item.key+'-'+secondItem.key+'-'+thirdItem.key" @click="goMenuPath(thirdItem.path)">{{thirdItem.name}}</el-menu-item>
								</el-submenu>
								<el-menu-item v-else :index="item.key+'-'+secondItem.key" @click="goMenuPath(secondItem.path)">
									<span slot="title">{{secondItem.name}}</span>
								</el-menu-item>
							</div>
						</el-submenu>
						<el-menu-item v-else :index="item.key" @click="goMenuPath(item.path)">
							<i class="el-icon-menu"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</div>
				</el-menu>
				<router-view class="main-router-view"></router-view>
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
// import { menuList as menu } from './modules/menu';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			isLogin:true,
			// mainMenu:menu
		}
	},
	computed: {
		...mapGetters('app',['getAppMenu']),
	},
	created() {
		this.isLogin = (this.$route.path === '/' || this.$route.path === '/login') ? true : false;
		// console.log(this.isLogin)
	},
	mounted() {
		
	},
	methods: {
		goMenuPath(path){
			if(this.$route.path === path){
				return;
			}
			this.$router.push(path)
		}
	},
	watch:{
		'$route.path'(){
			this.isLogin = (this.$route.path === '/' || this.$route.path === '/login') ? true : false;
		},
		// getAppMenu(){

		// }
	}
}
</script>
<style lang="less" scoped>
@import '../css/core';
// @backgroundColor:#1d365d;
// // 菜单字体颜色，选中和未选中
// @normalFontColor: #b9c8e0;
// @selectFontColor: #fff;
// // 页面字体颜色
// @fontColor: #333;
.main-container{
	display: flex;
	flex:1;
	height:100%;
	flex-direction: column;
	.menu-main{
		width: 240px;
		overflow: auto;
	}
	.menu-main::-webkit-scrollbar {
    display:none
	}
	.main-top{
		display: flex;
		height:60px;
		width: 100%;
		background-color: @backgroundColor;
		color:@normalFontColor;
		.main-top-title{
			width:240px;
			text-align: center;
			line-height: 60px;
			font-size: 20px;
		}
		.main-top-middle{
			flex:1;
		}
		.main-top-right{
			line-height: 60px;
			padding-right: 20px;
		}
	}
	.main-view{
		flex:1;
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}
	.main-router-view{
		padding:20px;
		flex:1;
		overflow: auto;
	}
}


</style>
