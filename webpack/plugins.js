const path = require('path')
const _MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const _StyleLintPlugin       = require('stylelint-webpack-plugin')
const _HtmlWebPackPlugin     = require('html-webpack-plugin')
// const _SvgLoaderPlugin       = require('svg-sprite-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

const HtmlPlugin = new _HtmlWebPackPlugin({
  template: path.resolve(__dirname, './../public/index.html'),
  favicon: path.resolve(__dirname, './../public/favicon.ico'),
  filename: 'index.html'
})

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // all options are optional
  filename: isDevelopment ? '[name].bundle.css' : '[name].[hash].css',
  chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
  ignoreOrder: false, // Enable to remove warnings about conflicting order
})

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../src/assets/sass'),
  files: '**/*.scss',
  failOnError: false,
  quiet: false,
})

// const SvgLoaderPlugin = new _SvgLoaderPlugin({
//   plainSprite: true
// });

const CleanPluginLoader = new CleanWebpackPlugin({
  // you can add options here
})

module.exports = {
  HtmlPlugin: HtmlPlugin,
  MiniCssExtractPlugin: MiniCssExtractPlugin,
  StyleLintPlugin: StyleLintPlugin,
  // SvgLoaderPlugin: SvgLoaderPlugin,
  CleanPluginLoader: CleanPluginLoader
}