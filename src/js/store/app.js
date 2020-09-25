export default {
	namespaced: true,
	state: {
		isSignIn:false,
		menu:[]
	},
	mutations: {
		setSignType(state,type){
			state.isSignIn = type;
		},
		setMenu(state,list){
			state.menu = list || [];
		}
	},
	getters: {
		getAppMenu(state){
			return state.menu;
		}
	}
};