export default {
	namespaced: true,
	state: {
		userName:'111'
	},
	mutations: {
		setUserName(state,name){
			state.userName = name;
		}
	},
	getters: {
		
	}
};