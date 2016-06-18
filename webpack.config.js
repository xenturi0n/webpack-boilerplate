const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./webpack.parts.js');

const paths = {
    src: {
        root: path.resolve(__dirname, 'src'),
        js: path.resolve(__dirname, 'src',  'assets', 'js'),
        scss: path.resolve(__dirname, 'src', 'assets', 'scss')
    },
    dist:{
        root: path.resolve(__dirname, 'dist'),
        js: path.resolve(__dirname, 'dist',  'assets', 'js'),
        css: path.resolve(__dirname, 'dist', 'assets', 'css')
    }
}

const common = {
    entry: {
        app: path.resolve(paths.src.js, 'main.js')
    },
    output: {
        path: paths.dist.root,
        filename: 'assets/js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.src.root, 'index.html'),
            filename: 'index.html'
        }),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    }
}

var config;

switch(process.env.npm_lifecycle_event){
    case 'build':
        config = merge(
            common, 
            {
                devtool: 'source-map',
                output:{
                    path: paths.dist.root,
                    filename: 'assets/js/[name].[chunkhash].js'
                }
            },            
            parts.prodJSLoaders({
                path: paths.src.js
            }),
            parts.extractBundle({
                name: 'vendor',
                entries: ['react','react-dom']
            }),
            parts.minify(),            
            parts.extractCSS(paths.src.scss),
            parts.clean(paths.dist.root)
        );
        break;
    default:
        config = merge(
            common,
            {
                devtool: 'eval-source-map'
            }, 
            parts.devServer({
                host: process.env.HOST,
                port: process.env.PORT,
                contentBase: paths.dist.root
            }),
            parts.devJSLoaders({
                path: paths.src.js
            }),
            parts.devCSSLoaders({
                path: paths.src.scss
            })
        );
}


module.exports = validate(config);
