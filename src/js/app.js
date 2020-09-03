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
async function startApp() {
	let router = require('./router').default;
	let store = require('./store').default;
	try{
		let isSignInData = await ajax({
			url:'/user/isSignIn',
			type:'get'
		})
		if(isSignInData.success){
			store.commit('app/setSignType',true)
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
