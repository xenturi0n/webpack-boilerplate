const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
                include: options.path,
                query: {
                    presets: ['react-hmre']
                }
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

exports.extractBundle = function(options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    };
}

exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        // {
        //   test: /\.css$/,
        //   loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        //   include: paths
        // },
        // {
        //   test: /.*global.*\.(scss|css)$/,
        //   loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap'),
        //   include: paths
        // },
        // {
        //   test: /((?!global).)*\.(scss|css)$/,
        //   loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap'),
        //   include: paths
        // },
        {
          test: /\.(scss|css)$/,
          loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true!postcss'),
          include: paths
        }
      ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('assets/css/[name].[chunkhash].css', {allChunks: false})
    ]
  };
}

exports.devCSSLoaders = function(options){
    return{
        module:{
            loaders:[
                {
                    test: /\.(scss|css)$/,
                    loaders: [
                        'style?sourceMap', 
                        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                        'postcss',                        
                        'sass?sourceMap'
                    ],
                    exclude: /(node_modules|bower_components)/,
                    include: options.path
                }
            ]
        },
        postcss: function () {
            return [autoprefixer];
        }
    }
}
