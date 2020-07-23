module.exports = {
	devServer: {
		proxy: 'http://www.api.qsyj.com'
	},
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production' ? '/glasses-vue' : '/'
}