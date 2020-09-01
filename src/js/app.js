import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import initComponent from './components';
initComponent(Vue);
import Main from './main.vue';


Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
function startApp() {
		let router = require('./router').default;
		let store = require('./store').default;
    new Vue({
			el:'#app',
			store,
			router,
			render: h => h(Main)
		})
}
startApp()
