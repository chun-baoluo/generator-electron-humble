const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    let plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            template: <% if(templateEngine == true && frontendType == 'Angular') { %>'dev/index.pug'<% } else { %>'dev/index.html'<% } %>
        })<% if(frontendType == 'Angular') { %>,
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.type == 'prod')
        })<% } %>
    ];

    return {
        devServer: {
            contentBase: __dirname  + '/app/res/'<% if(frontendType == 'Angular') { %>,
            hot: true<% } %>
        },<% if(frontendType == 'React') { %>

        entry: "./dev/App.tsx",<% } else if(frontendType == 'Angular') { %>

        entry: {
            polyfills: './dev/polyfills.ts',
            vendor: './dev/vendor.ts',
            app: './dev/main.ts'
        },<% } %>

        resolve: {
            extensions: ['*', '.ts'<% if(frontendType == 'React') { %>, '.tsx'<% } %>, '.js', <% if(cssPreprocessor == 'Stylus') { %>'.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'.scss'<% } %>]
        },

        module: {
            rules: [
                {
                    test: /\.ts<% if(frontendType == 'React') { %>x<% } %>$/,
                    loader: 'ts-loader'
                },            {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },<% if(templateEngine == true && frontendType == 'Angular') { %>
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

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        enforce: true
                    }
                }
            }
        },

        output: {
            path: __dirname  + '/app/res/',
            publicPath: env.type == 'dev' ? '/' : './',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        plugins: env.type == 'dev' ? plugins.concat([<% if(frontendType == 'Angular') { %>
            new webpack.HotModuleReplacementPlugin(),<% } %>
            new webpack.NamedModulesPlugin()
        ]) : plugins,

        watch: (env.type == 'dev')
    };
};
