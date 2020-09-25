// 一级菜单对象（所有的一级菜单都必须配置在这里）
const firstMenu = {
	'home':{
		name:'主页',
		key:'home',
		path:'/home'
	},
	'main':{
		name:'一级菜单',
		key:'first'
	},
	'setting':{
		name:'设置',
		key:'setting'
	}
}

// 二级菜单（所有的二级菜单都必须配置在这里）
const secondMenu = {
	'main1':{
		parent:'main',
		name:'权限设置',
		key:'main1'
	},
	'userSetting':{
		parent:'setting',
		name:'用户设置',
		key:'userSetting'
	},
	'menuSetting':{
		parent:'setting',
		name:'菜单设置',
		key:'menuSetting'
	},
	'mainMenu':{
		parent:'main',
		name:'主页菜单',
		key:'mainMenu'
	}
}

// 权限菜单对象,对象键名需要与一级菜单或二级菜单键名相同，所有权限均需配置在此（无论是几级菜单，只要是该菜单下再无子菜单就加在下面,parent的值可以为一级或二级菜单的键名）
const permission = {
	'userSettingList':{
		parent:'userSetting',
		name:'用户列表设置',
		key:'userSettingList',
		path:'/user/settingList'
	},
	'userSettingName':{
		parent:'userSetting',
		name:'用户名设置',
		key:'userSettingName',
		path:'/user/settingName'
	},
	'userPermission':{
		parent:'setting',
		name:'权限设置',
		key:'userPermission',
		path:'/user/permission'
	},
	'main1-1':{
		parent:'main1',
		name:'权限设置',
		key:'main1-1',
		path:'/main/main1-1'
	},
	'main1-2':{
		parent:'main1',
		name:'权限设置',
		key:'main1-2',
		path:'/main/main1-2'
	},
	'main1-3':{
		parent:'main1',
		name:'权限设置',
		key:'main1-3',
		path:'/main/main1-3'
	},
	'main1-4':{
		parent:'main1',
		name:'权限设置',
		key:'main1-4',
		path:'/main/main1-4'
	},
	'main1-5':{
		parent:'main1',
		name:'权限设置',
		key:'main1-5',
		path:'/main/main1-5'
	},
	'main1-6':{
		parent:'main1',
		name:'权限设置',
		key:'main1-6',
		path:'/main/main1-6'
	},
	'home':{
		name:'主页',
		key:'home',
		path:'/main'
	}
}
/**
 * 根据权限列表返回菜单数组
 * @param {*} permissionList 权限列表
 * @return {Array} 当前用户的菜单列表
 */
export function createMenu(permissionList){
	let secondeMenuData = {};
	let menu = permissionList.reduce((preData,cur,index) => {
		let currentData = permission[cur];
		if(!currentData){
			return preData;
		}
		let parentName = currentData.parent || '';
		// 判断是否有父级，如果没有则为一级菜单
		if(parentName){
			// 判断一级菜单是否是当前权限菜单的父级，如果不是则当前权限的父级为二级菜单
			if(preData[parentName]){
				preData[parentName].child = preData[parentName].child || [];
				preData[parentName].child.push(currentData);
			}else{
				let secodeData = secondMenu[parentName];
				if(secondeMenuData[parentName]){
					secodeData = secondeMenuData[parentName];
				}else{
					secodeData.child = secodeData.child || [];
				}
				secodeData.child.push(currentData);
				secondeMenuData[parentName] = secodeData;
			}
		}else{
			preData[cur] = currentData;
		}
		return preData
	},firstMenu)
	// 将二级菜单放到一级菜单的child字段中
	for(const [key,item] of Object.entries(secondeMenuData)){
		let topName = item.parent || '';
		menu[topName].child = menu[topName].child || [];
		menu[topName].child.push(item)
	}
	let menuList = [];
	// 将生成当前用户的菜单处理成菜单数组
	for(const [key,item] of Object.entries(menu) ){
		if(item.path || item.child){
			menuList.push(item);
		}
	}
	return menuList;
}


