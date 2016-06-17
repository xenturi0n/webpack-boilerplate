const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = function(options){
    return{
        devServer:{
            historyApiFallback: true,
            // stats: 'errors-only',
            stats:{
                colors: true,
                hash: false,
                version: false,
                timings: true,
                assets: true,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: false,
                publicPath: true

            },
            host: options.host, // Defaults to `localhost`
            port: options.port, // Defaults to 8080
            contentBase: options.contentBase
        }
    }
}

exports.devJSLoaders = function(options){
    return{
        module:{
            loaders:[{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                include: options.path
            }]
        }
    }
}

exports.prodJSLoaders = function(options){
    return{
        module:{
            loaders:[{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                include: options.path
            }]
        }
    }
}

exports.devCSSLoaders = function(options){
    return{
        module:{
            loaders:[{
                test: /\.css$/,
                loaders: ['style', 'css?sourceMap'],
                exclude: /(node_modules|bower_components)/,
                include: options.path
            }]
        }
    }
}

exports.prodCSSLoaders = function(options){
    return{
        module:{
            loaders:[{
                test: /\.css$/,
                loaders: ['style', 'css'],
                exclude: /(node_modules|bower_components)/,
                include: options.path
            }]
        }
    }
}

exports.minify = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                comments: false,                
                compress: {
                    warnings: false,
                    drop_console: true
                },
                mangle: {
                    exept: ['$', 'webpackJsonp'],
                    screw_ie8: true,
                    keep_fnames: true
                }
            })
        ]
    };
}

exports.clean = function(path){
    return{
        plugins: [
            new CleanWebpackPlugin([path],{
                root: process.cwd()
            })
        ]
    }
}