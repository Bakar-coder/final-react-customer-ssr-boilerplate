const path = require('path');
const autoprefixer = require('autoprefixer');
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
	devtool: 'cheap-module-source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve(process.cwd(), 'build/static'),
		filename: 'bundle.js',
		chunkFilename: '[id].js',
		publicPath: ''
	},
	devServer: {
		contentBase: path.resolve(process.cwd(), 'build/static'),
		port: 3001,
		hot: process.env.NODE_ENV !== 'production',
		watchContentBase: true
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [
					{ loader: 'babel-loader', options: { compact: true } },
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
					name: 'images/[name].[hash:8].[ext]'
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: '[name].[contenthash:8].chunk.css'
		}),
		new WebpackMd5Hash()
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
