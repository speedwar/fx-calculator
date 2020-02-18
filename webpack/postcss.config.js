const isDevelopment = process.env.NODE_ENV === 'development'
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': !isDevelopment,
    'autoprefixer': {}
  }
}