const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJS = require('uglify-es');

const DefaultUglifyJsOptions = UglifyJS.default_options();
const compress = DefaultUglifyJsOptions.compress;
for (let compressOption in compress) {
	compress[compressOption] = false;
}
compress.unused = true;

module.exports = {
	devtool:
		process.env.NODE_ENV !== 'production'
			? 'cheap-module-source-map'
			: 'source-map',

	entry: ['./src/index.js'].filter(Boolean),
	output: {
		path: path.resolve(process.cwd(), 'build/static'),
		filename: 'bundle.js',
		chunkFilename: '[id].js',
		publicPath: ''
	},
	devServer: {
		contentBase: path.resolve(process.cwd(), 'src'),
		port: 3001,
		hot: process.env.NODE_ENV !== 'production',
		watchContentBase: true
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: { 'react-dom': '@hot-loader/react-dom'  }
	},
	module: {
		rules: [
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: { compact: process.env.NODE_ENV !== 'production' }
					},
					{ loader: 'prettier-loader' }
				],
				exclude: /node_modules/
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								autoprefixer({
									browsers: ['> 1%', 'last 2 versions']
								})
							]
						}
					}
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:8].[ext]'
				}
			},
			{
				loader: require.resolve('file-loader'),
				exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.s?css$/],
				options: {
					name: 'media/[name].[hash:8].[ext]'
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[name].[contenthash:8].chunk.css'
		}),
		new WebpackMd5Hash(),
		process.env.NODE_ENV !== 'production' &&
			new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 0
		},
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress,
					mangle: false,
					output: {
						beautify: process.env.NODE_ENV !== 'production'
					}
				}
			})
		],
		usedExports: true,
		sideEffects: true
	}
};
