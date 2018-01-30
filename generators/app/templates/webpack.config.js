const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    let plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: <% if(templateEngine == true) { %>'dev/index.pug'<% } else { %>'dev/index.html'<% } %>
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.type == 'prod')
        }),
    ];

    return {
        devServer: {
            contentBase: __dirname  + '/app/res/',
            hot: true
        },
        
        entry: {
            polyfills: './dev/polyfills.ts',
            vendor: './dev/vendor.ts',
            app: './dev/main.ts'
        },

        resolve: {
            extensions: ['*', '.ts', '.js', <% if(cssPreprocessor == 'Stylus') { %>'.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'.scss'<% } %>]
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                },            {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },<% if(templateEngine == true) { %>
                {
                    test: /\.(jade|pug)$/,
                    loader: 'pug-loader'
                }<% } else { %>
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }<% } %>,
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader?name=img/[name].[ext]'
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }, <% if(cssPreprocessor == 'Stylus') { %>
                {
                    test: /\.styl$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!stylus-loader' })
                }<% } %><% if(cssPreprocessor == 'Less') { %>
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
                }<% } %><% if(cssPreprocessor == 'Sass') { %>
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
                }<% } %>
            ]
        },

        devtool: 'source-map',

        output: {
            path: __dirname  + '/app/res/',
            publicPath: '/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        plugins: env.type == 'dev' ? plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        ]) : plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                mangle: {
                    keep_fnames: true
                }
            })
        ]),

        watch: (env.type == 'dev')
    };
};
