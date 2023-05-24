// module.exports = {
// 	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
// 	configureWebpack: config => {
// 		if (process.env.NODE_ENV === 'production') {
// 			config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
// 			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
// 			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
// 			config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
// 		}
// 	}
// }


// module.exports = {
// 	devServer: {
// 		port: '8080',
// 		disableHostCheck: true,
// 		proxy: {
// 			'/dpc': {
// 				target: 'http://nat.ynawe.com:10001/CommunityCloud/',
// 				changeOrigin: true,
// 				pathRewrite: {
// 					'^/dpc': ''
// 				}
// 			}
// 		}
// 	}
// }