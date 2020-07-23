module.exports = {
	devServer: {
		proxy: 'https://localhost:8080/'
	},
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production' ? '/glass-vue/' : '/'
}