// 获取链接地址上的search
export function getUrlParams() {
	let url = location.search;
	var obj = {};
	if (url) {
		var params = url.substr(url.indexOf('?') + 1);
		params = params.split('&');
		for (var i = 0; i < params.length; i++) {
			var tem = params[i].split('=');
			obj[tem[0]] = decodeURIComponent(tem[1]);
		}
	}
	return obj;
}