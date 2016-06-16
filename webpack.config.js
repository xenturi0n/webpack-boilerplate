var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = {
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


module.exports = {
    entry: [
        path.resolve(paths.src.js, 'main.js')
        ],
    output: {
        path: paths.dist.js,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: paths.dist.root,
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            include: paths.src.js
        }]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(paths.src.root, 'index.html')
        })
    ],
    stats: {
        // Nice colored output
        colors: true
    }
};
