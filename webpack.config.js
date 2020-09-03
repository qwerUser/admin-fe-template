const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = (env) => {
	let outPath;
	if (env && env.path) {
		outPath = path.resolve(env.path, 'static');
	} else {
		outPath = path.resolve(__dirname, 'dist/static');
	}
	return {
		entry: ['babel-polyfill','./src/js/app.js'],
		output: {
			path: outPath,
			filename: 'app_bundle.js',
			chunkFilename: 'chunk_[chunkhash].js',
			publicPath: (config['ENV']==='development' && config['USE_DEVSERVER']) ? '/' : 'static/'
		},
		module:{
			rules: [{
				test: /\.vue$/,
				loader:'vue-loader'
			},{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}, {
				test: /\.(gif|jpeg|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=1024'
			},{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env',],
						plugins:[require('./src/js/utils/filename-plugin.js'),'transform-object-rest-spread']
					}
				}
			}]
		},
		mode:config['ENV'],
		plugins: (function () {
			var plugins = [
				new HtmlWebpackPlugin({
					template: './src/html/admin-fe.html',
					filename: (config['ENV']==='development' && config['USE_DEVSERVER']) ? 'admin-fe.html' : '../admin-fe.html',
					inject: false,
					hash:true
				}),
				new VueLoaderPlugin()
			];
			return plugins;
		})(),
		devServer: {
			contentBase:false,
			historyApiFallback: true,
			// contentBase:path.join(__dirname,'dist'),
			// hot: true,
			compress: true,
			// liveReload:true, // 检测到文件更改时，开发服务器将重新加载/刷新页面
			host: 'localhost',
			port: '8001',
			// publicPath: '/',
			// writeToDisk: true,
			open: true,
			index:'admin-fe.html',
			watchOptions: {
				poll: true,
			}
		},
	}
	
}