module.exports = {
	devServer: {
		proxy: 'https://nkj21509.github.io/'
	},
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production' ? '/glass-vue/' : '/'
}