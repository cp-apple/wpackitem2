const webpack =require('webpack');
 //依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
const HtmlWebpackPlugin=require('html-webpack-plugin'); 
// 分离css与js文件的插件
const ExtractTextPlugin=require('extract-text-webpack-plugin');
// 压缩js代码
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
// 打包时，删除指定路径文件夹，在重新打包生成
const CleanWebpackPlugin=require('clean-webpack-plugin');

module.exports={
	entry:__dirname+'/app/main.js',  //唯一入口文件
	output:{
		path:__dirname+'/build',  //打包后的文件存放的地方
		// 添加hash可以防止文件缓存，每次都会生成4位的hash串
		filename:'bundle.[hash:8].js',  //打包后输出文件的文件名
	},
	// (devtool:'eval-source-map')打包map，方便调试
	devtool:'null',  //不打包map调试文件
	// 构建本地服务器
	devServer:{
		contentBase:'./app',  //本地服务器所加载的页面所在的目录
		historyApiFallback:true,  //不跳转
		inline:true,  //实时刷新
		hot:true,
	},
	// 如要UglifyJsPlugin插件起作用，注释掉 mode 配置参数
	// mode:'development',  //配置为 production 会自动压缩js， development 不会
	// 配置loader
	module:{
		rules:[
			{
  		  test: /(\.jsx|\.js)$/,  //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
        use: {
          loader: "babel-loader",  //（必须）
        },
        exclude: /node_modules/,   //屏蔽不需要处理的文件（文件夹）（可选）
			},
			{
				test:/\.css$/,
				use:[
					{
						loader:"style-loader"
					},
					{
						loader:"css-loader",
						options:{
							modules:true,  //指定启用css modules
							localIdentName:'[name]__[local]--[hash:base64:5]',  //指定css的类名格式
						}
					},
					{
						loader:"postcss-loader"
					},
				]
			}
		]
	},
	// 插件
	plugins:[
		// 版权声明插件
		new webpack.BannerPlugin({
			banner:'cp版权所有,翻版必究\n\rhello world~'
		}),
		new HtmlWebpackPlugin({
			template:__dirname+'/app/index.tmpl.html'
		}),
		//热加载插件
		new webpack.HotModuleReplacementPlugin(),  
		// 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin("style.css"),
		new CleanWebpackPlugin('build/*.*',{
			root:__dirname,
			verbose:true,
			dry:false
		})
	],
	// 压缩js
	optimization:{
		minimizer:[
			new UglifyJsPlugin({
				uglifyOptions:{
					compress:false
				}
			})
		]
	}
}

