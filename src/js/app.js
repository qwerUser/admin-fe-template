import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../css/core.less';
import initComponent from './components';
initComponent(Vue);
import Main from './main.vue';

import {ajax} from './modules/request';


Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
import { createMenu } from './modules/menu';
async function startApp() {
	let router = require('./router').default;
	let store = require('./store').default;
	try{
		// 检查用户登录状态是否过期
		let isSignInData = await ajax({
			url:'/user/isSignIn',
			type:'get'
		})
		if(isSignInData.success){
			let menu = createMenu(['home','userPermission','userSettingName','userSettingList','main1-1','main1-2','main1-3','main1-4','main1-5','main1-6']);
      store.commit('app/setMenu',menu);
			store.commit('app/setSignType',true);
			router.replace('/main');
		}
	}catch(e){
		console.log(e)
	}
	
	
	new Vue({
		el:'#app',
		store,
		router,
		render: h => h(Main)
	})
}
startApp()
