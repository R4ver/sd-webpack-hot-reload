var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');
var STYLES_DIR = path.resolve(__dirname, 'styles');
console.log(BUILD_DIR);
var config = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server',
        APP_DIR + '/index.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module : {
        loaders : [
            {
                test : /\.js?/,
                include : APP_DIR,
                loader : 'babel-loader',
                exclude: /node_modules/
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!resolve-url!sass?sourceMap'
                )
            }
        ]
    },
    sassLoader: {
        includePaths: [ path.resolve(__dirname, 'styles'), path.resolve(__dirname, 'styles/*') ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('screen.css'),
    ]
};

module.exports = config;