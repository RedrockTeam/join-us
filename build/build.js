var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var Px2remWebpackPlugin = require('px2rem-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackConfig = require('./webpack.config.js')

process.env.NODE_ENV = 'production';

var newWebpackConfig = merge(webpackConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // chunksSortMode: function (chunk1, chunk2) {
      //   return chunk2.id - chunk1.id
      // }
    }),
  ]
})

console.log(process.env.NODE_ENV)

webpack(newWebpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})