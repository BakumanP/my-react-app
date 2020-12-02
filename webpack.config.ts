import { resolve } from 'path';
import webpack from 'webpack';
import pkg from './package.json';
// Plugins
const HtmlwebpackPlugin = require('html-webpack-plugin'); // 将打包后的js引入build/index.html

// env
export const isWindows = process.platform === 'win32';
const isDev = process.env.NODE_ENV === 'development';
const isPrd = process.env.NODE_ENV === 'production';
const deployEnv = process.env.DELOY_ENV || 'prd';

// config
const additionHash = isPrd ? '.[hash]' : '';
export const PUBLIC_PATH = `/db/${deployEnv}/`;
export const BUILD_RESOURCE_NAME = 'resources';
export default {
  entry: {
    app: './src/index.tsx',
  }, // 入口
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: PUBLIC_PATH,
    filename: `${BUILD_RESOURCE_NAME}/js/[name]${additionHash}.js`,
	}, // 产出
	module: {
		rules: [
			{
        test: /\.[jt]sx?$/,
        include: resolve(__dirname, 'src'),
        use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
			},
			{
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `${BUILD_RESOURCE_NAME}/images/[hash].[ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          size: 16,
          hash: 'sha512',
          digest: 'hex',
          name: `${BUILD_RESOURCE_NAME}/fonts/[hash].[ext]`,
        },
      },
		] //  使用模块 ，注意rules的规则是从下到上执行的
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
	},
	plugin: [
		// 确保 vendors 的 chunkhash 只随内容变化
    // @see https://webpack.js.org/guides/caching/#module-identifiers
    new webpack.HashedModuleIdsPlugin(),
    new HtmlwebpackPlugin({
      title: 'Loading...',
      version: `${pkg.version}`,
      publishDate: new Date().toLocaleString(),
      filename: 'index.html',
      favicon: `src/assets/favicon-${deployEnv}.ico`,
      template: 'src/index.html',
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
	]
}