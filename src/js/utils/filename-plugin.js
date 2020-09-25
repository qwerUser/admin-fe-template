const fs = require('fs');
const pathDir = require('path');
const types = require('babel-types');
module.exports = (api) => {
	function getFileName(dir,dirName,list){
		let resultList = fs.readdirSync(dir);
		resultList.forEach(item=>{
			let newPath = dir+'/'+item;
			let stat = fs.statSync(newPath);
			if(stat.isDirectory()){
				dirName += '/'+item;
				getFileName(newPath,dirName,list);
			}else{
				let nameList = newPath.split('/pages');
				let pathname = nameList[nameList.length - 1].split('.')[0].slice(1);
				let pagename = pathname.replace(/\//g,'');
				const relativePath = (dirName+'/'+item).split('.')[0].slice(1)
				list.push({
					path:pathname,
					pagename,
					relativePath:relativePath,
					fileName:item
				});
			}
		})
	}
	return {
		visitor:{
			Identifier(path){
				const node = path.node;
				// 获取兄弟节点
				const siblingPath = path.parentPath.node.init;
				let elementArray = [];
				// 获取根节点
				const rootPath = path.findParent(types.isProgram);
				// 自动加载路由文件
				if(node.name === 'constRouteList' && siblingPath){
					let routerList = [];
					getFileName(pathDir.join(__dirname,'../pages'),'',routerList)
					routerList.forEach(item=>{
						const importSpecifier = types.ImportDefaultSpecifier(types.Identifier(item.pagename))
						const importDeclaration = types.ImportDeclaration([importSpecifier],types.StringLiteral(`../pages/${item.path}.vue`));
						rootPath.unshiftContainer("body", importDeclaration);
						let objectParams = [
							types.ObjectProperty(types.Identifier('path'),types.StringLiteral('/'+item.path)),
							types.ObjectProperty(types.Identifier('component'),types.Identifier(item.pagename)),
						]
						const objectExpression = types.ObjectExpression(objectParams);
						elementArray.push(objectExpression)
					})
					if(siblingPath){
						path.parentPath.node.init = types.ArrayExpression(elementArray);
					}
				}
				// 自动加载store文件
				if(node.name === 'constStoreObject' && siblingPath){
					let storeList = [];
					getFileName(pathDir.join(__dirname,'../store'),'',storeList);
					storeList.forEach(item=>{
						if(item.fileName !== 'index.js'){
							let name = item.fileName.split('.')[0];
							const importSpecifier = types.ImportDefaultSpecifier(types.Identifier(name))
							const importDeclaration = types.ImportDeclaration([importSpecifier],types.StringLiteral(`/${item.path}.js`));
							rootPath.unshiftContainer("body", importDeclaration);
							elementArray.push(
								types.ObjectProperty(
									types.Identifier(name),
									types.Identifier(name)
								)
							)
						}
					})
					path.parentPath.node.init = types.ObjectExpression(elementArray);
				}
				// 自动引入自定义vue组件
				if(node.name === 'constComponentList'){
					let componentList = [];
					getFileName(pathDir.join(__dirname,'../components'),'',componentList);
					const blockPath = path.findParent(types.isBlockStatement);
					let requireList = [];
					componentList.forEach(item=>{
						
						if(item.fileName !== 'index.js'){
							const memberExpression = types.MemberExpression(types.Identifier('Vue'),types.Identifier('component'));
							// 创建resolve=>require(['./toast-test.vue'],resolve)节点
							const componentArrow = types.ArrowFunctionExpression(
								[types.Identifier('resolve')],
								types.CallExpression(types.Identifier('require'),[
									types.ArrayExpression([types.StringLiteral(`/${item.path}.vue`)]),
									types.Identifier('resolve')
								])
							)
							const arguments = [types.StringLiteral(item.relativePath.replace(/\//g,'-')),componentArrow];
							const callExpression = types.CallExpression(memberExpression,arguments);
							const statement = types.ExpressionStatement(callExpression);
							requireList.push(statement);
						}
						
					})
					// 替换块级作用域
					blockPath.replaceWith(types.BlockStatement(requireList));
				}
			}
		}
	}
}