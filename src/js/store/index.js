import Vuex from 'vuex';
const constStoreObject = {}

const files = require.context('../store',true,/(.js)$/);
files.keys().forEach(key => {
	if(key!=='./index.js'){
		constStoreObject[key.slice(2).split('.')[0].replace(/\//g,'_')] = files(key).default;
	}
});
const store = new Vuex.Store({
	modules:constStoreObject
})

export default store;