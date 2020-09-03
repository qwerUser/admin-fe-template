export default {
	namespaced: true,
	state: {
		isSignIn:false
	},
	mutations: {
		setSignType(state,type){
			state.isSignIn = type;
		}
	},
	getters: {
		
	}
};