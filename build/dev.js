var express = require('express')
var opn = require('opn')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpackConfig = require('./webpack.config.js')

var newWebpackConfig = merge(webpackConfig, {
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: './src/index.html',
            template: './src/index.html',
            inject: true
        }),
    ]
})

var compiler = webpack(newWebpackConfig)
var port = 4567
var app = express()

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: newWebpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

app.use(devMiddleware)

var hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

app.use(hotMiddleware)

app.use('/', express.static(path.resolve(__dirname, '../')))
app.use(express.static(path.resolve(__dirname, '../img/')))
app.use('/js', express.static(path.resolve(__dirname, '../js/')))

module.exports = app.listen(port, function(err) {
    if (err) {
        return console.log(err)
    }

    var uri = 'http://localhost:' + port + '/src/index.html'
    console.log('Listening at ' + uri + '\n')

    opn(uri)
})