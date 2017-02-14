var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: {
        polyfills: './dev/polyfills.ts',
        vendor: './dev/vendor.ts',
        app: './dev/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js', <% if(cssPreprocessor == 'Stylus') { %>'.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'.scss'<% } %>]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.jade$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=img/[name].[ext]'
            },<% if(cssPreprocessor == 'Stylus') { %>
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            }<% } %><% if(cssPreprocessor == 'Less') { %>
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }<% } %><% if(cssPreprocessor == 'Sass') { %>
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }<% } %>
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'dev/index.jade'
        })
    ]
};

module.exports = webpackMerge(config, {
    devtool: 'source-map',

    output: {
        path: './app/res/',
        publicPath: './',
        filename: '[name].[hash].js',
        chunkFilename: '[id].chunk.js'
    },

    htmlLoader: {
        minimize: false
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css')
    ]
});
