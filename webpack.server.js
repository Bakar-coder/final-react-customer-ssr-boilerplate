const { resolve } = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	entry: './src/server.js',
	output: {
		filename: 'bundle.js',
		path: resolve(process.cwd(), 'build'),
	},
	externals: [webpackNodeExternals()],
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(scss|css)$/,
				loader: 'ignore-loader'
			}
		]
	}
};
