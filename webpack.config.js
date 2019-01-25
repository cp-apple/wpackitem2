const webpack =require('webpack');
 //依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
const HtmlWebpackPlugin=require('html-webpack-plugin'); 

module.exports={
	entry:__dirname+'/app/main.js',  //唯一入口文件
	output:{
		path:__dirname+'/build',  //打包后的文件存放的地方
		// 添加hash可以防止文件缓存，每次都会生成4位的hash串
		filename:'bundle.[hash:4].js',  //打包后输出文件的文件名
	},
	// 打包map，方便调试
	devtool:'eval-source-map',
	// 构建本地服务器
	devServer:{
		contentBase:'./public',  //本地服务器所加载的页面所在的目录
		historyApiFallback:true,  //不跳转
		inline:true,  //实时刷新
		hot:true,
	},
	mode:'development',
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
	],

}

