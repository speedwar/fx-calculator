const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

const JSLoader = {
  test: /\.js$/,
  exclude: [
    /node_modules/
  ],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}

const ESLintLoader = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: path.join(__dirname, './../.eslintrc')
    }
  }
}

const SASSLoader = {
  test: /\.(c|sc)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it uses publicPath in webpackOptions.output
        // publicPath: '../',
        hmr: isDevelopment
      }
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.join(__dirname, './postcss.config.js')
        }
      }
    },
    {
      loader: 'sass-loader',
      options: { 
        sourceMap: isDevelopment
      }
    }
  ]
}

// const SVGLoader = {
//   test: /\.svg$/,
//   include: path.join(__dirname, './../src/assets/svg'),
//   use: [
//     {
//       loader: 'svg-sprite-loader',
//       options: {
//         extract: true,
//         spriteFilename: 'sprite.svg',
//         runtimeCompat: true
//       }
//     },
//     {
//       loader: 'svgo-loader',
//       options: {
//         removeTitle: true,
//         convertColors: { shorthex: false },
//         convertPathData: false
//       }
//     }
//   ]
// }

module.exports = {
  JSLoader: JSLoader,
  ESLintLoader: ESLintLoader,
  SASSLoader: SASSLoader,
  // SVGLoader: SVGLoader
}