const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
// Plugins
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import { resolve } from 'path';
const resolve = require('path').resolve;
// 环境
const isDev = process.env.NODE_ENV === 'development';
export const BUILD_RESOURCE_NAME = 'resources';
// css loader
const toStyleLoader = (suffix: string | Array<string>, loaderPrefix, options?) => {
  const suffixList = Array.isArray(suffix) ? suffix : [suffix];
  return {
    test: new RegExp(`\\.(${suffixList.join('|')})$`),
    use: [
      { loader: MiniCssExtractPlugin.loader, options: { hmr: isDev } },
      'css-loader',
      'postcss-loader',
      ...(loaderPrefix
        ? [
            {
              loader: `${loaderPrefix}-loader`,
              options: {
                sourceMap: isDev,
                ...options,
              },
            },
          ]
        : []),
    ],
  };
};
const styleSupportList = [
  { suffix: ['css'] },
  {
    suffix: ['less'],
    loaderPrefix: 'less',
    options: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          'border-radius-base': '4px',
        },
      },
    },
  },
  { suffix: ['sass', 'scss'], loaderPrefix: 'sass' },
  { suffix: ['styl'], loaderPrefix: 'stylus' },
];
module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: resolve(__dirname, 'src'),
        use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
      },
      ...styleSupportList.map(({ suffix, loaderPrefix, options }) => toStyleLoader(suffix, loaderPrefix, options)),
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
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'index.html',
    }),
    // new CleanWebpackPlugin(['dist']),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
};
