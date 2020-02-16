const path = require('path')
const loaders = require('./loaders')
const plugins = require('./plugins')
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    polyfill: path.join(__dirname, './../src/utils/polyfill.js'),
    main: path.join(__dirname, './../src/index.js')
  },
  devServer: {
    contentBase: path.join(__dirname, './../public'),
    port: 3000
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.ESLintLoader,
      loaders.SASSLoader,
      // loaders.SVGLoader
    ]
  },
  output: {
    filename: isDevelopment ? '[name].bundle.js' : '[name].[hash].js',
    chunkFilename: isDevelopment ? '[name].bundle.js' : '[name].[hash].js', // Dynamic Imports
    publicPath: '',
    path: path.resolve(__dirname, './../build'),
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './../src/'),
      pages: path.resolve(__dirname, './../src/pages/'),
      components: path.resolve(__dirname, './../src/components/'),
      utils: path.resolve(__dirname, './../src/utils/'),
      data: path.resolve(__dirname, './../src/data/'),
      rx: path.resolve(__dirname, './../src/redux/'),
      sass: path.resolve(__dirname, './../src/assets/sass/'),
      image: path.resolve(__dirname, './../src/assets/img/'),
      svg: path.resolve(__dirname, './../src/assets/svg/')
    }
  },
  plugins: [
    plugins.HtmlPlugin,
    plugins.StyleLintPlugin,
    plugins.MiniCssExtractPlugin,
    // plugins.SvgLoaderPlugin,
    plugins.CleanPluginLoader
  ]
}