module.exports = Vue => {
	const files = require.context('../components',true,/(.vue)$/);
	files.keys().forEach(key => {
		Vue.component(key.slice(2).split('.')[0].replace(/\//g,'-'), resolve=>require([key],resolve));
	});
}
