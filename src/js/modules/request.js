import axios from 'axios';
import config from '../../../config';
import qs from 'qs';

axios.defaults.baseURL = config['REQUEST_URL'] || '';
// 请求拦截
axios.interceptors.request.use(
	config => {

		return config;
	},
	err => {
		return Promise.error(err);
	}
)
// 相应拦截
axios.interceptors.response.use(
	response => {

	},
	error => {

	}
)
/**
 * 请求方法
 * @param {*} data 
 * {
 * 		type:'post', 请求方式 get post
 *  	contentType:'json', json: 'application/json; charset=utf-8' | form: 'application/x-www-form-urlencoded; charset=utf-8' | multipart:mutipart/form-data
 * 		url: '/user/login',  接口地址
 * 		data:{name:'user',password:'123456'}  请求参数
 * }
 */
export function ajax(data){
	let type = (data.type || 'post').toLowerCase();
	let contentType = data.contentType || 'json';
	let requestObject = data.data || {};
	requestObject.ts = Date.now();
	let requestfun = {
		'get':() => {
			return axios.get(data.url,qs.stringify(requestObject))
		},
		'post':() => {
			let requestData;
			
			switch(contentType){
				case 'json':
				requestData = requestObject;
				break;
				case 'form':
				requestData = qs.stringify(requestObject);
				break;
				case 'multipart':
				requestData = new FormData();
				for(const [key,value] of Object.entries(requestObject)){
					requestData.append(key,value);
				}
				break;
			}
			return axios.post(data.url,requestData);
		}
	}
	return new Promise((resolve,reject) => {
		requestfun[type]().then(res=>{
			resolve(res)
		}).catch(e=>{
			reject(e)
		})
	})

}
